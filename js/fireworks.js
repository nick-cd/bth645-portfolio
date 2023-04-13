// fireworks.js

let uidCounter = Number.MIN_SAFE_INTEGER;

const FRAME_RATE = 60; // frames / second
const SPEED = 100; // pixels / second
const MOVEMENT_RATE = SPEED / FRAME_RATE; // pixels / frame

const SMOKE_TRAVEL_DISTANCE = 20; // pixels

const SMOKE_BALLS_PER_SECOND = 6; // smoke balls / second
const SMOKE_BALL_EXPEND_INTERVAL = FRAME_RATE / SMOKE_BALLS_PER_SECOND; // frames / smoke ball

const fireworkState = {};

// State class to assist the Firework class
class FireworkMedia {
	constructor(img, effect = null, text = null) {
		this.appearance = img; // p5.Image
		this.soundEffect = effect; // p5.SoundFile
		this.annotation = text; // String
	}

	getImage() {
		return this.appearance;
	}

	playSound() {
		if (this.soundEffect) {
			this.soundEffect.play();
		}
	}

	getText() {
		return this.annotation || null;
	}

	display(x, y) {
		image(this.getImage(), x, y);
		let t = this.getText();
		fill("white");
		if (t) {
			text(t, x, y);
		}
	}
}

// Entity
class Smoke {
	constructor(id, x, y, dx, dy) {
		this.id = id; // Number
		this.x = x; // Number
		this.y = y; // Number
		this.dx = dx; // Number
		this.dy = dy; // Number
		this.destinationHeight = y + SMOKE_TRAVEL_DISTANCE; // Number
	}

	draw() {
		if (this.y < this.destinationHeight) {
			this.x += this.dx;
			this.y += this.dy;
			fill("grey");
			circle(this.x + 15, this.y + 40, 10);
		} else {
			entityBin.add(this.getId()); // Inform the client, i.e., the subscriber, that the smoke has completed its course.
		}
	}

	getId() {
		return this.id;
	}
}

let setOff = null;

// Entity
class Firework {
	constructor(id, x, y, target) {
		this.id = id; // Number
		this.x = x; // Number
		this.y = y; // Number
		this.targetHeight = target; // Number
		this.media = fireworkState["flying"]; // FireworkMedia

		this.smoke = []; // Array of aggregate referances to Smoke instances
		setOff.play();
	}

	draw() {
		if (this.y <= this.targetHeight) {
			this.media = fireworkState["exploded"];
			// Inform the client, i.e., the subscriber, that the firework has completed its course.
			this.smoke.forEach((s) => {
				entityBin.add(s.getId());
			});
			entityBin.add(this.getId());
		} else {
			this.y -= MOVEMENT_RATE;
			if (frameCount % SMOKE_BALL_EXPEND_INTERVAL == 0) {
				entityMap[uidCounter] = new Smoke(
					uidCounter,
					this.x,
					this.y,
					random(-1, 1),
					random(0, 6)
				);
				this.smoke.push(entityMap[uidCounter]);
				uidCounter++;
			}
		}
		this.media.playSound();
		this.media.display(this.x, this.y);
	}

	getId() {
		return this.id;
	}
}

function init() {
	fireworkState["flying"] = new FireworkMedia(
		loadImage("images/firework.png"),
		null,
		null
	);
	fireworkState["exploded"] = new FireworkMedia(
		loadImage("images/exploded.png"),
		loadSound("audio/firework-explosion.mp3"),
		"Kaboom"
	);
}
