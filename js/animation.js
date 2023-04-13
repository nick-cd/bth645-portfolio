// animation.js: driver code

let entityMap = {};
let entityBin = new Set(); // IDs of enitities queued for deletion
let backgroundImg = null;

function preload() {
	soundFormats("mp3");
	setOff = loadSound("audio/firework-set-off.mp3");
	init(); // fireworks initalization procedure
	backgroundImg = loadImage("images/night-sky.svg");
}

function setup() {
	let canvas = createCanvas(windowWidth / 2, windowHeight / 2);
	canvas.parent("animation-container");
	frameRate(FRAME_RATE);
}

function draw() {
	background(backgroundImg);
	fill("white");
	text("Starry Night", width / 2 - 30, 40);

	Object.keys(entityMap).forEach((id) => {
		entityMap[id].draw();
	});
	for (const id of entityBin) {
		delete entityMap[id];
	}
	entityBin.clear();
}

function mouseClicked() {
	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		entityMap[uidCounter] = new Firework(
			uidCounter,
			mouseX,
			height,
			mouseY
		);
		uidCounter++;
	}
}
