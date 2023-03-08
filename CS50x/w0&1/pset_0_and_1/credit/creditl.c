#include <stdio.h>
#include <cs50.h>
#include <stdlib.h>

long get_number(void);
void validate(void);
long n;

int main(void)
{
    // Prompt the user for a credit card number
    get_number();

    // Calculate the checksum
    validate();

    // Check for card length and starting digits

}

long get_number(void)
{
    do
    {
        n = get_long("Please enter the card number:\n");
    }
    while (n < 1 || n > 9999999999999999);
    return n;
}
void validate(void)
{
    int d, sum1 = 0, sum2 = 0;
    long m = 1000000000000000;
    for(int i = 1; i < 17; i++)
    {
        d = (n / m) % 10;
        m = m / 10;
        if (i % 2 != 0)
        {
            d = d * 2;
            if (d > 9 && d < 19)
            {
                d = (d % 100) / 10 + (d % 10);
            }
            sum1 = sum1 + d;
        }
        else if (i % 2 == 0)
        {
            sum2 = sum2 + d;
        }
        printf("%i", d);
    }
    int sum3 = sum1 + sum2;
    printf("\n%i %i %i\n", sum1, sum2, sum3);
    if (sum3 % 10 != 0)
    {
        printf("INVALID\n");
        exit(0);
    }
    // Check first digits and print the card type
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

// 2223016768739313