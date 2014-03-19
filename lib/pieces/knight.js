module.exports = Knight;

function Knight (square, player) {
  this.square = square;
  this.player = player;
}

Knight.prototype.moveTo = function moveTo(square) {
  this.square = square;
}