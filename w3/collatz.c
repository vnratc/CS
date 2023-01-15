#include<stdio.h>
#include<cs50.h>

int collatz(int n);

int main(void)
{
    int n = get_int("Enter number: ");
    printf("%i\n", collatz(n));
}
int s = 0;
int collatz(int n)
{
    if (n == 1)
        return s;
    else if (n % 2 == 0)
    {
        s++;
        return collatz(n / 2);
    }
    else
    {
        s++;
        return collatz(3 * n + 1);
    }
}