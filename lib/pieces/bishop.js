module.exports = Bishop;

function Bishop (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
}

Bishop.prototype.isValidMove = function isValidMove(move) {
  return move.square.isInSameDiag(move.destSquare) && move.square.isClearPathTo(move.destSquare);
}