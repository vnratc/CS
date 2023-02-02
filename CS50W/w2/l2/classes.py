# Function __init__ that creates a template for a new data type called Point by storing 2 inputs inside of the object (property called x and y).
class Point():
  def __init__(self, input1, input2):
    self.x = input1
    self.y = input2
# Creating a point
p = Point(2, 8)
# print(p.x)
# print(p.y)

class Flight():
  def __init__(self, capacity):
    self.capacity = capacity
    self.passengers = []

  def add_passenger(self, name):
    if not self.open_seats(): # Equal to saying: if self.open_seats() == 0:
      return False
    self.passengers.append(name)
    return True

  def open_seats(self):
    return self.capacity - len(self.passengers)

flight = Flight(3)

people = ["Harry", "Ron", "Hermione", "Ginny"]
for person in people:
  if flight.add_passenger(person): # Equal to saying: if flight.add_passenger(person) != 0:
    print(f"Added {person} to flight successfully.")
  else:
    print(f"No available seats for {person}")