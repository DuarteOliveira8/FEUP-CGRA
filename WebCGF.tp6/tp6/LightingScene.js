var degToRad = Math.PI / 180.0;


class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.4, 0.8235, 1, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// DEFAULT MATERIAL
		this.materialDefault = new CGFappearance(this);

		// TERRAIN TEXTURE
		this.terrainAppearance = new CGFappearance(this);
		this.terrainAppearance.setAmbient(0.6,0.6,0.6,1);
		this.terrainAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.terrainAppearance.setSpecular(0.5,0.5,0.5,1);
		this.terrainAppearance.setShininess(300);
		this.terrainAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.terrainAppearance.loadTexture("../resources/images/terrain.png");

		// TEST TEXTURE
		this.testAppearance = new CGFappearance(this);
		this.testAppearance.setAmbient(0.3,0.3,0.3,1);
		this.testAppearance.setDiffuse(0.3,0.3,0.3,1);
		this.testAppearance.setSpecular(0.5,0.5,0.5,1);
		this.testAppearance.setShininess(150);
		this.testAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.testAppearance.loadTexture("../resources/images/testTexture.png");

		this.vehicleAppearances = [];
		// LIGHT BLUE WRAP
		this.createCarWrap(1);
		// GRAFFITI WRAP
		this.createCarWrap(2);
		// WOODY WRAP
		this.createCarWrap(3);

		// VEHICLE APPEARANCE LIST
		this.vehicleAppearanceList = {};
		this.vehicleAppearanceList.Blue = 0;
		this.vehicleAppearanceList.Graffiti = 1;
		this.vehicleAppearanceList.Woody = 2;

		// TERRAIN MODELING

		this.altimetry = [[ 20 , 30 , 20 , 40 , 50 , 60 , 30 , 20 , 10 ],
						  [ 10 , 15 , 10 , 0 , 0 , 0 , 0 , 0 , 0 ],
						  [ 40 , 20 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
						  [ 20 , 10 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
		  				  [ 30 , 15 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
	 					  [ 50 , 25 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
		  				  [ 20 , 10 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
		  				  [ 60 , 30 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
		  				  [ 70 , 35 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]];


		// SCENE ELEMENTS
		this.terrain = new MyTerrain(this,8,this.altimetry);
		this.vehicle = new MyVehicle(this);
		this.crane = new MyCrane(this);
		this.testHemisphere = new MyHemisphere(this, 30, 12);
		this.testCylinder = new MyCylinder(this, 30, 12);

		// GUI ELEMENTS
		this.light1 = true;
		this.light2 = true;
		this.light3 = true;
		this.light4 = true;
		this.light5 = true;
		this.showAxis = false;
		this.currVehicleAppearance = 'Blue';
		this.showTestFigures = true;


		this.enableTextures(true);

		this.period = 10; // UPDATE PERIOD IN MILISSECONDS
		this.FPSAdapt = (this.period/10); // MULTIPLIER THAT ALLOWS THE CAR SPEED TO BE THE SAME DESPITE THE period VALUE

		this.setUpdatePeriod(this.period);

	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 25, 45), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.4,0.4,0.4, 1.0);

		// POSITIONS FOR FOUR LIGHTS
		this.lights[0].setPosition(0, 6, 0, 1);
		this.lights[0].setVisible(false); // show marker on light position (different from enabled)

		this.lights[1].setPosition(25, 6, 25, 1);
		this.lights[1].setVisible(false); // show marker on light position (different from enabled)

		this.lights[2].setPosition(-25, 6, 25, 1);
		this.lights[2].setVisible(false); // show marker on light position (different from enabled)

		this.lights[3].setPosition(25, 6, -25, 1);
		this.lights[3].setVisible(false); // show marker on light position (different from enabled)

		this.lights[4].setPosition(-25, 6, -25, 1);
		this.lights[4].setVisible(false); // show marker on light position (different from enabled)


		// LIGHT SETTINGS
		this.lights[0].setAmbient(0.1, 0.1, 0.1, 1);
		this.lights[0].setDiffuse(0.5, 0.5, 0.5, 1);
		this.lights[0].setSpecular(0.5, 0.5, 0.5, 1);
		this.lights[0].enable();

		this.lights[1].setAmbient(0.1, 0.1, 0.1, 1);
		this.lights[1].setDiffuse(0.5, 0.5, 0.5, 1);
		this.lights[1].setSpecular(0.5, 0.5, 0.5, 1);
		this.lights[1].enable();

		this.lights[2].setAmbient(0.1, 0.1, 0.1, 1);
		this.lights[2].setDiffuse(0.5, 0.5, 0.5, 1);
		this.lights[2].setSpecular(0.5, 0.5, 0.5, 1);
		this.lights[2].enable();

		this.lights[3].setAmbient(0.1, 0.1, 0.1, 1);
		this.lights[3].setDiffuse(0.5, 0.5, 0.5, 1);
		this.lights[3].setSpecular(0.5, 0.5, 0.5, 1);
		this.lights[3].enable();

		this.lights[4].setAmbient(0.1, 0.1, 0.1, 1);
		this.lights[4].setDiffuse(0.5, 0.5, 0.5, 1);
		this.lights[4].setSpecular(0.5, 0.5, 0.5, 1);
		this.lights[4].enable();
	};

	updateLights()
	{
		// GUI LIGHT CONTROLLING
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();

		if(this.light1)
			this.lights[0].enable();
		else
			this.lights[0].disable();

		if(this.light2)
			this.lights[1].enable();
		else
			this.lights[1].disable();

		if(this.light3)
			this.lights[2].enable();
		else
			this.lights[2].disable();

		if(this.light4)
			this.lights[3].enable();
		else
			this.lights[3].disable();

		if(this.light5)
			this.lights[4].enable();
		else
			this.lights[4].disable();
	}


	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.showAxis)
			this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// TEST FIGURES

		if (this.showTestFigures) {
			this.pushMatrix();
				this.translate(16,0,-16);
				this.scale(2,2,2);
				this.rotate(-90 * degToRad, 1, 0, 0);
				this.testAppearance.apply();
				this.testHemisphere.display();
			this.popMatrix();

			this.pushMatrix();
				this.translate(11,0,-16);
				this.scale(2,2,2);
				this.rotate(-90 * degToRad, 1, 0, 0);
				this.testAppearance.apply();
				this.testCylinder.display();
			this.popMatrix();
		}

		// ANIMATION FIGURES

		this.pushMatrix();
			this.crane.display();
		this.popMatrix();

		if (this.crane.attached == false) {
			this.pushMatrix();
				this.translate(0,0.6,0);
				this.scale(1.5,1.5,1.5);
				this.vehicle.display();
			this.popMatrix();
		}

		this.pushMatrix();
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(50, 50, 0.2);
			this.terrainAppearance.apply();
			this.terrain.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};

	// Funtion to check key input and call all the appropriate functions
	checkKeys() {
		var text="Keys pressed: ";
		var keysPressed=false;
		if (this.gui.isKeyPressed("KeyW")) {
			if (this.vehicle.velocityDelta < 0.1*this.FPSAdapt){
				this.vehicle.velocityDelta += 0.01*this.FPSAdapt;
				this.vehicle.xPosDelta=-Math.abs(this.vehicle.velocityDelta)*Math.cos(this.vehicle.angle*this.vehicle.degToRad);
				this.vehicle.zPosDelta=Math.abs(this.vehicle.velocityDelta)*Math.sin(this.vehicle.angle*this.vehicle.degToRad);
			}
		}
		if (this.gui.isKeyPressed("KeyS")) {
			if (this.vehicle.velocityDelta > -0.1*this.FPSAdapt){
				this.vehicle.velocityDelta -= 0.01*this.FPSAdapt;
				this.vehicle.xPosDelta=-Math.abs(this.vehicle.velocityDelta)*Math.cos(this.vehicle.angle*this.vehicle.degToRad);
				this.vehicle.zPosDelta=Math.abs(this.vehicle.velocityDelta)*Math.sin(this.vehicle.angle*this.vehicle.degToRad);
			}
		}
		if (this.gui.isKeyPressed("KeyA") && !this.crane.attached) {
			this.vehicle.moveLeft(this.gui.isKeyPressed("KeyW"), this.gui.isKeyPressed("KeyS"));
		}
		if (this.gui.isKeyPressed("KeyD") && !this.crane.attached) {
			this.vehicle.moveRight(this.gui.isKeyPressed("KeyW"), this.gui.isKeyPressed("KeyS"));
		}
	};

	// Function to check Crane status and and update its movement
	checkCrane() {
		if (this.vehicle.xPos >= -2.5 && this.vehicle.xPos <= 2.5 && this.vehicle.zPos >= 5 && this.vehicle.zPos <= 10) {
			if (this.crane.state == 'hold')
				this.crane.state = 'toPickUpZone';
			else if (this.crane.state == 'toDropZone' && !this.crane.attached)
				this.crane.state = 'toPickUpZone';
		}
		else {
			if (this.crane.state == 'toPickUpZone')
				this.crane.state = 'toDropZone';
			else if (this.crane.state == 'pickUp')
				this.crane.state = 'liftUp';
		}
		this.crane.updateMovement();
	};

	// Update function
	update(){
		if (this.altimetry[Math.round(((this.vehicle.zPos-1.5+17)*9)/32)-1][Math.round(((this.vehicle.xPos-1.5+17)*9)/32)-1] > 0){
			if (this.vehicle.zPos < -10.2296)
				this.vehicle.zPos = -10.2296;
			if (this.vehicle.xPos < -6.6889)
				this.vehicle.xPos = -6.6889;
		}

		this.checkKeys();

		if (this.vehicle.velocityDelta > 0 && !this.crane.attached)
			this.vehicle.moveForward(this.gui.isKeyPressed("KeyA"), this.gui.isKeyPressed("KeyD"));
		else if (this.vehicle.velocityDelta < 0 && !this.crane.attached)
			this.vehicle.moveBackward(this.gui.isKeyPressed("KeyA"), this.gui.isKeyPressed("KeyD"));

		this.checkCrane();
	};

	// Function that creates the different car textures (BLUE, GRAFFITI & WOODY)
	// and stores them in the vehicleAppearances array
	createCarWrap(numWrap) {
		var Appearance = {};

		var wrapAppearance = new CGFappearance(this);
		wrapAppearance.setAmbient(0.4,0.4,0.4,1);
		wrapAppearance.setDiffuse(0.5,0.5,0.5,1);
		wrapAppearance.setSpecular(0.5,0.5,0.5,1);
		wrapAppearance.setShininess(150);
		wrapAppearance.setTextureWrap('REPEAT', 'REPEAT');
		wrapAppearance.loadTexture("../resources/images/carWrap"+numWrap+".png");
		Appearance.wrap = wrapAppearance;

		var leftWindowAppearance = new CGFappearance(this);
    leftWindowAppearance.setAmbient(0.4,0.4,0.4,1);
    leftWindowAppearance.setDiffuse(0.5,0.5,0.5,1);
    leftWindowAppearance.setSpecular(0.5,0.5,0.5,1);
    leftWindowAppearance.setShininess(150);
    leftWindowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    leftWindowAppearance.loadTexture("../resources/images/leftwindow"+numWrap+".png");
    Appearance.leftWindow = leftWindowAppearance;

		var rightWindowAppearance = new CGFappearance(this);
    rightWindowAppearance.setAmbient(0.4,0.4,0.4,1);
    rightWindowAppearance.setDiffuse(0.5,0.5,0.5,1);
		rightWindowAppearance.setSpecular(0.5,0.5,0.5,1);
		rightWindowAppearance.setShininess(150);
    rightWindowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    rightWindowAppearance.loadTexture("../resources/images/rightwindow"+numWrap+".png");
    Appearance.rightWindow = rightWindowAppearance;

    var frontWindowAppearance = new CGFappearance(this);
		frontWindowAppearance.setAmbient(0.4,0.4,0.4,1);
    frontWindowAppearance.setDiffuse(0.5,0.5,0.5,1);
    frontWindowAppearance.setSpecular(0.5,0.5,0.5,1);
    frontWindowAppearance.setShininess(150);
    frontWindowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    frontWindowAppearance.loadTexture("../resources/images/frontwindow"+numWrap+".png");
    Appearance.frontWindow = frontWindowAppearance;

    var backWindowAppearance = new CGFappearance(this);
    backWindowAppearance.setAmbient(0.4,0.4,0.4,1);
    backWindowAppearance.setDiffuse(0.5,0.5,0.5,1);
    backWindowAppearance.setSpecular(0.5,0.5,0.5,1);
    backWindowAppearance.setShininess(150);
    backWindowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    backWindowAppearance.loadTexture("../resources/images/backwindow"+numWrap+".png");
    Appearance.backWindow = backWindowAppearance;

    var mirrorAppearance = new CGFappearance(this);
		mirrorAppearance.setAmbient(0.6,0.6,0.6,1);
		mirrorAppearance.setDiffuse(0.6,0.6,0.6,1);
		mirrorAppearance.setSpecular(0.5,0.5,0.5,1);
		mirrorAppearance.setShininess(300);
		mirrorAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		mirrorAppearance.loadTexture("../resources/images/mirror"+numWrap+".png");
		Appearance.mirror = mirrorAppearance;

		this.vehicleAppearances.push(Appearance);
	};
};
