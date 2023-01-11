# n = input("Enter card number: ")
# copy_n = n[:2]
# print(copy_n)

# # 0123456789







# import csv
# from cs50 import get_string

# teams = [] # DICT LIST
# # Read teams into memory from file
# with open("2018m.csv") as csv_file:
#     dict_list = csv.DictReader(csv_file) # DICT LIST
#     for list_element in dict_list: # This loop is ONLY TO CONVERT STRING TO INT. Otherwise I would have just returned from DictReader directly to teams on line 17. In other words, all values(NOT KEYS) in every dict on this list are strings. REALLY? DOESN'T SEEM TO WORK.
#         list_element["rating"] = int(list_element["rating"])
#         teams.append(list_element) # Populating the list above with every element one by one.
#         # print(list_element["team"])
#         # teams = dict_list
#     # print(dict_list)

# counts = {} # Key - team name, Value - how many tournaments the team has won
#     # Simulate N tournaments and keep track of win counts
#     # Populate counts with teams
# for i in teams:
#     counts["team"] = i["team"]
#     counts["wins"]
#     print(counts["team"])

















# teams = []

# with open("2018m.csv", "r") as file:
    # list_of_strings = csv.reader(file)
    # next(list_of_strings)
    # for key in list_of_strings:
    #     rating = key[1]
    #     print(f"{rating} ", end="")
    # print()
        # key["rating"] = int(key["rating"])


    # dict_list = csv.DictReader(file)
    # for key in list_of_dict:
    #     team = key["team"]
    #     rating = key["rating"]
    #     print(team, rating)
    # key["rating"] = int(key["rating"])
    # teams = list_of_dict
    # for string in dict_list: # string is word_between_commas_in_a_selected_with_a_key_column
    #     team = string["team"]
    #     string["rating"] = int(string["rating"])
    #     teams.append(string["team"])
    # print(teams)
    # print()
    # print(teams)


    # print()

















    # for team in reader: # This means "for KEY team in DICT reader, which is actually data from 2018m.csv FILE
        # rating = int(team["rating"])
        # team_name = team["team"]
        # print(f"{team_name}, {rating}")
        # teams.append(team)


        # with open("teams_only.csv", "a") as file1:
        #     writer = csv.writer(file1)
        #     writer.writerow([team, rating])

    #     print(f"{people[name]}, {people[number]}")



# name = get_string("Name: ")
# number = get_string("Number: ")
# # file = open("phonebook.csv", "a")
# with open("phonebook.csv", "a") as file:

#     writer = csv.writer(file)
#     writer.writerow([name, number])

# file.close()



# from cs50 import get_string

# people = {
#     "Carter": "+1-617-495-1000",
#     "David": "+1-949-468-2750"
# }

# name = get_string("Name: ")
# if name in people:
#     number = people[name] # name here acts like a key to people dict
#     print(f"Number: {number}") # This is why on this line number variable acts like a key too and returns a value from the dict people

# import sys

# names = ["Bill", "Charlie", "Fred", "George", "Ginny", "Percy", "Ron"]
# if "Ro" in names:
#     print("Found")
#     sys.exit(0)

# print("Not found")
# sys.exit(1)




# from sys import argv, exit

# if len(argv) != 2:
#     print("Missing or too  many command line arguments!")
#     exit(1)

# print(f"hello, {argv[1]}")
# exit(0)





# from sys import argv

# for arg in argv[:-1]:
#     print(arg)

# # if len(argv) == 2:
# #     print(f"hello, {argv[1]}")
# # else:
# #     print("hello, world")



# from cs50 import get_string

# before = get_string("Before: ")
# # print(f"After: {before.upper()}")


# for c in before: # looping through every c variable in before string
#     print(c.upper(), end="")
# print()



# from cs50 import get_int

# scores = [] # declaring a list without stating the number of its elements
# for i in range(3):
#     score = get_int("Score: :")
#     # scores.append(score)
#     scores += [score] # or we can write it like this, meaning add to scores every [score] with every iteration


# average = sum(scores) / len(scores) # sum gives sum of list (array) elements and len gives the number of element
# print(f"Average: {average}")


# scores = [72, 73, 33]

# average = sum(scores) / len(scores) # sum gives sum of list (array) elements and len gives the number of element
# print(f"Average: {average}")



# for i in range(3):
#     for j in range(3):
#         print ("#", end="")
#     print()


# print("?" * 4)



# for i in range(4):
#     print("?", end="")
# print()



# def main():
#     height = get_height()
#     for i in range(height):
#         print("#")

# def get_height():
#     while True:
#         try:
#             n = int(input("Height: "))
#             if n > 0:
#                 break
#         except ValueError:
#             print("That's not an integer!")
#     return n

# main()


# from cs50 import get_int

# def main():
#     height = get_height()
#     for i in range(height):
#         print("#")

# def get_height():
#     while True:
#         n = get_int("Height: ")
#         if n > 0:
#             break
#     return n

# main()


# from cs50 import get_int

# while True:
#     n = get_int("Height: ")
#     if n > 0:
#         break

# for i in range(n):
#     print("#")


# def main():
#     meow(6)

# def meow(n):
#     for i in range(n):
#         print("meow")

# main()


# def main():
#     for i in range(3):
#         meow()

# def meow():
#     print("meow")

# main()



# s = input("Do you agree? ").lower() # even better

# if s in ["y", "yes"]:
#     print("Agreed.")
# elif s in ["n", "no"]:
#     print("Not agreed.")


# from cs50 import get_string

# s = input("Do you agree? ")

# if s.lower() in ["y", "yes"]: # better
# # if s == "Y" or s == "y": # worse
#     print("Agreed.")
# elif s.lower() in ["n", "no"]:
#     print("Not agreed.")


# from cs50 import get_int

# n = get_int("n: ")

# if n % 2 == 0:
#     print("even")
# else:
#     print ("odd")



# from cs50 import get_int

# points = get_int("How many point did you lose? ")

# if points < 2:
#     print("You lost fewer points than me.")
# elif points > 2:
#     print("You lost more points than me.")
# else:
#     print("You lost the same number of points.")



# from cs50 import get_int
# x = get_int("x: ")
# y = get_int("y: ")

# z = x / y
# print(f"{z:.50f}")




# try:
#     x = int(input("x: "))
# except ValueError:
#     print("That is not an int!")
#     exit()
# try:
#     y = int(input("y: "))
# except ValueError:
#     print("That is not an int!")
#     exit()
# print(x + y) # in this case x and y are ints



# x = input("x: ")
# y = input("y: ")
# print(x + y) # in this case x and y are just strings



# from cs50 import get_int

# x = get_int("x: ")
# y = get_int("y: ")
# print(x + y)



# answer = input("What's your name? ")
# print (f"Hello, {answer}")



# from cs50 import get_string

# answer = get_string("What's your name? ")
# print (f"Hello, {answer}")
