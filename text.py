# Console colors
import sys
import time


black = "\033[0;30m"
purple = "\033[0;35m"
blue = "\033[0;34m"
green = "\033[0;32m"
red = "\033[0;31m"
yellow = "\033[0;33m"
white = "\033[0;37m"

ec = '-'

width = 8
height = 8

def type_text(text, color=black, finish="\n"):
    
    print(color)

    time.sleep(0.5)

    for c in text:

        time.sleep(0.04)
        sys.stdout.write(c)
        sys.stdout.flush()

    print(finish)

