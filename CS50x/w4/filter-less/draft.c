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
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            int avr, avg, avb;

            // Upper left corner
            if (i == 0 && j == 0)
            {
                avr = round((image[i][j].rgbtRed + image[i][j + 1].rgbtRed + image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed) / 4.0);
                avg = round((image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen + image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen) / 4.0);
                avb = round((image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue + image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue) / 4.0);
            }

            // Upper edge
            if (i == 0 && j != 0 && j != width - 1)
            {
                avr = round((image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i][j + 1].rgbtRed + image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed) / 6.0);
                avg = round((image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i][j + 1].rgbtGreen + image[i + 1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtGreen) / 6.0);
                avb = round((image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i][j + 1].rgbtBlue + image[i + 1][j - 1].rgbtBlue + image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue)/ 6.0);
            }

            // Upper right corner
            if (i == 0 && j == width - 1)
            {
                avr = round((image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed) / 4.0);
                avg = round((image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i + 1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen) / 4.0);
                avb = round((image[i][j - 1].rgbtBlue + image[i][j].rgbtBlue + image[i + 1][j - 1].rgbtBlue + image[i + 1][j].rgbtBlue) / 4.0;
            }

            // Right edge
            if (j == width - 1 && i != 0 && i != height - 1)
            {
                 avr = round((image[i - 1][j - 1].rgbtRed + image[i - 1][j].rgbtRed + image[i][j - 1].rgbtRed + image[i][j].rgbtRed + image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed) / 6.0);
                 avg = round((image[i - 1][j - 1].rgbtGreen + image[i - 1][j].rgbtGreen + image[i][j - 1].rgbtGreen + image[i][j].rgbtGreen + image[i + 1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen) / 6.0);
                 avb = round((image[i - 1][j - 1].rgbtBlue + image[i - 1][j].rgbtBlue + image[i][j - 1].rgbtBlue +     image[i][j].rgbtBlue + image[i + 1][j - 1].rgbtBlue + image[i + 1][j].rgbtBlue) / 6.0);
            }

            // Bottom right corner
            if (i == height - 1 && j == width - 1)
            {
                avr = round
            }


            // Bottom edge


            // Bottom left corner


            // Left edge


            // Inside
            if (i > 0 && i < height - 1 && j > 0 && j < width - 1)
           
            avr { = round((image[i - 1][j - 1].rgbtRed + image[i - 1][j].rgbtRed + image[i - 1][j + 1].rgbtRed +

                         image[i][j - 1].rgbtRed +     image[i][j].rgbtRed +     image[i][j + 1].rgbtRed +

                         image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed)

                          / 9);

            avg = round((image[i - 1][j - 1].rgbtGreen + image[i - 1][j].rgbtGreen + image[i - 1][j + 1].rgbtGreen +

                         image[i][j - 1].rgbtGreen +     image[i][j].rgbtGreen +     image[i][j + 1].rgbtGreen +

                         image[i + 1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtRed)

                         / 9);

            avb = round((image[i - 1][j - 1].rgbtBlue + image[i - 1][j].rgbtBlue + image[i - 1][j + 1].rgbtBlue +

                         image[i][j - 1].rgbtBlue +     image[i][j].rgbtBlue +     image[i][j + 1].rgbtBlue +

                         image[i + 1][j - 1].rgbtBlue + image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue) / 9);
            }

            image[i][j].rgbtRed = avr;
            image[i][j].rgbtGreen = avg;
            image[i][j].rgbtBlue = avb;
        }
    }
    return;
}


// if (i == 0 && j == 0)
            // {
            //     c_r = image[i][j].rgbtRed;
            //     c_g = image[i][j].rgbtGreen;
            //     c_b = image[i][j].rgbtBlue;


            //     int ul = image[i][j].;
            // }

             //  , int u = image[i - 1][j]. ,int ur = image[i + 1][j - 1].;




            // int cl = image[i][j - 1]. ,     int c = image[i][j]. ,    int cr = image[i][j + 1].;
            // int ll = image[i + 1][j - 1].,  int l = image[i + 1][j]., int lr = image[i + 1][j + 1].;
            // }

    // int ul_r, ul_g, ul_b, u_r, u_g, u_b, ur_r, ur_g, ur_b;
    // int cl_r, cl_g, cl_b, c_r, c_g, c_b, cr_r, cr_g, cr_b;
    // int ll_r, ll_g, ll_b, l_r, l_g, l_b, lr_r, lr_g, lr_b;