function Breakout(presenter) {
  var delay = 30;
  var speed = 10;
  var self = this;
  var gridRows;
  var gridCols;
  var gridWidth;
  var gridHeight;
  var paddleRadius;
  var ballRadius;
  var brickWidth;
  var interval;
  var v;
  var w;
  var x;
  var y;
  var paddleX;

  function loop() {
    var xp = x + v;
    var yp = y + w;

    if (xp < ballRadius || xp + ballRadius > gridWidth) {
      v = -v;
    } else if (yp < ballRadius) {
      w = -w;
    } else if (yp + ballRadius > gridHeight) {
      var theta = (xp - paddleX) / paddleRadius;

      if (theta > -1 && theta < 1) {
        theta = theta * Math.PI * 0.4;
        v = speed * Math.sin(theta);
        w = -speed * Math.cos(theta);
      } else {
        clearInterval(interval);
        presenter.reset();
        interval = 0;
      }
    } else {
      var valid = true;

      var j0 = Math.floor((yp - ballRadius) / brickHeight);
      var j1 = Math.floor((yp + ballRadius) / brickHeight);

      if (v > 0) {
        var i = Math.floor((xp + ballRadius) / brickWidth);

        if (i != Math.floor((x + ballRadius) / brickWidth)) {
          var valid0 = presenter.breakBrick(i, j0);
          var valid1 = presenter.breakBrick(i, j1);

          if (valid0 || valid1) {
            v = -v;
            valid = false;
          }
        }
      } else {
        var i = Math.floor((xp - ballRadius) / brickWidth);

        if (i != Math.floor((x - ballRadius) / brickWidth)) {
          var valid0 = presenter.breakBrick(i, j0);
          var valid1 = presenter.breakBrick(i, j1);

          if (valid0 || valid1) {
            v = -v;
            valid = false;
          }
        }
      }

      var i0 = Math.floor((xp - ballRadius) / brickWidth);
      var i1 = Math.floor((xp + ballRadius) / brickWidth);

      if (w > 0) {
        var j = Math.floor((yp + ballRadius) / brickHeight);

        if (j != Math.floor((y + ballRadius) / brickHeight)) {
          var valid0 = presenter.breakBrick(i0, j);
          var valid1 = presenter.breakBrick(i1, j);

          if (valid0 || valid1) {
            w = -w;

            if (valid) {
              valid = false;
            } else {
              v = -v;
            }
          }
        }
      } else {
        var j = Math.floor((yp - ballRadius) / brickHeight);

        if (j != Math.floor((y - ballRadius) / brickHeight)) {
          var valid0 = presenter.breakBrick(i0, j);
          var valid1 = presenter.breakBrick(i1, j);

          if (valid0 || valid1) {
            w = -w;

            if (valid) {
              valid = false;
            } else {
              v = -v;
            }
          }
        }
      }

      if (valid) {
        x = xp;
        y = yp;
        presenter.moveTo(x, y);
      }
    }
  }

  this.load = function(rows, cols) {
    gridRows = rows;
    gridCols = cols;
    presenter.model = self;
    presenter.createGrid(rows, cols);
    presenter.reset();
    interval = 0;
  };

  this.scroll = function(paddle) {
    paddleX = paddle;

    if (!interval) {
      x = paddle;

      presenter.moveTo(x, gridHeight - ballRadius);
    }
  };

  this.setGrid = function(width, height, brick, paddle, ball) {
    gridWidth = width;
    gridHeight = height;
    paddleRadius = paddle;
    ballRadius = ball;
    brickWidth = width / gridCols;
    brickHeight = brick;
    y = gridHeight - ballRadius;
  };

  this.start = function() {
    if (!interval) {
      var theta = (Math.random() - 0.5) * Math.PI * 0.8

      v = speed * Math.sin(theta);
      w = -speed * Math.cos(theta);
      interval = setInterval(loop, delay);
    }
  };
}
