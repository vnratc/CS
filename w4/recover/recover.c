#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
// This data type is just 1 byte
typedef uint8_t BYTE;
const int BLOCK_SIZE = 512;
// I can delcare file pointers without 'fopen()' function. I can call 'fopen' later on this globally declared pointer.
FILE *jpgw = NULL;
int main(int argc, char *argv[])
{
    // Make sure only 1 command-line argument
    if (argc != 2)
    {
        printf("Usage: ./recover filename\n:");
        return 1;
    }
    // Open memory card, create a pointer, make sure pointer is not NULL
    FILE *pc = fopen(argv[1], "r"); // pc pointer to card
    if (pc == NULL)
    {
        printf("Could not open file\n");
        return 1;
    }
    // Look through 512-byte blocks
    BYTE buffer[BLOCK_SIZE]; // BYTE is just 1 byte(8 bits which can be from 0 to 255)
    int jpg_counter = 0;
    int bytes = fread(buffer, 1, BLOCK_SIZE, pc);
    // Declaring a string for future filename, 9 bytes = 4(int) + 4(chars .jpg) + 1(\0)
    char *s = malloc(9);
    // This loop will cycle while number of bytes read is 512. Don't understand though why it should stop eventually... because 'fread' counts the number of bytes read with every iteration of the 'while' loop. After every iteration there will be 512 bytes red until it reads zero bytes, thus it stops.
    while (fread(buffer, 1, BLOCK_SIZE, pc) == BLOCK_SIZE)
    {
        // If jpeg header found
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            // Writing a name into 's' string
            sprintf(s, "%03i.jpg", jpg_counter);
            // If not the first encounter
            if (jpg_counter > 0)
            {
                fclose(jpgw);
            }
            // Create file named 's'for appending to
            jpgw = fopen(s, "a");
            if (jpgw == NULL)
            {
                printf("Could not open file\n");
                return 1;
            }
            fwrite(buffer, 1, BLOCK_SIZE, jpgw);
            jpg_counter++;
        }
        // If jpeg header not found but it was found before
        else if (jpg_counter > 0)
        {
            fwrite(buffer, 1, BLOCK_SIZE, jpgw);
        }
    }
    free(s);
    fclose(jpgw);
    fclose(pc);
}