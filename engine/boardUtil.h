#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

// Board dimensions
int dimX = 8,
    dimY = 8;

char **fenToCharBoard(char *fen)
{
    // Initialize pointer to gameboard
    char **pBoard;
    pBoard = malloc(dimY * sizeof(char *));
    for (int i = 0; i < dimY; i++)
    {
        pBoard[i] = malloc(dimX * sizeof(char));
        for (int x = 0; x < dimX; x++)
        {
            pBoard[i][x] = 'E';
        }
    }
    // Input pieces into board array
    int xPos = 0;
    int yPos = 0;
    for (int i = 0, l = strlen(fen); i < l; i++)
    {
        if (isdigit(fen[i]))
        {
            xPos += fen[i] - '0';
            xPos = (xPos == 8) ? 0 : xPos;
        }
        else if (fen[i] == 47)
        {
            yPos++;
        }
        else
        {
            pBoard[yPos][xPos] = fen[i];
            xPos = (xPos == 7) ? 0 : xPos + 1;
        }
    }
    return pBoard;
}

void destroyBoard(char **board)
{
    for (int i = 0; i < dimY; i++)
    {
        free(board[i]);
    }
    free(board);
}

void printBoard(char **board)
{
    for (int i = 0; i < 8; i++)
    {
        for (int x = 0; x < 8; x++)
        {
            printf("%c", board[i][x]);
        }
        printf("\n");
    }
}