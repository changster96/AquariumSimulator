/**
 * All the entity classes that go in the tank!
 */

/**
 * Generic entity function.
 */
var Entity = function(position, velocity) {
	this.type = "Generic Entity"
	this.position = position;
	this.x = position.x;
	this.y = position.y;
	this.velocity = velocity;
	this.dx = velocity.x;
	this.dy = velocity.y;
	this.mass = 10;
}

Entity.prototype.getPosition = function() {
	return Vector.fromComponents(this.x, this.y);
}

Entity.prototype.getVelocity = function() {
	return this.velocity;
}

/**
 * Moves entity around.
 * Takes in a time-step, returns a tuple.
 */
Entity.prototype.tryMove = function(dt) {
	return this.getVelocity();
}

/**
 * Entity 0: Donut. Does nothing but sink.
 */
var Donut = function(position) {
	Entity.call(this, position, Vector.fromComponents(0, 50)); // (0, 50?)
	this.type = "Donut";
	this.mass = 10;
}

Donut.prototype = Object.create(Entity.prototype);

/**
 * Entity 1: Fish. Chases donuts and hangs out.
 */
var Fish = function(position) {
	Entity.call(this, position, Vector.ZERO);
	this.type = "Fish";
	this.mass = 30;
	this.acceleration = Vector.ZERO;
	this.ddx = 0;
	this.ddy = 0;
	this.cruiseAngle = Math.floor(Math.random() * 2) * Math.PI + ((-0.15 + Math.random() * 0.3) * Math.PI);
	this.cruisingAccel = 25 + Math.random() * 50;
	this.topAccel = 250 + Math.random() * 500;
	this.eyesight = 50 + Math.random() * 100;
	
	tailColors = ["#FF0000", "#FF00FF", "#0000FF"];
	this.bodyColor = "#FFA500";
	this.tailColor = tailColors[ Math.floor( Math.random() * tailColors.length ) ]
}
Fish.prototype = Object.create(Entity.prototype);

Fish.prototype.getAcceleration = function() {
	return Vector.fromComponents(this.ddx, this.ddy);
}

/**
 * Chases donuts.
 */
Fish.prototype.tryMove = function(dt, visibleDonuts, visibleSharks) {
	
	//this.dx *= Math.pow(0.25, dt);
	//this.dy *= Math.pow(0.25, dt);
	this.velocity = this.velocity.scMult(Math.pow(0.25, dt));
	
	
	
	
	var best_direction = Vector.ZERO;
	
	visibleDonuts.forEach(function(donut) {
		displacement = myModel.getDisplacement(this, donut);
		best_direction = best_direction.add(displacement.scMult(1 / displacement.norm()));
	}, this);
	
	visibleSharks.forEach(function(shark) {
		displacement = myModel.getDisplacement(this, shark);
		best_direction = best_direction.add(displacement.scMult(-1 / displacement.norm()));
	}, this);
	
	// console.log(best_direction);
	
	this.acceleration = best_direction.unit().scMult(this.topAccel)
	
	if (this.acceleration.norm() == 0.0) { // Lame!!
		
		
		this.acceleration = Vector.fromPolar(this.cruisingAccel, this.cruiseAngle);
		
		this.ddx = this.acceleration.x
		this.velocity = this.velocity.add(this.acceleration.scMult(dt));
		return this.velocity;
	}
	
	this.ddx = this.acceleration.x
	this.velocity = this.velocity.add(this.acceleration.scMult(dt));
	
	
	return this.velocity;
	
}

/**
 * Entity 2: Shark. Chases fish.
 */
var Shark = function(position) {
	Entity.call(this, position, Vector.ZERO);
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

Shark.prototype = Object.create(Entity.prototype);


/**
 * Chases fish.
 */
Shark.prototype.tryMove = function(dt, visibleFish) {
	
	this.velocity = this.velocity.scMult(Math.pow(0.25, dt));
	this.mass *= Math.pow(0.9, dt);
	this.mass = this.mass < this.minMass ? this.minMass : this.mass;
	
	var best_direction = Vector.ZERO;
	
	visibleFish.forEach(function(donut) {
		displacement = myModel.getDisplacement(this, donut);
		if (displacement.norm() != 0) {
			best_direction = best_direction.add(displacement.scMult(1 / displacement.norm()));
		}
	}, this);
	
	this.acceleration = best_direction.unit().scMult(this.topAccel)
	
	this.ddx = this.acceleration.x
	this.velocity = this.velocity.add(this.acceleration.scMult(dt));
	
	
	return this.velocity;
}
