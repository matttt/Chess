module.exports = Bishop;

function Bishop (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
  this.character = 'b'
}

Bishop.prototype.isValidMove = function isValidMove(move) {
  return move.square.isInSameDiag(move.destSquare) && move.isClearPath;
}