module.exports = Pawn;

function Pawn (square, player) {
  this.square = square;
  this.player = player;
  this.type = 'Pawn';
  this.isFirstMove = true;
}

var Player = require('../player');
var Square = require('../square');

Pawn.prototype.isLegitMove = function isLegitMove(depArgs) {
  var isClearPath = depArgs.square.isClearPathTo(depArgs.destSquare);
    
  if ((this.player === Player.WHITE && depArgs.dir === Square.UP) || (this.player === Player.BLACK && depArgs.dir === Square.DOWN)) {
    var isLegalDiff = this.isFirstMove ? (depArgs.diff.y === 1 || depArgs.diff.y === 2 && isClearPath) : (depArgs.diff.y === 1);
        
    if (depArgs.destSquare.isEmpty === true && depArgs.diff.x === 0 && isLegalDiff) return true;
    this.isFirstMove = false;    
  }
}

Pawn.prototype.isLegitAttack = function isLegitAttack(depArgs) {
  if ((this.player === Player.WHITE && (depArgs.dir === Square.UP_RIGHT || depArgs.dir === Square.UP_LEFT)) || (this.player === Player.BLACK && (depArgs.dir === Square.DOWN_RIGHT || depArgs.dir === Square.DOWN_LEFT))) {     
    if (depArgs.destSquare.isEmpty === false && depArgs.square.player !== depArgs.destSquare.player && depArgs.diff.x === 1 && depArgs.diff.y === 1) return true;
    this.isFirstMove = false;
  }
}

Pawn.prototype.isValidMove = function isValidMove(square, destSquare) {
  var dir = square.getDirectionOf(destSquare);
  var diff = square.getDiffOf(square, destSquare);
  var depArgs = {square: square, destSquare: destSquare, diff: diff, dir: dir};

  if (this.isLegitMove(depArgs) || this.isLegitAttack(depArgs)) return true;
}