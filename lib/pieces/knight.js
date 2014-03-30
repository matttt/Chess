module.exports = Knight;

function Knight (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
}

Knight.prototype.isValidMove = function isValidMove(move) {  
  return (move.diff.x === 2 && move.diff.y === 1) || (move.diff.x === 1 && move.diff.y === 2);
}