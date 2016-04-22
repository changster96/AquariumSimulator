/**
 * All the entity classes that go in the tank!
 */

/**
 * Generic entity function.
 */
var Entity = function(x, y, dx, dy) {
	this.type = "Generic Entity"
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.mass = 10;
}

/**
 * Moves entity around.
 * Takes in a time-step, returns a tuple.
 */
Entity.prototype.tryMove = function(dt) {
	return [this.dx, this.dy]
}

/**
 * Entity 0: Donut. Does nothing but sink.
 */
var Donut = function(x, y) {
	Entity.call(this, x, y, 0, 50);
	this.type = "Donut";
	this.mass = 10;
}

/**
 * Aforementioned falling.
 */
Donut.prototype.tryMove = function(dt) {
	// Attempts movement, environment permitting
	return [this.dx, this.dy];
}

/**
 * Entity 1: Fish. Chases donuts and hangs out.
 */
var Fish = function(x, y) {
	Entity.call(this, x, y, 0, 50);
	this.type = "Fish";
	this.mass = 30;
	this.ddx = 0;
	this.ddy = 0;
	this.cruisingAccel = 25 + Math.random() * 50;
	this.topAccel = 250 + Math.random() * 500;
	this.eyesight = 50 + Math.random() * 100;
	
	tailColors = ["#FF0000", "#FF00FF", "#0000FF"];
	this.bodyColor = "#FFA500";
	this.tailColor = tailColors[ Math.floor( Math.random() * tailColors.length ) ]
}

/**
 * Chases donuts.
 */
Fish.prototype.tryMove = function(dt, visibleDonuts, visibleSharks) {
	
	this.dx *= Math.pow(0.25, dt);
	this.dy *= Math.pow(0.25, dt);
	
	if (this.ddx == 0) {
		randomNum = -5 + Math.random() * 10;
		this.ddx = randomNum / Math.abs(randomNum);
	}
	if (this.ddy == 0) {
		randomNum = -5 + Math.random() * 10;
		this.ddy = randomNum / Math.abs(randomNum);
	}
	this.ddx = this.ddx / (Math.abs(this.ddx)) * this.cruisingAccel;
	this.ddy = this.ddy / (Math.abs(this.ddy)) * this.cruisingAccel / 10;
	best_direction = [0.0, 0];
	
	visibleDonuts.forEach(function(donut) {
		displacement = myModel.getDisplacement(this, donut);
		distance = displacement[2];
		best_direction[0] += displacement[0] / distance;
		best_direction[1] += displacement[1] / distance;
	}, this);
	
	visibleSharks.forEach(function(shark) {
		displacement = myModel.getDisplacement(this, shark);
		distance = displacement[2];
		best_direction[0] += displacement[0] * -1 / distance;
		best_direction[1] += displacement[1] * -1 / distance;
	}, this);
	
	attempted_speed = Model.getDistance(best_direction[0], best_direction[1]);
	if (attempted_speed != 0.0) {
		this.ddx = best_direction[0] / attempted_speed * this.topAccel;
		this.ddy = best_direction[1] / attempted_speed * this.topAccel;
	}
	
	this.dx += this.ddx * dt;
	this.dy += this.ddy * dt;
	return [this.dx, this.dy];
	
}

/**
 * Entity 2: Shark. Chases fish.
 */
var Shark = function(x, y) {
	Entity.call(this, x, y, 0, 50);
	this.type = "Shark";
	this.mass = 1000;
	this.minMass = 1000;
	this.ddx = 0;
	this.ddy = 0;
	this.cruisingAccel = 25 + Math.random() * 50;
	this.topAccel = 125 + Math.random() * 250;
	this.eyesight = 100 + Math.random() * 200;
	
	tailColors = ["#4444FF"];
	this.bodyColor = "#8888FF";
	this.tailColor = tailColors[ Math.floor( Math.random() * tailColors.length ) ]
}

/**
 * Chases fish.
 */
Shark.prototype.tryMove = function(dt, visibleFish) {
	
	this.dx *= Math.pow(0.25, dt);
	this.dy *= Math.pow(0.25, dt);
	this.mass *= Math.pow(0.9, dt);
	this.mass = this.mass < this.minMass ? this.minMass : this.mass;
	
	if (this.ddx == 0) {
		randomNum = -5 + Math.random() * 10;
		this.ddx = randomNum / Math.abs(randomNum);
	}
	if (this.ddy == 0) {
		randomNum = -5 + Math.random() * 10;
		this.ddy = randomNum / Math.abs(randomNum);
	}
	this.ddx = this.ddx / (Math.abs(this.ddx)) * this.cruisingAccel;
	this.ddy = this.ddy / (Math.abs(this.ddy)) * this.cruisingAccel / 10;
	best_direction = [0.0, 0];
	
	visibleFish.forEach(function(fish) {
		displacement = myModel.getDisplacement(this, fish);
		distance = displacement[2];
		best_direction[0] += displacement[0] * fish.mass / distance;
		best_direction[1] += displacement[1] * fish.mass / distance;
	}, this);
	
	attempted_speed = Model.getDistance(best_direction[0], best_direction[1]);
	if (attempted_speed != 0.0) {
		this.ddx = best_direction[0] / attempted_speed * this.topAccel;
		this.ddy = best_direction[1] / attempted_speed * this.topAccel;
	}
	
	this.dx += this.ddx * dt;
	this.dy += this.ddy * dt;
	return [this.dx, this.dy];
	
}
