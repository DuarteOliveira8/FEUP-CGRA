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
		this.xPos = 10;
		this.xPosDelta = 0;
		this.yPos = 0;
		this.yPosDelta = 0;
		this.zPos = 0;
		this.zPosDelta = 0;
		this.angle = 90;
		this.degToRad = Math.PI / 180;
		this.velocityDelta = 0;

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
