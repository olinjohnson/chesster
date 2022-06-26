# Author: Olin Johnson
# Created: 6/25/2022

import board_util as bu
import movement_util as mu

width = 8
height = 8

ec = '-'

# starting_fen = "4k2r/3Nn1r1/8/8/8/8/3R3B/R3K3"
# stating_fen = "8/p1p1p1p1/3kk3/6k/6K/3KK3/P1P1P1P1/8"

starting_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

def main():
    board = bu.fen_to_board(starting_fen)
    bu.print_board(board)

if __name__ == "__main__":
    main()