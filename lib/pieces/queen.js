module.exports = Queen;

function Queen (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
}

Queen.prototype.isValidMove = function isValidMove(square, destSquare) {
  if (square.isColinearWith(destSquare) && square.isClearPathTo(destSquare)) {
    return true;
  }
}