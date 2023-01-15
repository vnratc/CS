// Implements a dictionary's functionality
#include <cs50.h>
#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
// Hashes word to a number
unsigned int hash(char *s);
int main(void)
// unsigned int hash(const char *word)
{
    char *s = get_string("Enter word: ");
    printf("%i\n", hash(s));
}

unsigned int hash(char *s)
{
    unsigned int ind = 0;
    unsigned int tmp_index = 0;
    for (int i = 0; i < strlen(s); i++)
    {
        if (s[i] != 39)
        {
        tmp_index = toupper(s[i]) - 'A'; // loop through every letter?
        ind += tmp_index;
        }
    }
    return ind;
}