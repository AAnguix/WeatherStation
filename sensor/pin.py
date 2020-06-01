import board
import digitalio
import busio
 
print("Hello blinka!")
 
# Try to great a Digital input
pin = digitalio.DigitalInOut(board.D4)
print("Digital IO ok!")