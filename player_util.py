from xml.dom import InvalidCharacterErr, InvalidStateErr
import master
import movement_util as mu
import board_util as bu

def make_player_move(board, turn):

    while True:

        try:

            request_move(board, turn)

        except InvalidCharacterErr:
            
            continue
        
        break


def request_move(board, turn):

    master.type_text("Please make a move.", color=master.yellow)
    print(master.green)
    assassin_unfiltered = input("Algebraic coords of the piece you are moving: ")
    victim_unfiltered = input("Algebraic coords of intended destination: ")

    if assassin_unfiltered == "quit":

        raise InvalidStateErr

    try:

        assassin_coord = bu.algebraic_to_board_coord(assassin_unfiltered)
        victim_coord = bu.algebraic_to_board_coord(victim_unfiltered)
    
    except:

        master.type_text("\n\nINVALID. - INVALID BOARD COORDS\n\n", color=master.red)
        raise InvalidCharacterErr

    assassin = board[assassin_coord[0]][assassin_coord[1]]
    victim = board[victim_coord[0]][victim_coord[1]]

    # Check to make sure the player isn't moving the computer's piece
    if (assassin.islower() and turn == "b") or (assassin.isupper() and turn == "w"):

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

            board[victim_coord[0]][victim_coord[1]] = assassin
            board[assassin_coord[0]][assassin_coord[1]] = master.ec
            master.type_text("\n\nVALID.", color=master.blue)
        
        else:

            master.type_text("\n\nINVALID. - NOT A VALID MOVE", color=master.red)
            raise InvalidCharacterErr

    else:

        master.type_text("\n\nINVALID. - YOU MAY ONLY MOVE YOUR OWN PIECES.", color=master.red)
        raise InvalidCharacterErr
    
    print("\n\n")