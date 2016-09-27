function View(model) {
	this.model = model;

	/**
	 * Canvas creation!
	 */
	this.canvas = document.getElementById("myCanvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.canvas.onmousedown = function(){ return false; };
	this.ctx = this.canvas.getContext("2d");

	this.renderer = new Renderer();
}

View.prototype.draw = function() {

	/**
	 * Canvas creation!
	 */
	this.canvas = document.getElementById("myCanvas");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.canvas.onmousedown = function(){ return false; };
	this.ctx = this.canvas.getContext("2d");

	// start with a screen clear
	this.ctx.fillStyle = "#334D66";
	this.ctx.fillRect( 0 , 0 , window.innerWidth , window.innerHeight );

	// Use respective draw functions for each fish.
	this.model.entities[0].forEach(
		function(donut) {
			Renderer.draw_donut(donut, this.ctx);
		},
		this);

	var allFish = this.model.entities[1].concat(this.model.entities[2]);
	allFish.forEach(
		function(fish) {
			Renderer.draw_fish(fish, this.ctx);
		},
		this);
}



View.prototype.clickHandler = function(event) {

	canvas_x = event.x - this.canvas.offsetLeft;
	canvas_y = event.y - this.canvas.offsetTop;

	var position = Vector.fromComponents(canvas_x, canvas_y);
	model.addDonut(position);
}
