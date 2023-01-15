#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
typedef uint8_t BYTE;
const int BLOCK_SIZE = 512;
int main(int argc, char *argv[])
{
    // Make sure only 1 command-line argument
    if (argc != 2)
    {
        printf("Usage: ./recover filename\n:");
        return 1;
    }
    // Open memory card, create a pointer, make sure pointer is not NULL
    FILE* pc = fopen(argv[1], "r"); // pc pointer to card
    if (pc == NULL)
    {
        printf("Could not open file\n");
        return 1;
    }
    // Look through blocks
    BYTE buffer[BLOCK_SIZE]; // BYTE is just 1 byte(8 bits which can be from 0 to 255)
    int jpg_counter = 0;
    int bytes = fread(buffer, 1, BLOCK_SIZE, pc);
    while (fread(buffer, 1, BLOCK_SIZE, pc) == BLOCK_SIZE) // This loop will cycle while number of bytes read is 512. Don't understand why it should stop eventually...
    {
        char* s = malloc(4);
        sprintf(s, "%03i.jpg", jpg_counter);
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            // Create file for writing
            FILE* jpgw = fopen(s, "w");
            if (jpgw == NULL)
            {
                printf("Could not open file\n");
                return 1;
            }
            fwrite(buffer, 1, BLOCK_SIZE, jpgw);
            jpg_counter++;
            // fclose(jpgw);
        }
        else if (jpg_counter > 0 && buffer[0] != 0xff && buffer[1] != 0xd8 && buffer[2] != 0xff && (buffer[3] < 0xe0 || buffer[3] > 0xef))
        {
            FILE* jpga = fopen(s, "a");
            if (jpga == NULL)
            {
                printf("Could not open file\n");
                return 1;
            }
            fwrite(buffer, 1, BLOCK_SIZE, jpga);
            // fclose(jpga);
        }
        free(s);
    }
    printf("%i\n", jpg_counter);
    fclose(pc);
}