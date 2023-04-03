
import paho.mqtt.client as mqtt

broker_address = "test.mosquitto.org"
topic = "datalab/topic"

def on_message(client, userdata, message):
    print(f"Received message: {message.payload.decode('utf-8')}")

client = mqtt.Client()
client.connect(broker_address)
client.subscribe(topic)

client.on_message = on_message
client.loop_forever()
