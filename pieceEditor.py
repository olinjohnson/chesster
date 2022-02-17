# GUI program to edit piece styling
from PIL import Image
import sys
from threading import Thread

images = [
    "bishop",
    "king",
    "knight",
    "pawn",
    "queen",
    "rook"
]
def HexToRGB(hex):
  r = "0x" + hex[1] + hex[2]
  g = "0x" + hex[3] + hex[4]
  b = "0x" + hex[5] + hex[6]
  return (int(r, 16), int(g, 16), int(b, 16), 255)

def updateImage(path, i):
    img = Image.open(path)
    pixels = img.load()
    for z in range(0, img.size[0]):
        for g in range(0, img.size[1]):
            if pixels[(z,g)] != (0, 0, 0, 255) and pixels[(z, g)] != (0, 0, 0, 0):
                pixels[(z,g)] = HexToRGB(sys.argv[i + 1])
    img.save(path)

multithread = False
if sys.argv[3]:
    if sys.argv[3] == "-mt":
        multithread = True

for i in range(0, 2):
    for x in range(0, len(images)):
        path = f"./public/images/set1/{images[x]}{i}.png"
        if not multithread:
            updateImage(path, i)
        else:
            t = Thread(target=updateImage, args=(path, i))
            t.start()
