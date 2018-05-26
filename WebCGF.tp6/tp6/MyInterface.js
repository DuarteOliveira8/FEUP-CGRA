
class MyInterface extends CGFinterface {


	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}

	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		this.gui = new dat.GUI();
    // THE GUI IS CLOSED FROM THE BEGGINING
		this.gui.closed = true;

    // LIGHTS
		var group=this.gui.addFolder("Lights");
		group.add(this.scene, 'light1');
		group.add(this.scene, 'light2');
		group.add(this.scene, 'light3');
		group.add(this.scene, 'light4');
		group.add(this.scene, 'light5');

    // CURRENT CAR TEXTURE
		this.gui.add(this.scene, 'currVehicleAppearance', ['Blue', 'Graffiti', 'Woody']);

    // AXIS
		this.gui.add(this.scene, 'showAxis');

    // SEPARATE CYLINDER AND HEMISPHERE AS REQUESTED BY THE TEACHER
		this.gui.add(this.scene, 'showTestFigures');

		this.initKeys();

		return true;
	};


	initKeys() {
		this.scene.gui=this;
		this.processKeyboard=function(){

		};
		this.activeKeys={};
	};

	processKeyDown(event) {
		this.activeKeys[event.code]=true;
	};

	processKeyUp(event) {
		this.activeKeys[event.code]=false;
	};

	isKeyPressed(keyCode) {
		return this.activeKeys[keyCode] || false;
	};
};
