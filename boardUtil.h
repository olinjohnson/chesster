#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **generateBoard()
{
    char **board = malloc(sizeof(char *) * 8);
    for (int y = 0; y < 8; y++)
    {
        char *yRow = malloc(sizeof(char) * 8);
        board[y] = yRow;
        for (int x = 0; x < 8; x++)
        {
            char xValue = '-';
            board[y][x] = xValue;
        }
    }
    return board;
}

void printBoard(char **board)
{
    printf("\n    ");
    for (int i = 0; i < 8; i++)
    {
        printf("%i", i);
    }
    printf("\n");

    for (int y = 0; y < 8; y++)
    {
        printf("\n%i   ", y);
        for (int x = 0; x < 8; x++)
        {
            printf("%c", board[y][x]);
        }
    }
    printf("\n\n\n");
}

void clearBoard(char **board)
{
    for (int y = 0; y < 8; y++)
    {
        free(board[y]);
    }
    free(board);
}

char **FENToBoard(char *fen)
{
    char **vanillaBoard = generateBoard();

    int yPos = 0,
        xPos = 0;

    for (int i = 0; i < strlen(fen); i++)
    {
        // If character is a letter/piece
        if ((fen[i] > 96 && fen[i] < 123) || (fen[i] > 64 && fen[i] < 91))
        {
            vanillaBoard[yPos][xPos] = fen[i];
            xPos += 1;
        }
        // If character is a number
        else if (fen[i] > 48 && fen[i] < 57)
        {
            xPos += (int)fen[i] - 48;
        }
        // Otherwise if character is a slash
        else
        {
            yPos += 1;
            xPos = 0;
        }
    }
    return vanillaBoard;
}