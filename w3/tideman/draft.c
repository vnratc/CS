for (int i = 0; i < candidate_count; i++)
    {
        for (int j = 0; j < candidate_count; i++)
        {
            for (int k = 0; k < candidate_count; k++)
            {
                // Is 'i' higher than 'j' in ranks[] ?
                // If index of 'i' in the ranks[] array is less than index of 'j'
                //
                if (ranks[k] == i)
                {
                    // then i is preferred over candidates i + 1
                    preferences[i][j] = ;
                }

            }
        }
    }


// Record pairs of candidates where one is preferred over the other
void add_pairs(void)
{
    for (int i = 0; i < MAX; i++)
    {
        for (int j = i + 1; j < MAX; j++)
        {
            if (preferences[i][j] != preferences[j][i])
            {
                if (preferences[i][j] > preferences[j][i])
                {
                    pairs[i].winner = i;
                    pairs[i].loser = j;
                }
                else
                {
                    pairs[i].winner = j;
                    pairs[i].loser = i;
                }
                pair_count++;
            }
        }
    }
    return;
}