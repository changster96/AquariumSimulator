function Renderer() {}

Renderer.draw_donut = function(donut, ctx) {
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
Renderer.draw_fish = function(fish, ctx) {
	radius = Math.sqrt(fish.mass);

	var ori = ((fish.acceleration.x >= 0) ? 1 : -1);

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
