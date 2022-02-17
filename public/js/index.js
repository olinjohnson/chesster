const button = document.getElementById("moveButton");
const display = document.getElementById("mainTag");
const board = document.getElementById("board");
//const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPP11PPP/RNBQKBNR";
const startingFen =
  "rnb1k1nr/pppp1111/1111q1p1/1B1111Pp/1b11111P/11PR1111/PP11Np11/RNB1K111";

//Function to generate board squares
const generateBoard = () => {
  for (let i = 0; i < 8; i++) {
    const newRow = document.createElement("div");
    newRow.id = `row${i}`;
    newRow.className = "row";
    board.appendChild(newRow);
    for (let x = 0; x < 8; x++) {
      newSquare = document.createElement("div");
      newSquare.id = `${i},${x}`;
      newSquare.className = "square";
      newSquare.className +=
        (x % 2) + (i % 2) == 0 || (x % 2) + (i % 2) == 2 ? " s1" : " s2";
      newSquare.addEventListener("dragover", dragOver);
      newSquare.addEventListener("dragleave", dragLeave);
      newSquare.addEventListener("dragenter", dragEnter);
      newSquare.addEventListener("drop", drop);
      newRow.appendChild(newSquare);
    }
  }
};

//Function that create piece elements on the board
const createPieceElem = (i, x, pieceName) => {
  piece = document.createElement("div");
  piece.className = "boardPiece";
  piece.className += ` ${pieceName.substring(0, pieceName.length - 1)}`;
  piece.className += ` col${pieceName[pieceName.length - 1]}`;
  piece.style.backgroundImage = `url(../public/images/set1/${pieceName}.png)`;
  piece.setAttribute("draggable", true);
  piece.id = `img${i},${x}${pieceName}`;
  piece.addEventListener("dragstart", dragStart);
  piece.addEventListener("dragend", dragEnd);
  document.getElementById(`${i},${x}`).appendChild(piece);
};

//Function that will take in a fen string and output it on the game board
//NEEDS FIXING - Faulty
const fenToBoard = (fen) => {
  rows = fen.split("/");
  for (var i = 0; i < rows.length; i++) {
    for (var x = 0; x < rows[i].length; x++) {
      if (rows[i][x] == "R") {
        createPieceElem(i, x, "rook0");
      } else if (rows[i][x] == "N") {
        createPieceElem(i, x, "knight0");
      } else if (rows[i][x] == "B") {
        createPieceElem(i, x, "bishop0");
      } else if (rows[i][x] == "Q") {
        createPieceElem(i, x, "queen0");
      } else if (rows[i][x] == "K") {
        createPieceElem(i, x, "king0");
      } else if (rows[i][x] == "P") {
        createPieceElem(i, x, "pawn0");
      } else if (rows[i][x] == "r") {
        createPieceElem(i, x, "rook1");
      } else if (rows[i][x] == "n") {
        createPieceElem(i, x, "knight1");
      } else if (rows[i][x] == "b") {
        createPieceElem(i, x, "bishop1");
      } else if (rows[i][x] == "q") {
        createPieceElem(i, x, "queen1");
      } else if (rows[i][x] == "k") {
        createPieceElem(i, x, "king1");
      } else if (rows[i][x] == "p") {
        createPieceElem(i, x, "pawn1");
      }
    }
  }
};

//Function to replace a substring of a given string with a certain value
const replaceSubstr = (str, start, end, content) => {
  return str.substring(0, start) + content + str.substring(end);
};

//Function to convert the current board position to a fen string
const boardToFen = () => {
  bfen = "";
  for (var i = 0; i < 8; i++) {
    for (var x = 0; x < 8; x++) {
      if (document.getElementById(`${i},${x}`).firstChild) {
        newchar = "";
        if (
          document.getElementById(`${i},${x}`).firstChild.classList[1] ==
          "knight"
        ) {
          newchar = "n";
        } else {
          newchar = document.getElementById(`${i},${x}`).firstChild
            .classList[1][0];
        }
        if (
          document.getElementById(`${i},${x}`).firstChild.classList[2] == "col0"
        ) {
          newchar = newchar.toUpperCase();
        }
        bfen += newchar;
      } else {
        bfen += "1";
      }
    }
    if (i != 7) {
      bfen += "/";
    }
  }
  for (var z = 0; z < bfen.length; z++) {
    if (bfen[z] == "1") {
      var char = z + 1;
      while (true) {
        if (bfen[char] == "1") {
          char++;
        } else {
          break;
        }
      }
      bfen = replaceSubstr(bfen, z, char, `${char - z}`);
    }
  }

  return bfen;
};

//Function to execute a move and send the board's fen and turn to backend and engine program.
const executeMove = () => {
  bfen = boardToFen();
  console.log(bfen);
  window.api.ipcRenderer.send("move", bfen);
};

generateBoard();
fenToBoard(startingFen);
window.addEventListener("keydown", (e) => {
  if (e.key == "a") {
    unhighlightSquares();
  }
});
