#include <stdio.h>
#include <cs50.h>
#include <math.h>

int main(void)
{
    unsigned long n = get_long("Enter number: ");
    int r = (n / 1) % 10;
    printf ("%i\n", r);
}

// Loop check sum with modular*10 and digit new name from d16 to d1
void print_digits(void)
{
    long m = 1;
        for(int i = 0; i < 16; i++)
        {
            int d = (n / m) % 10;
            m = m * 10;
            printf("%i ", d);
        }
    printf("\n");
}

// credit.c
#include <stdio.h>
#include <cs50.h>
#include <math.h>
#include <stdlib.h>

long get_number(void);
void checksum_first_dig(void);
long n;

int main(void)
{
    // Prompt the user for a credit card number
    get_number();

    // Validate the checksum and first digits
    checksum_first_dig();
}
long get_number(void)
{
    do
    {
        n = get_long("Enter the card number: ");
    }
    while (n < 1 || n > 9999999999999999);
    return n;
}

void checksum_first_dig(void)
{
    // Extraction of digits separately and multiplying odd ones by 2, then extracting digits if result is between 9 and 19 //
    int n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12, n13, n14, n15, n16;
    n1 = ((n % 10000000000000000) / 1000000000000000) * 2;
    if (n1 > 9 && n1 < 19)
    {
        n1 = (n1 % 100) / 10 + (n1 % 10);
    }

    n2 = (n % 1000000000000000) / 100000000000000;

    n3 = ((n % 100000000000000) / 10000000000000) * 2;
    if (n3 > 9 && n3 < 19)
    {
        n3 = (n3 % 100) / 10 + (n3 % 10);
    }

    n4 = (n % 10000000000000) / 1000000000000;

    n5 = ((n % 1000000000000) / 100000000000) * 2;
    if (n5 > 9 && n5 < 19)
    {
        n5 = (n5 % 100) / 10 + (n5 % 10);
    }

    n6 = (n % 100000000000) / 10000000000;

    n7 = ((n % 10000000000) / 1000000000) * 2;
    if (n7 > 9 && n7 < 19)
    {
        n7 = (n7 % 100) / 10 + (n7 % 10);
    }

    n8 = (n % 1000000000) / 100000000;

    n9 = ((n % 100000000) / 10000000) * 2;
    if (n9 > 9 && n9 < 19)
    {
        n9 = (n9 % 100) / 10 + (n9 % 10);
    }

    n10 = (n % 10000000) / 1000000;

    n11 = ((n % 1000000) / 100000) * 2;
    if (n11 > 9 && n11 < 19)
    {
        n11 = (n11 % 100) / 10 + (n11 % 10);
    }

    n12 = (n % 100000) / 10000;

    n13 = (n % 10000) / 1000 * 2;
    if (n13 > 9 && n13 < 19)
    {
        n13 = (n13 % 100) / 10 + (n13 % 10);
    }

    n14 = (n % 1000) / 100;

    n15 = ((n % 100) / 10) * 2;
    if (n15 > 9 && n15 < 19)
    {
        n15 = (n15 % 100) / 10 + (n15 % 10);
    }

    n16 = n % 10;

    // Validate the checksum
    int sum1 = n1 + n3 + n5 + n7 + n9 + n11 + n13 + n15, sum2 = n2 + n4 + n6 + n8 + n10 + n12 + n14 + n16, sum3 = sum1 + sum2;
    if (sum3 % 10 != 0)
    {
        printf("INVALID\n");
        exit(0);
    }
    // Check first digits and print the card type
    else if (n / 10000000000000 == 34 || n / 10000000000000 == 37)
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

// creditl.c
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