#include <stdio.h>
#include <cs50.h>
#include <stdlib.h>

long get_number(void);
void validate_sum(void);
void card_type_first_digits(void);
// n is the card number
long n;

int main(void)
{
    // Prompt the user for a credit card number
    get_number();

    // Validate checksum
    validate_sum();

    // Check first digits and print the card type
    card_type_first_digits();
}
// Prompt the user for a credit card number
long get_number(void)
{
    do
    {
        n = get_long("Please enter the card number:\n");
    }
    while (n < 1 || n > 9999999999999999);
    return n;
}
// Validate checksum
void validate_sum(void)
{
    // d is the separate digit, sum1 is the sum of odd positions, sum2 is for even
    int d, sum1 = 0, sum2 = 0;
    // Starting with 15 zeroes to separate the first digit in "n"
    long m = 1000000000000000;
    for (int i = 1; i < 17; i++)
    {
        // Variable d is a separate digit in the card number
        d = (n / m) % 10;
        // Decreasing the devider by 10 to separate the next digit
        m = m / 10;
        // For digits in odd positions in the number
        if (i % 2 != 0)
        {
            // Multiply by 2 according to the Luh logic
            d = d * 2;
            // Seaparating digits of a 9<d<19 number and adding them together, e.g. 16=1+6=7
            if (d > 9 && d < 19)
            {
                // "%" operator separates digits from the right side, "/" operator does the same from the left side of "d"
                d = (d % 100) / 10 + (d % 10);
            }
            // Adding all the "d"s in odd positions
            sum1 = sum1 + d;
        }
        // For digit in even positions in the number
        else if (i % 2 == 0)
        {
            // Adding all the "d"s in even postitions
            sum2 = sum2 + d;
        }
    }
    // Calculating and validationg the checksum
    int sum3 = sum1 + sum2;
    if (sum3 % 10 != 0)
    {
        printf("INVALID\n");
        exit(0);
    }
}
// Check first digits and print the card type
void card_type_first_digits(void)
{
    if (n / 10000000000000 == 34 || n / 10000000000000 == 37)
    {
        printf("AMEX\n");
    }
    else if (n / 100000000000000 == 51 || n / 100000000000000 == 52 || n / 100000000000000 == 53 || n / 100000000000000 == 54
             ||  n / 100000000000000 == 55)
    {
        printf("MASTERCARD\n");
    }
    else if (n / 1000000000000000 == 4 || n / 1000000000000 == 4)
    {
        printf("VISA\n");
    }
    else
    {
        printf("INVALID\n");
    }
}