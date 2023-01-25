  // Red floats
                float nw_red = image[i - 1][j - 1].rgbtRed;
                float n_red = image[i - 1][j].rgbtRed;
                float ne_red = image[i - 1][j + 1].rgbtRed;
                float w_red = image[i][j - 1].rgbtRed;
                float c_red = image[i][j].rgbtRed;
                float e_red = image[i][j + 1].rgbtRed;
                float sw_red = image[i + 1][j - 1].rgbtRed;
                float s_red = image[i + 1][j].rgbtRed;
                float se_red = image[i + 1][j + 1].rgbtRed;
                // Green floats
                float nw_green = image[i - 1][j - 1].rgbtGreen;
                float n_green = image[i - 1][j].rgbtGreen;
                float ne_green = image[i - 1][j + 1].rgbtGreen;
                float w_green = image[i][j - 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;
                float e_green = image[i][j + 1].rgbtGreen;
                float sw_green = image[i + 1][j - 1].rgbtGreen;
                float s_green = image[i + 1][j].rgbtGreen;
                float se_green = image[i + 1][j + 1].rgbtGreen;
                // Blue floats
                float nw_blue = image[i - 1][j - 1].rgbtBlue;
                float n_blue = image[i - 1][j].rgbtBlue;
                float ne_blue = image[i - 1][j + 1].rgbtBlue;
                float w_blue = image[i][j - 1].rgbtBlue;
                float c_blue = image[i][j].rgbtBlue;
                float e_blue = image[i][j + 1].rgbtBlue;
                float sw_blue = image[i + 1][j - 1].rgbtBlue;
                float s_blue = image[i + 1][j].rgbtBlue;
                float se_blue = image[i + 1][j + 1].rgbtBlue;

                avr = round((nw_red + n_red + ne_red + w_red + c_red + e_red + se_red + s_red + se_red) / 9.0);
                avg = round((nw_green + n_green + ne_green + w_green + c_green + e_green + se_green + s_green + se_green) / 9.0);
                avb = round((nw_blue + n_blue + ne_blue + w_blue + c_blue + e_blue + se_blue + s_blue + se_blue) / 9.0);
            }
            // NW corner
            if (i == 0 && j == 0)
            {
                float c_red = image[i][j].rgbtRed;
                float e_red = image[i][j + 1].rgbtRed;
                float s_red = image[i + 1][j].rgbtRed;
                float se_red = image[i + 1][j + 1].rgbtRed;
                float e_green = image[i][j - 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;
                float s_green = image[i + 1][j].rgbtGreen;
                float se_green = image[i + 1][j + 1].rgbtGreen;
                float c_blue = image[i][j].rgbtBlue;
                float e_blue = image[i][j + 1].rgbtBlue;
                float s_blue = image[i + 1][j].rgbtBlue;
                float se_blue = image[i + 1][j + 1].rgbtBlue;

                avr = round((c_red + e_red + s_red + se_red) / 4.0);
                avg = round((c_green + e_green + s_green + se_green) / 4.0);
                avb = round((c_blue + e_blue + s_blue + se_blue) / 4.0);
            }
            // North edge
            if (i == 0 && j != 0 && j != width - 1)
            {
                float w_red = image[i][j - 1].rgbtRed;
                float c_red = image[i][j].rgbtRed;
                float e_red = image[i][j + 1].rgbtRed;
                float sw_red = image[i + 1][j - 1].rgbtRed;
                float s_red = image[i + 1][j].rgbtRed;
                float se_red = image[i + 1][j + 1].rgbtRed;
                float w_green = image[i][j - 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;
                float e_green = image[i][j + 1].rgbtGreen;
                float sw_green = image[i + 1][j - 1].rgbtGreen;
                float s_green = image[i + 1][j].rgbtGreen;
                float se_green = image[i + 1][j + 1].rgbtGreen;
                float w_blue = image[i][j - 1].rgbtBlue;
                float c_blue = image[i][j].rgbtBlue;
                float e_blue = image[i][j + 1].rgbtBlue;
                float sw_blue = image[i + 1][j - 1].rgbtBlue;
                float s_blue = image[i + 1][j].rgbtBlue;
                float se_blue = image[i + 1][j + 1].rgbtBlue;

                avr = round((w_red + c_red + e_red + sw_red + s_red + se_red) / 6.0);
                avg = round((w_green + c_green + e_green + sw_green + s_green + se_green) / 6.0);
                avb = round((w_blue + c_blue + e_blue + sw_blue + s_blue + se_blue) / 6.0);
            }
            // NE corner
            if (i == 0 && j == width - 1)
            {
                float w_red = image[i][j - 1].rgbtRed;
                float c_red = image[i][j].rgbtRed;
                float sw_red = image[i + 1][j - 1].rgbtRed;
                float s_red = image[i + 1][j].rgbtRed;

                float w_green = image[i][j - 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;
                float sw_green = image[i + 1][j - 1].rgbtGreen;
                float s_green = image[i + 1][j].rgbtGreen;

                float w_blue = image[i][j - 1].rgbtBlue;
                float c_blue = image[i][j].rgbtBlue;
                float sw_blue = image[i + 1][j - 1].rgbtBlue;
                float s_blue = image[i + 1][j].rgbtBlue;

                avr = round((w_red + c_red + sw_red + s_red) / 4.0);
                avg = round((w_green + c_green + sw_green + s_green) / 4.0);
                avb = round((w_blue + c_blue + sw_blue + s_blue) / 4.0);
            }
            // East edge
            if (j == width - 1 && i != 0 && i != height - 1)
            {
                float nw_red = image[i - 1][j - 1].rgbtRed;
                float n_red = image[i - 1][j].rgbtRed;
                float w_red = image[i][j - 1].rgbtRed;
                float c_red = image[i][j].rgbtRed;
                float sw_red = image[i + 1][j - 1].rgbtRed;
                float s_red = image[i + 1][j].rgbtRed;

                float nw_green = image[i - 1][j - 1].rgbtGreen;
                float n_green = image[i - 1][j].rgbtGreen;
                float w_green = image[i][j - 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;
                float sw_green = image[i + 1][j - 1].rgbtGreen;
                float s_green = image[i + 1][j].rgbtGreen;

                float nw_blue = image[i - 1][j - 1].rgbtBlue;
                float n_blue = image[i - 1][j].rgbtBlue;
                float w_blue = image[i][j - 1].rgbtBlue;
                float c_blue = image[i][j].rgbtBlue;
                float sw_blue = image[i + 1][j - 1].rgbtBlue;
                float s_blue = image[i + 1][j].rgbtBlue;

                avr = round((nw_red + n_red + w_red + c_red + sw_red + s_red) / 6.0);
                avg = round((nw_green + n_green + w_green + c_green + sw_green + s_green) / 6.0);
                avb = round((nw_blue + n_blue + w_blue + c_blue + sw_blue + s_blue) / 6.0);
            }
            // SE corner
            if (i == height - 1 && j == width - 1)
            {
                float nw_red = image[i - 1][j - 1].rgbtRed;
                float n_red = image[i - 1][j].rgbtRed;
                float w_red = image[i][j - 1].rgbtRed;
                float c_red = image[i][j].rgbtRed;

                float nw_green = image[i - 1][j - 1].rgbtGreen;
                float n_green = image[i - 1][j].rgbtGreen;
                float w_green = image[i][j - 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;

                float nw_blue = image[i - 1][j - 1].rgbtBlue;
                float n_blue = image[i - 1][j].rgbtBlue;
                float w_blue = image[i][j - 1].rgbtBlue;
                float c_blue = image[i][j].rgbtBlue;

                avr = round((nw_red + n_red + w_red + c_red) / 4.0);
                avg = round((nw_green + n_green + w_green + c_green) / 4.0);
                avb = round((nw_blue + n_blue + w_blue + c_blue) / 4.0);
            }
            // South edge
            if (i == height - 1 && j != 0 && j != width - 1)
            {
                float nw_red = image[i - 1][j - 1].rgbtRed;
                float n_red = image[i - 1][j].rgbtRed;
                float ne_red = image[i - 1][j + 1].rgbtRed;
                float w_red = image[i][j - 1].rgbtRed;
                float c_red = image[i][j].rgbtRed;
                float e_red = image[i][j + 1].rgbtRed;
                float nw_green = image[i - 1][j - 1].rgbtGreen;
                float n_green = image[i - 1][j].rgbtGreen;
                float ne_green = image[i - 1][j + 1].rgbtGreen;
                float w_green = image[i][j - 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;
                float e_green = image[i][j + 1].rgbtGreen;
                float nw_blue = image[i - 1][j - 1].rgbtBlue;
                float n_blue = image[i - 1][j].rgbtBlue;
                float ne_blue = image[i - 1][j + 1].rgbtBlue;
                float w_blue = image[i][j - 1].rgbtBlue;
                float c_blue = image[i][j].rgbtBlue;
                float e_blue = image[i][j + 1].rgbtBlue;
                avr = round((nw_red + n_red + ne_red + w_red + c_red + e_red) / 6.0);
                avg = round((nw_green + n_green + ne_green + w_green + c_green + e_green) / 6.0);
                avb = round((nw_blue + n_blue + ne_blue + w_blue + c_blue + e_blue) / 6.0);
            }
            // SW corner
            if (i == height - 1 && j == 0)
            {
                float n_red = image[i - 1][j].rgbtRed;
                float ne_red = image[i - 1][j + 1].rgbtRed;
                float c_red = image[i][j].rgbtRed;
                float e_red = image[i][j + 1].rgbtRed;
                float n_green = image[i - 1][j].rgbtGreen;
                float ne_green = image[i - 1][j + 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;
                float e_green = image[i][j + 1].rgbtGreen;
                float n_blue = image[i - 1][j].rgbtBlue;
                float ne_blue = image[i - 1][j + 1].rgbtBlue;
                float c_blue = image[i][j].rgbtBlue;
                float e_blue = image[i][j + 1].rgbtBlue;
                avr = round((n_red + ne_red + c_red + e_red) / 4.0);
                avg = round((n_green + ne_green + c_green + e_green) / 4.0);
                avb = round((n_blue + ne_blue + c_blue + e_blue) / 4.0);
            }
            // West edge
            if (j == 0 && i != 0 && i != height - 1)
            {
                float n_red = image[i - 1][j].rgbtRed;
                float ne_red = image[i - 1][j + 1].rgbtRed;
                float c_red = image[i][j].rgbtRed;
                float e_red = image[i][j + 1].rgbtRed;
                float s_red = image[i + 1][j].rgbtRed;
                float se_red = image[i + 1][j + 1].rgbtRed;
                float n_green = image[i - 1][j].rgbtGreen;
                float ne_green = image[i - 1][j + 1].rgbtGreen;
                float c_green = image[i][j].rgbtGreen;
                float e_green = image[i][j + 1].rgbtGreen;
                float s_green = image[i + 1][j].rgbtGreen;
                float se_green = image[i + 1][j + 1].rgbtGreen;
                float n_blue = image[i - 1][j].rgbtBlue;
                float ne_blue = image[i - 1][j + 1].rgbtBlue;
                float c_blue = image[i][j].rgbtBlue;
                float e_blue = image[i][j + 1].rgbtBlue;
                float s_blue = image[i + 1][j].rgbtBlue;
                float se_blue = image[i + 1][j + 1].rgbtBlue;
                avr = round((n_red + ne_red + c_red + e_red + s_red + se_red) / 6.0);
                avg = round((n_green + ne_green + c_green + e_green + s_green + se_green) / 6.0);
                avb = round((n_blue + ne_blue + c_blue + e_blue + s_blue + se_blue) / 6.0);
            }
            image[i][j].rgbtRed = avr;
            image[i][j].rgbtGreen = avg;
            image[i][j].rgbtBlue = avb;