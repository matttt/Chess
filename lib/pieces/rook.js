module.exports = Rook;

function Rook (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
}

Rook.prototype.isValidMove = function isValidMove(square, destSquare) {
  if ((square.isInSameColumn(destSquare) || square.isInSameRow(destSquare)) && square.isClearPathTo(destSquare)) {
    return true;
  }
}