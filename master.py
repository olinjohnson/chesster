# Author: Olin Johnson
# Created: 6/25/2022

# TODO: Pawn Promo, Pinned Pieces, En Passent, Castling
# TODO: Check for Check, Check for Checkmate
# TODO: Revise `request_move` to utilize `Move` class

import time
import sys
from xml.dom import InvalidCharacterErr
from board_util import Board
import movement_util as mu
import chesster
import player_util as pu

# Console colors
black = "\033[0;30m"
purple = "\033[0;35m"
blue = "\033[0;34m"
green = "\033[0;32m"
red = "\033[0;31m"
yellow = "\033[0;33m"
white = "\033[0;37m"

width = 8
height = 8

ec = '-'

turn = "w"
chesster_turn = "b"
current_turn = "w"

# starting_fen = "4k2r/3Nn1r1/8/8/8/8/3R3B/R3K3"
# starting_fen = "8/p1P1p1p1/3kk3/6N/6N/3KK3/P1P1P1P1/8"

starting_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

def main():

    try:

        start_game()

    except:

        type_text("Invalid response. Terminating.", color=red, finish="\n\n")
        sys.exit()


    board = Board(height, width, starting_fen, ec)

    while True:

        if current_turn == turn:

            board.print_board()
            pu.make_player_move(board, turn)
            toggle_turn()

        else:

            chesster.execute_move(board, chesster_turn)
            toggle_turn()


def start_game():
    
    print("\n\n")
    type_text("Hey there, I'm chesster.", color=blue)
    type_text("Let's begin.", color=blue, finish="\n\n")

    type_text("Would you like to be black or white?", color=green)
    type_text("Type 'b' for black or 'w' for white.", color=green, finish="\n\n")
    global turn
    global chesster_turn
    global current_turn
    turn = input('>>> ')
    print("\n\n")

    if turn.lower() != 'b' and turn.lower() != 'w':

        raise InvalidCharacterErr

    if turn == "b":

        chesster_turn = "w"


def type_text(text, color=black, finish="\n"):
    
    print(color)

    time.sleep(0.5)

    for c in text:

        time.sleep(0.04)
        sys.stdout.write(c)
        sys.stdout.flush()

    print(finish)


def toggle_turn():

    global current_turn
    
    current_turn = "b" if current_turn == "w" else "w"


if __name__ == "__main__":
    main()