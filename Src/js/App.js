// App constructor
let App = function(canvas, overlay) {
	this.canvas = canvas;
	this.overlay = overlay;
	this.keysPressed = {};

	this.mouse = {};
	this.mouse["Down"] = new Vec4();
	this.mouse["Up"] = new Vec4();
	this.mouse["Move"] = new Vec4();
	this.mouse["PressedDown"] = false;
	this.mouse["PressedMove"] = false;
	this.mouse["PressedUp"] = false;
	
	// if no GL support, cry
	this.gl = canvas.getContext("experimental-webgl");
	if (this.gl === null) {
		throw new Error("Browser does not support WebGL");
	}
	// create a simple scene
	this.scene = new Scene(this.gl);
	this.resize();

	this.gl.pendingResources = {};

};

// match WebGL rendering resolution and viewport to the canvas size
App.prototype.resize = function() {
	this.canvas.width = this.canvas.clientWidth;
	this.canvas.height = this.canvas.clientHeight;
	this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	this.scene.camera.setAspectRatio(
	    this.canvas.clientWidth /
	    this.canvas.clientHeight );

};

App.prototype.registerEventHandlers = function() {
	let theApp = this;
	document.onkeydown = function(event) {
		//jshint unused:false
		theApp.keysPressed[keyboardMap[event.keyCode]] = true;
	};
	document.onkeyup = function(event) {
		//jshint unused:false
		theApp.keysPressed[keyboardMap[event.keyCode]] = false;
	};
	this.canvas.onmousedown = function(event) {
		//jshint unused:false
		theApp.mouse["pressedDown"] = true;
		theApp.mouse["pressedMove"] = true;
		var x = 2 * event.clientX / theApp.canvas.width - 1; 
		var y = -2 * event.clientY / theApp.canvas.height + 1;
		let viewProjMatrixInverse = theApp.scene.camera.viewProjMatrix.clone().invert();
		theApp.mouse["Down"] = new Vec4(x,y).mul(viewProjMatrixInverse);

	};
	this.canvas.onmousemove = function(event) {
		//jshint unused:false
		var x = 2 * event.clientX / theApp.canvas.width - 1; 
		var y = -2 * event.clientY / theApp.canvas.height + 1;
		let viewProjMatrixInverse = theApp.scene.camera.viewProjMatrix.clone().invert();
		theApp.mouse["Move"] = new Vec4(x,y).mul(viewProjMatrixInverse);

		event.stopPropagation();
	};
	this.canvas.onmouseout = function(event) {
		//jshint unused:false
	};
	this.canvas.onmouseup = function(event) {
		//jshint unused:false
		theApp.mouse["pressedUp"] = true;
		theApp.mouse["pressedMove"] = false;
		var x = 2 * event.clientX / theApp.canvas.width - 1; 
		var y = -2 * event.clientY / theApp.canvas.height + 1;
		let viewProjMatrixInverse = theApp.scene.camera.viewProjMatrix.clone().invert();
		theApp.mouse["Up"] = new Vec4(x,y).mul(viewProjMatrixInverse);
	};
	window.addEventListener('resize', function() {
		theApp.resize();
	});
	window.requestAnimationFrame(function() {
		theApp.update();
	});
};

// animation frame update
App.prototype.update = function() {

	let pendingResourceNames = Object.keys(this.gl.pendingResources);
	if (pendingResourceNames.length === 0) {
		// animate and draw scene
		this.scene.update(this.gl,this.keysPressed,this.mouse);
	} else {
		this.overlay.innerHTML = "Loading: " + pendingResourceNames;
	}

	// refresh
	let theApp = this;
	window.requestAnimationFrame(function() {
		theApp.update();
	});
};

// entry point from HTML
window.addEventListener('load', function() {
	let canvas = document.getElementById("canvas");
	let overlay = document.getElementById("overlay");

	let app = new App(canvas, overlay);
	app.registerEventHandlers();
});
