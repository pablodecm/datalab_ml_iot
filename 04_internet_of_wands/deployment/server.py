from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import json
import random
import string
from schemas import TrainingSample, PredictSample, PredictResponse
from model import PredictModel


def id_generator(size=6, chars=string.ascii_lowercase + string.digits):
    return "".join(random.choice(chars) for _ in range(size))


app = FastAPI(title="Internet of Wands Deployment Server")


@app.put("/api/collect")
async def collect(training_sample: TrainingSample):
    """This endpoint is used to collect training data from the client (MQTT alternative)."""

    # here we could do anything with the training sample
    # for example, we could save it to a file similar to what we did in the MQTT example

    # create a unique file name
    json_file = Path(
        f"./iow_data/{training_sample.spell_select}/{training_sample.wizard_name}_{id_generator()}.json"
    )
    # create parent folders if they do not exist
    json_file.parent.mkdir(parents=True, exist_ok=True)
    with open(json_file, "w") as f:
        json.dump(training_sample.dict(), f)

    # we could do more advance error management but this will do
    return "Success"


predict_model = PredictModel("../optimized_gb_clf.joblib")


@app.post("/api/predict")
async def predict(predict_sample: PredictSample) -> PredictResponse:
    """This endpoint is used to predict the spell from the client."""

    # use model to predict the spell
    spell_name = predict_model.predict(predict_sample)

    response = PredictResponse(spell=spell_name)
    return response


# this mounts the static files from the dev-static folder to the root path
# so we can run everything just with this server
app.mount("/", StaticFiles(directory=Path("../dev-static/"), html=True))
