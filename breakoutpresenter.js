function BreakoutPresenter(target) {
	var self = this;
	var colors = ['red', 'orange', 'yellow', 'green'];
	var right;
	var paddleRadius;
	var ballRadius;
	var $grid;
	var $paddle;
	var $ball;

	this.createGrid = function(rows, cols) {
		var ul = '';

		for (var i = 0; i < rows; i++) {
			ul += '<ul class="breakout-' + colors[i] + '">';

			for (var j = 0; j < cols; j++) {
				ul += '<li />';
			}

			ul += '</ul>';
		}

		$grid = $('<div class="breakout">' + ul + '</div>').appendTo($(target));

		$paddle = $('<div class="breakout-paddle"><span /></div>').scroll(function() {
			self.model.scroll(($(this).scrollLeft() / right * 4.1 + 0.46) * paddleRadius);
		}).appendTo($grid);

		$ball = $('<input type="radio" checked="checked" />').appendTo($grid);
		paddleRadius = $paddle.width() / 5;
		right = $paddle.children().width() - $paddle.width();
		$paddle.scrollLeft(right / 2);
		ballRadius = ($ball.height() + $ball.width()) / 4;
		self.model.setGrid($grid.width(), $paddle.position().top, paddleRadius, ballRadius);
	};

	this.moveTo = function(x, y) {
		$ball.css({
			top: y - ballRadius,
			left: x - ballRadius
		});
	}
}
