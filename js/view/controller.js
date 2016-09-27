
var Controller = function() {
	this.clickHandler = function(event) {

		canvas_x = event.x - canvas.offsetLeft;
		canvas_y = event.y - canvas.offsetTop;

		var position = Vector.fromComponents(canvas_x, canvas_y);
		myModel.addDonut(position);
	}
}
