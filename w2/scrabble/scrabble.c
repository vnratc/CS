#include <ctype.h>
#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Points assigned to each letter of the alphabet
int POINTS[] = {1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};
// Declaring the function of score calculation
int compute_score(string word);

int main(void)
{
    // Get input words from both players
    string word1 = get_string("Player 1: ");
    string word2 = get_string("Player 2: ");

    // Score both words
    int score1 = compute_score(word1);
    int score2 = compute_score(word2);

    // Print the winner
    if (score1 > score2)
    {
        printf(" %i > %i. Player 1 wins!\n", score1, score2);
    }
    else if (score2 > score1)
    {
        printf(" %i > %i. Player 2 wins!\n", score2, score1);
    }
    else
    {
        printf("Tie\n");
    }
}

int compute_score(string word)
{
    // TODO: Compute and return score for string

    // Keep track of the score
    int score = 0;

    // Compute score for each character
    // First learn the word's length, it determines the highest index in this array(string)
    int length = strlen(word);
    // Use loop to calculate every word's character
    // Loop assigns index "i" to every char
    for (int i = 0; i < length; i++)
    {
        // If character is Uppercase, then detract A from certain character word[i]
        // word[i] is actually an index for every char in a string
        // word[i] is simply a certain caracter from variable "word"
        // variable "word" is filled with value of "word1" from main by calling the "compute_score" function with variable "word1"
        if (isupper(word[i]))
        {
            // Array[character - A(65)], if word[i] is A, then POINTS[0], index is 0, thus the first position in array, so score = 1
            score += POINTS[word[i] - 65]; // char "A"
        }
        // If lowercase, detract a(97) from whatever char is in word[i]
        else if (islower(word[i]))
        {
            score += POINTS[word[i] - 97]; // char "a"  
        }
    }
    return score;
}
