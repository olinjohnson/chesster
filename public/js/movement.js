//var piecesTaken0 = [];
//var piecesTaken1 = [];
var movesRecord = [];
var currentMove = [];
//var kingHasBeenCheck = false;
//var kingInCheck = false;
var turn = 0;

const dragStart = (e) => {
  var c = e.target.id[e.target.id.length - 1];
  if (Number(c) == turn) {
    e.dataTransfer.setData("id", e.target.id);
    currentMove = [e.target.id[3], e.target.id[5]];
    displayValidMoves(e.target.id);
    setTimeout(() => {
      e.target.classList.add("hide");
    }, 0);
  } else {
    e.preventDefault();
  }
};

const dragOver = (e) => {
  if (!e.target.firstChild && e.target.tagName != "IMG") {
    e.preventDefault();
    e.target.classList.add("dragover");
  }
};

const dragEnter = (e) => {
  if (!e.target.firstChild && e.target.tagName != "IMG") {
    e.preventDefault();
    e.target.classList.add("dragover");
  }
};

const dragLeave = (e) => {
  e.target.classList.remove("dragover");
};

const dragEnd = (e) => {
  e.target.classList.remove("hide");
  for (var i = 0; i < 8; i++) {
    for (var x = 0; x < 8; x++) {
      document.getElementById(`${i},${x}`).classList.remove("validmove");
      document.getElementById(`${i},${x}`).classList.remove("validcapture");
    }
  }
  currentMove = [];
};

const drop = (e) => {
  e.preventDefault();
  var id = e.dataTransfer.getData("id");
  const elemDragged = document.getElementById(id);
  const mov = e.target.classList.contains("validmove") ? true : false;
  const cap = e.target.parentNode.classList.contains("validcapture")
    ? true
    : false;
  //Check if drop position is a valid move or valid capture
  if (mov || cap) {
    elemDragged.classList.remove("hide");
    //Update ID
    elemDragged.id = replaceSubstr(
      id,
      3,
      6,
      mov ? e.target.id : e.target.id.substring(3, 6)
    );
    id = elemDragged.id;

    //Execute drop
    if (cap) {
      e.target.parentNode.appendChild(elemDragged);
      e.target.parentNode.removeChild(e.target);
    } else {
      e.target.appendChild(elemDragged);
    }

    //Record move in movesRecord[] list
    movesRecord.push([
      [currentMove[0], currentMove[1]],
      [elemDragged.id[3], elemDragged.id[5]],
    ]);

    //Show new move in the side bar
    showNewMoveInSidebar(
      id.substring(6, id.length - 1),
      id[id.length - 1],
      movesRecord.length - 1
    );
    checkPawnPromo(e, id);
    turn = turn == 0 ? 1 : 0;
  }

  /*highlightAttackingSquares(elemDragged.id[elemDragged.id.length - 1]);
  unHighlightPinnedPieces();
  highlightPinnedPieces(id[id.length - 1]);*/
};

const showNewMoveInSidebar = (piece, color, mIndex) => {
  var sidebarC = document.getElementById("sidebarContainer");
  var newMoveContainer = document.createElement("div");
  newMoveContainer.classList.add("newMoveContainer");
  sidebarC.insertBefore(newMoveContainer, sidebarC.firstChild);
  var elem = document.createElement("img");
  elem.src = `../public/images/set1/${piece}${color}.png`;
  elem.classList.add("sidebarPiece");
  newMoveContainer.appendChild(elem);
  var textElem = document.createElement("p");
  textElem.textContent = `${coordsToBoardPos(
    movesRecord[mIndex][0][0],
    movesRecord[mIndex][0][1]
  )} \u2192 ${coordsToBoardPos(
    movesRecord[mIndex][1][0],
    movesRecord[mIndex][1][1]
  )}`;
  newMoveContainer.appendChild(textElem);
};

//TODO:
//Allow castling, check for "check", en passant, show taken pieces
const displayValidMoves = (pieceID) => {
  pieceName = pieceID.substring(6, pieceID.length - 1);
  var yPos = Number(pieceID[3]);
  var xPos = Number(pieceID[5]);
  if (pieceName == "queen") {
    displayMoves(rookMoves(yPos, xPos, pieceID[pieceID.length - 1]));
    displayMoves(bishopMoves(yPos, xPos, pieceID[pieceID.length - 1]));
  } else if (pieceName == "king") {
    displayMoves(kingMoves(yPos, xPos, pieceID[pieceID.length - 1]));
  } else if (pieceName == "bishop") {
    displayMoves(bishopMoves(yPos, xPos, pieceID[pieceID.length - 1]));
  } else if (pieceName == "knight") {
    displayMoves(knightMoves(yPos, xPos, pieceID[pieceID.length - 1]));
  } else if (pieceName == "rook") {
    displayMoves(rookMoves(yPos, xPos, pieceID[pieceID.length - 1]));
  } else if (pieceName == "pawn") {
    displayMoves(pawnMoves(yPos, xPos, pieceID[pieceID.length - 1]));
  }
};

const displayMoves = (moves) => {
  for (var i = 0; i < moves.length; i++) {
    var squareElem = document.getElementById(`${moves[i][0]},${moves[i][1]}`);
    if (!squareElem.firstChild) {
      squareElem.classList.add("validmove");
    } else {
      squareElem.classList.add("validcapture");
    }
  }
};
