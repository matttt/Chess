module.exports = Pawn;

function Pawn (square, player) {
  this.square = square;
  this.player = player;
  this.type = 'Pawn';
  this.isFirstMove = true;
}

var Player = require('../player');
var Square = require('../square');

Pawn.prototype.isValidMove = function isValidMove(square, destSquare) {
  var dir = square.getDirectionOf(destSquare);
  var diff = square.getDiffOf(square, destSquare);
  var isClearPath = square.isClearPathTo(destSquare);
    
  if ((this.player === Player.WHITE && dir === Square.UP) || (this.player === Player.BLACK && dir === Square.DOWN)) {
        
    var isLegalDiff = this.isFirstMove ? (diff.y === 1 || diff.y === 2 && isClearPath) : (diff.y === 1);
        
    if (destSquare.isEmpty === true && diff.x === 0 && isLegalDiff) return true;
    
    this.isFirstMove = false;
    
  } else if ((this.player === Player.WHITE && (dir === Square.UP_RIGHT || dir === Square.UP_LEFT)) || (this.player === Player.BLACK && (dir === Square.DOWN_RIGHT || dir === Square.DOWN_LEFT))) {
               
    if (destSquare.isEmpty === false && square.player !== destSquare.player && diff.x === 1 && diff.y === 1) return true;
    
    this.isFirstMove = false;
    
  }
}