function BreakoutPresenter(target) {
  var self = this;
  var colors = ['red', 'orange', 'yellow', 'green'];
  var right;
  var paddleRadius;
  var ballRadius;
  var $grid;
  var $paddle;
  var $ball;

  this.breakBrick = function(i, j) {
    var $brick = $grid.children('ul').eq(j).children().eq(i);
    var valid = $brick.length && !$brick.hasClass('breakout-broken');

    $brick.addClass('breakout-broken');
    return valid;
  };

  this.createGrid = function(rows, cols) {
    var ul = '';

    for (var i = 0; i < rows; i++) {
      ul += '<ul class="breakout-' + colors[i] + '">' + '<li />'.repeat(cols) +
          '</ul>';
    }

    $grid = $(target).addClass('breakout').html(ul);

    $paddle = $('<div class="breakout-paddle"><span /></div>')
        .scroll(function() {
      self.model.scroll(
        ($(this).scrollLeft() / right * 8.8 + 1) * paddleRadius
      );
    }).appendTo($grid);

    $ball = $('<input type="radio" checked="checked" />').appendTo($grid);
    paddleRadius = $paddle.width() * 0.093;
    right = $paddle.children().width() - $paddle.width();
    ballRadius = ($ball.height() + $ball.width()) / 4;

    self.model.setGrid(
      $grid.outerWidth(),
      $paddle.position().top,
      $grid.children().outerHeight(),
      paddleRadius,
      ballRadius
    );
  };

  this.moveTo = function(x, y) {
    $ball.css({
      top: y - ballRadius,
      left: x - ballRadius
    });
  };

  this.reset = function() {
    $paddle.scrollLeft(0);
    $paddle.scrollLeft(right / 2);
  };
}
