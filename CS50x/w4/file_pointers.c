#include<stdio.h>
#include<stdlib.h>

int main(int argc, char* argv[])
{
    // Check command-line arguments
    if (argc != 3)
    {
        printf("Usage ./file_pointers input.txt output.txt\n");
        return 1;
    }

    FILE* input = fopen(argv[1], "r");
    if (input == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    FILE* output = fopen(argv[2], "a");
    if (output == NULL)
    {
        printf("Could not open file.\n");
        return 1;
    }

    // char ch;
    // while((ch = fgetc(input)) != EOF)
    // {
    //     fputc(ch, output);
    // }

    // int ch;
    // while((ch = fgetc(card_raw)) != EOF)
    // {
    //     printf("%i", ch);
    // }

    // char* c[30]; // Static MA
    // fread(c, sizeof(char*), 2, input);
    // fwrite(c, sizeof(char*), 2, output);


    char* c = malloc(sizeof(char) * 30); // Dynamic MA
    fread(c, sizeof(char), 30, input);
    fwrite(c, sizeof(char), 30, output);
    free(c);

    // UNFINISHED
    // char* fgets(char* s, int n, FILE* input);
    // char* fputs(char* s, FILE* output);
}