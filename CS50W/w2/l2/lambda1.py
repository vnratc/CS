import sys

people = [
  {"name": "Harry", "house": "Gryffindor"},
  {"name": "Cho", "house": "Ravenclaw"},
  {"name": "Draco", "house": "Slytherin"},
  {"name": "Hermione", "house": "Gryffindor"},
  {"name": "Ron", "house": "Gryffindor"}
]

sort = input("How to sort, by name or by house? ")
for i in range(len(people)):
  # print(people[i])
  # print(type(people[i].keys()))
  # print(people[i].keys())
  # print(type(people[i].values()))
  # print(people[i].values())
  if not sort in people[i]:
    print("Invalid sort type")
    sys.exit(1)

for k in people:
  print(k.items())

# def f(person):    # function input
#     return person[sort]   # function output

# lambda is like function() in JavaScript, anonymous function
people.sort(key=lambda person: person[sort])  # "person" is the argument, the function begins after the colon, "return" is ommitted
                       #input  #output
for i in people:
  print(i[sort])
