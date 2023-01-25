#include <cs50.h>
#include <ctype.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

bool only_characters(string s);
bool letter_once(string s);
char substitute(char c, string s);

int main(int argc, string argv[])
{
    // If no or more than 1 command-line arguments.
    if (argc != 2)
    {
        printf("Usage: ./substitution KEY\n");
        return 1;
    }
    // KEY validation: if not a alphabetical char, if length is not 26, if contains repeated chars.
    else if (strlen(argv[1]) != 26)
    {
        printf("Key must contain 26 characters.\n");
        return 1;
    }
    else if (only_characters(argv[1]) == 0)
    {
        printf("Key must only contain alphabetic characters.\n");
        return 1;
    }
    else if (letter_once(argv[1]) == 0)
    {
        printf("Key must not contain repeated characters.\n");
        return 1;
    }
    else
    {
        string s = argv[1];
        string text = get_string("plaintext:  ");
        printf("ciphertext: ");
        // Print chars of a text one by one using loop, with letters substituted by the key and other chars left unchanged
        for (int i = 0; i < strlen(text); i++)
        {
            printf("%c", substitute(text[i], s));
        }
        // print new line, exit by returning 0
        printf("\n");
        return 0;
    }
}
// Makes sure every char is a letter
bool only_characters(string s)
{
    // Counting digits d, characters c
    int d = 0, c = 0;
    for (int i = 0; i < strlen(s); i++)
    {
        // If char is character, add 1 to c
        if (isalpha(s[i]))
        {
            c++;
        }
        // Add 1 to d
        else
        {
            d++;
        }
    }
    if (d > 0)
    {
        return 0;
    }
    else
    {
        return 1;
    }
}
// Makes sure every letter occurs only once
bool letter_once(string s)
{
    int c = 0;
    // One loop to compare every char in the key...
    for (int i = 0; i < strlen(s); i++)
    {
        // ...with every other char in the same key, for which we need another loop.
        for (int j = 0; j < strlen(s); j++)
        {
            // This formula will count all the occurances of a given char.
            if (s[i] == s[j])
            {
                c++;
            }
        }
        if (c > 1)
        {
            return 0;
        }
        c = 0;
    }
    // If it's encountered more than once, "c" will exceed 26.
    return 1;
}
// Function to apply key to the plaintext
char substitute(char c, string s)
{
    if (isupper(c))
    {
        // By subtracting 65(97) from letter we learn its index from 0 to 25 and thus define what index from key should be applied to the char
        c = c - 65;
        c = toupper(s[(int) c]);
    }
    else if (islower(c))
    {
        c = c - 97;
        c = tolower(s[(int) c]);
    }
    return c;
}