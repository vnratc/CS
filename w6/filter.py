from PIL import Image, ImageFilter

before = Image.open("tower.bmp")
after = before.filter(ImageFilter.FIND_EDGES)
after.save("out.bmp")




# before = Image.open("tower.bmp")
# after = before.filter(ImageFilter.BoxBlur(10))
# after.save("out.bmp")