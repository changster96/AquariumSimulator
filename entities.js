/**
 * All the entity classes that go in the tank!
 */

/**
 * Generic entity function.
 */
var Entity = function(x, y) {
	this.type = "Generic Entity"
	this.x = x;
	this.y = y;
	this.mass = 10;
}
Entity.prototype.move = function(dt) {
	/**
	 * Moves entity around.
	 * Takes in a time-step, returns a tuple.
	 */
	
	return [0, 0]
}

var Donut = function(x, y) {

	Entity.call(this, x, y);
	this.type = "Donut";
	this.mass = 10;
	
	
	
	
}
Donut.prototype.move = function() {
	// Attempts movement, environment permitting
	return [0, 50];
}
Donut.prototype.draw = function() {
	ctx.strokeStyle = "#880000";
	ctx.beginPath();
	ctx.arc( this.x , this.y , 3 , 0 , 2 * Math.PI);
	ctx.stroke();
}


function Fish(x, y, dx, dy) {
	
	this.type = "Fish";
	
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = 0;
	this.ddx = 0;
	this.ddy = 0;
	
	this.eyesight = 250 + Math.random() * 250 + Math.random() * 250;
	this.hunger = Math.random() * 10000;
	this.socialness = 0.5;
	this.personalspace = Math.random() * 75 + Math.random() * 75;
	this.danger_sense = Math.random() * 500000 + Math.random() * 500000;
	this.top_accel = Math.random() * 1000 + 1000;
	this.mass = Math.random() * 40 + Math.random() * 40 + 20;
	this.move_timer = [0, 0.2 + Math.random() * 0.3]; // Zero out of one second
	
	tail_colors = ["#FF0000", "#FF00FF", "#0000FF"];
	this.body_color = "#FFA500";
	this.tail_color = tail_colors[Math.floor(Math.random()*tail_colors.length)]
	
	
	
	
	
	
	
	
	
}
Fish.prototype.move = function(dt) {
	
	this.dx += this.dx * (-0.1);
	this.dy += this.dy * (-0.1);
	
	if (this.mass > 100) {this.mass *= 0.999;}
	
	this.move_timer[0] += dt;
	
	if (this.move_timer[0] > this.move_timer[1]) {
		best_move = this.find_move();
		this.move_timer[0] = 0;
		return best_move;
	}
	
	return [this.dx, this.dy];
}
Fish.prototype.find_move = function() {
	// Attempts movement
	
	
	
	best_direction = [0, 0];
	
	for (id in entities) {
		x_distance = entities[id].x - this.x;
		y_distance = entities[id].y - this.y;
		
		if (x_distance > window.innerWidth / 2) {
			x_distance = x_distance - window.innerWidth;
		} else if (x_distance < -1 * window.innerWidth / 2) {
			x_distance = x_distance + window.innerWidth;
		}
		
		if (y_distance > window.innerHeight / 2) {
			y_distance = y_distance - window.innerHeight;
		} else if (y_distance < -1 * window.innerHeight / 2) {
			y_distance = y_distance + window.innerHeight;
		}
		
		distance = Math.sqrt(Math.pow(x_distance, 2) +
							 Math.pow(y_distance, 2));
							 
		if ((distance > 0) && (distance < this.eyesight)) {
			if (this.determine_action(entities[id]) == "Eat") {
				// target is edible!
				coefficient = entities[id].mass / distance * this.hunger;
				best_direction[0] += x_distance * coefficient;
				best_direction[1] += y_distance * coefficient;
			} else if (this.determine_action(entities[id]) == "Flee"){
				// target can eat this!
				coefficient =  -1 * this.danger_sense / Math.pow(distance, 2);
				best_direction[0] += x_distance * coefficient;
				best_direction[1] += y_distance * coefficient;
			} else {
				// target is just there I guess
				coefficient = 0;
				if (distance > (this.personalspace + entities[id].personalspace)) {
					coefficient += (this.socialness + entities[id].socialness) * entities[id].mass / distance;
					if (this.tail_color == entities[id].tail_color) {
						// import racism
						coefficient += Math.abs(coefficient * 0.5);
					}
				}
				
				best_direction[0] += x_distance * coefficient;
				best_direction[1] += y_distance * coefficient;
			} 
		}
	}
	
	best_direction_power = Math.sqrt(Math.pow(best_direction[0], 2) + 
									 Math.pow(best_direction[1], 2));
	if (best_direction_power != this.top_accel) {
		best_direction[0] = best_direction[0] * this.top_accel / best_direction_power;
		best_direction[1] = best_direction[1] * this.top_accel / best_direction_power;
	}
	
	this.ddx = best_direction[0];
	this.ddy = best_direction[1];
	this.dx += this.ddx / Math.pow(this.mass, 0.5) * this.move_timer[0];
	this.dy += this.ddy / Math.pow(this.mass, 0.5) * this.move_timer[0];
	
	return [this.dx, this.dy];
}
Fish.prototype.determine_action = function(target) {
	/* Returns "Eat", "Flee", or "Socialize" */
	if ((target.type == "Donut") || (target.mass < this.mass / 2)) {
		return "Eat";
	} else if (target.tail_color == this.tail_color) {
		return "Socialize";
	} else if (target.mass > this.mass * 2) {
		return "Flee";
	} else {
		return "Socialize";
	}
}
Fish.prototype.draw = function(accumulator) {
	draw_fish(this, accumulator);
}
