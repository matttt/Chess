var assert = require('assert');
var Chess = require('../lib/chess');
var Square = require('../lib/square');
var Board = require('../lib/board');
var Player = require('../lib/player')
//piece deps
var Queen = require('../lib/pieces/queen');
var King = require('../lib/pieces/king');
var Bishop = require('../lib/pieces/bishop');
var Knight = require('../lib/pieces/knight');
var Rook = require('../lib/pieces/rook');
var Pawn = require('../lib/pieces/pawn');

var game;

describe('Chess', function(){
  beforeEach(function(){
    game = new Chess();
    game.main();
    game.startNewGame();
  });
  
  describe('player and board creation', function(){
    it('should have a board', function(){
      assert(game.board);
    });
    it('should create a board with 64 squares', function(){
      assert.equal(64, game.board.squares.length);
    });
  })

  describe('square logic', function(){
    it('should test if two squares are in the same row', function(){
      assert(game.board.squares[0].isInSameRow(game.board.squares[7]))
    });
    it('should test if two squares are in the same column', function(){
      assert(game.board.squares[0].isInSameColumn(game.board.squares[56]))
    });
    it('should find the square above the square located at [0,1]', function(){
      var square1 = game.board.getSquare([0,1]);
      var square2 = game.board.getSquare([0,0]);

      assert.deepEqual(square1.pos, [0, 1]);
      assert.deepEqual(square1.getAdj(Square.UP), [0, 0]);
      assert.deepEqual(square1.getAdj(Square.UP), square2.pos)
    });
    it('should find the square up and to the right of [5,6]', function(){
      var square1 = game.board.getSquare([5,6]);
      var square2 = game.board.getSquare([6,5]);

      assert.deepEqual(square1.getAdj(Square.UP_RIGHT), square2.pos);
    });
  })
  
  describe('piece logic and movement', function(){
    it('should create a Queen at square [3,4]', function(){
      var square = game.board.getSquare([3,4]);

      game.board.setPiece(square, new Queen(square));

      assert(square.piece instanceof Queen);
    });
    it('should create all 8 pieces on row 0', function(){
      game.board.createPieces(0, Player.WHITE);
      
      for (var i=0; i < 8; i++) {
        assert(game.board.getSquare([i,0]).piece instanceof Board.AVAIL_PIECES[i]);
      };
    });
    it('should create a row of 8 pawns on row 1', function(){
      game.board.createPawns(1, Player.WHITE);
      
      for (var i=0; i < 8; i++) {
        assert(game.board.getSquare([i,1]).piece instanceof Pawn)
      };
    });
    it('should move the queen to square (4,4)', function(){
      game.board.createPieces(0, Player.WHITE);
      
      var queenSquare = game.board.getSquare([4,0]);
      var destSquare = game.board.getSquare([4,4]);
      
      game.board.movePiece(queenSquare, destSquare);
      
      assert(destSquare.piece instanceof Queen);
      assert(queenSquare.piece === null);
    });
    it('should attempt to make an invalid move', function(){
      game.board.createPieces(0, Player.WHITE);
      
      var queenSquare = game.board.getSquare([4,0]);
      var destSquare = game.board.getSquare([5,4]);
      
      game.board.movePiece(queenSquare, destSquare);
      
      assert(destSquare.piece === null);
      assert(queenSquare.piece instanceof Queen);
    });
    it('should try to move a rook out of bounds', function(){
      game.board.squares.push(new Square([-1,4]))
      
      game.board.createPieces(0, Player.WHITE);
      
      var rookSquare = game.board.getSquare([0,0]);
      var destSquare = game.board.getSquare([-1,4]);
      
      game.board.movePiece(rookSquare, destSquare);
      
      assert(destSquare.piece === null);
      assert(rookSquare.piece instanceof Rook);
    })
    it('should do a diagonal move with the queen', function(){
      game.board.createPieces(0, Player.WHITE);
      
      var queenSquare = game.board.getSquare([4,0]);
      var destSquare = game.board.getSquare([1,3]);
      
      game.board.movePiece(queenSquare, destSquare);
      
      assert(destSquare.piece instanceof Queen);
      assert(queenSquare.piece === null);
    });
  })
})