from xml.dom import InvalidCharacterErr, InvalidStateErr
import movement_util as mu
from movement_util import Move
import text

class Player:

    def __init__(self, turn):

        self.turn = turn

    def make_player_move(self, board):

        while True:

            try:

                self.request_move(board)

            except InvalidCharacterErr:
                
                continue
            
            break


    def request_move(self, board):

        text.type_text("Please make a move.", color=text.yellow)
        print(text.green)
        assassin_unfiltered = input("Algebraic coords of the piece you are moving: ")
        victim_unfiltered = input("Algebraic coords of intended destination: ")

        if assassin_unfiltered == "quit":

            raise InvalidStateErr


        try:

            move = Move(board.algebraic_to_board_coord(assassin_unfiltered), board.algebraic_to_board_coord(victim_unfiltered))

        except:

            text.type_text("\n\nINVALID. - INVALID BOARD COORDS\n\n", color=text.red)
            raise InvalidCharacterErr

        assassin = board.board[move.assassin[0]][move.assassin[1]]

        # Check to make sure the player isn't moving the computer's piece
        if (assassin.islower() and self.turn == "b") or (assassin.isupper() and self.turn == "w"):

            valid_moves = []

            # Retrieve valid moves
            if assassin.lower() == "r" or assassin.lower() == "b" or assassin.lower() == "q":

                valid_moves = mu.sliding_moves(board, move.assassin[0], move.assassin[1])
            
            elif assassin.lower() == "n" or assassin.lower() == "k":

                valid_moves = mu.limited_moves(board, move.assassin[0], move.assassin[1])
            
            else:

                valid_moves = mu.pawn_moves(board, move.assassin[0], move.assassin[1])

            # If it's a valid move
            for vm in valid_moves:

                if move.destination == vm.destination:

                    board.board[vm.victim[0]][vm.victim[1]] = text.ec
                    board.board[vm.destination[0]][vm.destination[1]] = assassin
                    board.board[vm.assassin[0]][vm.assassin[1]] = text.ec
                    text.type_text("\n\nVALID.", color=text.blue)

                    board.previous_moves.append(vm)

                    return

            text.type_text("\n\nINVALID. - NOT A VALID MOVE", color=text.red)
            raise InvalidCharacterErr

        else:

            text.type_text("\n\nINVALID. - YOU MAY ONLY MOVE YOUR OWN PIECES.", color=text.red)
            raise InvalidCharacterErr
        