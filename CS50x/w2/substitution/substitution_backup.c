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
    // Looping through the key
    for (int i = 0; i < strlen(s); i++)
    {
        // If isalpha returns 0, then the char is not alphabetical
        if (isalpha(s[i]) == 0)
        {
            return 0;
        }
    }
    // If the function doesn't return 0, then it should return 1
    return 1;
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
            // This formula will count all the occurances of a given char. It takes into account repeated letters of different case, i.e. it there are v and V in the key, it is invalid.
            if (s[i] == toupper(s[j]) || s[i] == tolower(s[j]))
            {
                c++;
            }
        }
        // If it's encountered more than once the function will return 0 which would mean "false" for the satement "every letter occurs only once"
        if (c > 1)
        {
            return 0;
        }
        // After we count all dublicates in a given index of an array, we return c back to 0 to start counting again in the next index
        c = 0;
    }
    // If we did not encounter more than 1 occurance of the same letters, then there are no repeated letters in the key, thus we return true
    return 1;
}
// Function to apply key to the plaintext
char substitute(char c, string s)
{
    if (isupper(c))
    {
        // By subtracting 65(97) from letter we learn its index from 0 to 25 and thus define what index (which letter) from the key should be applied to the char
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