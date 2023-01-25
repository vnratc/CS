#include <cs50.h>
#include <stdio.h>
#include <string.h>

typedef struct
{
    string name;
    string number;
}
person;

int main(void)
{
    // Introducing the "people" variable as the "person" data type. Indicating that "people" consists of 2 variables.
    person people[2];
    // Populating "people's" strings with some data.
    people[0].name =  "Carter"; // Storing "Carter" inside the "name" string of "people[0]".
    people[0].number = "+1-617-495-1000"; // Storing a number inside the "number" string of "people[0]"

    people[1].name = "David";
    people[1].number = "+1-949-468-2750";

    string name = get_string("Enter name: ");
    for (int i = 0; i < 2; i++)
    {
        // Comparing the "i'th" name inside "people" with the entered "name" by the user.
        if (strcmp(people[i].name, name) == 0)
        {
            printf("Found %s\n", people[i].number);
            return 0;
        }
    }
    printf("Not found\n");
    return 1;
}