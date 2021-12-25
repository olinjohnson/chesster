const button = document.getElementById('moveButton');
const display = document.getElementById('mainTag');
const board = document.getElementById('board');

const length = 8;
const c1 = '#000000';
const c2 = '#ffffff';
const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

//Function to generate board squares
const generateBoard = () => {
    for(let i = 0; i < length; i++) {
        const newRow = document.createElement('div');
        newRow.id = `row${i}`;
        newRow.className = 'row';
        board.appendChild(newRow);
        for(let x = 0; x < length; x++) {
            newSquare = document.createElement('div');
            newSquare.id = `${i},${x}`;
            newSquare.className = 'square';
            newSquare.className += (x%2 + i%2 == 0 || x%2 + i%2 == 2 ? ' s1' : ' s2');
            newRow.appendChild(newSquare);
        }
    }
}

const fenToBoard = (fen) => {
    rows = fen.split("/");
    for(var i = 0; i < rows.length; i++) {
        for(var x = 0; x < rows[i].length; x++) {
            if(rows[i][x] == 'r' || rows[i][x] == 'R') {
                createPieceElem(i, x, '../public/images/rook.png');
            }else if(rows[i][x] == 'n' || rows[i][x] == 'N') {
                createPieceElem(i, x, '../public/images/knight.png');
            }
            else if(rows[i][x] == 'b' || rows[i][x] == 'B') {
                createPieceElem(i, x, '../public/images/bishop.png');
            }
            else if(rows[i][x] == 'q' || rows[i][x] == 'Q') {
                createPieceElem(i, x, '../public/images/queen.png');
            }
            else if(rows[i][x] == 'k' || rows[i][x] == 'K') {
                createPieceElem(i, x, '../public/images/king.png');
            }
            else if(rows[i][x] == 'p' || rows[i][x] == 'P') {
                createPieceElem(i, x, '../public/images/pawn.png');
            }
        }
    }
}

const fenToArr = (fen) => {
    gameBoard = []

    numDelims = 0;
    for(var i = 0; i < fen.length; i++) {
        if(fen[i] == 'p' || fen[i] == 'P') {
            
        }
    }
}

const createPieceElem = (i, x, piecePath) => {
    piece = document.createElement('img');
    piece.src = piecePath;
    piece.className = 'boardPiece';
    document.getElementById(`${i},${x}`).appendChild(piece);
}

generateBoard()
fenToBoard(startingFen)