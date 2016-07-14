var Board = require('./board');
var Player = require('./player')

module.exports = Chess;

function Chess() {
  this.time = 0;
  this.players = this.setUpPlayers();
}

Chess.prototype.main = function () {
  
}

Chess.prototype.cleanUp = function () {
  
}

Chess.prototype.startNewGame = function () {
  this.board = new Board(this.players, Player.WHITE);
  return this.board;
}

Chess.prototype.setUpPlayers = function () {
  return [new Player(Player.WHITE), new Player(Player.BLACK)];
}
