/**
 * Dependencies.
 */

var assert = require('assert');

module.exports = Move;

function Move (square, destSquare) {
  assert(square, 'cannot create a Move without a square');
  assert(destSquare, 'cannot create a Move without a destSquare');

  this.square = square;
  this.piece = square.piece;

  assert(this.piece, 'cannot create a Move without a square.piece');  

  this.destSquare = destSquare;
  this.diff = square.getDiffOf(square, destSquare);
  this.dir = square.getDirectionTo(destSquare);
  this.isAttack = destSquare.isEmpty === false && destSquare.player !== square.player;
  this.isClearPath = this.square.isClearPathTo(this.destSquare);
};

Move.prototype.isValid = function isValid() {
  var square = this.square;
  var dest = this.destSquare;

  // invalid:
  // if the target is occupied by our piece
  if(square.player === dest.player) return false;
  // if the target is not a valid piece target
  if(!square.piece.isValidMove(this)) return false;

  // otherwise assume it is valid (not in check)
  return true;
}

