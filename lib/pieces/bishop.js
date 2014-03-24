module.exports = Bishop;

function Bishop (square, player) {
  this.square = square;
  this.player = player;
  this.type = 'Bishop';
}

Bishop.prototype.isValidMove = function isValidMove(square, destSquare) {
  if (square.isInSameDiag(destSquare) && square.isClearPathTo(destSquare)) {
    return true;
  }
}