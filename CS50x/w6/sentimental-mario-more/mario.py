from cs50 import get_int

while True:
    height = get_int("Enter height: ")
    if height > 0 and height < 9:
        break
# For every line
for i in range(height):
    # Spaces for every char in this line. Number of spaces required is associated with height-1.
    for k in range(height - 1):
        print(" ", end="")
    # Reduce amount of spaces for future line
    height -= 1
    # i is 0, so one do loop ine time now, but as i increments with next iteration loop will run one more time with every new iteration.
    for j in range(i + 1):
        print("#", end="")
    print("  ", end="")
    # Explanation from line 12 applies here as well
    for l in range(i + 1):
        print("#", end="")
    print()