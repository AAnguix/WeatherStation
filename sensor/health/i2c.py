import board
import busio

# Try to create an I2C device
i2c = busio.I2C(board.SCL, board.SDA)
print("healthy")