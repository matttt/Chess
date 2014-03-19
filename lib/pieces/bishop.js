module.exports = Bishop;

function Bishop (square, player) {
  this.square = square;
  this.player = player;
}

Bishop.prototype.isValidMove = function isValidMove(square, destSquare) {
  if (square.isInSameDiag(destSquare)) {
    return true;
  }
}