var View = function(model) {
	this.model = model;

	/**
	 * Canvas creation!
	 */
	this.canvas = document.getElementById("myCanvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.canvas.onmousedown = function(){ return false; };
	this.ctx = this.canvas.getContext("2d");
}

View.prototype.draw = function(partialFrameTime) {

	// start with a screen clear
	this.ctx.fillStyle = "#334D66";
	this.ctx.fillRect( 0 , 0 , window.innerWidth , window.innerHeight );

	// Use respective draw functions for each fish.
	var allFish = this.model.entities[1].concat(this.model.entities[2]);
	this.model.entities[0].forEach(function(donut) {draw_donut(donut, this.ctx);}, this);
	//myModel.entities[1].forEach(function(fish) {draw_fish(fish);});
	//myModel.entities[2].forEach(function(shark) {draw_fish(shark);});
	allFish.forEach(function(fish) { draw_fish(fish, this.ctx); }, this);
}

var draw_donut = function(donut, ctx) {
	ctx.strokeStyle = "#880000";
	ctx.beginPath();
	donutPosition = donut.getPosition();
	ctx.arc( donutPosition.x,
			 donutPosition.y,
			 3 , 0 , 2 * Math.PI );
	ctx.stroke();
};

/**
 * Draws a fish.
 */
var draw_fish = function(fish, ctx) {
	radius = Math.sqrt(fish.mass);

	var ori = ((fish.ddx >= 0) ? 1 : -1);

	position = fish.getPosition();

	adjusted_x = position.x;
	adjusted_y = position.y

	var tail = new Path2D();
	tail.moveTo(adjusted_x , adjusted_y);
	tail.lineTo( adjusted_x + radius * -2 * ori, adjusted_y + radius * 1);
	tail.lineTo( adjusted_x + radius * -2 * ori, adjusted_y + radius * -1);
	ctx.fillStyle = fish.tailColor;
	ctx.fill(tail);

	var tail2 = new Path2D();
	tail2.moveTo(adjusted_x , adjusted_y);
	tail2.lineTo( adjusted_x + radius * -1.6 * ori, adjusted_y + radius * 0.8);
	tail2.lineTo( adjusted_x + radius * -1.6 * ori, adjusted_y + radius * -0.8);
	ctx.fillStyle = fish.bodyColor;
	ctx.fill(tail2);

	var fin = new Path2D();
	fin.moveTo( adjusted_x + radius * -1 * ori, adjusted_y + radius * 1.5);
	fin.lineTo( adjusted_x + radius * -0.5 * ori, adjusted_y + radius * 0);
	fin.lineTo( adjusted_x + radius * -1 * ori, adjusted_y + radius * -1.5);
	fin.lineTo( adjusted_x + radius * 0 * ori, adjusted_y + radius * -1);
	fin.lineTo( adjusted_x + radius * 0 * ori, adjusted_y + radius * 1);
	ctx.fillStyle = fish.bodyColor;
	ctx.fill(fin);

	// Fish head
	ctx.beginPath();
	ctx.arc( adjusted_x , adjusted_y , radius , 0 , 2 * Math.PI );
	ctx.fillStyle = fish.bodyColor;
	ctx.fill();

	// Fish eyeball
	ctx.beginPath();
	ctx.arc( adjusted_x + radius * 0.5 * ori, adjusted_y + radius * -0.5, radius / 4, 0 , 2 * Math.PI );
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();

	// Fish pupil
	ctx.beginPath();
	ctx.arc( adjusted_x + radius * 0.6 * ori, adjusted_y + radius * -0.6, radius / 8, 0 , 2 * Math.PI );
	ctx.fillStyle = "#000000";
	ctx.fill();

};

View.prototype.clickHandler = function(event) {

	canvas_x = event.x - this.canvas.offsetLeft;
	canvas_y = event.y - this.canvas.offsetTop;

	var position = Vector.fromComponents(canvas_x, canvas_y);
	model.addDonut(position);
}
