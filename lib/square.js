module.exports = Square;

function Square (pos, board) {
  this.pos = pos;
  this.posX = pos[0];
  this.posY = pos[1];
  this.isEmpty = true;
  this.piece = null;
  this.player = null;
  this.board = board;
}

Square.UP = 0;
Square.UP_RIGHT = 1;
Square.RIGHT = 2;
Square.DOWN_RIGHT = 3;
Square.DOWN = 4;
Square.DOWN_LEFT = 5;
Square.LEFT = 6;
Square.UP_LEFT = 7;


Square.prototype.getDiffOf = function getDiffOf(square, destSquare) {
  if(!destSquare) {
    debugger;
  }
  var xDiff = Math.abs(square.posX - destSquare.posX);
  var yDiff = Math.abs(square.posY - destSquare.posY);
  return {x: xDiff, y: yDiff};
}

Square.prototype.isInSameColumn = function isInSameColumn (square) {
  return square.pos[0] === this.pos[0];
};

Square.prototype.isInSameRow = function isInSameRow (square) {
  return square.pos[1] === this.pos[1];
};

Square.prototype.isInSameDiag = function isInSameDiag(square) {
  var diff = this.getDiffOf(this, square);
  
  return diff.x === diff.y
}

Square.prototype.isColinearWith = function isInSameAll(square) {
  return this.isInSameColumn(square) || this.isInSameRow(square) || this.isInSameDiag(square);
};

Square.prototype.getDirectionTo = function inDir(square) {
  if (this.posY > square.posY && this.posX === square.posX) {
    return Square.UP;
  } else if (this.posY > square.posY && this.posX < square.posX) {
    return Square.UP_RIGHT;
  } else if (this.posY === square.posY && this.posX < square.posX) {
    return Square.RIGHT
  } else if (this.posY < square.posY && this.posX < square.posX) {
    return Square.DOWN_RIGHT
  } else if (this.posY < square.posY && this.posX === square.posX) {
    return Square.DOWN
  } else if (this.posY < square.posY && this.posX > square.posX) {
    return Square.DOWN_LEFT
  } else if (this.posY === square.posY && this.posX > square.posX) {
    return Square.LEFT
  } else if (this.posY > square.posY && this.posX > square.posX) {
    return Square.UP_LEFT
  }
}

Square.prototype.getAdj = function getAdj (dir) {
  switch (dir) {
    case Square.UP:
      return this.board.getSquare([this.posX, this.posY-1]);
    break;
    case Square.UP_RIGHT:
      return this.board.getSquare([this.posX+1, this.posY-1]);
    break
    case Square.RIGHT:
      return this.board.getSquare([this.posX+1, this.posY]);
    break
    case Square.DOWN_RIGHT:
      return this.board.getSquare([this.posX+1, this.posY+1]);
    break
    case Square.DOWN:
      return this.board.getSquare([this.posX, this.posY+1]);
    break
    case Square.DOWN_LEFT:
      return this.board.getSquare([this.posX-1, this.posY+1]);
    break
    case Square.LEFT:
      return this.board.getSquare([this.posX-1, this.posY]);
    break
    case Square.UP_LEFT:
      return this.board.getSquare([this.posX-1, this.posY-1]);
    break
  }
}

Square.prototype.isClearPathTo = function isClearPathTo (destSquare) {
  var curSquare = this;
  var dir = this.getDirectionTo(destSquare); 
  
  while(curSquare.getAdj(dir) !== destSquare) {
    curSquare = curSquare.getAdj(dir);
    if (!curSquare) return true;
    if (!curSquare.isEmpty) return false;
  }
  return true;
}

