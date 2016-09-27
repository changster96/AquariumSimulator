/**
 * Model: Stores everything.
 * The model part of MVC.
 */
var Model = function() {
	this.entities = [[], [], []]; // Type-hashed!
	this.wrapped = {x : true, y : false};
}
Model.prototype.addDonut = function(position) {
	this.entities[0].push(new Donut(position))
}
Model.prototype.update = function(dt) {

	// supply donut
	if (this.entities[0].length < 10) {
		var x = Math.random() * window.innerWidth;
		var y = Math.random() * window.innerHeight;
		var position = Vector.fromComponents(x, y);
		this.addDonut(position);
	}

	// supply fish!
	if (this.entities[1].length < 100) {
		var x = Math.random() * window.innerWidth;
		var y = Math.random() * window.innerHeight
		var position = Vector.fromComponents(x, y);
		this.entities[1].push(new Fish(position, Vector.ZERO));
	}

	// supply sharks!
	if (this.entities[2].length < 3) {
		var x = Math.random() * window.innerWidth;
		var y = Math.random() * window.innerHeight
		var position = Vector.fromComponents(x, y);
		this.entities[2].push(new Shark(position, Vector.ZERO));
	}

	// Moving entities.

	this.entities[0].forEach(function(donut) {
		attemptedMove = donut.tryMove(dt);
		this.doMove(donut, attemptedMove, dt);
	}, this);

	this.entities[1].forEach(function(fish) {

		var visibleDonuts = this.entities[0].filter(function (donut) {
				return this.getDisplacement(fish, donut).norm() < fish.eyesight;
			}, this);
		var visibleSharks = this.entities[2].filter(function (shark) {
				return this.getDisplacement(fish, shark).norm() < fish.eyesight + Math.sqrt(shark.mass);
			}, this);
		attemptedMove = fish.tryMove(this, dt, visibleDonuts, visibleSharks);
		this.doMove(fish, attemptedMove, dt);

	}, this);

	this.entities[2].forEach(function(shark) {

		var visibleFish = this.entities[1].filter(function (fish) {
				return this.getDisplacement(shark, fish).norm() < shark.eyesight;
			}, this);
		attemptedMove = shark.tryMove(this, dt, visibleFish);
		this.doMove(shark, attemptedMove, dt);

	}, this);

	// Collision detection.

	this.checkForEat(this.entities[1], this.entities[0]);
	this.checkForEat(this.entities[2], this.entities[1]);
};

Model.prototype.checkForEat = function(predatorList, preyList) {
	predatorList.forEach(function(predator) {
		preyList.forEach(function(prey) {
			if (this.getDisplacement(predator, prey).norm() < Math.sqrt(predator.mass)) {
				predator.mass += prey.mass;
				var index = preyList.indexOf(prey);
				preyList.splice(index, 1);
			}
		}, this);
	}, this);
}

Model.prototype.doMove = function(entity, attemptedMov, dt) {
	var windowSize = {x : window.innerWidth, y : window.innerHeight};
	["x", "y"].forEach(function (dim) {
		if (this.wrapped[dim] === true) {
			entity[dim] += attemptedMove[dim] * dt;
			entity[dim] = (entity[dim] + windowSize[dim]) % windowSize[dim];
		} else {
			if (entity[dim] + attemptedMove[dim] * dt < 0) {
				entity[dim] = 0;
				entity.velocity[dim] *= -2;
			} else if (entity[dim] + attemptedMove[dim] * dt > windowSize[dim]) {
				entity[dim] = windowSize[dim];
				entity.velocity[dim] *= -2;
			} else {
				entity[dim] += attemptedMove[dim] * dt;
			}
		}
	}, this);
};


Model.prototype.getDisplacement = function(obj1, obj2) {
	var windowSize = {x : window.innerWidth, y : window.innerHeight};
	var displacement = {};
	["x", "y"].forEach(function (dim) {
		displacement[dim] = obj2[dim] - obj1[dim];
		if (this.wrapped[dim] == true) {
			if (displacement[dim] > windowSize[dim] / 2) {
				displacement[dim] = displacement[dim] - windowSize[dim];
			} else if (displacement[dim] < -1 * windowSize[dim] / 2) {
				displacement[dim] = displacement[dim] + windowSize[dim];
			}
		}
	}, this);
	// return [displacement["x"], displacement["y"], Model.getDistance(displacement["x"], displacement["y"])];
	return Vector.fromComponents(displacement["x"], displacement["y"]);
};

Model.getDistance = function(leg1, leg2) {
	return Math.sqrt(Math.pow(leg1, 2) + Math.pow(leg2, 2));
};
