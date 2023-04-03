
## Setup local dev environment

You will need Docker and Docker-Compose (check the online install instructions). Then execute
to build and boot up all the services:

```bash
docker-compose up
```

Which will setup the following services:
    - Eclipe Mosquito MQTT Broker: running in port 1883 when running locally.
    - Node Red: for playing with the MQTT broker you can access it at http://localhost:1880
    - NGINX server: serving the static webapp to record data at http://localhost

Once the building and booting finished you can access node-red at http://localhost:1880
or the webapp http://localhost.
