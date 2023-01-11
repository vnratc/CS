#include <cs50.h>
#include <stdbool.h>
#include <stdio.h>

bool triangle(float arr[]);
int main(void)
{
    float length[3];
    for (int i = 0; i < 3; i++)
    {
        do
        {
            length[i] = get_float("Length: ");
        }
        while (length[i] <= 0);
    }
    // This is how to use the return of a function "triangle" below, you simply initialize a new variable and assign(=) it a function "triangle"
    bool a = triangle(length);

    if (a == 1)
    {
        printf("Valid\n");
    }
    else
        printf("Invalid\n");
}

bool triangle(float arr[])
{
    // A triangle is valid if a sum of its 2 sides is greater than its 3rd side
    if ((arr[0] + arr[1] > arr[2]) && (arr[1] + arr[2] > arr[0]) && (arr[2] + arr[0] > arr[1]))
    {
        // "1" simply means "True"
        return 1;
    }
    else
    {
        // "0" simply means "False"
        return 0;
    }
}

