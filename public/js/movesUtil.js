var pinnedPieces = {
  0: [],
  1: [],
};

const coordsToBoardPos = (c1, c2) => {
  var l2 = String.fromCharCode(97 + Number(c2));
  return `${l2}${8 - c1}`;
};

//Functinos to calculate valid moves for pieces
const bishopMoves = (yPos, xPos, color) => {
  var validMoves = [];
  for (var oc1 = 0; oc1 < 2; oc1++) {
    for (var oc2 = 0; oc2 < 2; oc2++) {
      var pieceBlocking = 0;
      var pinnedPiece = [];
      var counter = 1;
      while (pieceBlocking < 2) {
        var o1 = oc1 == 0 ? `${yPos - counter}` : `${yPos + counter}`;
        var o2 = oc2 == 0 ? `${xPos - counter}` : `${xPos + counter}`;
        var elem = document.getElementById(`${o1},${o2}`)
          ? document.getElementById(`${o1},${o2}`)
          : null;
        if (elem && !elem.firstChild && pieceBlocking == 0) {
          validMoves.push([o1, o2]);
        } else {
          if (!elem) {
            break;
          }
          if (elem && elem.firstChild) {
            pieceBlocking++;
            var elID = elem.firstChild.id;
            if (pieceBlocking == 1 && color != elID[elID.length - 1]) {
              validMoves.push([o1, o2]);
              pinnedPiece = [o1, o2];
            } else if (
              pieceBlocking == 2 &&
              color != elID[elID.length - 1] &&
              elID.substring(6, elID.length - 1) == "king"
            ) {
              pinnedPieces[color].push(pinnedPiece);
            }
          }
        }
        counter++;
      }
    }
  }
  return validMoves;
};
const rookMoves = (yPos, xPos, color) => {
  var validMoves = [];
  for (var oc1 = 0; oc1 < 4; oc1++) {
    var pieceBlocking = 0;
    var counter = 1;
    var pinnedPiece = [];
    while (pieceBlocking < 2) {
      var directions = [
        `${yPos + counter},${xPos}`,
        `${yPos - counter},${xPos}`,
        `${yPos},${xPos - counter}`,
        `${yPos},${xPos + counter}`,
      ];
      var o = directions[oc1];
      var elem = document.getElementById(o) ? document.getElementById(o) : null;
      if (elem && !elem.firstChild && pieceBlocking == 0) {
        validMoves.push([o[0], o[2]]);
      } else {
        if (!elem) {
          break;
        }
        if (elem && elem.firstChild) {
          pieceBlocking++;
          var elID = elem.firstChild.id;
          if (pieceBlocking == 1 && color != elID[elID.length - 1]) {
            validMoves.push([o[0], o[2]]);
            pinnedPiece = [o[0], o[2]];
          } else if (
            pieceBlocking == 2 &&
            color != elID[elID.length - 1] &&
            elID.substring(6, elID.length - 1) == "king"
          ) {
            pinnedPieces[color].push(pinnedPiece);
          }
        }
      }
      counter++;
    }
  }
  return validMoves;
};
const kingMoves = (yPos, xPos, color) => {
  var validMoves = [];
  for (var i = -1; i < 2; i++) {
    for (var x = -1; x < 2; x++) {
      var elem = document.getElementById(`${yPos + i},${xPos + x}`);
      if (elem && !elem.firstChild) {
        validMoves.push([yPos + i, xPos + x]);
      } else if (
        elem &&
        color != elem.firstChild.id[elem.firstChild.id.length - 1]
      ) {
        validMoves.push([yPos + i, xPos + x]);
      }
    }
  }
  return validMoves;
};
//Function to calculate valid moves for a pawn
const pawnMoves = (yPos, xPos, color) => {
  var validMoves = [];
  var direction = color == "0" ? -1 : 1;
  for (var i = -1; i < 2; i++) {
    var elem = document.getElementById(`${yPos + direction},${xPos + i}`);
    if (elem && !elem.firstChild && i == 0) {
      validMoves.push([yPos + direction, xPos + i]);
    } else if (
      elem &&
      elem.firstChild &&
      color != elem.firstChild.id[elem.firstChild.id.length - 1] &&
      i != 0
    ) {
      validMoves.push([yPos + direction, xPos + i]);
    }
  }
  //Double pawn moves
  if (yPos == 1 || yPos == 6) {
    if (
      document.getElementById(`${yPos + direction * 2},${xPos}`) &&
      !document.getElementById(`${yPos + direction},${xPos}`).firstChild &&
      !document.getElementById(`${yPos + direction * 2},${xPos}`).firstChild
    ) {
      validMoves.push([yPos + direction * 2, xPos]);
    }
  }
  //En Passent TODO
  return validMoves;
};
//Function to calculate squares that a pawn is attacking
const pawnAttackMoves = (yPos, xPos, color) => {
  var validMoves = [];
  var direction = color == "0" ? -1 : 1;
  for (var i = -1; i < 2; i++) {
    var elem = document.getElementById(`${yPos + direction},${xPos + i}`);
    if (elem && i != 0) {
      validMoves.push([yPos + direction, xPos + i]);
    }
  }
  return validMoves;
};
const knightMoves = (yPos, xPos, color) => {
  var validMoves = [];
  var operations = [
    `${yPos + 2},${xPos + 1}`,
    `${yPos + 2},${xPos - 1}`,
    `${yPos + 1},${xPos + 2}`,
    `${yPos + 1},${xPos - 2}`,
    `${yPos - 1},${xPos + 2}`,
    `${yPos - 1},${xPos - 2}`,
    `${yPos - 2},${xPos + 1}`,
    `${yPos - 2},${xPos - 1}`,
  ];
  for (var i = 0; i < operations.length; i++) {
    elem = document.getElementById(operations[i]);
    if (elem && !elem.firstChild) {
      validMoves.push([operations[i][0], operations[i][2]]);
    } else if (
      elem &&
      color != elem.firstChild.id[elem.firstChild.id.length - 1]
    ) {
      validMoves.push([operations[i][0], operations[i][2]]);
    }
  }
  return validMoves;
};

//Pawn promotion helper functions (mostly for GUI pop-up)
const checkPawnPromo = (e, id) => {
  //Check for pawn promo
  if (
    id.substring(6, id.length - 1) == "pawn" &&
    (e.target.id[0] == "7" ||
      e.target.id[0] == "0" ||
      e.target.id[3] == "7" ||
      e.target.id[3] == "0")
  ) {
    showPopupForm(id);
  }
};
const showPopupForm = (id) => {
  var disableElem = document.createElement("div");
  document.body.appendChild(disableElem);
  disableElem.classList.add("disable-elem");
  document.querySelector(".popup-form-container").style.visibility = "visible";
  document.querySelectorAll(".popup-form-elem").forEach((element) => {
    element.src = replaceSubstr(
      element.src,
      element.src.length - 5,
      element.src.length - 4,
      id[id.length - 1]
    );
    element.addEventListener(
      "click",
      () => {
        pawnPromotedSwitch(id, element.src);
      },
      { once: true }
    );
  });
};
const pawnPromotedSwitch = (pawnID, newElemSrc) => {
  if (document.getElementById(pawnID)) {
    var elemPromoted = document.getElementById(pawnID);
    var newPieceName = newElemSrc.substring(70, newElemSrc.length - 5);
    elemPromoted.id = replaceSubstr(
      elemPromoted.id,
      6,
      pawnID.length - 1,
      newPieceName
    );
    elemPromoted.style.backgroundImage = replaceSubstr(
      elemPromoted.style.backgroundImage,
      27,
      elemPromoted.style.backgroundImage.length - 7,
      newPieceName
    );
    document.body.removeChild(document.querySelector(".disable-elem"));
    document.querySelector(".popup-form-container").style.visibility = "hidden";
  }
};
