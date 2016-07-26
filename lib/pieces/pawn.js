module.exports = Pawn;

var Player = require('../player');
var Square = require('../square');
var Move = require('../move');

function Pawn(square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
  this.character = 'p'
}

Pawn.prototype.isFirstMove = function isFirstMove() {
  if (!this.moves) return true;
  return this.moves.length === 0;
}

Pawn.prototype.isLegitMove = function isLegitMove(move) {
  var isClearPath = move.square.isClearPathTo(move.destSquare);
  var isValidDir = move.dir === (this.player ? Square['DOWN'] : Square['UP']);
  var isValidDiff = move.diff.x === 0 && this.isFirstMove() ? move.diff.y <= 2 : move.diff.y === 1;

  return move.destSquare.isEmpty === true && move.diff.x === 0 && isValidDiff && move.isClearPath && isValidDir;
}

Pawn.prototype.isLegitAttack = function isLegitAttack(move) {
  if (move.destSquare.piece) {
    var playerDir = this.player === Player.WHITE ? 'UP' : 'DOWN';
    var isValidDir = move.dir === Square[playerDir + '_LEFT'] || move.dir === Square[playerDir + '_RIGHT'];
    var isValidDiff = move.diff.x === 1 && move.diff.y === 1;
    var isDestEnemyPiece = move.destSquare.piece.player != this.player;

    return isValidDir && isValidDiff && isDestEnemyPiece;
  } else {
    return false;
  }
}

Pawn.prototype.isValidMove = function isValidMove(move) {
  return this.isLegitMove(move) || this.isLegitAttack(move);
}