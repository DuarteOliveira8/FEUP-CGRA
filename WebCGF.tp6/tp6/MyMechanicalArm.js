/**
* MyMechanicalArm
* @param gl {WebGLRenderingContext}
* @constructor
*/

class MyMechanicalArm extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.coveredCylinder = new MyCoveredCylinder(this.scene, 30, 1);
		this.cubeQuad = new MyUnitCubeQuad(this.scene);
		this.magnet = new MyMagnet(this.scene);
		this.articulationAngle = 0; // MECHANICAL ARM'S CURRENT ARTICULATION ANGLE
	};

	display()
	{
		var degToRad = Math.PI / 180;

		this.scene.pushMatrix();
			this.scene.rotate((this.articulationAngle-90)*degToRad,1,0,0);
			this.scene.translate(0,4,0);
			this.scene.scale(0.7,7,0.7);
			this.cubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(0.8,0.7,0.7);
			this.scene.translate(0.5,0,0);
			this.scene.rotate(this.articulationAngle*degToRad,1,0,0);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.coveredCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0,7*Math.sin(this.articulationAngle*degToRad),-7.5*Math.cos(this.articulationAngle*degToRad));
			this.magnet.display();
		this.scene.popMatrix();
	};

	// Function that updates the mechanical arm's articulation angle and the vehicle position depending on the crane's current state
	updateAngle(state){
		if (state == 'pickUp' || state == 'drop') { // while the state is 'pickUp' or 'drop'
			this.articulationAngle -= 1; // the mechanical arm's articulation angle is decreasing
			if (state == 'drop' && this.scene.crane.attached){ // if the state is dropping the car to the drop zone
				this.scene.vehicle.yPos -= 0.077; // we update the car's y and z coordinates accordingly
				this.scene.vehicle.zPos += 0.02;
			}
		}
		if (state == 'liftUp' || state == 'reset') { // while the state is 'pickUp' or 'drop'
			this.articulationAngle += 1; // the mechanical arm's articulation angle is increasing
			if (state == 'liftUp' && this.scene.crane.attached){ // if the state is lifting the car from the pick up zone
				this.scene.vehicle.yPos += 0.077; // we update the car's y and z coordinates accordingly
				this.scene.vehicle.zPos -= 0.02;
			}
		}
	};
};
