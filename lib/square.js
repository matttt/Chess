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

Square.prototype.getAdj = function (dir) {
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
