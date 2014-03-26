module.exports = Player;

function Player (color) {
  this.color = color
  this.takenPieces = [];
}

Player.prototype.addTakenPiece = function addTakenPiece(piece) {
  this.takenPieces.push(piece);
}

Player.prototype.getTakenPieces = function getTakenPieces() {
    return this.takenPieces;
}

Player.WHITE = 0;
Player.BLACK = 1;