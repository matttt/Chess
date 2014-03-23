module.exports = Square;

function Square (pos) {
  this.pos = pos;
  this.posX = pos[0];
  this.posY = pos[1];
  this.isEmpty = true;
  this.piece = null;
  this.player = null;
}

Square.UP = 0;
Square.UP_RIGHT = 1;
Square.RIGHT = 2;
Square.DOWN_RIGHT = 3;
Square.DOWN = 4;
Square.DOWN_LEFT = 5;
Square.LEFT = 6;
Square.UP_LEFT = 7;

Square.prototype.isInSameColumn = function (square) {
  return square.pos[0] === this.pos[0];
};

Square.prototype.isInSameRow = function (square) {
  return square.pos[1] === this.pos[1];
};

Square.prototype.isInSameDiag = function isInSameDiag(square) {
  var xdiff = Math.abs(square.posX - this.posX);
  var ydiff = Math.abs(square.posY - this.posY);
  
  return xdiff === ydiff
}

Square.prototype.inDir = function inDir(square) {
  
}

Square.prototype.getAdjPos = function (dir) {
  switch (dir) {
    case Square.UP:
      return [this.posX, this.posY-1];
    break;
    case Square.UP_RIGHT:
      return [this.posX+1, this.posY-1];
    break
    case Square.RIGHT:
      return [this.posX+1, this.posY];
    break
    case Square.DOWN_RIGHT:
      return [this.posX+1, this.posY+1];
    break
    case Square.DOWN:
      return [this.posX, this.posY+1];
    break
    case Square.DOWN_LEFT:
      return [this.posX-1, this.posY+1];
    break
    case Square.LEFT:
      return [this.posX-1, this.posY];
    break
    case Square.UP_LEFT:
      return [this.posX-1, this.posY-1];
    break
  }
}

Square.prototype.findDistanceTo = function findDistanceTo(destSquare) {
  var pos1 = this.pos;
  var pos2 = destSquare.pos;
  var diff = [Math.abs(pos1[0]-pos2[0]), Math.abs(pos1[1]-pos2[1])]
  if (this.isInSameColumn(destSquare)) {
    return diff[1]
  }
  else if (this.isInSameRow(destSquare)) {
    return diff[0]
  }
  else if (this.isInSameDiag(destSquare)) {
    return diff[0]
  }
}

Square.prototype.isClearPathTo = function isClearPath(square) {
  
}
