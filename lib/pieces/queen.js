module.exports = Queen;

function Queen (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
}

Queen.prototype.isValidMove = function isValidMove(move) {
  return move.square.isColinearWith(move.destSquare) && move.square.isClearPathTo(move.destSquare);
}