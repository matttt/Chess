module.exports = Player;

function Player (color) {
  this.color = color
  this.takenPieces = [];
}

Player.WHITE = 0;
Player.BLACK = 1;