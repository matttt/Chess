module.exports = Move;

var Pawn = require('./pieces/pawn')

function Move (square, destSquare) {
  this.square = square;
  this.destSquare = destSquare;
  this.board = square.board;
  this.diff = square.getDiffOf(square, destSquare);
  this.dir = square.getDirectionTo(destSquare);
  this.isAttack = destSquare.isEmpty === false && destSquare.player !== square.player;
  this.isClearPath = this.square.isClearPathTo(this.destSquare);
  this.checkmate = this.board.checkmate;
};

Move.prototype.isValid = function isValid() {
  return this.square.player !== this.destSquare.player 
  && this.square.isEmpty === false 
  && this.square.piece.isValidMove(this)
  //&& this.checkmate.canKingBeSafeNextTurn()
}

Move.prototype.isPawnUpgrade = function isPawnUpgrade() {
  if (this.square.piece instanceof Pawn) {
    var oppositeSide = this.board.turn ? 7 : 0

    return this.destSquare.pos[1] === oppositeSide
  }
}

