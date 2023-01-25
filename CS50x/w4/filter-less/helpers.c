#include "helpers.h"
#include "math.h"

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    // Alter rgb values in the 2D array
    // Add rgb values together and devide by 3, set this new value to all RGB BYTEs
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int g = round((image[i][j].rgbtBlue + image[i][j].rgbtGreen + image[i][j].rgbtRed) / 3.0);
            image[i][j].rgbtBlue = g;
            image[i][j].rgbtGreen = g;
            image[i][j].rgbtRed = g;
        }
    }
    return;
}

// Convert image to sepia
void sepia(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            float or = image[i][j].rgbtRed;
            float og = image[i][j].rgbtGreen;
            float ob = image[i][j].rgbtBlue;

            int newred = round(0.393 * or + 0.769 * og + 0.189 * ob);
            if (newred > 255)
            {
                newred = 255;
            }
            image[i][j].rgbtRed = newred;

            int newgreen = round(0.349 * or + 0.686 * og + 0.168 * ob);
            if (newgreen > 255)
            {
                newgreen = 255;
            }
            image[i][j].rgbtGreen = newgreen;

            int newblue = round(0.272 * or + 0.534 * og + 0.131 * ob);
            if (newblue > 255)
            {
                newblue = 255;
            }
            image[i][j].rgbtBlue = newblue;
        }
    }
    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    for (int i = 0; i < height; i++)
    {
        for (int j = 0, k = 1; j < width / 2; j++, k++)
        {
            int tmpBlue = image[i][j].rgbtBlue;
            int tmpGreen = image[i][j].rgbtGreen;
            int tmpRed = image[i][j].rgbtRed;
            image[i][j].rgbtBlue = image[i][width - k].rgbtBlue;
            image[i][j].rgbtGreen = image[i][width - k].rgbtGreen;
            image[i][j].rgbtRed = image[i][width - k].rgbtRed;
            image[i][width - k].rgbtBlue = tmpBlue;
            image[i][width - k].rgbtGreen = tmpGreen;
            image[i][width - k].rgbtRed = tmpRed;
        }
    }
    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    // Gave up on this task
    return;

}