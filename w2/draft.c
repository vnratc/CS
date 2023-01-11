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
}