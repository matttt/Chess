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

function Board(players, firstTurn) {
  this.squares = this.createSquares();
  this.players = players;
  this.turn = firstTurn;
  this.turnCount = 0;
  this.excuseTurns = 0;
}

Board.NUM_ROWS = 8;
Board.NUM_COLS = 8;

Board.AVAIL_PIECES = [Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook];

Board.prototype.nextTurn = function nextTurn() {
  this.turn = this.turn == 0 ? Player.BLACK : Player.WHITE;
  this.turnCount++;
}

Board.prototype.isPiecesTurn = function isPiecesTurn(square) {
  return this.excuseTurns ? true : this.turn === square.player;
}

Board.prototype.createSquares = function createSquares () {
  var squares = []
  for (var y=0; y < Board.NUM_COLS; y++) {
    for (var x=0; x < Board.NUM_ROWS; x++) {
      squares.push(new Square([x,y], this));
    };
  };
  return squares;
}

Board.prototype.getSquare = function getSquare (pos) {
  return this.squares[pos[1]*Board.NUM_ROWS+pos[0]]
}

Board.prototype.getChessSquare = function getChessSquare(str) {
  var alphabet = 'ABCDEFGH';
  var map = [8,7,6,5,4,3,2,1];
  var pos = [alphabet.indexOf(str.substring(0,1)), map.indexOf(parseInt(str.substring(1,2)))];
  
  return this.getSquare(pos);
}

Board.prototype.isWithinBounds = function isWithinBounds(square) {
  return square.pos[0] >= 0 
      && square.pos[1] >= 0 
      && square.pos[0] <= Board.NUM_COLS - 1 
      && square.pos[1] <= Board.NUM_ROWS - 1;
}

Board.prototype.isValidMove = function isValidMove(square, destSquare) {
  return square.player !== destSquare.player
      && square.isEmpty === false 
      && this.isWithinBounds(destSquare);
}

Board.prototype.setKingForPlayer = function setKingOfPlayer(player, piece) {
  this.players[player].king = piece;
}

Board.prototype.createPieces = function createPieces(row, player) {
  for (var i=0; i < Board.AVAIL_PIECES.length; i++) {
    var Type = Board.AVAIL_PIECES[i];
    var piece = new Type(this.getSquare([i,row]), player);
    this.setPiece(this.getSquare([i,row]), piece);
    
    if (piece instanceof King) this.setKingForPlayer(player, piece);
  };
};

Board.prototype.createPawns = function createPawns(row, player) {
  for (var i=0; i < Board.NUM_COLS; i++) {
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
  if (this.isValidMove(square, destSquare) && square.piece.isValidMove(square, destSquare) && this.isPiecesTurn(square)) {
      if (destSquare.piece && square.player !== destSquare.player) {
        this.players[square.player].addTakenPiece(destSquare.piece);
      }
      this.setPiece(destSquare, square.piece);
      this.removePiece(square);
      this.nextTurn();
  }
}

Board.prototype.getPiecesTakenBy = function getPiecesTakenBy(player) {
  return this.players[player].getTakenPieces()
}
