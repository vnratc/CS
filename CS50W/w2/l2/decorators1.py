# This is a "decorator" function
def announce(f):
    def wrapper():
        print("About to run a function.")
        f()
        print("Done with the function.")
    return wrapper

# @ "at" symbol sounds like "add", which means "add the decorator calle "announce"."
@announce
def hello():
    print("Hello, world!")

hello()