import re
number = int(input("Enter card number: "))


def main():
    get_number()
    validate_sum()
    card_type()


def get_number():
    while True:
        if number > 1 or number < 9999999999999999:
            break


def validate_sum():
    # d is the separate digit, sum1 is the sum of odd positions, sum2 is for even
    d = 0
    sum1 = 0
    sum2 = 0
    # Starting with 15 zeroes to separate the first digit in "n"
    m = 1000000000000000
    # for (int i = 1; i < 17; i++)
    for i in range(1, 17, 1):
        # Variable d is a separate digit in the card number
        d = (number // m) % 10
        # Decreasing the devider by 10 to separate the next digit
        m = m / 10
        # For digits in odd positions in the number
        if (i % 2 != 0):
            # Multiply by 2 according to the Luh logic
            d = d * 2
            # Seaparating digits of a 9<d<19 number and adding them together, e.g. 16=1+6=7
            if d > 9 and d < 19:
                # "%" operator separates digits from the right side, "/" operator does the same from the left side of "d"
                d = (d % 100) // 10 + (d % 10)
            #  Adding all the "d"s in odd positions
            sum1 = sum1 + d
        # For digit in even positions in the number
        elif i % 2 == 0:
            # Adding all the "d"s in even postitions
            sum2 = sum2 + d
    # Calculating and validationg the checksum
    sum3 = sum1 + sum2
    # print (sum3)
    if sum3 % 10 != 0:
        print("INVALID")
        exit()


def card_type():
    if (number // 10000000000000 == 34 or number // 10000000000000 == 37):
        print("AMEX")
    elif (number // 100000000000000 == 51 or number // 100000000000000 == 52 or number // 100000000000000 == 53 or number // 100000000000000 == 54 or number // 100000000000000 == 55):
        print("MASTERCARD")
    elif (number // 1000000000000000 == 4 or number // 1000000000000 == 4):
        print("VISA")
    else:
        print("INVALID")


main()