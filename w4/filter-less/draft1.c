for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            // Inside
            if (i > 0 && i < height - 1 && j > 0 && j < width - 1)
            {
                // Red floats
                // float nw_red = image[i - 1][j - 1].rgbtRed;
                // float n_red = image[i - 1][j].rgbtRed;
                // float ne_red = image[i - 1][j + 1].rgbtRed;
                // float w_red = image[i][j - 1].rgbtRed;
                // float c_red = image[i][j].rgbtRed;
                // float e_red = image[i][j + 1].rgbtRed;
                // float sw_red = image[i + 1][j - 1].rgbtRed;
                // float s_red = image[i + 1][j].rgbtRed;
                // float se_red = image[i + 1][j + 1].rgbtRed;
                // // Green floats
                // float nw_green = image[i - 1][j - 1].rgbtGreen;
                // float n_green = image[i - 1][j].rgbtGreen;
                // float ne_green = image[i - 1][j + 1].rgbtGreen;
                // float w_green = image[i][j - 1].rgbtGreen;
                // float c_green = image[i][j].rgbtGreen;
                // float e_green = image[i][j + 1].rgbtGreen;
                // float sw_green = image[i + 1][j - 1].rgbtGreen;
                // float s_green = image[i + 1][j].rgbtGreen;
                // float se_green = image[i + 1][j + 1].rgbtGreen;
                // // Blue floats
                // float nw_blue = image[i - 1][j - 1].rgbtBlue;
                // float n_blue = image[i - 1][j].rgbtBlue;
                // float ne_blue = image[i - 1][j + 1].rgbtBlue;
                // float w_blue = image[i][j - 1].rgbtBlue;
                // float c_blue = image[i][j].rgbtBlue;
                // float e_blue = image[i][j + 1].rgbtBlue;
                // float sw_blue = image[i + 1][j - 1].rgbtBlue;
                // float s_blue = image[i + 1][j].rgbtBlue;
                // float se_blue = image[i + 1][j + 1].rgbtBlue;
                // // Averages for each color
                // int avr = round((nw_red + n_red + ne_red + w_red + c_red + e_red + se_red + s_red + se_red) / 9.0);
                // int avg = round((nw_green + n_green + ne_green + w_green + c_green + e_green + se_green + s_green + se_green) / 9.0);
                // int avb = round((nw_blue + n_blue + ne_blue + w_blue + c_blue + e_blue + se_blue + s_blue + se_blue) / 9.0);
                int ar = round((image[i - 1][j - 1].rgbtRed + image[i - 1][j].rgbtRed + image[i - 1][j + 1].rgbtRed + image[i][j - 1].rgbtRed +     image[i][j].rgbtRed +     image[i][j + 1].rgbtRed + image[i + 1][j - 1].rgbtRed + image[i + 1][j].rgbtRed + image[i + 1][j + 1].rgbtRed) / 9.0);
                int ag = round((image[i - 1][j - 1].rgbtGreen + image[i - 1][j].rgbtGreen + image[i - 1][j + 1].rgbtGreen + image[i][j - 1].rgbtGreen +     image[i][j].rgbtGreen +     image[i][j + 1].rgbtGreen + image[i + 1][j - 1].rgbtGreen + image[i + 1][j].rgbtGreen + image[i + 1][j + 1].rgbtRed) / 9.0);
                int ab = round((image[i - 1][j - 1].rgbtBlue + image[i - 1][j].rgbtBlue + image[i - 1][j + 1].rgbtBlue + image[i][j - 1].rgbtBlue +     image[i][j].rgbtBlue +     image[i][j + 1].rgbtBlue + image[i + 1][j - 1].rgbtBlue + image[i + 1][j].rgbtBlue + image[i + 1][j + 1].rgbtBlue) / 9.0);

                copy[i][j].rgbtRed = ar;
                copy[i][j].rgbtGreen = ag;
                copy[i][j].rgbtBlue = ab;
            }
        }
    }
    // After every filtered pixel is stored in copy writing from copy back to image pixel by pixel.
    for (int i = 0; i < height; i++)
    {
        for (int j = 0; j < width; j++)
        {
            image[i][j].rgbtRed = copy[i][j].rgbtRed;
            image[i][j].rgbtGreen = copy[i][j].rgbtGreen;
            image[i][j].rgbtBlue = copy[i][j].rgbtBlue;
        }
    }