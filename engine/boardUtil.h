#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

char** fenToBoard(char *fen)
{
    typedef char board[8][8];

    

    int yPos = 0;
    int xPos = 0;

    for(int i = 0, l = strlen(fen); i < l; i++)
    {
        if(isdigit(fen[i]))
        {
            xPos += fen[i] - '0';
            xPos = (xPos == 8) ? 0 : xPos;
        }
        else if(fen[i] != 47)
        {
            xPos = (xPos == 7) ? 0 : xPos + 1;
        }
        else
        {
            strCopy(gameBoard[yPos, xPos], fen[i]);
            yPos++;
        }
    }
    
    return pGameBoard;
}

void destroyBoard(char **board)
{
    for(int i = 0; i < 8; i++)
    {
        free(board[i]);
    }
}

void logBoard(char **board)
{
    for(int i = 0; i < 8; i++)
    {
        for(int x = 0; x < 8; x++)
        {
            printf("%c", board[i][x]);
        }
        printf("\n");
    }
}