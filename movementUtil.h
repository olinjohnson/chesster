#include <stdio.h>
#include <ctype.h>

int directions[8][2] = 
{
    {1, 0},
    {0, 1},
    {-1, 0},
    {0, -1},
    {-1, -1},
    {-1, 1},
    {1, -1},
    {1, 1}
}; 

typedef struct Valid_Moves {
    int* move;
    struct Valid_Moves* next;
} Valid_Move;

void slidingMoves(char** board, int* coords)
{
    char piece = board[coords[0]][coords[1]];

    int y = coords[0],
        x = coords[1];

    Valid_Move* initialValidMove = malloc(sizeof(Valid_Move));

    int start = 0,
        stop = 8;
    if(tolower(piece) == 'b')
    {
        start = 4;
    }
    else if(tolower(piece) == 'r')
    {
        stop = 4;
    }

    for(int d = start; d < stop; start++)
    {
        int yOffset = directions[d][0],
            xOffset = directions[d][1];

        while(x < 7 && y < 7 && x > 0 && y > 0)
        {
            y += yOffset;
            x += xOffset;
            if(board[y][x] == '-')
            {
                Valid_Move newValidMove = malloc(sizeof(Valid_Move));
                newValidMove.move[0] = y;
                newValidMove.move[1] = x;
                initialValidMove.next = &newValidMove;
            }
        }
        break;
    }
}