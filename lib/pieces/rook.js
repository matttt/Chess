module.exports = Rook;

function Rook (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
}

Rook.prototype.isValidMove = function isValidMove(move) {
    return (move.square.isInSameColumn(move.destSquare) || move.square.isInSameRow(move.destSquare)) && move.square.isClearPathTo(move.destSquare);
}