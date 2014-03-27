module.exports = Knight;

function Knight (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
}

Knight.prototype.isValidMove = function isValidMove(square, destSquare) {
  var diff = square.getDiffOf(square, destSquare);
  
  if ((diff.x === 2 && diff.y === 1) || (diff.x === 1 && diff.y === 2)) {
    return true;
  }
}