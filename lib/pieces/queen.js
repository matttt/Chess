module.exports = Queen;

function Queen (square, player) {
  this.square = square;
  this.player = player;
}

Queen.prototype.isValidMove = function isValidMove(square, destSquare) {
  if (square.isInSameAny(destSquare) && square.isClearPathTo(destSquare)) {
    return true;
  }
}