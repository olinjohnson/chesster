# Author: Olin Johnson
# Created: 6/25/2022

# TODO: Pawn Promo, Pinned Pieces, En Passent, Castling
# TODO: Check for Check, Check for Checkmate
# TODO: Revise `request_move` to utilize `Move` class
# TODO: Prompt player for move again if they type something invalid
# TODO: Player can still only move white pieces even if they choose black

import time
import sys
from xml.dom import InvalidCharacterErr
import board_util as bu
import movement_util as mu
import chesster
import player_util as pu

width = 8
height = 8

ec = '-'

turn = "w"
chesster_turn = "b"

# starting_fen = "4k2r/3Nn1r1/8/8/8/8/3R3B/R3K3"
# starting_fen = "8/p1P1p1p1/3kk3/6N/6N/3KK3/P1P1P1P1/8"

starting_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

def main():

    try:

        start_game()

    except:

        type_text("Invalid response. Terminating.", finish="\n\n")

    board = bu.fen_to_board(starting_fen)

    while True:

        if turn == "w":

            bu.print_board(board)
            pu.request_move(board)
            bu.print_board(board)
            board = chesster.execute_move(board, chesster.get_random_move(board, chesster_turn))

        else:

            bu.print_board(board)
            board = chesster.execute_move(board, chesster.get_random_move(board, chesster_turn))
            bu.print_board(board)
            pu.request_move(board)


def start_game():
    
    print("\n\n")
    type_text("Hey there, I'm chesster.")
    type_text("Let's begin.", finish="\n\n")

    type_text("Would you like to be black or white?")
    type_text("Type 'b' for black or 'w' for white.", finish="\n\n")
    global turn
    global chesster_turn
    turn = input('>>> ')
    print("\n\n")

    if turn.lower() != 'b' and turn.lower() != 'w':

        raise InvalidCharacterErr

    if turn == "b":

        chesster_turn = "w"


def type_text(text, finish="\n"):
    
    time.sleep(0.5)

    for c in text:

        time.sleep(0.05)
        sys.stdout.write(c)
        sys.stdout.flush()

    print(finish)


if __name__ == "__main__":
    main()