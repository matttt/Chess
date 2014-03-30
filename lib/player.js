module.exports = Player;

function Player (color) {
  this.color = color
  this.takenPieces = [];
  this.king = null;
}

Player.WHITE = 0;
Player.BLACK = 1;

Player.prototype.addTakenPiece = function addTakenPiece(piece) {
  this.takenPieces.push(piece);
}

Player.prototype.getTakenPieces = function getTakenPieces() {
  return this.takenPieces;
}