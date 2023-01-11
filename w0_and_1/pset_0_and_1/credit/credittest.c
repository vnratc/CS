#include <stdio.h>
#include <cs50.h>
#include <stdlib.h>

long get_number(void);
void validate_sum(void);
void card_type_first_digits(void);
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
    int d, sum1 = 0, sum2 = 0;
    // Starting with 15 zeroes to separate the very first digit from the number
    long m = 1000000000000000;
    for(int i = 1; i < 17; i++)
    {
        // Variable d is separate digit in a number
        d = (n / m) % 10;
        // Decreasing the devider by 10
        m = m / 10;
        // For digits in odd positions in the number
        if (i % 2 != 0)
        {
            d = d * 2;
            // Seaparating digits of a greater than 9 value and adding those digits together
            if (d > 9 && d < 19)
            {
                d = (d % 100) / 10 + (d % 10);
            }
            // Adding all the "d"s
            sum1 = sum1 + d;
        }
        // For digit in even positions in the number
        else if (i % 2 == 0)
        {
            // Adding all the "d"s
            sum2 = sum2 + d;
        }
    }
    // Calculating and validating the checksum
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