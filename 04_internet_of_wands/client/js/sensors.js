let collection_frequency = 60;

let lastReadingTimestamp;
let accelerometer;
let gyroscope;

let accel_data;
let gyro_data;

if ("Accelerometer" in window && "Gyroscope" in window) {
  // this is executed only in browsers compatible with Sensor API
  document.getElementById("moApi").innerHTML = "Generic Sensor API";

  accelerometer = new Accelerometer({ frequency: collection_frequency });
  gyroscope = new Gyroscope({ frequency: collection_frequency });

  function accel_listen(eventData) {
    // add to data objects
    accel_data.timestamp.push(accelerometer.timestamp);
    accel_data.x.push(accelerometer.x);
    accel_data.y.push(accelerometer.y);
    accel_data.z.push(accelerometer.z);

    // display info in details
    if (lastReadingTimestamp) {
      intervalHandler(
        Math.round(accelerometer.timestamp - lastReadingTimestamp)
      );
    }
    lastReadingTimestamp = accelerometer.timestamp;
    accelerationHandler(accelerometer, "moAccel");
  }

  function gyro_listen(eventData) {
    // add to data objects
    gyro_data.timestamp.push(gyroscope.timestamp);
    gyro_data.x.push(gyroscope.x);
    gyro_data.y.push(gyroscope.y);
    gyro_data.z.push(gyroscope.z);

    // display info in details
    rotationHandler({
      alpha: gyroscope.x,
      beta: gyroscope.y,
      gamma: gyroscope.z
    });
  }
} else if ("DeviceMotionEvent" in window) {
  // this is executed in browsers with the old Device Motion API
  document.getElementById("moApi").innerHTML = "Device Motion API";

  function onDeviceMotion(eventData) {
    // get timestamp
    var date = new Date();
    var timestamp = date.getTime();

    // add to data objects
    accel_data.timestamp.push(timestamp);
    accel_data.x.push(eventData.acceleration.x);
    accel_data.y.push(eventData.acceleration.y);
    accel_data.z.push(eventData.acceleration.z);
    gyro_data.timestamp.push(timestamp);
    gyro_data.x.push(eventData.rotationRate.alpha);
    gyro_data.y.push(eventData.rotationRate.beta);
    gyro_data.z.push(eventData.rotationRate.gamma);

    // display info on detailed information
    accelerationHandler(eventData.acceleration, "moAccel");
    rotationHandler(eventData.rotationRate);
    if (lastReadingTimestamp) {
      intervalHandler(Math.round(timestamp - lastReadingTimestamp));
    }
    lastReadingTimestamp = timestamp;
  }
} else {
  // this is when no sensors are availiable or are locked
  document.getElementById("moApi").innerHTML =
    "No Accelerometer & Gyroscope API available";
}

// init sensors by starting listerners
function init_sensors() {

  if (typeof (DeviceMotionEvent.requestPermission) === "function") {
    // (optional) Do something before API request prompt.
    DeviceMotionEvent.requestPermission()
      .then(response => {
        document.getElementById("moApi").innerHTML =
          "Permissions Granted";
        // (optional) Do something after API prompt dismissed.
        if (response == "granted") {
          window.addEventListener("devicemotion", onDeviceMotion, false)
        }
      })
      .catch(console.error)
  } else if ("Accelerometer" in window && "Gyroscope" in window) {
    accelerometer.addEventListener("reading", accel_listen);
    accelerometer.start();
    gyroscope.addEventListener("reading", gyro_listen);
    gyroscope.start();
  } else if ("DeviceMotionEvent" in window) {
    window.addEventListener("devicemotion", onDeviceMotion, false);
  }
}

// stop sensors by removing listerners
function stop_sensors() {
  if ("Accelerometer" in window && "Gyroscope" in window) {
    accelerometer.removeEventListener("reading", accel_listen);
    accelerometer.stop();
    gyroscope.removeEventListener("reading", gyro_listen);
    gyroscope.stop();
  } else if ("DeviceMotionEvent" in window) {
    window.removeEventListener("devicemotion", onDeviceMotion);
  }
}

function accelerationHandler(acceleration, targetId) {
  var info,
    xyz = "[X, Y, Z]";

  info = xyz.replace("X", acceleration.x && acceleration.x.toFixed(3));
  info = info.replace("Y", acceleration.y && acceleration.y.toFixed(3));
  info = info.replace("Z", acceleration.z && acceleration.z.toFixed(3));
  document.getElementById(targetId).innerHTML = info;
}

function rotationHandler(rotation) {
  var info,
    xyz = "[X, Y, Z]";

  info = xyz.replace("X", rotation.alpha && rotation.alpha.toFixed(3));
  info = info.replace("Y", rotation.beta && rotation.beta.toFixed(3));
  info = info.replace("Z", rotation.gamma && rotation.gamma.toFixed(3));
  document.getElementById("moRotation").innerHTML = info;
}

function intervalHandler(interval) {
  document.getElementById("moInterval").innerHTML = interval;
}
