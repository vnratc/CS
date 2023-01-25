#include<cs50.h>
#include<stdio.h>
#include<string.h>

int main(void)
{
    string o = get_string("Enter message: ");
    int x = get_int("Enter key: ");
    for (int i = 0; i < strlen(o); i++)
    {
        printf("%c", (o[i] + x));
    }
    printf("\n");
}