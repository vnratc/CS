#include <cs50.h>
#include <stdbool.h>
#include <stdio.h>

float triangle(float array[]);

int main(void)
{
    float length[3];
    for (int i = 0; i < 3; i++)
    {
        length[i] = get_float("Length: ");
    }
    printf("%f\n", triangle(length));
}

float triangle(float array[])
{
    float sum = 0;
    for (int i = 0; i < 3; i++)
    {
        sum += array[i];
    }
    return sum;
}

