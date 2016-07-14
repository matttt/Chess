module.exports = King;

function King (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
  this.character = 'K'
}

King.prototype.isValidMove = function isValidMove(move) {
  return move.diff.x <= 1 && move.diff.y <= 1;
}