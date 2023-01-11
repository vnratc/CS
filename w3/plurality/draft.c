#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// Candidates have name and vote count
typedef struct
{
    string name;
    int votes;
}
candidate;

// Array of candidates
candidate candidates[MAX];

// Number of candidates
int candidate_count;

// Function prototypes
bool vote(string name);
void print_winner(void);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: plurality [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates
    candidate_count = argc - 1;
    if (candidate_count > MAX)
    {
        printf("Maximum number of candidates is %i\n", MAX);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i].name = argv[i + 1]; // Assigning names from argv to the names in the struct
        candidates[i].votes = 0; // Setting all votes to initial value of "0"
    }

    int voter_count = get_int("Number of voters: ");

    // Loop over all voters
    for (int i = 0; i < voter_count; i++)
    {
        string name = get_string("Vote: ");

        // Check for invalid vote. "if (!vote(name))" means "if (vote(name) == 0)" i.e. if no matches found as per function "vote" below.
        if (!vote(name))
        {
            printf("Invalid vote.\n");
        }
    }

    // Display winner of election
    print_winner();
}

// Update vote totals given a new vote
bool vote(string name)
{
    // Running a loop on to compare votes entered by user with names stored in "candidates[i].name" string of our "candidates" struct. Adding 1 to "candidates[i].votes" if names match.
    for (int i = 0; i < candidate_count; i++)
    {
        if (strcmp(name, candidates[i].name) == 0)
        {
            candidates[i].votes ++;
            // Stopping loop if match found and returning true
            return 1;
        }
    }
    // If no matches return false
    return 0;
}

// Print the winner (or winners) of the election
void print_winner(void)
{
    // Find biggest number in the array "candidates". First we initiate the biggest to be the very first number in the array and then compare it with others.
    int biggest = candidates[0].votes;
    for (int i = 0; i < candidate_count - 1; i++)
    {
        if (candidates[i].votes > candidates[i + 1].votes)
        {
            biggest = candidates[i].votes;
        }
        else if (candidates[i].votes < candidates[i + 1].votes)
        {
            biggest = candidates[i + 1].votes;
        }
    }
    // Another loop to print winners which must be more than or equal to all other votes numbers (!i) AND "biggest".
    for (int i = 0; i < candidate_count; i++)
    {
        if (candidates[i].votes >= candidates[!i].votes && candidates[i].votes >= biggest)
        {
            printf("%s\n", candidates[i].name);
        }
    }
    return;
}