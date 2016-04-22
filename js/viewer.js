var Viewer = function() {
	
	/**
	 * The main screen that the game will be on is a square.
	 * This square will have its own coordinates: [0, 100] by [0, 100].
	 */
	 
	
}

Viewer.prototype.draw = function(partialFrameTime) {
	
	// start with a screen clear
	ctx.fillStyle = "#334D66";
	ctx.fillRect( 0 , 0 , window.innerWidth , window.innerHeight );

	// Use respective draw functions for each fish.
	myModel.entities[0].forEach(function(donut) {draw_donut(donut, partialFrameTime);});
	myModel.entities[1].forEach(function(fish) {draw_fish(fish, partialFrameTime);});
	myModel.entities[2].forEach(function(shark) {draw_fish(shark, partialFrameTime);});
}

var draw_donut = function(donut, partialFrameTime) {
	ctx.strokeStyle = "#880000";
	ctx.beginPath();
	ctx.arc( donut.x + donut.dx * partialFrameTime,
			 donut.y + donut.dy * partialFrameTime,
			 3 , 0 , 2 * Math.PI );
	ctx.stroke();
};

/**
 * Draws a fish.
 */
var draw_fish = function(fish, accumulator) {
	radius = Math.sqrt(fish.mass);
	
	var ori = ((fish.ddx >= 0) ? 1 : -1);
	
	adjusted_x = fish.x + fish.dx * accumulator + 0.5 * fish.ddx * Math.pow(accumulator, 2);
	adjusted_y = fish.y + fish.dy * accumulator + 0.5 * fish.ddy * Math.pow(accumulator, 2);
	
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
