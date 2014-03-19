module.exports = Rook;

function Rook (square, player) {
  this.square = square;
  this.player = player;
}

Rook.prototype.isValidMove = function isValidMove(square, destSquare) {
  if (square.isInSameColumn(destSquare) || square.isInSameRow(destSquare)) {
    return true;
  }
}