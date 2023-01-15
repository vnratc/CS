# Simulate a sports tournament

import csv
import sys
import random

# Number of simluations to run
N = 1000


def main():

    # Ensure correct usage
    if len(sys.argv) != 2:
        sys.exit("Usage: python tournament.py FILENAME")

    teams = [] # DICT LIST
    # Read teams into memory from file
    with open(sys.argv[1]) as csv_file:
        dict_list = csv.DictReader(csv_file) # DICT LIST
        for list_element in dict_list: # All values(NOT KEYS) in every dict on this list are strings.
            list_element["rating"] = int(list_element["rating"])
            teams.append(list_element) # Populating the list above with every element one by one.


    counts = {} # Key - team name, Value - how many tournaments the team has won
    # Simulate N tournaments and keep track of win counts
    # Populate counts with teams
    for i in teams:
        counts.update({i["team"]: 0})
    for j in range(N):
        n = simulate_tournament(teams)
        counts[n] += 1

    # Print each team's chances of winning, according to simulation
    for team in sorted(counts, key=lambda team: counts[team], reverse=True):
        print(f"{team}: {counts[team] * 100 / N:.1f}% chance of winning")


def simulate_game(team1, team2):
    """Simulate a game. Return True if team1 wins, False otherwise."""
    rating1 = team1["rating"]
    rating2 = team2["rating"]
    probability = 1 / (1 + 10 ** ((rating2 - rating1) / 600))
    return random.random() < probability


def simulate_round(teams): # Accepts a list of teams
    """Simulate a round. Return a list of winning teams."""
    winners = []

    # Simulate games for all pairs of teams
    for i in range(0, len(teams), 2):
        if simulate_game(teams[i], teams[i + 1]):
            winners.append(teams[i])
        else:
            winners.append(teams[i + 1])

    return winners


def simulate_tournament(teams):
    """Simulate a tournament. Return name of winning team."""
    # TODO
    while len(teams) > 1:
        teams = simulate_round(teams)
    return teams[0]["team"]


if __name__ == "__main__":
    main()
