module.exports = Move;

function Move (square, destSquare) {
  this.square = square;
  this.destSquare = destSquare;
  this.diff = square.getDiffOf(square, destSquare);
  this.dir = square.getDirectionTo(destSquare);
  this.isAttack = destSquare.isEmpty === false && destSquare.player !== square.player;
};

Move.prototype.isValid = function isValid() {
  return this.square.player !== this.destSquare.player && this.square.isEmpty === false
}
