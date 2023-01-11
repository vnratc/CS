// Mario's pyramid //
#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // Ask height until answer is within 1 to 8 inclusive //
    int n;
    do
    {
        n = get_int("Enter height from 1 to 8: ");
    }
    while (n < 1 || n > 8);

    // Repeat print n lines //
    for (int i = 0; i < n; i++)
    {
        // Repeat print n-1 amount of spaces for every line (every iteration of a parent loop) //
        for (int k = n - 1; k > i; k--)
        {
            printf(" ");
        }

        // Repeat print # for every line (every iteration of a parent loop) //
        for (int j = 0; j <= i; j++)
        {
            printf("#");
        }
        printf("\n");
    }
}