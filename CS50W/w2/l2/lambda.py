people = [
  {"name": "Harry", "house": "Gryffindor"},
  {"name": "Cho", "house": "Ravenclaw"},
  {"name": "Draco", "house": "Slytherin"},
  {"name": "Vladik", "house": "Gryffindor"},
  {"name": "Sasha", "house": "Ravenclaw"}
]

# Instead of creating a separate function and using it inside of sort method...
# def f(person):
#   return person["house"]
# people.sort(key=f)

people.sort(key=lambda person: person["name"])  #... we can just create it right here for single use

print(people)
