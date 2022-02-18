//Function that will return a list of squares that are being attacked by a specified color
const getAttackingSquares = (color) => {
  var attackedSquares = [];
  for (var i = 0; i < 8; i++) {
    for (var x = 0; x < 8; x++) {
      var elem = document.getElementById(`${i},${x}`);
      if (elem.firstChild) {
        var eID = elem.firstChild.id;
        if (eID[eID.length - 1] == color) {
          var pName = eID.substring(6, eID.length - 1);
          if (pName == "pawn") {
            attackedSquares = attackedSquares.concat(
              pawnAttackMoves(i, x, color)
            );
          } else if (pName == "knight") {
            attackedSquares = attackedSquares.concat(knightMoves(i, x, color));
          } else if (pName == "queen") {
            attackedSquares = attackedSquares.concat(bishopMoves(i, x, color));
            attackedSquares = attackedSquares.concat(rookMoves(i, x, color));
          } else if (pName == "king") {
            attackedSquares = attackedSquares.concat(kingMoves(i, x, color));
          } else if (pName == "bishop") {
            attackedSquares = attackedSquares.concat(bishopMoves(i, x, color));
          } else if (pName == "rook") {
            attackedSquares = attackedSquares.concat(rookMoves(i, x, color));
          }
        }
      }
    }
  }
  return attackedSquares;
};
//Function to highlight all squares that are being attacked
const highlightAttackingSquares = (color) => {
  var squares = getAttackingSquares(color);
  squares.forEach((square) => {
    document.getElementById(`${square[0]},${square[1]}`).classList.add("TEST");
  });
};
//Function to unhighlight squares
const unhighlightSquares = () => {
  for (var i = 0; i < 8; i++) {
    for (var x = 0; x < 8; x++) {
      if (document.getElementById(`${i},${x}`).classList.contains("TEST")) {
        document.getElementById(`${i},${x}`).classList.remove("TEST");
      }
    }
  }
};
//Function that will return an object of pinned pieces
//The object contains two lists for each color that store the pinned pieces respectively
const getPinnedPieces = () => {
  pinnedPieces = {
    0: [],
    1: [],
  };
  for (var i = 0; i < 8; i++) {
    for (var x = 0; x < 8; x++) {
      var elem = document.getElementById(`${i},${x}`);
      if (elem.firstChild) {
        var eID = elem.firstChild.id;
        var pCol = eID[eID.length - 1];
        var pName = eID.substring(6, eID.length - 1);
        if (pName == "pawn") {
          pawnMoves(i, x, pCol);
        } else if (pName == "knight") {
          knightMoves(i, x, pCol);
        } else if (pName == "queen") {
          bishopMoves(i, x, pCol);
          rookMoves(i, x, pCol);
        } else if (pName == "king") {
          kingMoves(i, x, pCol);
        } else if (pName == "bishop") {
          bishopMoves(i, x, pCol);
        } else if (pName == "rook") {
          rookMoves(i, x, pCol);
        }
      }
    }
  }
  console.log(pinnedPieces);
  return pinnedPieces;
};
//Functions to highlight and unhighlight pinned pieces
const highlightPinnedPieces = (color) => {
  getPinnedPieces();
  pinnedPieces[0].forEach((p) => {
    document.getElementById(`${p[0]},${p[1]}`).classList.add("TEST2");
  });
  pinnedPieces[1].forEach((p) => {
    document.getElementById(`${p[0]},${p[1]}`).classList.add("TEST2");
  });
};
const unHighlightPinnedPieces = () => {
  for (var i = 0; i < 8; i++) {
    for (var x = 0; x < 8; x++) {
      document.getElementById(`${i},${x}`).classList.remove("TEST2");
    }
  }
};
