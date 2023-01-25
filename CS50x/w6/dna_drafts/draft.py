list = ["Vlad", "Maria"]
tuple = ("Vlad", "Maria", "Vlad Jr")
set = {"one", "two", "three", "four"}
# dict = {
#     "name": "Vlad",
#     "age": "37"
# }
vlad = dict(name = "Vlad", age = 37, country = "Armenia")

csv.DictReader


# # Nested dictionaries
# myfamily = {
#     "spouse" : {
#         "name" : "Maria",
#         "dob" : 1981
#     },
#     "child0" : {
#         "name" : "Vlad Jr",
#         "dob" : 2016
#     },
#     "child1" : {
#     "name" : "Sasha",
#     "dob" : 2020
#     }
# }
# # Access nested dictionary. DON'T FORGET "" double quotes!!!
# print(myfamily["child0"])


# copy = dict(vlad)

# copy = vlad.copy()
# print(copy)


# for x in vlad.keys():
#     print(x)

# for x in vlad.values():
#     print(x)

# for x, y in vlad.items():
#     print(f"{x}:{y}")


# for x in vlad:
#     print(f"{x} - {vlad[x]}")

# vlad["age"] = 40
# # print(dict["age"])
# print(vlad["age"],vlad["country"])


# x = vlad.get("name")
# print(x)


# l = vlad.keys()
# print(l)


# vlad["hobby"] = "music"  # Add a new key-value
# print(vlad["hobby"])


# if "age" in vlad:
#     print(vlad["age"])


# vlad.update({"age": 45})  # Add a new key-value even if this key doesn't exist
# print(vlad["age"])


# # vlad.pop("age")
# vlad["new_key"] = 0
# print(vlad)
