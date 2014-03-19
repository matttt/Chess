module.exports = Pawn;

function Pawn (square, player) {
  this.square = square;
  this.player = player;
}

Pawn.prototype.moveTo = function moveTo(square) {
  this.square = square;
}