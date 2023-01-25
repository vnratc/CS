#include<cs50.h>
#include<stdio.h>
#include<stdlib.h>

int main(void)
{
    int x = get_int("Enter number: ");
    float stack_array[x];
    float* heap_array = malloc(x * sizeof(float)); // We are daclaring ONLY a pointer here! The array of variables was declared in the previous line. While declaring a pointer we allocate a certain amount of memory for the values of the array, to which this pointer will be pointing.
    printf("%i\n", x);

    char* word = malloc(50 * sizeof(char));
    free(word):
}