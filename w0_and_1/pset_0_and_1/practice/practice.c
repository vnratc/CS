#include <cs50.h>
#include <stdio.h>

int main(void)
{
    int n = get_int("Enter age ");
    printf("Your age is %i \n",n);
}

int    int n;
    do
    {
        n = get_int("Enter height from 1 to 8: ");
    }
    while (n < 1 || n > 8);

// Repeat print n lines //
    for (int i = 0; i < n; i++)
    {
        // Repeat print n-1 amount of spaces for every line (every iteration of a parent loop)//
        for (int k = n - 1; k > i; k--)
        {
          printf("  printf(" ");
        }

        // Repeat print # for every line (every iteration of a parent loop) //
        for (int j = 0; j <= i; j++)
        {
            printf("#");
        }
        printf("\n");
    }
}







void result(void)
{
    if ((n > 339999999999999 && n < 350000000000000) || (n > 369999999999999 && n < 380000000000000))
    {
        printf("AMEX\n");
    }
    else if (n > 5099999999999999 && n < 5600000000000000)
    {
        printf("MASTERCARD\n");
    }
    else if (n > 3999999999999999 && n < 5000000000000000)
    {
        printf("VISA\n");
    }
    else
    {
        printf("INVALID\n");
    }
}