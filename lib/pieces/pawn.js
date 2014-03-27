module.exports = Pawn;

var Player = require('../player');
var Square = require('../square');
var Move = require('../move');

function Pawn (square, player) {
  this.square = square;
  this.player = player;
  this.type = this.constructor;
}

Pawn.prototype.isFirstMove = function isFirstMove() {
  if (!this.moves) return true;
  return this.moves.length === 0;
}

Pawn.prototype.isLegitMove = function isLegitMove(move) {
  var isClearPath = move.square.isClearPathTo(move.destSquare);
    
  if ((this.player === Player.WHITE && move.dir === Square.UP) || (this.player === Player.BLACK && move.dir === Square.DOWN)) {
    var isLegalDiff = this.isFirstMove() ? (move.diff.y === 1 || move.diff.y === 2 && isClearPath) : (move.diff.y === 1);
        
    if (move.destSquare.isEmpty === true && move.diff.x === 0 && isLegalDiff) return true;
  }
}

Pawn.prototype.isLegitAttack = function isLegitAttack(move) {
  var playerDir = this.player === Player.WHITE ? 'UP' : 'DOWN';
  var isValidDir = move.dir === Square[playerDir + '_LEFT'] || move.dir === Square[playerDir + '_RIGHT'];
  var isValidDiff = move.diff.x === 1 && move.diff.y === 1;
  
  return isValidDir && isValidDiff;
}

Pawn.prototype.isValidMove = function isValidMove(square, destSquare) {
  var move = new Move(square, destSquare);

  if (this.isLegitMove(move) || this.isLegitAttack(move)) return true;
}