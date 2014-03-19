module.exports = King;

function King (square, player) {
  this.square = square;
  this.player = player;
}

King.prototype.moveTo = function moveTo(square) {
  this.square = square;
}