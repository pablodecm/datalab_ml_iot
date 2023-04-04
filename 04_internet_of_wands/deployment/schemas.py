from pydantic import BaseModel
from typing import List


class SensorData(BaseModel):
    timestamp: List[float]
    x: List[float]
    y: List[float]
    z: List[float]


class TrainingSample(BaseModel):
    accel_data: SensorData
    gyro_data: SensorData
    wizard_name: str
    device_select: str
    spell_select: str
    start_timestamp: int


class PredictSample(BaseModel):
    accel_data: SensorData
    gyro_data: SensorData
    start_timestamp: int


class PredictResponse(BaseModel):
    spell: str
