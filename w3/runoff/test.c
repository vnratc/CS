#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max voters and candidates
#define MAX_VOTERS 100
#define MAX_CANDIDATES 9

// preferences[i][j] is jth preference for voter i
// "preferences" is the 2-dimensional array of integers of voters and ranks of candidates
int preferences[MAX_VOTERS][MAX_CANDIDATES];

// Candidates have name, vote count, eliminated status
typedef struct
{
    string name;
    int votes;
    bool eliminated;
}
candidate;

// Array of structs "candidate"
candidate candidates[MAX_CANDIDATES];

// Numbers of voters and candidates
int voter_count;
int candidate_count;

// Function prototypes
bool vote(int voter, int rank, string name);
void tabulate(void);
bool print_winner(void);
int find_min(void);
bool is_tie(int min);
void eliminate(int min);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: runoff [candidate ...]\n");
        return 1;
    }

    // Populate array of candidates with names and ranks entered by the user
    candidate_count = argc - 1;
    if (candidate_count > MAX_CANDIDATES)
    {
        printf("Maximum number of candidates is %i\n", MAX_CANDIDATES);
        return 2;
    }
    for (int i = 0; i < candidate_count; i++)
    {
        candidates[i].name = argv[i + 1];
        candidates[i].votes = 0;
        candidates[i].eliminated = false;
    }
    voter_count = get_int("Number of voters: ");
    if (voter_count > MAX_VOTERS)
    {
        printf("Maximum number of voters is %i\n", MAX_VOTERS);
        return 3;
    }

    // Keep querying for votes
    for (int i = 0; i < voter_count; i++)
    {

        // Query for each rank
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            // Record vote, unless it's invalid
            if (!vote(i, j, name))
            {
                printf("Invalid vote.\n");
                return 4;
            }
        }
        printf("\n");
    }
    // Keep holding runoffs until winner exists
    while (true)
    {
        // Calculate votes given remaining candidates
        tabulate();
        // Check if election has been won
        bool won = print_winner();
        if (won)
        {
            break;
        }

        // Eliminate last-place candidates
        int min = find_min();
        bool tie = is_tie(min);

        // If tie, everyone wins
        if (tie)
        {
            for (int i = 0; i < candidate_count; i++)
            {
                if (!candidates[i].eliminated)
                {
                    printf("%s\n", candidates[i].name);
                }
            }
            break;
        }

        // Eliminate anyone with minimum number of votes
        eliminate(min);

        // Reset vote counts back to zero
        for (int i = 0; i < candidate_count; i++)
        {
            candidates[i].votes = 0;
        }
    }
    return 0;
}

// Record preference if vote is valid
bool vote(int voter, int rank, string name)
{
    // After receiving the ranks and names from the user we populate the "preferences" array with them  if found matches among inputs from the user
    // Using recursion to cycle through every voter by starting with total number of voters and subtracting '1' with every call of the function.
    // Base case is when number of voters is '0' or less.
    if (voter <= 0)
    {
        return 1;
    }
    vote(voter - 1, rank, name);
    for (int j = 0; j < candidate_count; j++)
    {
        if (strcmp(name, candidates[j].name) == 0)
        {
            // When the name match found we store the candidate's index "j" inside of the "preferences" 2D array using "voter" and "rank" as coordinates(address)
            preferences[voter][rank] = j;
            return 1;
        }
    }
    return false;
}

// Tabulate votes for non-eliminated candidates. Fill the votes array of "candidates" array of structs.
// I create 2 loops to scan through every voter "i" and its preference "j" looking at candidate's index (0, 1 or 2 if total 3 candidates) and cheking whether a candidate with this index is eliminated or not. If it is, then I check the next preference "j" of current voter "i".
void tabulate(void)
{
    // 1st loop to scan through every voter
    for (int i = 0; i < voter_count; i++)
    {
        // 2nd loop to check the i'th voter's preference "j"
        for (int j = 0; j < candidate_count; j++)
        {
            if (!candidates[preferences[i][j]].eliminated)
            {
                // I add a vote to the non-eliminated candidate and break out of the loop, i.e. stop scheking the remaining preference of this i'th voter.
                candidates[preferences[i][j]].votes++;
                break;
            }
            // But if the candidate with an index (0,1 or 2 if total 3 candidates) inside the "preferences[i][j]" cell IS eliminated, I check the next preference 'j' of the current voter 'i'.
        }
    }
}

// Print the winner of the election, if there is one
bool print_winner(void)
{
    // To determine the majority I devide the number of voters by 2 and add 1 to the resulting integer.
    int a = voter_count / 2 + 1;
    for (int i = 0; i < candidate_count; i++)
    {
        if (candidates[i].votes >= a)
        {
            printf("%s\n", candidates[i].name);
            return 1;
        }
    }
    return false;
}

// Return the minimum number of votes any remaining candidate has
int find_min(void)
{
    // This is kinda bad design, but I was tired and just wanted it to work. So first I look for any non-eliminated candidate and assign "min" to its number of votes.
    int min = 0;
    for (int i = 0; i < candidate_count; i++)
    {
        if (!candidates[i].eliminated)
        {
            min = candidates[i].votes;
            break;
        }
    }
    // Next I compare "min" with all candidates' votes and update it if found a lower number.
    for (int i = 0; i < candidate_count; i++)
    {
        if (!candidates[i].eliminated && candidates[i].votes < min)
        {
            min = candidates[i].votes;
        }
    }
    return min;
}

// Return true if the election is tied between all candidates, false otherwise
bool is_tie(int min)
{
    // If any of non-eliminated candidate has more than "min" votes, then it is actually a tie, so I return false. If all of them == min, return true.
    for (int i = 0; i < candidate_count; i++)
    {
        if (!candidates[i].eliminated && candidates[i].votes > min)
        {
            return false;
        }
    }
    return true;
}

// Eliminate the candidate (or candidates) in last place
void eliminate(int min)
{
    for (int i = 0; i < candidate_count; i++)
    {
        if (candidates[i].votes == min)
        {
            candidates[i].eliminated = true;
        }
    }
    return;
}