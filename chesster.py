import master
import movement_util as mu
import random

class Move():

    def __init__(self, assassin, victim):
        self.assassin = assassin
        self.victim = victim

def get_valid_moves(board, turn):

    valid_moves = []

    for y in range(0, 8):

        for x in range(0, 8):

            suspect = board.board[y][x]

            if suspect != master.ec:

                if (suspect.islower() and turn == "b") or (suspect.isupper() and turn == "w"):

                    individual_moves = []

                    if suspect.lower() == "r" or suspect.lower() == "b" or suspect.lower() == "q":

                        individual_moves = mu.sliding_moves(board, y, x)
                    
                    elif suspect.lower() == "n" or suspect.lower() == "k":

                        individual_moves = mu.limited_moves(board, y, x)

                    else:

                        individual_moves = mu.pawn_moves(board, y, x)
                    
                    for m in individual_moves:

                        valid_move = Move([y, x], m)
                        valid_moves.append(valid_move)
    
    return valid_moves


def execute_move(board, turn):

    move = get_random_move(board, turn)

    board.board[move.victim[0]][move.victim[1]] = board.board[move.assassin[0]][move.assassin[1]]
    board.board[move.assassin[0]][move.assassin[1]] = master.ec

    return board


def get_random_move(board, turn):

    valid_moves = get_valid_moves(board, turn)
    master.type_text("Chesster is thinking...", color=master.yellow)
    print("Number of possibilities: ", len(valid_moves), "\n")
    return random.choice(valid_moves)