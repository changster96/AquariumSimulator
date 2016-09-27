/**
 * Entity 0: Donut. Does nothing but sink.
 */
function Donut(position) {
	Entity.call(this, position, Vector.fromComponents(0, 50)); // (0, 50?)
	this.type = "Donut";
	this.mass = 10;
}

Donut.prototype = Object.create(Entity.prototype);
