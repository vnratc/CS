import csv
import sys

# python dnadraft.py databases/small.csv sequences/1.txt
def main():
    dicts = []  # List of iterables from csv file

    # TODO: Check for command-line usage
    if len(sys.argv) != 3:
        print("Missing command line arguments\nUsage: dna.py file.csv file.txt")
        exit(1)

    # TODO: Read database file into a variable
    sub_seq_list = []
    with open(sys.argv[1], "r") as csv_file:
        reader = csv.reader(csv_file)  # returns an iterable of LISTS
        for x in reader:
            sub_seq_list.append(x)
            break
        sub_seq_list = sub_seq_list[0][1:9]
        print(sub_seq_list)


    # TODO: Read DNA sequence file into a variable
    with open(sys.argv[2], "r") as txt_file:
        seq = txt_file.read()  # Returns file data as a STRING

    # print(type(seq))
    # TODO: Find longest match of each STR `in DNA sequence
    # I BASICALLY WROTE MY OWN FUNCTION FOR FINDING THE LONGEST MATCH. WELL, AT LEST DID A LOT OF PRACTICE.
    list = []  # List of dicts with STR:longest run key:values
    for j in sub_seq_list:
        STRc = 0
        s = len(j)
        for i in range(len(seq)):
            if seq[i:i + s] == j:
                STR = 0
                while seq[i:i + s] == j:
                    STR += 1
                    i += s
                if STR > STRc: STRc = STR
        d = {j: STRc}
        list.append(d)
    print(list)


    # TODO: Check database for matching profiles

    return


        # d = csv.DictReader(f0)  # returns an iterable of DICTS
        # for i in d:  # The for statement automatically creates a temporary unnamed variable to hold the iterator for the duration of the loop.
        # Maybe there is no need in naming those DICTS
        # for x in d:
            # for y in range(len(x)):
            #     print(f"{x[y]} ", end="")
        #     print(type(x))
        # print(type(d))


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
