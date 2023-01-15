#include<stdio.h>
#include<cs50.h>

double mult_two_floats(float a, float b);

int main(void)
{
    float a = get_float("a :");
    float b = get_float("b :");
    printf("%g\n", mult_two_floats(a, b));
}

double mult_two_floats(float a, float b)
{
    return a / b;
}