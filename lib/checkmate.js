module.exports = Checkmate;

var Player = require('./player');
var Move = require('./move');

function Checkmate (board) {
  this.board = board;
  this.kings = this.board.getKings();
  this.squares = this.board.squares;
  this.turn = this.board.turn;
}

Checkmate.prototype.canPieceBeAttacked = function canPieceBeAttacked(square) {
  for (var i=0; i < this.squares.length; i++) {
    if(!square.piece) continue;
    var potentialMove = new Move(this.squares[i], square);
    if (potentialMove.isValid()) return true;
  };
  return false
}

Checkmate.prototype.getPossibleKingMoves = function getPossibleKingMoves(king) {
  for (var i=0; i < this.squares; i++) {
    var move = new Move(king, this.squares[i]);
    if (this.canPieceMoveToSquare(move)) {
      output.push(this.squares[i])
    }
  };
}

Checkmate.prototype.isCheck = function isCheck() {
 return this.canPieceBeAttacked(this.kings[this.board.turn]);
}

Checkmate.prototype.isCheckmate = function isCheckmate() {
  var kingMoves = this.getPossibleKingMoves(this.kings[this.turn]);
  for (var i=0; i < kingMoves.length; i++) {
    if(this.canPieceBeAttacked(kingMoves[i])) return true;
  };
  return false;
}
