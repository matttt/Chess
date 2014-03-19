var Board = require('./board');
var Player = require('./player')

module.exports = Chess;

function Chess() {
  this.time = 0;
}

Chess.prototype.main = function () {
  this.setUpPlayers()
}

Chess.prototype.cleanUp = function () {
  
}

Chess.prototype.startNewGame = function () {
  this.board = new Board();
}

Chess.prototype.setUpPlayers = function () {
  this.players = [new Player(Player.WHITE), new Player(Player.BLACK)]
}
