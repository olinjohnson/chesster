#include <stdio.h>
#include "boardUtil.h"

int main(void)
{
    puts("Hello Universe!");
    char **board = fenToBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    for(int i = 0; i < 8; i++)
    {
        for(int x = 0; x < 8; x++)
        {
            printf("%c", board[i][x]);
        }
        printf("\n");
    }
    destroyBoard(board);
    return 0;
}