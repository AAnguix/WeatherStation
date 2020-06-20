import board
import adafruit_dht

dhtDevice = adafruit_dht.DHT22(board.D4)

temperature_c = dhtDevice.temperature
humidity = dhtDevice.humidity

print(temperature_c)
print(humidity)