import master
import movement_util as mu
import board_util as bu

def request_move(board):

    print("\n\n")
    master.type_text("Please make a move.")
    assassin_unfiltered = input("Algebraic coords of the piece you are moving: ")
    victim_unfiltered = input("Algebraic coords of intended destination: ")

    try:

        assassin_coord = bu.algebraic_to_board_coord(assassin_unfiltered)
        victim_coord = bu.algebraic_to_board_coord(victim_unfiltered)
    
    except:

        master.type_text("\n\nINVALID. - INVALID BOARD COORDS\n\n")
        return

    assassin = board[assassin_coord[0]][assassin_coord[1]]
    victim = board[victim_coord[0]][victim_coord[1]]

    # Check to make sure the player isn't moving the computer's piece
    if (assassin.islower() and master.turn == "b") or (assassin.isupper() and master.turn == "w"):

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
            master.type_text("\n\nVALID.")
        
        else:

            master.type_text("\n\nINVALID. - NOT A VALID MOVE")

    else:

        master.type_text("\n\nINVALID. - YOU MAY ONLY MOVE YOUR OWN PIECES.")
    
    print("\n\n")