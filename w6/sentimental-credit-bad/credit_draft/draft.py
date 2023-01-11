import re
n = input("Enter card number: ")
copy_n = n[:2]
print(copy_n)

# 0123456789


# re.findall checks the string for only digits 0-9 and length 13 to 16 digits
# # Condition reads as "if false"
# while True:
#     only_digits = re.findall("^[0-9]{13,16}+$", number)
#     if number == only_digits:
#         break
#     # print("INVALID\n")`
#     # exit()


# def validate_sum():
#     # d is the separate digit, sum1 is the sum of odd positions, sum2 is for even
#     d = 0
#     sum1 = 0
#     sum2 = 0
#     # Starting with 15 zeroes to separate the first digit in "n"
#     m = 1000000000000000
#     # for (int i = 1; i < 17; i++)
#     for i in range(1, 17, 1):
#         # Variable d is a separate digit in the card number
#         d = (number // m) % 10
#         # Decreasing the devider by 10 to separate the next digit
#         m = m / 10
#         # For digits in odd positions in the number
#         if (i % 2 != 0):
#             # Multiply by 2 according to the Luh logic
#             d = d * 2
#             # Seaparating digits of a 9<d<19 number and adding them together, e.g. 16=1+6=7
#             if d > 9 and d < 19:
#                 # "%" operator separates digits from the right side, "/" operator does the same from the left side of "d"
#                 d = (d % 100) // 10 + (d % 10)
#             #  Adding all the "d"s in odd positions
#             sum1 = sum1 + d
#         # For digit in even positions in the number
#         elif i % 2 == 0:
#             # Adding all the "d"s in even postitions
#             sum2 = sum2 + d
#     # Calculating and validationg the checksum
#     sum3 = sum1 + sum2
#     # print (sum3)
#     if sum3 % 10 != 0:
#         print("INVALID")
#         exit()


# a = int(number[0])
# b = int(number[1])
# l = len(number)
# if l == 15 and a == 3 and (b == 4 or 7):
#     print("AMEX")
# elif l == 16 and a == 5 and (b >= 1 and b <= 5):
#     print("MASTERCARD")
# elif (l == 13 or l == 16) and a == 4:
#     print("VISA")
# else:
#     print("INVALID")


# 378282246310005 AMEX.
# 371449635398431 AMEX.
# 5555555555554444 MASTERCARD.
# 5105105105105100 MASTERCARD.
# 4111111111111111 VISA.
# 4012888888881881 VISA.
# 1234567890 INVALID
