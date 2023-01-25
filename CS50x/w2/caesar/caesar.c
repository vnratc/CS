#include <cs50.h>
#include <ctype.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

bool only_digits(string s);
char rotate(char c, int k);

int main(int argc, string argv[])
{

    // If zero or more than one c_l arg print Error and return 1.
    // If any char in c_l != digit(this also excludes negative numbers since "-" is not a digit, i.e. 45 in ASCII), print "Usage: ./caesar key" and return 1.
    if (argc != 2 || only_digits(argv[1]) == 0)
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }
    else if (only_digits(argv[1]) == 1)
    {
        // Convert str to int.
        int k = atoi(argv[1]);
        // Prompt for string of plaintext.
        string text = get_string("plaintext:  ");

        // Print "ciphertext: " with letters rotated by k and other chars left unchanged
        printf("ciphertext: ");
        // Print chars of a text one by one using loop
        for (int i = 0; i < strlen(text); i++)
        {
            printf("%c", rotate(text[i], k));
        }

        // print new line, exit by returning 0
        printf("\n");
        return 0;
    }





}

bool only_digits(string s)
{
    int d = 0, c = 0;
    for (int i = 0; i < strlen(s); i++)
    {
        if (isdigit(s[i]))
        {
            d++;
        }
        else
        {
            c++;
        }
    }
    if (c > 0)
    {
        return 0;
    }
    else
    {
        return 1;
    }
}

// Make sure program takes inputs of k > 26, i.e. wraps around the alphabet.
// Capitalized letters must remain capitalized, lowercase must remain lowercase.
// Function "rotate" takes arguments of text chars and key and converts every char using that key.
char rotate(char c, int k)
{
    if (isupper(c))
    {
        // Convert from ASCII to alphabetical index. First we need to assign to whatever Uppercase char an index from 0 to 25 according to its position in the Alphabet. F(70)-65=5
        // Shift by key. Next we add the key (5) and modulo by 26 to get the remainder. 5+5= 10 % 26 = 10
        // Convert back to ASCII. Now adding 65 back to c: 10 + 65 = 75(K)
        c = (c - 65 + k) % 26 + 65;
    }
    else if (islower(c))
    {
        c = (c - 97 + k) % 26 + 97;
    }
    return c;
}