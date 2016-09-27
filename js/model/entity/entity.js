/**
 * Generic entity function.
 */
function Entity(position, velocity) {
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
