var Board = require('./board');
var Player = require('./player')

module.exports = Chess;

function Chess() {
  this.time = 0;
  this.players = this.setUpPlayers();
}

Chess.prototype.startNewGame = function () {
  this.board = new Board(this.players, Player.WHITE);
  return this.board;
}

Chess.prototype.startNewStandardGame = function () {
  this.board = new Board(this.players, Player.WHITE);

  this.board.createPieces(0, Player.BLACK);
  this.board.createPieces(7, Player.WHITE);

  this.board.createPawns(1, Player.BLACK);
  this.board.createPawns(6, Player.WHITE);

  return this.board;
}

Chess.prototype.setUpPlayers = function () {
  return [new Player(Player.WHITE), new Player(Player.BLACK)];
}
