/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicle extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.vehicleBody = new MyVehicleBody(this.scene);
		this.xPos = 10; // current x coordinate
		this.xPosDelta = 0; // current x increasing value
		this.yPos = 0; // current y coordinate
		this.yPosDelta = 0; // current y increasing value
		this.zPos = 0; // current z coordinate
		this.zPosDelta = 0; // current z increasing value
		this.angle = 90; // current angle of the car
		this.degToRad = Math.PI / 180;
		this.velocityDelta = 0; // current velocity

		this.initBuffers();
	};

	display()
	{
		this.scene.pushMatrix();
			this.scene.translate(this.xPos,this.yPos+0.5,this.zPos);
			this.scene.rotate(this.angle*this.degToRad,0,1,0);
			this.vehicleBody.display();
		this.scene.popMatrix();
	};

	// function that updates the coordinates/angle/velocity when the car is moving forward
	moveForward(keyA, keyD)
	{
		this.xPos+=this.xPosDelta;
		this.yPos+=this.yPosDelta;
		this.zPos+=this.zPosDelta;
		this.vehicleBody.frontWheels.movingAngle += 3*Math.abs(this.velocityDelta)*10;
		this.vehicleBody.backWheels.movingAngle += 3*Math.abs(this.velocityDelta)*10;
		if (!(keyA || keyD) && (this.vehicleBody.frontWheels.directionAngle < -2*this.scene.FPSAdapt || this.vehicleBody.frontWheels.directionAngle > 2*this.scene.FPSAdapt)){
			if (this.vehicleBody.frontWheels.directionAngle > 0){
				this.vehicleBody.frontWheels.directionAngle -= 2*(Math.abs(this.velocityDelta)/0.1);
				this.angle += 2*(Math.abs(this.velocityDelta)/0.1);
			}
			else if (this.vehicleBody.frontWheels.directionAngle < 0){
				this.vehicleBody.frontWheels.directionAngle+=2*(Math.abs(this.velocityDelta)/0.1);
				this.angle -= 2*(Math.abs(this.velocityDelta)/0.1);
			}
			this.xPosDelta=-Math.abs(this.velocityDelta)*Math.cos(this.angle*this.degToRad);
			this.zPosDelta=Math.abs(this.velocityDelta)*Math.sin(this.angle*this.degToRad);
		}
	}

	// function that updates the coordinates/angle/velocity when the car is moving backward
	moveBackward(keyA, keyD)
	{
		this.xPos-=this.xPosDelta;
		this.yPos-=this.yPosDelta;
		this.zPos-=this.zPosDelta;
		this.vehicleBody.frontWheels.movingAngle -= 3*Math.abs(this.velocityDelta)*10;
		this.vehicleBody.backWheels.movingAngle -= 3*Math.abs(this.velocityDelta)*10;
		if (!(keyA || keyD) && (this.vehicleBody.frontWheels.directionAngle < -2*this.scene.FPSAdapt || this.vehicleBody.frontWheels.directionAngle > 2*this.scene.FPSAdapt)){
			if (this.vehicleBody.frontWheels.directionAngle > 0){
				this.vehicleBody.frontWheels.directionAngle-=2*(Math.abs(this.velocityDelta)/0.1);
				this.angle -= 2*(Math.abs(this.velocityDelta)/0.1);
			}
			else if (this.vehicleBody.frontWheels.directionAngle < 0){
				this.vehicleBody.frontWheels.directionAngle+=2*(Math.abs(this.velocityDelta)/0.1);
				this.angle += 2*(Math.abs(this.velocityDelta)/0.1);
			}
			this.xPosDelta=-Math.abs(this.velocityDelta)*Math.cos(this.angle*this.degToRad);
			this.zPosDelta=Math.abs(this.velocityDelta)*Math.sin(this.angle*this.degToRad);
		}
	}

	// function that updates the coordinates/angle/velocity when the car is moving to the left
	moveLeft(keyW, keyS)
	{
		if (this.velocityDelta > 0)
			this.angle+=2*(Math.abs(this.velocityDelta)/0.1);
		if (this.velocityDelta < 0)
			this.angle-=2*(Math.abs(this.velocityDelta)/0.1);

		this.xPosDelta=-Math.abs(this.velocityDelta)*Math.cos(this.angle*this.degToRad);
		this.zPosDelta=Math.abs(this.velocityDelta)*Math.sin(this.angle*this.degToRad);

		if(this.vehicleBody.frontWheels.directionAngle < 25)
			this.vehicleBody.frontWheels.directionAngle+=2*(Math.abs(this.velocityDelta)/0.1);
	}

	// function that updates the coordinates/angle/velocity when the car is moving to the right
	moveRight(keyW, keyS)
	{
		if (this.velocityDelta > 0)
			this.angle-=2*(Math.abs(this.velocityDelta)/0.1);
		if (this.velocityDelta < 0)
			this.angle+=2*(Math.abs(this.velocityDelta)/0.1);

		this.xPosDelta=-Math.abs(this.velocityDelta)*Math.cos(this.angle*this.degToRad);
		this.zPosDelta=Math.abs(this.velocityDelta)*Math.sin(this.angle*this.degToRad);

		if(this.vehicleBody.frontWheels.directionAngle > -25)
			this.vehicleBody.frontWheels.directionAngle-=2*(Math.abs(this.velocityDelta)/0.1);
	}
};
