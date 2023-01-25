import re
while True:
    n = input("Enter card number: ")
    # Make sure only digits are accepted
    only_digits = re.findall("^[0-9]+$", n)
    # if only_digits is True, break out of the loop
    if only_digits:
        break
    else:
        print("INVALID")
        exit()
s1 = 0  # Sum of every onther digits starting from 2nd to last multiplied by 2, but only those, which  multiplication result is less than 10. If it is, that number is sliced into two numbers and those are added together and ultimately added to s1.
s2 = 0  # Sum of every other digits from the last one
# string[start:stop:step]
r2 = n[-2::-2]  # List of every other numbers from 2nd to last. start -2:default stop:step -2.
r1 = n[-1::-2]  # List of every other numbers from 1nd to last. start -1:default stop:step -2
# Loop through numbers and do the math
for i in range(len(r2)):  # Here r2 is a string
    d = (int(r2[i]) * 2)  # Here d is int
    if d > 9 and d < 19:  # If d is made of 2 digits...
        d = str(d)  # ... We need to convert it back to str
        # To be able to access individual digits, but for the end result we convert them to int again.
        d = int(d[0]) + int(d[1])
    s1 += d
for j in range(len(r1)):
    s2 += int(r1[j])
s3 = s1 + s2
l = len(n)
d = int(n[:1])
dd = int(n[:2])
if s3 % 10 != 0:
    print("INVALID")
    exit()
else:
    if (l == 15) and (dd == 34 or dd == 37):
        print("AMEX")
    elif (l == 16) and (dd >= 51 and dd <= 55):
        print("MASTERCARD")
    elif (l == 13 or l == 16) and (d == 4):
        print("VISA")
    else:
        print("INVALID")
