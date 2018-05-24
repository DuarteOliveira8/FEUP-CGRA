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
		this.zPosDelta = 0.1;
		this.angle = 90;
		this.degToRad = Math.PI / 180;

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
		this.vehicleBody.frontWheels.movingAngle += 3;
		this.vehicleBody.backWheels.movingAngle += 3;
		if (!(keyA || keyD))
			this.vehicleBody.frontWheels.directionAngle=0;
	}

	moveBackward(keyA, keyD)
	{
		this.xPos-=this.xPosDelta;
		this.yPos-=this.yPosDelta;
		this.zPos-=this.zPosDelta;
		this.vehicleBody.frontWheels.movingAngle -= 3;
		this.vehicleBody.backWheels.movingAngle -= 3;
		if (!(keyA || keyD))
			this.vehicleBody.frontWheels.directionAngle=0;
	}

	moveLeft(keyW, keyS)
	{
		if(keyW) {
			// if ((this.angle%360 >= 0 && this.angle%360 < 90) || ((this.angle%360 == 0 || this.angle%360 > -360) && this.angle%360 < -270)) {
			// 	this.xPosDelta+=1/900;
			// 	this.zPosDelta+=1/900;
			// }
			// else if ((this.angle%360 >= 90 && this.angle%360 < 180) || (this.angle%360 > -270 && this.angle%360 < -180)) {
			// 	this.xPosDelta+=1/900;
			// 	this.zPosDelta-=1/900;
			// }
			// else if ((this.angle%360 >= 180 && this.angle%360 < 270) || (this.angle%360 > -180 && this.angle%360 < -90)) {
			// 	this.xPosDelta-=1/900;
			// 	this.zPosDelta-=1/900;
			// }
			// else if ((this.angle%360 >= 270 && this.angle%360 < 360) || (this.angle%360 < 0 && this.angle%360 > -90)){
			// 	this.xPosDelta-=1/900;
			// 	this.zPosDelta+=1/900;
			// }
			this.xPosDelta=0.1*Math.sin(this.angle);
			this.zPosDelta=0.1*Math.cos(this.angle);

			this.angle+=1;
		}
		if (keyS) {
			// if ((this.angle%360 >= 0 && this.angle%360 < 90) || ((this.angle%360 == 0 || this.angle%360 > -360) && this.angle%360 < -270)) {
			// 	this.xPosDelta-=1/900;
			// 	this.zPosDelta-=1/900;
			// }
			// else if ((this.angle%360 >= 90 && this.angle%360 < 180) || (this.angle%360 > -270 && this.angle%360 < -180)) {
			// 	this.xPosDelta-=1/900;
			// 	this.zPosDelta+=1/900;
			// }
			// else if ((this.angle%360 >= 180 && this.angle%360 < 270) || (this.angle%360 > -180 && this.angle%360 < -90)) {
			// 	this.xPosDelta+=1/900;
			// 	this.zPosDelta+=1/900;
			// }
			// else if ((this.angle%360 >= 270 && this.angle%360 < 360) || (this.angle%360 < 0 && this.angle%360 > -90)){
			// 	this.xPosDelta+=1/900;
			// 	this.zPosDelta-=1/900;
			// }
			this.xPosDelta=0.1*Math.sin(this.angle);
			this.zPosDelta=0.1*Math.cos(this.angle);

			this.angle-=1;
		}
		if(this.vehicleBody.frontWheels.directionAngle < 25)
			this.vehicleBody.frontWheels.directionAngle+=1;
	}

	moveRight(keyW, keyS)
	{
		if(keyW){
			// if ((this.angle%360 >= 0 && this.angle%360 < 90) || ((this.angle%360 == 0 || this.angle%360 > -360) && this.angle%360 < -270)) {
			// 	this.xPosDelta-=1/900;
			// 	this.zPosDelta-=1/900;
			// }
			// else if ((this.angle%360 >= 90 && this.angle%360 < 180) || (this.angle%360 > -270 && this.angle%360 < -180)) {
			// 	this.xPosDelta-=1/900;
			// 	this.zPosDelta+=1/900;
			// }
			// else if ((this.angle%360 >= 180 && this.angle%360 < 270) || (this.angle%360 > -180 && this.angle%360 < -90)) {
			// 	this.xPosDelta+=1/900;
			// 	this.zPosDelta+=1/900;
			// }
			// else if ((this.angle%360 >= 270 && this.angle%360 < 360) || (this.angle%360 < 0 && this.angle%360 > -90)){
			// 	this.xPosDelta+=1/900;
			// 	this.zPosDelta-=1/900;
			// }
			this.xPosDelta=0.1*Math.sin(this.angle);
			this.zPosDelta=0.1*Math.cos(this.angle);

			this.angle-=1;
		}
		if (keyS) {
			// if ((this.angle%360 >= 0 && this.angle%360 < 90) || ((this.angle%360 == 0 || this.angle%360 > -360) && this.angle%360 < -270)) {
			// 	this.xPosDelta+=1/900;
			// 	this.zPosDelta+=1/900;
			// }
			// else if ((this.angle%360 >= 90 && this.angle%360 < 180) || (this.angle%360 > -270 && this.angle%360 < -180)) {
			// 	this.xPosDelta+=1/900;
			// 	this.zPosDelta-=1/900;
			// }
			// else if ((this.angle%360 >= 180 && this.angle%360 < 270) || (this.angle%360 > -180 && this.angle%360 < -90)) {
			// 	this.xPosDelta-=1/900;
			// 	this.zPosDelta-=1/900;
			// }
			// else if ((this.angle%360 >= 270 && this.angle%360 < 360) || (this.angle%360 < 0 && this.angle%360 > -90)){
			// 	this.xPosDelta-=1/900;
			// 	this.zPosDelta+=1/900;
			// }
			this.xPosDelta=0.1*Math.sin(this.angle);
			this.zPosDelta=0.1*Math.cos(this.angle);

			this.angle+=1;
		}
		if(this.vehicleBody.frontWheels.directionAngle > -25)
			this.vehicleBody.frontWheels.directionAngle-=1;
	}
};
