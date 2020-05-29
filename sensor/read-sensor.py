import board
import adafruit_dht

dhtDevice = adafruit_dht.DHT22(board.D18)

temperature_c = dhtDevice.temperature
temperature_f = temperature_c * (9 / 5) + 32
humidity = dhtDevice.humidity

print(temperature_c + '|' + humidity)