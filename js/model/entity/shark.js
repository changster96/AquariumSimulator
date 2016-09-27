/**
 * Entity 2: Shark. Chases fish.
 */
function Shark(position) {
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
Shark.prototype.tryMove = function(model, dt, visibleFish) {

	this.velocity = this.velocity.scMult(Math.pow(0.25, dt));
	this.mass *= Math.pow(0.9, dt);
	this.mass = this.mass < this.minMass ? this.minMass : this.mass;

	var best_direction = Vector.ZERO;

	visibleFish.forEach(function(donut) {
		displacement = model.getDisplacement(this, donut);
		if (displacement.norm() != 0) {
			best_direction = best_direction.add(displacement.scMult(1 / displacement.norm()));
		}
	}, this);

	this.acceleration = best_direction.unit().scMult(this.topAccel)

	this.ddx = this.acceleration.x
	this.velocity = this.velocity.add(this.acceleration.scMult(dt));


	return this.velocity;
}
