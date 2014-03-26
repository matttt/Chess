module.exports = King;

function King (square, player) {
  this.square = square;
  this.player = player;
  this.type = 'King';
}

King.prototype.isValidMove = function isValidMove(square, destSquare) {
  var diff = square.getDiffOf(square, destSquare);
  
  if (diff.x <= 1 && diff.y <= 1) {
    return true;
  }
}