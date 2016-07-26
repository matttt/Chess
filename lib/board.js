var Square = require('./square');
var Player = require('./player');
var Move = require('./move');
var Checkmate = require('./checkmate')

//piece deps
var Queen = require('./pieces/queen');
var King = require('./pieces/king');
var Bishop = require('./pieces/bishop');
var Knight = require('./pieces/knight');
var Rook = require('./pieces/rook');
var Pawn = require('./pieces/pawn');

module.exports = Board;

function Board(players, firstTurn) {
  this.squares = this.createSquares();
  this.players = players;
  this.turn = firstTurn;
  this.turnCount = 0;
  this.excuseTurns = 0;
  this.firstSelection = null;
  this.secondSelection = null;
}

Board.NUM_ROWS = 8;
Board.NUM_COLS = 8;

Board.AVAIL_PIECES = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook];

Board.prototype.nextTurn = function nextTurn() {
  this.turn = this.turn === 0 ? Player.BLACK : Player.WHITE;
  this.turnCount++;
  this.checkmate = new Checkmate(this);
}

Board.prototype.isPiecesTurn = function isPiecesTurn(square) {
  return this.excuseTurns ? true : this.turn === square.player;
}

Board.prototype.createSquares = function createSquares() {
  var squares = []
  for (var y = 0; y < Board.NUM_COLS; y++) {
    for (var x = 0; x < Board.NUM_ROWS; x++) {
      squares.push(new Square([x, y], this));
    };
  };
  return squares;
}

Board.prototype.getSquare = function getSquare(pos) {
  return this.squares[pos[1] * Board.NUM_ROWS + pos[0]];
}

Board.prototype.getChessSquare = function getChessSquare(str) {
  var alphabet = 'ABCDEFGH';
  var map = [8, 7, 6, 5, 4, 3, 2, 1];
  var pos = [alphabet.indexOf(str.substring(0, 1)), map.indexOf(parseInt(str.substring(1, 2)))];

  return this.getSquare(pos);
}

Board.prototype.setKingForPlayer = function setKingOfPlayer(player, piece) {
  this.players[player].king = piece;
}

Board.prototype.getKings = function getKings() {
  var output = [];
  for (var i = 0; i < this.players.length; i++) {
    output.push(this.players[i].king);
  };
  return output;
}

Board.prototype.createPieces = function createPieces(row, player) {
  for (var i = 0; i < Board.AVAIL_PIECES.length; i++) {
    var Type = Board.AVAIL_PIECES[i];
    var piece = new Type(this.getSquare([i, row]), player);
    this.setPiece(this.getSquare([i, row]), piece);

    if (piece instanceof King) this.setKingForPlayer(player, piece);
  };

  this.checkmate = new Checkmate(this);
};

Board.prototype.createPawns = function createPawns(row, player) {
  for (var i = 0; i < Board.NUM_COLS; i++) {
    var pawn = new Pawn(this.getSquare([i, row]), player);
    this.setPiece(this.getSquare([i, row]), pawn);
  };
}

Board.prototype.setPiece = function setPiece(square, piece) {
  square.piece = piece;
  square.player = piece.player;
  square.isEmpty = false;
}

Board.prototype.removePiece = function removePiece(square) {
  square.piece = null;
  square.player = null;
  square.isEmpty = true;
}

Board.prototype.movePiece = function movePiece(square, destSquare) {
  if (typeof square === 'string') square = this.getChessSquare(square);
  if (typeof destSquare === 'string') destSquare = this.getChessSquare(destSquare);

  var move = new Move(square, destSquare);

  if (this.isPiecesTurn(square) && move.isValid()) {
    if (destSquare.piece && square.player !== destSquare.player) {
      this.players[square.player].addTakenPiece(destSquare.piece);
    }
    square.piece.moves = square.piece.moves || [];
    square.piece.moves.push(move);
    this.setPiece(destSquare, move.isPawnUpgrade() ? new Queen(square, this.turn) : square.piece);
    this.removePiece(square);
    this.nextTurn();
    //this.checkmate.canPieceBeAttacked(destSquare);
    return move;
  } else return false;
}

Board.prototype.conductMove = function conductMove(move) {
  return this.movePiece(move.square, move.destSquare);
}

Board.prototype.conductMoveFromPos = function conductMoveFromPos(start,dest) {
  var square = this.getSquare(start);
  var destSquare = this.getSquare(dest);

  var move = new Move(square, destSquare);
  return this.conductMove(move);
}

Board.prototype.isMoveValid = function isMoveValid(square, destSquare) {
  if (square, destSquare) {
    var move = new Move(square, destSquare);
    return move.isValid()
  } else {
    return false
  }
}

Board.prototype.getPiecesTakenBy = function getPiecesTakenBy(player) {
  return this.players[player].getTakenPieces()
}

Board.prototype.getVisualBoardLayout = function getVisualBoardLayout() {
  var rows = ['', '', '', '', '', '', '', ''];

  this.squares.forEach(function (square, index) {
    if (square.piece) {
      rows[square.pos[1]] += square.piece.character + ' ';
    } else {
      rows[square.pos[1]] += 'x ';
    }
  });

  return rows;
}
