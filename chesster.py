import text
import movement_util as mu
import random

class Move():

    def __init__(self, assassin, victim):
        self.assassin = assassin
        self.victim = victim


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


    def execute_move(self, board):

        move = self.get_random_move(board)

        board.board[move.victim[0]][move.victim[1]] = board.board[move.assassin[0]][move.assassin[1]]
        board.board[move.assassin[0]][move.assassin[1]] = text.ec


    def get_random_move(self, board):

        valid_moves = self.get_valid_moves(board)
        text.type_text("Chesster is thinking...", color=text.yellow)
        print("Number of possibilities: ", len(valid_moves), "\n")
        return random.choice(valid_moves)