import sys

try:
  x = int(input("Enter number x: "))
  y = int(input("Enter number y: "))
except ValueError:
  print("Error: Invalid input")
  sys.exit(1)

try:  # Try doing below...
  result = x / y
except ZeroDivisionError: #...except encounter this error
  print("Error: Cannot devide by 0.") # Print a custom comprehensible message
  sys.exit(1) # Abort the program

print(f"{x} / {y} = {result}")