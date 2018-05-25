/**
 * MyCrane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCrane extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.coveredCylinder = new MyCoveredCylinder(this.scene, 30, 1);
		this.cubeQuad = new MyUnitCubeQuad(this.scene, 0, 1, 0, 8);
		this.mechanicalArm = new MyMechanicalArm(this.scene);
		this.rotationAngle = 0;
		this.attached = false;
		this.state = "hold";
		// POSSIBLE STATES
		// "hold" - waiting for car to get to pick up zone
		// "toPickUpZone" - rotating to the pick up zone
		// "pickUp" - picking up the car
		// "liftUp" - lifting the car
		// "toDropZone" - rotating to the drop zone
		// "drop" - dropping the car
		// "reset" - go back to hold position

		this.craneAppearance = new CGFappearance(this.scene);
		this.craneAppearance.setAmbient(0.6,0.6,0.6,1);
		this.craneAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.craneAppearance.setSpecular(0.5,0.5,0.5,1);
		this.craneAppearance.setShininess(150);
		this.craneAppearance.setTextureWrap('REPEAT', 'REPEAT');
		this.craneAppearance.loadTexture("../resources/images/crane.png");
	};

	display()
	{
		var degToRad = Math.PI / 180;
		this.scene.pushMatrix();
			this.scene.rotate(this.rotationAngle*degToRad,0,1,0);

			if(this.attached){
	        	this.scene.pushMatrix();
					this.scene.translate(0,0.6,0);
					this.scene.scale(1.5,1.5,1.5);
					this.scene.vehicle.display();
				this.scene.popMatrix();
        	}

			this.scene.pushMatrix();
				this.scene.scale(1,0.8,1);
				this.scene.rotate(-90*degToRad,1,0,0);
				this.coveredCylinder.display();
	        this.scene.popMatrix();

	        this.scene.pushMatrix();
	        	this.scene.rotate(-35*degToRad,1,0,0);
	        	this.scene.translate(0,5,0.5);
				this.scene.scale(0.7,10,0.7);
				this.craneAppearance.apply();
				this.cubeQuad.display();
	        this.scene.popMatrix();

	        this.scene.pushMatrix();
	        	this.scene.translate(0,-9.7*Math.cos(-35),-10*Math.sin(-35)-1.2);
	        	this.craneAppearance.apply();
				this.mechanicalArm.display();
	        this.scene.popMatrix();
        this.scene.popMatrix();
	};

	updateMovement() {
		if (this.state == 'hold')
			return;
		if(this.rotationAngle < 180 && this.state == 'toPickUpZone'){
			this.rotationAngle += 1;
			if (this.rotationAngle >= 180)
				this.state = 'pickUp';
		}
		else if(this.state == 'pickUp'){
			this.mechanicalArm.updateAngle(this.state);
			if (this.mechanicalArm.articulationAngle <= -27) {
				this.state = 'liftUp';
				this.attached = true;
				this.scene.vehicle.angle += 180;
				this.scene.vehicle.zPos *= -1;
				this.scene.vehicle.xPos *= -1;
				this.scene.vehicle.zPosDelta *= -1;
				this.scene.vehicle.xPosDelta *= -1;
			}
		}
		else if(this.state == 'liftUp'){
			this.mechanicalArm.updateAngle(this.state);
			if (this.mechanicalArm.articulationAngle >= 0) {
				this.state = 'toDropZone';
			}
		}
		else if(this.rotationAngle > 0 && this.state == 'toDropZone'){
			this.rotationAngle -= 1;
			if (this.rotationAngle <= 0 && this.attached)
				this.state = 'drop';
			else if (this.rotationAngle <= 0 && !this.attached) 
				this.state = 'hold';
		}
		else if(this.state == 'drop'){
			this.mechanicalArm.updateAngle(this.state);
			if (this.mechanicalArm.articulationAngle <= -27) {
				this.state = 'reset';
				this.attached = false;
				this.scene.vehicle.velocityDelta = 0;
			}
		}
		else if (this.state == 'reset'){
			this.mechanicalArm.updateAngle(this.state);
			if (this.mechanicalArm.articulationAngle >= 0)
				this.state = 'hold';
		}
	};
};
