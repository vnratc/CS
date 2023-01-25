#include<stdio.h>
#include<cs50.h>

int set_array(int array[4]);
int set_int(int x);

int main(void)
{
    int a = 10;
    int b[4] = { 0, 1, 2, 3 };
    set_int(a);
    set_array(b);
    printf("%d %d\n", a, b[0]);
}

int set_array(int array[4])
{
    array[0] = 22;
    return array[0];
}

int set_int(int x)
{
    x = 22;
    return x;
}