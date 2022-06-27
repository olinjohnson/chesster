# Author: Olin Johnson
# Created: 6/25/2022

# TODO: Pawn Promo, Pinned Pieces, En Passent, Castling
# TODO: Check for Check, Check for Checkmate
# TODO: Revise `request_move` to utilize `Move` class

import sys
from xml.dom import InvalidCharacterErr
from board_util import Board
from player_util import Player
from chesster import Chesster
import text

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

        text.type_text("Invalid response. Terminating.", color=text.red, finish="\n\n")
        sys.exit()


    board = Board(text.height, text.width, starting_fen, text.ec)
    player = Player(turn)
    chesster = Chesster(chesster_turn)

    while True:

        if current_turn == turn:

            board.print_board()
            player.make_player_move(board)
            toggle_turn()

        else:

            chesster.execute_move(board)
            toggle_turn()


def start_game():
    
    print("\n\n")
    text.type_text("Hey there, I'm chesster.", color=text.blue)
    text.type_text("Let's begin.", color=text.blue, finish="\n\n")

    text.type_text("Would you like to be black or white?", color=text.green)
    text.type_text("Type 'b' for black or 'w' for white.", color=text.green, finish="\n\n")
    global turn
    global chesster_turn
    global current_turn
    turn = input('>>> ')
    print("\n\n")

    if turn.lower() != 'b' and turn.lower() != 'w':

        raise InvalidCharacterErr

    if turn == "b":

        chesster_turn = "w"


def toggle_turn():

    global current_turn
    
    current_turn = "b" if current_turn == "w" else "w"


if __name__ == "__main__":
    main()