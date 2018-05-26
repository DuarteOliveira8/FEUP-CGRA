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
		this.rotationAngle = 0; // CURRENT ANGLE OF THE CRANE STRUCTURE
		this.attached = false; // IF THE CAR IS CURRENTLY ATTACHED OR NOT TO THE MAGNET
		this.state = "hold"; // CRANE STATE MACHINE

		// POSSIBLE STATES OF THE STATE MACHINE
		// "hold" - waiting for car to get to pick up zone
		// "toPickUpZone" - rotating to the pick up zone
		// "pickUp" - picking up the car
		// "liftUp" - lifting the car
		// "toDropZone" - rotating to the drop zone
		// "drop" - dropping the car
		// "reset" - go back to hold position

		// CRANE TEXTURE
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

	// function that allows the crane to lift the car on the pick up zone
	// and drop it on the drop zone
	updateMovement() {
		if (this.state == 'hold') // while the car is not on the pick up zone area,
			return; // the crane is on its original position (drop zone)
		if(this.rotationAngle < 180 && this.state == 'toPickUpZone'){ // while the state is 'toPickUpZone' and the
			this.rotationAngle += 1; // angle hasn't reached 180, the angle is increasing
			if (this.rotationAngle >= 180) // when the crane reaches the pick up zone (angle >= 180),
				this.state = 'pickUp'; // we update the state to 'pickUp'
		}
		else if(this.state == 'pickUp'){ // while the state is 'pickUp',
			this.mechanicalArm.updateAngle(this.state); // we're decreasing the mechanical arm's angle
			if (this.mechanicalArm.articulationAngle <= -27) { // until it reaches -27
				this.state = 'liftUp'; // then we update the state to 'liftUp'
				this.attached = true; // the car is now attached to the magnet
				this.scene.vehicle.angle += 180; // and the car coordinates/angles/deltas
				this.scene.vehicle.zPos *= -1; // are also updated to cancel the 180 rotation
				this.scene.vehicle.xPos *= -1;
				this.scene.vehicle.zPosDelta *= -1;
				this.scene.vehicle.xPosDelta *= -1;
			}
		}
		else if(this.state == 'liftUp'){ // while the state is 'liftUp'
			this.mechanicalArm.updateAngle(this.state); // we're increasing the mechanical arm's angle
			if (this.mechanicalArm.articulationAngle >= 0) { // until it reaches 0
				this.state = 'toDropZone'; // then we update the state to 'toDropZone'
			}
		}
		else if(this.rotationAngle > 0 && this.state == 'toDropZone'){ // while the state is 'toDropZone' and the crane's rotation angle is greater than 0
			this.rotationAngle -= 1; // we're decrasing the crane's angle until it reaches 0, where two situations can happen:
			if (this.rotationAngle <= 0 && this.attached) // if the car is attached, we update the state to 'drop'
				this.state = 'drop';
			else if (this.rotationAngle <= 0 && !this.attached) // if the car isn't attached, we update the state to 'hold'
				this.state = 'hold'; // the crane is now back to its original postiion
		}
		else if(this.state == 'drop'){ // while the state is 'drop'
			this.mechanicalArm.updateAngle(this.state); // we're decreasing the mechanical arm's angle
			if (this.mechanicalArm.articulationAngle <= -27) { // until it reaches -27
				this.state = 'reset'; // then we update the state to 'reset' (back to original position)
				this.attached = false; // the car is now detached
				this.scene.vehicle.velocityDelta = 0; // and the vehicle's velocity is 0, to prevent it from moving when it's dropped
			}
		}
		else if (this.state == 'reset'){ // finally, while the state is 'reset'
			this.mechanicalArm.updateAngle(this.state); // we increase the mechanical arm's angle
			if (this.mechanicalArm.articulationAngle >= 0) // until it reaches 0
				this.state = 'hold'; // when we reset to its original state
		}
	};
};
