#include <stdio.h>
#include "boardUtil.h"
#include "movementUtil.h"

/*
FEN:
- Uppercase letters signify white pieces
- Lowercase letters signify black pieces
- Numbers signify a number of blank squares in a row
- Slashes signify the end of a row
*/
char *startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

int main(void)
{
    char **gameBoard = FENToBoard(startingFEN);
    printBoard(gameBoard);

    slidingMoves(gameBoard, (int[2]){0,0});

    clearBoard(gameBoard);
    return 0;
}
