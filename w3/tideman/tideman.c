#include <cs50.h>
#include <stdio.h>
#include <string.h>

// Max number of candidates
#define MAX 9

// preferences[i][j] is number of voters who prefer 'i' over 'j'. This is a candidates by candidates (candidate_count * candidate_count) matrix (2D array).
int preferences[MAX][MAX];

// locked[i][j] means 'i' is locked in over 'j'. This IS the adjacency matrix which we fill based on which vertex is pointing to another.
bool locked[MAX][MAX];

// Each pair has a winner, loser
typedef struct
{
    int winner;
    int loser;
}
pair;

// Array of candidates
string candidates[MAX];
pair pairs[MAX * (MAX - 1) / 2]; // it's an array of "pair" type variables

int pair_count;
int candidate_count;

// Function prototypes
bool vote(int rank, string name, int ranks[]);
void record_preferences(int ranks[]);
void add_pairs(void);
void sort_pairs(void);
void lock_pairs(void);
void print_winner(void);

int main(int argc, string argv[])
{
    // Check for invalid usage
    if (argc < 2)
    {
        printf("Usage: tideman [candidate ...]\n");
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
        candidates[i] = argv[i + 1];
    }

    // Clear graph of locked in pairs
    for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; j++)
        {
            locked[i][j] = false;
        }
    }

    pair_count = 0;
    int voter_count = get_int("Number of voters: ");

    // Query for votes. We are looking at every voter and his/her preferences one by one
    for (int i = 0; i < voter_count; i++)
    {
        // ranks[i] is voter's ith preference, so there will be a separate "ranks[]" array for every voter, I guess. YES, read line 92 comment...
        int ranks[candidate_count];

        // Query for each rank to get 'j' which will be the "rank" variable for the "vote" function below.
        for (int j = 0; j < candidate_count; j++)
        {
            string name = get_string("Rank %i: ", j + 1);

            if (!vote(j, name, ranks))
            {
                printf("Invalid vote.\n");
                return 3;
            }
        }
        // for (int k = 0; k < candidate_count; k++)
        // {
        //     printf("%i ", ranks[k]);
        // }

        // ... We're still in the loop with the same voter, so we use the ranks[] array to fill out the preferences[][] 2D array using function below, again, for the same particular voter.
        record_preferences(ranks);
        for (int z = 0; z < candidate_count; z++)
                {
                    for (int y = 0; y  < candidate_count; y++)
                    {
                        printf("%i ", preferences[z][y]);
                    }
                printf("\n");
                }
        printf("\n");
    }

    add_pairs();
    for (int i = 0; i < pair_count; i++)
    {
        printf("%i %i\n", pairs[i].winner, pairs[i].loser);
    }
    sort_pairs();
    lock_pairs();
    print_winner();
    return 0;
}

// Update ranks[] array given a new vote. With this function and 2 loops above (lines 71,77) we check every cell of imaginary preferences array from "runoff" task, as if we are using 1st loop going into a particular row, then with the 2nd loop we select the appropriate column (thus determining a particular cell) and then with function's "vote" loop we cycle through 0 - 1 - 2 -... - max candidates as if the numbers in the cell were going up from 0 to max and with every number we were checking if the entered by the user name is found in the "candidates" array. If it's found, then we write the 'i' index of a candidate into the "ranks" array.
bool vote(int rank, string name, int ranks[])
{
    for (int i = 0; i < candidate_count; i++)
    {
        if (strcmp(name, candidates[i]) == 0)
        {
            ranks[rank] = i;
            return true;
        }
    }
    return false;
}

// Update preferences given one voter's ranks.
void record_preferences(int ranks[])
{
    for (int r = 0; r < candidate_count; r++) // Loop through ranks[] AND simultaneously through the rows of the preferences[][] 2D array
    {
        for (int c = r + 1; c < candidate_count; c++) // Loop through columns of the preferences[][] 2D array starting with +1 column because we can't add a number when comparing the same row and column, since there always should be '0'.
        {
            {
                preferences[ranks[r]][ranks[c]]++;
            }
        }
    }
    return;
}

// Record pairs of candidates where one is preferred over the other
void add_pairs(void)
{
    for (int row = 0; row < MAX; row++)
    {
        for (int col = row + 1; col < MAX; col++)
        {
            int candidate_i = preferences[row][col];
            int candidate_j = preferences[col][row];
            if (candidate_i != candidate_j)
            {
                pair p; // this is not an array, it's a single variable 'p' of type "pair". It's like a temporary single-use variable which stores "winner" and "looser" for the duration of the "col" loop iteration and then writes its values into the "pairs" array at the end of a current "col" loop iteration.
                if (candidate_i > candidate_j)
                {
                    p.winner = row;
                    p.loser = col;
                }
                else
                {
                    p.winner = col;
                    p.loser = row;
                }
                pairs[pair_count++] = p;
            }
        }
    }
    return;
}

// Sort pairs in decreasing order by strength of victory
void sort_pairs(void)
{
    // TODO
    return;
}

// Lock pairs into the candidate graph in order, without creating cycles
void lock_pairs(void)
{
    // TODO
    return;
}

// Print the winner of the election
void print_winner(void)
{
    // TODO
    return;
}