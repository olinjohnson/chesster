from xml.dom import InvalidCharacterErr, InvalidStateErr
import movement_util as mu
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

            assassin_coord = board.algebraic_to_board_coord(assassin_unfiltered)
            victim_coord = board.algebraic_to_board_coord(victim_unfiltered)
        
        except:

            text.type_text("\n\nINVALID. - INVALID BOARD COORDS\n\n", color=text.red)
            raise InvalidCharacterErr

        assassin = board.board[assassin_coord[0]][assassin_coord[1]]
        victim = board.board[victim_coord[0]][victim_coord[1]]

        # Check to make sure the player isn't moving the computer's piece
        if (assassin.islower() and self.turn == "b") or (assassin.isupper() and self.turn == "w"):

            valid_moves = []

            # Retrieve valid moves
            if assassin.lower() == "r" or assassin.lower() == "b" or assassin.lower() == "q":

                valid_moves = mu.sliding_moves(board, assassin_coord[0], assassin_coord[1])
            
            elif assassin.lower() == "n" or assassin.lower() == "k":

                valid_moves = mu.limited_moves(board, assassin_coord[0], assassin_coord[1])
            
            else:

                valid_moves = mu.pawn_moves(board, assassin_coord[0], assassin_coord[1])

            # If it's a valid capture
            if victim_coord in valid_moves:

                board.board[victim_coord[0]][victim_coord[1]] = assassin
                board.board[assassin_coord[0]][assassin_coord[1]] = text.ec
                text.type_text("\n\nVALID.", color=text.blue)
            
            else:

                text.type_text("\n\nINVALID. - NOT A VALID MOVE", color=text.red)
                raise InvalidCharacterErr

        else:

            text.type_text("\n\nINVALID. - YOU MAY ONLY MOVE YOUR OWN PIECES.", color=text.red)
            raise InvalidCharacterErr
        
        print("\n\n")