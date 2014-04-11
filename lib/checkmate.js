module.exports = Checkmate;

var Player = require('./player');
var Move = require('./move');

function Checkmate (board) {
  this.board = board;
  this.kings = this.board.getKings();
  this.squares = this.board.squares;
  this.turn = this.board.turn;
}


Checkmate.prototype.isMoveValid = function isMoveValid(move) {
  return move.isValid()
}

Checkmate.prototype.canPieceBeAttacked = function canPieceBeAttacked(square) {
  for (var i=0; i < this.squares.length; i++) {
    debugger;
    var potentialMove = new Move(this.squares[i], square);
    if (this.isMoveValid(potentialMove)) return true;
  };
  return false
}

Checkmate.prototype.getPossibleKingMoves = function getPossibleKingMoves(square) {
  for (var i=0; i < this.squares; i++) {
    var potentialMove = new Move(square, this.squares[i]);
    if (this.isMoveValid(potentialMove)) {
      output.push(this.squares[i])
    }
  };
}

Checkmate.prototype.isCheck = function isCheck() {
  return this.canPieceBeAttacked(this.kings[this.turn].square);
}

Checkmate.prototype.isCheckmate = function isCheckmate() {
  var kingMoves = this.getPossibleKingMoves(this.kings[this.turn].square);
  for (var i=0; i < kingMoves.length; i++) {
    if(this.canPieceBeAttacked(kingMoves[i])) return true;
  };
  return false;
}