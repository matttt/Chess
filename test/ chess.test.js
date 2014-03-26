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
  })
  
  describe('player and board creation', function(){
    it('should have a board', function(){
      assert(game.board);
    });
    it('should create a board with 64 squares', function(){
      assert.equal(64, game.board.squares.length);
    })
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
      assert.deepEqual(square1.getAdj(Square.UP).pos, [0, 0]);
      assert.deepEqual(square1.getAdj(Square.UP), square2);
    })
    it('should find the square up and to the right of [5,6]', function(){
      var square1 = game.board.getSquare([5,6]);
      var square2 = game.board.getSquare([6,5]);

      assert.deepEqual(square1.getAdj(Square.UP_RIGHT), square2);
    })
    it('should get the direction of another square', function(){
      var square1 = game.board.getSquare([0,0]);
      var square2 = game.board.getSquare([5,0]);
      
      assert.equal(square1.getDirectionOf(square2), Square.RIGHT);
    })
    it('should get the direction of another square', function(){
      var square1 = game.board.getSquare([0,0]);
      var square2 = game.board.getSquare([5,5]);
      
      assert.equal(square1.getDirectionOf(square2), Square.DOWN_RIGHT);
    })
    it('should use the getChessSquare function to get square 0,7', function(){
      square = game.board.getChessSquare('A1');
      
      assert.deepEqual(square.pos, [0,7])
    })
  })
  
  describe('piece logic and movement', function(){
    it('should create a Queen at square [3,4]', function(){
      var square = game.board.getSquare([3,4]);

      game.board.setPiece(square, new Queen(square));

      assert(square.piece instanceof Queen);
    });
    it('should create all 8 pieces on row 0', function(){
      game.board.createPieces(0, Player.WHITE)
      
      for (var i=0; i < 8; i++) {
        assert(game.board.getSquare([i,0]).piece instanceof Board.AVAIL_PIECES[i]);
      }
    });
    it('should create a row of 8 pawns on row 1', function(){
      game.board.createPawns(1, Player.WHITE);
      
      for (var i=0; i < 8; i++) {
        assert(game.board.getSquare([i,1]).piece instanceof Pawn)
      }
    })
    it('should move the queen to square (7,3)', function(){
      game.board.createPieces(0, Player.WHITE);
      
      var queenSquare = game.board.getSquare([4,0]);
      var destSquare = game.board.getSquare([7,3]);
      
      game.board.movePiece(queenSquare, destSquare);
      
      assert(destSquare.piece instanceof Queen);
      assert(queenSquare.piece === null);
    })
    it('should attempt to make an invalid move', function(){
      game.board.createPieces(0, Player.WHITE);
      
      var queenSquare = game.board.getSquare([4,0]);
      var destSquare = game.board.getSquare([5,4]);
      
      game.board.movePiece(queenSquare, destSquare);
      
      assert(destSquare.piece === null);
      assert(queenSquare.piece instanceof Queen);
    })
    it('should try to move a rook out of bounds', function(){
      game.board.squares.push(new Square([-1,4]))
      
      game.board.createPieces(0, Player.WHITE);
      
      var rookSquare = game.board.getSquare([0,0]);
      var destSquare = game.board.getSquare([-1,4]);
      
      game.board.movePiece(rookSquare, destSquare);
      
      assert(destSquare.piece === null);
      assert(rookSquare.piece instanceof Rook);
    })
    it('should create 2 rows of pieces, and attempt to make an illegal move through another two pieces', function(){
      game.board.createPieces(0, Player.WHITE);
      game.board.createPieces(2, Player.BLACK);
      
      var bishopSquare = game.board.getSquare([2,0]);
      var destSquare = game.board.getSquare([7,5]);
      
      game.board.movePiece(bishopSquare, destSquare);
      
      assert(bishopSquare.piece instanceof Bishop);
    })
    it('should take whites rook, moving the black rook from its home square', function(){
      game.board.createPieces(0, Player.BLACK);
      game.board.createPieces(7, Player.WHITE);
      
      var blackRook = game.board.getSquare([0,0]);
      var whiteRook = game.board.getSquare([0,7]);
      
      game.board.movePiece(blackRook, whiteRook);
                  
      assert.equal(blackRook.player, null);
      assert.equal(whiteRook.player, Player.BLACK);
      assert(whiteRook.piece instanceof Rook);
    })
    it('should make sure a taken pieces is added to the players taken pieces array', function(){
      game.board.createPieces(0, Player.BLACK);
      game.board.createPieces(7, Player.WHITE);
      
      var whiteBishop = game.board.getSquare([5,7]);
      var intermediateMove = game.board.getSquare([2,4]);
      var blackKnight = game.board.getSquare([6,0]);
      
      var blackKnightPiece = blackKnight.piece;
      
      game.board.movePiece(whiteBishop, intermediateMove);
      game.board.movePiece(intermediateMove, blackKnight);
      
      assert.equal(intermediateMove.piece, null)
      assert.deepEqual(game.board.getPiecesTakenBy(Player.WHITE)[0], blackKnightPiece); //make sure piece taken is the same as init piece
    })
  })
  describe('full game simulation', function(){
      beforeEach(function () {
            game.board.createPieces(0, Player.BLACK);
            game.board.createPawns(1, Player.BLACK);
            
            game.board.createPawns(6, Player.WHITE);
            game.board.createPieces(7, Player.WHITE);
      });
      it('should test knight movement and piece taking', function(){
        var whiteKnightSquare = game.board.getChessSquare('B1');
        var blackPawnSquare = game.board.getChessSquare('C7');
        var blackKnightSquare = game.board.getChessSquare('G8');
      
        var blackPawn = blackPawnSquare.piece;
      
        var whiteMove1 = game.board.getChessSquare('C3');
        var whiteMove2 = game.board.getChessSquare('B5');
      
        var blackMove1 = game.board.getChessSquare('F6');
        var blackMove2 = game.board.getChessSquare('E4');
      
        game.board.movePiece(whiteKnightSquare, whiteMove1);
        game.board.movePiece(blackKnightSquare, blackMove1);
        game.board.movePiece(whiteMove1, whiteMove2);
        game.board.movePiece(blackMove1, blackMove2);
        game.board.movePiece(whiteMove2, blackPawnSquare);
      
        assert.deepEqual(game.board.getPiecesTakenBy(Player.WHITE)[0], blackPawn);
        assert(blackPawnSquare.piece instanceof Knight);
        assert(blackMove2.piece instanceof Knight)
        assert.equal(whiteKnightSquare.piece, null);
        assert.equal(blackKnightSquare.piece, null);
    })
    it('should test pawn movement', function(){            
      var whitePawnSquare = game.board.getChessSquare('E2');
      var blackPawnSquare = game.board.getChessSquare('D7');
      
      var blackPawn = blackPawnSquare.piece;
      
      var whiteMove1 = game.board.getChessSquare('E4');
      
      var blackMove1 = game.board.getChessSquare('D5');
      
      game.board.movePiece(whitePawnSquare, whiteMove1);
      game.board.movePiece(blackPawnSquare, blackMove1);
      game.board.movePiece(whiteMove1, blackMove1);
      game.board.movePiece(blackMove1, whiteMove1); //attempt to make faulty move
      
      assert.equal(whiteMove1.piece, null);
      assert.deepEqual(game.board.getPiecesTakenBy(Player.WHITE)[0], blackPawn)
    })
  })
})