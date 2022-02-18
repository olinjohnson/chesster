const button = document.getElementById("moveButton");
const display = document.getElementById("mainTag");
const board = document.getElementById("board");
//const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPP11PPP/RNBQKBNR";
const startingFen = "rnb1k1nr/pppp4/4q1p1/1B4Pp/1b5P/2PR4/PP2Np2/RNB1K3";

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
const fenToBoard = (fen) => {
  const pieceLetterFenConversion = {
    R: "rook0",
    N: "knight0",
    B: "bishop0",
    Q: "queen0",
    K: "king0",
    P: "pawn0",
    r: "rook1",
    n: "knight1",
    b: "bishop1",
    q: "queen1",
    k: "king1",
    p: "pawn1",
  };
  var xPos = 0;
  var yPos = 0;
  for (var i = 0, l = fen.length; i < l; i++) {
    if (fen[i] >= "0" && fen[i] <= "9") {
      xPos += Number(fen[i]);
      xPos = xPos == 8 ? 0 : xPos;
    } else if (fen[i] == "/") {
      yPos++;
    } else {
      createPieceElem(yPos, xPos, pieceLetterFenConversion[fen[i]]);
      xPos = xPos == 7 ? 0 : xPos + 1;
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

//Temporary
window.addEventListener("keydown", (e) => {
  if (e.key == "a") {
    unhighlightSquares();
  }
});
