import text

previous_moves = []

directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 1],
    [-1, 1],
    [-1, -1],
    [1, -1],

    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2]
]

class Move():

    def __init__(self, assassin, victim):
        self.assassin = assassin
        self.victim = victim


def sliding_moves(board, y_pos, x_pos):

    piece = board.board[y_pos][x_pos]

    start_dir = 0 if piece.lower() != "b" else 4
    end_dir = 8 if piece.lower() != "r" else 4

    moves = []

    for i in range(start_dir, end_dir):
        d = directions[i]
        y_offset = y_pos + d[0]
        x_offset = x_pos + d[1]

        blocked = 0

        while y_offset < text.height and y_offset > -1 and x_offset < text.width and x_offset > -1 and blocked == 0:
            
            if board.board[y_offset][x_offset] != text.ec:
                blocked = 1
                blocking = board.board[y_offset][x_offset]

                # Capture
                if not (blocking.islower() and piece.islower()) and not (blocking.isupper() and piece.isupper()):
                    moves.append(Move([y_pos, x_pos], [y_offset, x_offset]))
            else:
                # Empty square
                moves.append(Move([y_pos, x_pos], [y_offset, x_offset]))

            y_offset = y_offset + d[0]
            x_offset = x_offset + d[1]

    return moves

def limited_moves(board, y_pos, x_pos):
    
    piece = board.board[y_pos][x_pos]
    start_dir = 0 if piece.lower() == "k" else 8
    end_dir = 8 if piece.lower() == "k" else 16

    moves = []

    for i in range(start_dir, end_dir):
        
        d = directions[i]
        y_offset = y_pos + d[0]
        x_offset = x_pos + d[1]

        if y_offset < text.height and y_offset > -1 and x_offset < text.width and x_offset > -1:

            blocking = board.board[y_offset][x_offset]

            if blocking != text.ec:

                # Capture
                if not (blocking.islower() and piece.islower()) and not (blocking.isupper() and piece.isupper()):
                    moves.append(Move([y_pos, x_pos], [y_offset, x_offset]))
            
            else:

                # Empty square
                moves.append(Move([y_pos, x_pos], [y_offset, x_offset]))
    
    return moves


def pawn_moves(board, y_pos, x_pos):

    piece = board.board[y_pos][x_pos]

    moves = []

    for i in range(-1, 2):

        d = [1, i] if piece.islower() else [-1, i]

        y_offset = y_pos + d[0]
        x_offset = x_pos + d[1]

        if y_offset < text.height and y_offset > -1 and x_offset < text.width and x_offset > -1:
            
            blocking = board.board[y_offset][x_offset]

            if blocking == text.ec and i == 0:

                # Empty Square
                moves.append(Move([y_pos, x_pos], [y_offset, x_offset]))

                # Check for double move initially
                if y_pos == 1 or y_pos == 6:

                    y_offset = y_offset + d[0]
                    x_offset = x_offset + d[1]

                    if board.board[y_offset][x_offset] == text.ec:
                        
                        # Pawn is on starting square and can move 2 spaces
                        moves.append(Move([y_pos, x_pos], [y_offset, x_offset]))
            
            elif ((blocking.islower() and piece.isupper()) or (blocking.isupper() and piece.islower())) and i != 0:
                
                # Capture
                moves.append(Move([y_pos, x_pos], [y_offset, x_offset]))

    return moves