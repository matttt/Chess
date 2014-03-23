var Square = require('./square');
var Player = require('./player')

//piece deps
var Queen = require('./pieces/queen');
var King = require('./pieces/king');
var Bishop = require('./pieces/bishop');
var Knight = require('./pieces/knight');
var Rook = require('./pieces/rook');
var Pawn = require('./pieces/pawn');

module.exports = Board;

function Board() {
  this.squares = this.createSquares();
}

Board.NUM_ROWS = 8;
Board.NUM_COLS = 8;

Board.AVAIL_PIECES = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook];

Board.prototype.createSquares = function createSquares () {
  var squares = []
  for (var y=0; y < Board.NUM_COLS; y++) {
    for (var x=0; x < Board.NUM_ROWS; x++) {
      squares.push(new Square([x,y]));
    };
  };
  return squares;
}

Board.prototype.getSquare = function getSquare (pos) {
  return this.squares[pos[1]*Board.NUM_ROWS+pos[0]];
}

Board.prototype.isWithinBounds = function isWithinBounds(square) {
  return square.pos[0] >= 0 && square.pos[0] <= Board.NUM_COLS - 1 && square.pos[1] >= 0 && square.pos[1] <= Board.NUM_ROWS - 1
}

Board.prototype.isValidMove = function isValidMove(square, destSquare) {
  return destSquare.isEmpty === true && square.isEmpty === false && this.isWithinBounds(destSquare) && square.player != destSquare.player
}

Board.prototype.createPieces = function createPieces(row, player) {
  for (var i=0; i < Board.AVAIL_PIECES.length; i++) {
    var Type = Board.AVAIL_PIECES[i];
    var piece = new Type(this.getSquare([i,row]), player);
    this.setPiece(this.getSquare([i,row]), piece);
  };
};

Board.prototype.createPawns = function createPawns(row, player) {
  for (var i=0; i < 8; i++) {
    var pawn = new Pawn(this.getSquare([i,row]), player);
    this.setPiece(this.getSquare([i,row]), pawn);
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
  if (square.piece.isValidMove(square, destSquare) && this.isValidMove(square, destSquare)) {
    this.setPiece(destSquare, square.piece);
    this.removePiece(square);
  }
}