#include <cs50.h>
#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "dictionary.h"
unsigned int hash(const char *s);

int main(void)
{
    const char *s = get_string("Enter word: ");
    hash(s);
}
    // Hashes word to a number
unsigned int hash(const char *s)
{
    // TODO: Improve this hash function
    unsigned int index = 0;
    unsigned int tmp_index = 0;
    for (int i = 0; i < strlen(s); i++)
    {
        if (s[i] == 39)
        {
            tmp_index = 26;
        }
        else
        {
            tmp_index = toupper(s[i]) - 'A'; // loop through every letter?
        }
        index += tmp_index;
    }
    printf("%i\n", index);
    return index;
}