function Breakout(presenter) {
	var self = this;
	var gridWidth;
	var gridHeight;
	var paddleRadius;
	var ballRadius;
	var interval;

	this.load = function(rows, cols) {
		presenter.model = self;
		presenter.createGrid(rows, cols);
		interval = 0;
	};

	this.scroll = function(x) {
		if (!interval) {
			presenter.moveTo(x, gridHeight - ballRadius);
		}
	};

	this.setGrid = function(width, height, paddle, ball) {
		gridWidth = width;
		gridHeight = height;
		paddleRadius = paddle;
		ballRadius = ball;
	};
}
