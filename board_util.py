from xml.dom import InvalidCharacterErr
import master

def fen_to_board(fen):

    init_board = generate_board(master.height, master.width)
    x_pos = 0
    y_pos = 0

    for c in fen:

        if((ord(c) > 96 and ord(c) < 123) or (ord(c) > 64 and ord(c) < 91)):

            init_board[y_pos][x_pos] = c
            x_pos = x_pos + 1

        elif(ord(c) > 48 and ord(c) < 57):

            x_pos = x_pos + int(c)

        else:

            y_pos = y_pos + 1
            x_pos = 0

    return init_board


def generate_board(h, w):

    rows = []

    for y in range(0, h):
        
        cols = []

        for x in range(0, w):

            cols.append(master.ec)

        rows.append(cols)

    return rows


def print_board(board):
    print(master.black)

    for y in range(0, 8):

        print(str(8 - y) + "   ", end="")

        for x in range(0, 8):

            print(board[y][x] + " ", end="")
            
        print("\n")
    
    print("\n    a b c d e f g h\n")


def algebraic_to_board_coord(a):
    
    if len(a) == 2 and ord(a[0]) > 96 and ord(a[0]) < 105 and ord(a[1]) > 48 and ord(a[1]) < 57:

        return [7 - (int(a[1]) - 1), ord(a[0]) - 97]

    else:

        raise InvalidCharacterErr