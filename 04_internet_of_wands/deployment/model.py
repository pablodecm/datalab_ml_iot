from schemas import PredictSample
import pandas as pd
import joblib

LABEL_ASSIGN = {"alohomora": 0, "lumos": 1, "wingardium-leviosa": 2, "reparo": 3}


def read_sample(predict_sample: PredictSample) -> pd.DataFrame:
    """ "Reads the sample and returns a dataframe with the data."""

    # we need to transform the data into a dataframe
    raw_df = pd.DataFrame.from_dict(predict_sample.dict())

    # then we do exactly the same transformations as we do in the training

    # convert to series to avoid having object elements
    accel_df = raw_df.accel_data.apply(pd.Series).T
    accel_df["timestamp"] = pd.to_timedelta(accel_df.timestamp, unit="ms")
    gyro_df = raw_df.gyro_data.apply(pd.Series).T
    gyro_df["timestamp"] = pd.to_timedelta(gyro_df.timestamp, unit="ms")

    # we can use the minimum of timestamp as origin to have the same reference
    min_timestamp = min([accel_df.timestamp.min(), gyro_df.timestamp.min()])

    # set the same timestamp origin
    accel_df["timestamp"] -= min_timestamp
    gyro_df["timestamp"] -= min_timestamp
    # set first element to 0 to have the same start
    accel_df.loc[0, "timestamp"] = pd.Timedelta(0)
    gyro_df.loc[0, "timestamp"] = pd.Timedelta(0)
    accel_df = accel_df.set_index("timestamp")
    gyro_df = gyro_df.set_index("timestamp")

    # resample and interpolate to make homogeneous
    resampled_accel_df = accel_df.resample("20ms").mean().interpolate("time")
    resampled_gyro_df = gyro_df.resample("20ms").mean().interpolate("time")

    # merge in a single df
    merged_df = pd.merge(
        resampled_accel_df,
        resampled_gyro_df,
        left_index=True,
        right_index=True,
        suffixes=["_accel", "_gyro"],
        how="inner",
    )

    return merged_df


def extract_features(eval_df: pd.DataFrame) -> pd.DataFrame:
    """ "From the dataframe with the data, extract the features that the model will require."""

    # extract the features that the model will require
    # again the idea is to be as close as the transformations as in the training
    features = [f"{i}_accel" for i in ["x", "y", "z"]] + [
        f"{i}_gyro" for i in ["x", "y", "z"]
    ]

    # TODO: need to adapt this to your transformations
    eval_df_mean = eval_df.mean().to_frame().T
    eval_df_mean.columns = [f"{f}_mean" for f in features]
    eval_df_std = eval_df.std(axis=0).to_frame().T
    eval_df_std.columns = [f"{f}_std" for f in features]
    eval_df_extra = pd.concat([eval_df_mean, eval_df_std], axis=1)

    return eval_df_extra


class PredictModel:
    """ "Class to load the model and make predictions."""

    def __init__(self, model_path: str, label_assign: dict = LABEL_ASSIGN):
        """ "Loads the model and the label assign."""
        self.model = joblib.load(model_path)
        self.label_assign = label_assign
        self.label_assign_inverse = {v: k for k, v in label_assign.items()}

    def predict(self, predict_sample: PredictSample) -> str:
        """Predicts the label of the sample."""

        # read the sample
        eval_df = read_sample(predict_sample)
        # extract the features
        eval_df_extra = extract_features(eval_df)
        # make the prediction
        prediction = self.model.predict(eval_df_extra)[0]

        return self.label_assign_inverse[prediction]
