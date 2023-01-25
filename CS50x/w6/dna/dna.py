import csv
import sys


def main():
    sub_seq_list = []
    STRm_list = []
    list_dict_sample = []  # List of dicts with key:values as follows - sub_seq:max matches

    # TODO: Check for command-line usage
    if len(sys.argv) != 3:
        print("Missing command line arguments\nUsage: dna.py file.csv file.txt")
        exit(1)

    # TODO: Read database file into a variable
    with open(sys.argv[1], "r") as csv_file:
        # Extracting sub_seq names from a table to a list
        reader = csv.reader(csv_file)  # returns an iterable of LISTS
        for x in reader:
            sub_seq_list.append(x)
            break
        sub_seq_list = sub_seq_list[0][1:]

    # TODO: Read DNA sequence file into a variable
    with open(sys.argv[2], "r") as txt_file:
        seq = txt_file.read()  # Returns file data as a STRING

    # TODO: Find longest match of each STR in DNA sequence
    for j in sub_seq_list:
        STRm = longest_match(seq, j)
        STRm_list.append(STRm)

    # TODO: Check database for matching profiles
    match = 0
    with open(sys.argv[1], "r") as csv_file:
        reader0 = csv.reader(csv_file)  # returns an iterable of LISTS
        next(reader0)
        for y in reader0:
            for z in range(1, len(y)):
                y[z] = int(y[z])
            # print(y)
            if STRm_list == y[1:]:
                print(y[0])
                match += 1
        if match == 0:
            print("No match")
    return

# I BASICALLY WROTE MY OWN FUNCTION FOR FINDING THE LONGEST MATCH. KINDA FORGOT IT IS IMPLEMENTED BELOW)) WELL, AT LEAST DID A LOT OF THINKING.
# list = []  # List of dicts with STR:longest run key:values
# for j in sub_seq_list:
#     STRc = 0
#     s = len(j)
#     for i in range(len(seq)):
#         if seq[i:i + s] == j:
#             STR = 0
#             while seq[i:i + s] == j:
#                 STR += 1
#                 i += s
#             if STR > STRc: STRc = STR
#     d = {j: STRc}
#     list.append(d)
# print(list)


def longest_match(sequence, subsequence):
    """Returns length of longest run of subsequence in sequence."""

    # Initialize variables
    longest_run = 0
    subsequence_length = len(subsequence)
    sequence_length = len(sequence)

    # Check each character in sequence for most consecutive runs of subsequence
    for i in range(sequence_length):

        # Initialize count of consecutive runs
        count = 0

        # Check for a subsequence match in a "substring" (a subset of characters) within sequence
        # If a match, move substring to next potential match in sequence
        # Continue moving substring and checking for matches until out of consecutive matches
        while True:

            # Adjust substring start and end
            start = i + count * subsequence_length
            end = start + subsequence_length

            # If there is a match in the substring
            if sequence[start:end] == subsequence:
                count += 1

            # If there is no match in the substring
            else:
                break

        # Update most consecutive matches found
        longest_run = max(longest_run, count)

    # After checking for runs at each character in seqeuence, return longest run found
    return longest_run


main()
