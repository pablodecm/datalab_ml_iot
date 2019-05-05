

let collection_frequency = 100;

let lastReadingTimestamp;
let accelerometer;
let gyroscope;

let accel_data;
let gyro_data;


if ('Accelerometer' in window && 'Gyroscope' in window) {
  
  document.getElementById('moApi').innerHTML = 'Generic Sensor API';


  accelerometer = new Accelerometer({frequency: collection_frequency});
  gyroscope = new Gyroscope({frequency: collection_frequency});
  
  function accel_listen(eventData) {
    accel_data.timestamp.push(accelerometer.timestamp);
    accel_data.x.push(accelerometer.x);
    accel_data.y.push(accelerometer.y);
    accel_data.z.push(accelerometer.z);
    if (lastReadingTimestamp) {
      intervalHandler(Math.round(accelerometer.timestamp - lastReadingTimestamp));
    }
    lastReadingTimestamp = accelerometer.timestamp;
    accelerationHandler(accelerometer, 'moAccel');
  }

  function gyro_listen(eventData) {
    
    gyro_data.timestamp.push(gyroscope.timestamp);
    gyro_data.x.push(gyroscope.x);
    gyro_data.y.push(gyroscope.y);
    gyro_data.z.push(gyroscope.z);
    rotationHandler({
      alpha: gyroscope.x,
      beta: gyroscope.y,
      gamma: gyroscope.z
    })
  }
  
} else if ('DeviceMotionEvent' in window) {
  
  document.getElementById('moApi').innerHTML = 'Device Motion API';

  function onDeviceMotion(eventData) {
    var date = new Date();
    var timestamp = date.getTime();
    accel_data.timestamp.push(timestamp);
    accel_data.x.push(eventData.acceleration.x);
    accel_data.y.push(eventData.acceleration.y);
    accel_data.z.push(eventData.acceleration.z);
    gyro_data.timestamp.push(timestamp);
    gyro_data.x.push(eventData.rotationRate.alpha);
    gyro_data.y.push(eventData.rotationRate.beta);
    gyro_data.z.push(eventData.rotationRate.gamma);
    accelerationHandler(eventData.acceleration, 'moAccel');
    rotationHandler(eventData.rotationRate);
    if (lastReadingTimestamp) {
      intervalHandler(Math.round(timestamp - lastReadingTimestamp));
    }
    lastReadingTimestamp = timestamp;
  }
} else {
  document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
}

function init_sensors() {
  
if ('Accelerometer' in window && 'Gyroscope' in window) {
  
  accelerometer.addEventListener('reading', accel_listen);
  accelerometer.start();
  
  gyroscope.addEventListener('reading', gyro_listen);
  gyroscope.start();
  
} else if ('DeviceMotionEvent' in window) {
  window.addEventListener('devicemotion', onDeviceMotion, false);
} else {
  document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
}
}

function stop_sensors() {

if ('Accelerometer' in window && 'Gyroscope' in window) {
  document.getElementById('moApi').innerHTML = 'Generic Sensor API';
  
  accelerometer.removeEventListener('reading', accel_listen);
  accelerometer.stop();
  gyroscope.removeEventListener('reading', gyro_listen);
  gyroscope.stop();
  
} else if ('DeviceMotionEvent' in window) {
  document.getElementById('moApi').innerHTML = 'Device Motion API';

  window.removeEventListener('devicemotion', onDeviceMotion);
  
} else {
  document.getElementById('moApi').innerHTML = 'No Accelerometer & Gyroscope API available';
}
}

function accelerationHandler(acceleration, targetId) {
  var info, xyz = "[X, Y, Z]";

  info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
  info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
  info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
  document.getElementById(targetId).innerHTML = info;
}

function rotationHandler(rotation) {
  var info, xyz = "[X, Y, Z]";

  info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
  info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
  info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
  document.getElementById("moRotation").innerHTML = info;
}

function intervalHandler(interval) {
  document.getElementById("moInterval").innerHTML = interval;
}