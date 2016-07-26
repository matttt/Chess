var Board = require('./board');
var Player = require('./player');
var Move = require('./move');

module.exports = Checkmate;

function Checkmate(board) {
  this.board = board;
  this.kings = this.board.getKings();
  this.squares = this.board.squares;
  this.turn = this.board.turn;
  this.nextTurn = !this.turn;
}

Checkmate.prototype.createFauxBoard = function createFauxBoard() {
  var fauxBoard = new Board(this.board.players, this.nextTurn);

  this.board.forEach(function (s) {
    fauxBoard.squares.push(s)
  });

  return fauxBoard;
}

Checkmate.prototype.canPieceBeAttacked = function canPieceBeAttacked(square) {
  var fauxBoard = this.createFauxBoard(); 
  for (var i = 0; i < fauxBoard.squares.length; i++) {
    var potentialAttacker = fauxBoard.squares[i];

    var potentialMove = new Move(potentialAttacker, square);
    return potentialAttacker.piece;
  };
  return false
}

Checkmate.prototype.getPossibleKingMoves = function getPossibleKingMoves(square) {
  var output = [square];
  for (var i = 0; i < this.squares; i++) {
    var potentialMove = new Move(square, this.squares[i]);
    if (potentialMove.isValid()) {
      output.push(potentialMove)
    }
  };

  return output;
}