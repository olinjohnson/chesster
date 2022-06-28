import text
import movement_util as mu
from movement_util import Move
import random

class Chesster:

    def __init__(self, turn):

        self.turn = turn

    def get_valid_moves(self, board):

        valid_moves = []

        for y in range(0, 8):

            for x in range(0, 8):

                suspect = board.board[y][x]

                if suspect != text.ec:

                    if (suspect.islower() and self.turn == "b") or (suspect.isupper() and self.turn == "w"):

                        if suspect.lower() == "r" or suspect.lower() == "b" or suspect.lower() == "q":

                            valid_moves.extend(mu.sliding_moves(board, y, x))
                        
                        elif suspect.lower() == "n" or suspect.lower() == "k":

                            valid_moves.extend(mu.limited_moves(board, y, x))

                        else:

                            valid_moves.extend(mu.pawn_moves(board, y, x))
        
        return valid_moves


    def execute_move(self, board):

        text.type_text("Chesster is thinking...", color=text.yellow)

        move = self.get_random_move(board)

        board.board[move.victim[0]][move.victim[1]] = text.ec
        board.board[move.destination[0]][move.destination[1]] = board.board[move.assassin[0]][move.assassin[1]]
        board.board[move.assassin[0]][move.assassin[1]] = text.ec

        board.previous_moves.append(move)


    def get_random_move(self, board):

        valid_moves = self.get_valid_moves(board)
        print("Number of possibilities: ", len(valid_moves), "\n")
        return random.choice(valid_moves)