// Implements a dictionary's functionality
#include <cs50.h>
#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>
#include "dictionary.h"

// Represents a node in a hash table
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
}
node;

unsigned int word_count = 0;

// TODO: Choose number of buckets in hash table
const unsigned int N = 26;

// Hash table. This is NOT an array of nodes, it IS an array of POINTERS TO NODES.
node *table[N];

// Returns true if word is in dictionary, else false
bool check(const char *word)
{
    // TODO
    // Determine the index of a linked list in an array of pointers 'table' where to look for the word.
    unsigned int index = hash(word);
    // Scan that linked list for the word. Create a 'tmp' pointer, assign it to first element in list, check if words match, continue to next element if not.
    for (node *tmp = table[index]; tmp != NULL; tmp = tmp->next)
    {
        if (strcasecmp(word, tmp->word) == 0)
        {
            return true;
        }
    }
    return false;
}

// Hashes word to a number
unsigned int hash(const char *word)
{
    // TODO: Improve this hash function
    return toupper(word[0]) - 'A'; // loop through every letter?
}

// Loads dictionary into memory, returning true if successful, else false
bool load(const char *dictionary)
{
    // TODO
    FILE *input = fopen(dictionary, "r");
    if (input == NULL)
    {
        printf("Could not open file.\n");
        return false;
    }
    // Read strings from input one by one
    char buffer[LENGTH + 1];
    node *n;
    // Scan input for strings and read them into buffer
    while (fscanf(input, "%s", buffer) != EOF)
    {
        // Assign 'n' to point to a new memory block node size of node when a string is found.
        n = malloc(sizeof(node));
        if (n == NULL)
        {
            printf("Could not malloc.\n");
            return false;
        }
        // Copy found string from buffer into the node's 'word' field
        strcpy(n->word, buffer);
        // Start at 'n', follow its pointer to the node, access node's 'next' field and assign it to point to NULL.
        n->next = NULL;
        // Hash word to obtain a hash value (for now obtains 1st letter)
        unsigned int index = hash(buffer);
        // Assign the ponter at index to point to whatever 'n' is pointing to, i.e. insert node into hash table at index.
        // If it's the first node for this index
        if (table[index] == NULL)
        {
            table[index] = n;
            // Add 1 to number of words in dictionary
            word_count++;
            n = NULL;
        }
        // If not 1st node
        else
        {
            n->next = table[index];
            table[index] = n;
            // Add 1 to number of words in dictionary
            word_count++;
            n = NULL;
        }
    }
    fclose(input);
    return true;
}

// Returns number of words in dictionary if loaded, else 0 if not yet loaded
unsigned int size(void)
{
    // TODO
    return word_count;
}

// Unloads dictionary from memory, returning true if successful, else false
bool unload(void)
{
    // TODO
    for (unsigned int i = 0; i < N; i++)
    {
            node *cursor = table[i];
            node *eraser = table[i];
            while (cursor != NULL)
            {
                cursor = cursor->next;
                free(eraser);
                eraser = cursor;
            }
    }
    return true;
}
