text = input("Enter text: ")
l = 0
w = 0
s = 0
# Add at least 1 word if string is not empty
if len(text) > 0:
    w = 1 + text.count(' ')
for i in range(len(text)):
    c = text[i]
    if c.isalpha():
        l += 1
    elif c == "." or c == "!" or c == "?":
        s += 1
L = l / w * 100
S = s / w * 100
X = 0.0588 * L - 0.296 * S - 15.8
if X >= 16:
    print("Grade 16+")
elif X < 1:
    print("Before Grade 1")
else:
    print(f"Grade {round(X)}")


# print(l)
# print(w)
# print(s)

# another way to count words - with for loop
# for i in range(len(text)):
#     if len(text) > 0:
#         w += 1
#         words += 1

# import re
# words = len(re.findall(r"\w+", text))  # another way to count words, but it consider "Vlad's" as 2 words, mishandles apostrophies.

# another way to count sentences
# c = text[i]
# elif c == " ":
#     w += 1