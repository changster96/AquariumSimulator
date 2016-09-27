/**
 * Generic entity function.
 */
function Entity(position, velocity) {
	this.type = "Generic Entity"
	this.position = position;
	this.velocity = velocity;
	this.mass = 10;
}

Entity.prototype.getPosition = function() {
	return this.position;
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
