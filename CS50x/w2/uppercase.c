#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>


int main(void)
{
    string s = get_string("Before: ");

    printf("After:  ");
    for (int i = 0; i < strlen(s); i++)
    {
        if (s[i] > 96 && s[i] < 123)
        {
            printf("%c", s[i] - 32);
        }
        // If we ommit this "else" then only lowercase chars will be converted
        // And first capital letter will be lost,
        // Input "Vlad" becomes "LAD"
        else
        {
            printf("%c", s[i]);
        }
    }
        printf("\n");










    // string s = get_string("Before: ");
    // printf("After:  ");
    // for (int i = 0; i < strlen(s); i++)
    // {
    //      printf("%c", toupper(s[i]));
    // }
    // printf("\n");
}
