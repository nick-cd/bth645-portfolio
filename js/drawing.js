const KIRBY_WIDTH = 85;
const KIRBY_HEIGHT = 80;

const EYE_WIDTH = (MOUTH_WIDTH = 4);
const EYE_HEIGHT = EYE_WIDTH * 4;

const FOOT_WIDTH = KIRBY_WIDTH / 3;
const FOOT_HEIGHT = KIRBY_HEIGHT / 4;

function preload() {
	img = loadImage("images/forest.svg");
}

function setup() {
	let canvas = createCanvas(windowWidth / 2, windowHeight / 2);
	// https://github.com/processing/p5.js/wiki/Positioning-your-canvas
	canvas.parent("sketch-container");
	background(img);
}

function windowResized() {
	resizeCanvas(windowWidth / 2, windowHeight / 2);
	background(img);
}

function draw() {
	const KIRBY_POS_X = width / 2;
	const KIRBY_POS_Y = height / 1.6;

	noStroke();

	// Face
	fill(254, 198, 225);
	ellipse(KIRBY_POS_X, KIRBY_POS_Y, KIRBY_WIDTH, KIRBY_HEIGHT);

	// Eyes
	fill("black");
	rect(
		KIRBY_POS_X + KIRBY_WIDTH / 4,
		KIRBY_POS_Y - KIRBY_HEIGHT / 4,
		EYE_WIDTH,
		EYE_HEIGHT
	);
	rect(
		KIRBY_POS_X + KIRBY_WIDTH / 16,
		KIRBY_POS_Y - KIRBY_HEIGHT / 4,
		EYE_WIDTH,
		EYE_HEIGHT
	);

	// Mouth
	circle(
		KIRBY_POS_X + KIRBY_WIDTH / 6,
		KIRBY_POS_Y + KIRBY_HEIGHT / 8,
		MOUTH_WIDTH
	);

	// Feet
	fill(254, 0, 128);
	ellipse(
		KIRBY_POS_X - KIRBY_WIDTH / 4,
		KIRBY_POS_Y + KIRBY_HEIGHT / 2,
		FOOT_WIDTH,
		FOOT_HEIGHT
	);
	ellipse(
		KIRBY_POS_X + KIRBY_WIDTH / 4,
		KIRBY_POS_Y + KIRBY_HEIGHT / 2,
		FOOT_WIDTH,
		FOOT_HEIGHT
	);

	fill("black");
	textSize(38);
	text("Hiiiiiii!", KIRBY_POS_X + KIRBY_WIDTH / 1.5, KIRBY_POS_Y);
}
