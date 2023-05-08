# Creating a decorator that takes a function as an argument
def announce(f):
  # Inside create a function called wrapper that does something...
  def wrapper():
    print("About to run a function...")
    f()
    print("Done with the function")
  # ... and return itself
  return wrapper

# "Wraping" the "hello()" function while defining it
@announce
def hello():
  print("Hello,World!")

# Calling function hello()
hello()