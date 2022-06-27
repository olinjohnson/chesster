from xml.dom import InvalidCharacterErr

# Console colors
black = "\033[0;30m"
purple = "\033[0;35m"
blue = "\033[0;34m"
green = "\033[0;32m"
red = "\033[0;31m"
yellow = "\033[0;33m"
white = "\033[0;37m"

class Board:

    def __init__(self, height, width, fen, ec):

        self.board = []

        for y in range(0, height):
            
            rows = []

            for x in range(0, width):

                rows.append(ec)

            self.board.append(rows)
        
        x_pos = 0
        y_pos = 0

        for c in fen:

            if((ord(c) > 96 and ord(c) < 123) or (ord(c) > 64 and ord(c) < 91)):

                self.board[y_pos][x_pos] = c
                x_pos = x_pos + 1

            elif(ord(c) > 48 and ord(c) < 57):

                x_pos = x_pos + int(c)

            else:

                y_pos = y_pos + 1
                x_pos = 0

    def print_board(self):

        print(black)

        for y in range(0, 8):

            print(str(8 - y) + "   ", end="")

            for x in range(0, 8):

                print(self.board[y][x] + " ", end="")
                
            print("\n")
        
        print("\n    a b c d e f g h\n")


    def algebraic_to_board_coord(self, a):
        
        if len(a) == 2 and ord(a[0]) > 96 and ord(a[0]) < 105 and ord(a[1]) > 48 and ord(a[1]) < 57:

            return [7 - (int(a[1]) - 1), ord(a[0]) - 97]

        else:

            raise InvalidCharacterErr
