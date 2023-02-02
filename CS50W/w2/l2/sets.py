# Create an empty set
s = set()

# Add elements to set
s.add(1)
s.add(2)
s.add(3)
s.add(4)
s.add(3)
print(s)


# print("Before s.remove the set has " + str(len(s)) + " elements")
print(f"Before s.remove the set has {len(s)} elements")

s.remove(2)
print(s)

# print("After s.remove the set has " + str(len(s)) + " elements")
print(f"After s.remove the set has {len(s)} elements")