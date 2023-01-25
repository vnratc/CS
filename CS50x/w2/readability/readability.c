#include <cs50.h>
#include <ctype.h>
#include <math.h>
#include <stdio.h>
#include <string.h>

int count_letters(string s);
int count_words(string s);
int count_sentences(string s);

int main(void)
{
    // Prompt the user for a string
    string s = get_string("\nText:\n\n");

    // Count and print the number of letters (A-Z,a-z),
    // printf("\nLetters: %i\n", count_letters(s));

    // Count and print the number of words(word"space"word)
    // printf("Words: %i\n", count_words(s));

    // Count the number of sentences(word'.' or '!' or '?')
    // printf("Sentences: %i\n", count_sentences(s));

    // Print "Grade X" = 0.0588 * L - 0.296 * S - 15.8 (Coleman-Liau firmula)
    // Typecasting "double" on at least one variable to make the result a "float" as well
    double L = (double) count_letters(s) / (double) count_words(s) * 100.00;
    double S = (double) count_sentences(s) / (double) count_words(s) * 100.00;

    double X = 0.0588 * L - 0.296 * S - 15.8;
    X = round(X);

    // Print "Before Grade 1" if X < 1
    if (X < 1)
    {
        printf("Before Grade 1\n");
    }
    // Print "Grade 16+" if X >= 16
    else if (X >= 16)
    {
        printf("Grade 16+\n");
    }
    // Typecasting "int" for the X to print just an integer without floating numbers
    else
    {
        printf("Grade %i\n", (int) X);
    }
}

int count_letters(string s)
{
    // Scanning string for letters using loop
    int n = 0;
    for (int i = 0; i < strlen(s); i++)
    {
        // Alt version A65,Z90, a97,z122
        // if ((s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= 'a' && s[i] <= 'z'))

        if (islower(s[i]) || isupper(s[i]))
        {
            n++;
        }
    }
    return n;
}

int count_words(string s)
{
    int n = 0;
    // If there is at least 1 letter in string index "0", then add 1 word
    if (islower(s[0]) || isupper(s[0]))
    {
        n++;
    }
    // Scanning string for whitespaces using loop
    for (int i = 0; i < strlen(s); i++)
    {
        // Alt version if (s[i] == 32)
        // Redundant code: && (islower(s[i + 1]) || isupper(s[i + 1]))) I wanted to count only whitespaces that are near other letters. No need.
        if (isspace(s[i]))
        {
            n++;
        }
    }
    return n;
}

int count_sentences(string s)
{
    int n = 0;
    // In brackets it is a char index in this string (sequence number), although expressed as a formula. If 2nd to last char is "(double quotes) then check 3rd to last char for punctuation.
    int l = strlen(s);
    if ((s[l - 1] == 34) && ((s[l - 2] == 33) || (s[l - 2] == 46) || (s[l - 2] == 63)))
    {
        n++;
    }
    // Can't use the very last, because it is "0", i.e. \0 signifying the end of the string. If 2nd to last char in the string is "!" or "." or "?"  then add 1 sentence
    else if ((s[l - 1] == 33) || (s[l - 1] == 46) || (s[l - 1] == 63))
    {
        n++;
    }
    // debug printf("%c\n", s[strlen(s) - 1]);

    // Scan using loop for "!", "." and "?" and make sure there is a whitespace after those punctuation marks
    for (int i = 0; i < l; i++)
    {
        if (((s[i] == 33) || (s[i] == 46) || (s[i] == 63)) && isspace(s[i + 1]))
        {
            n++;
        }
    }
    return n;

}