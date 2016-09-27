/**
 * Entity 1: Fish. Chases donuts and hangs out.
 */
function Fish(position) {
	Entity.call(this, position, Vector.ZERO);
	this.type = "Fish";
	this.mass = 30;
	this.acceleration = Vector.ZERO;
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
	return this.acceleration;
}

/**
 * Chases donuts.
 */
Fish.prototype.tryMove = function(model, dt, visibleDonuts, visibleSharks) {
	this.velocity = this.velocity.scMult(Math.pow(0.25, dt));

	var best_direction = Vector.ZERO;

	visibleDonuts.forEach(function(donut) {
		displacement = model.getDisplacement(this, donut);
		best_direction = best_direction.add(displacement.scMult(1 / displacement.norm()));
	}, this);

	visibleSharks.forEach(function(shark) {
		displacement = model.getDisplacement(this, shark);
		best_direction = best_direction.add(displacement.scMult(-1 / displacement.norm()));
	}, this);

	this.acceleration = best_direction.unit().scMult(this.topAccel)

	if (this.acceleration.norm() == 0.0) { // Lame!!


		this.acceleration = Vector.fromPolar(this.cruisingAccel, this.cruiseAngle);

		this.velocity = this.velocity.add(this.acceleration.scMult(dt));
		return this.velocity;
	}

	this.velocity = this.velocity.add(this.acceleration.scMult(dt));


	return this.velocity;

}
