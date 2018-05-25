/**
 * MyVehicleBody
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicleBody extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.bottom = new MyUnitCubeQuad(this.scene,0,6,0,2);
		this.top = new MyTrapezoid(this.scene, true, 0, 2, 0, 4);
		this.end = new MyTrapezoid(this.scene, false, 0, 2, 0, 4);
		this.rearViewMirror = new MyRearViewMirror(this.scene);
		this.headLights = new MyHemisphere(this.scene,30,12);  //lights insides headlights
		this.frontWheels = new MyWheel(this.scene);
		this.backWheels = new MyWheel(this.scene);

		this.headLightAppearance = new CGFappearance(this.scene);
		this.headLightAppearance.setAmbient(0.6,0.6,0.6,1);
		this.headLightAppearance.setDiffuse(0.6,0.6,0.6,1);
		this.headLightAppearance.setSpecular(0.5,0.5,0.5,1);
		this.headLightAppearance.setShininess(150);
		this.headLightAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
		this.headLightAppearance.loadTexture("../resources/images/headlight1.png");

		this.initBuffers();
	};

	display() 
	{
		var degToRad = Math.PI / 180; 

        this.scene.pushMatrix();
			this.scene.translate(-0.3,0.6,1);
            this.rearViewMirror.display();
        this.scene.popMatrix(); 

        this.scene.pushMatrix();
			this.scene.translate(-0.3,0.6,-1);
			this.scene.rotate(180*degToRad,1,0,0);
            this.rearViewMirror.display();
        this.scene.popMatrix();  

        this.scene.pushMatrix();
			this.scene.translate(-2.1,0,0.6);
			this.scene.scale(0.1,0.2,0.3);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.headLightAppearance.apply();
            this.headLights.display();
        this.scene.popMatrix();  

        this.scene.pushMatrix();
			this.scene.translate(-2.1,0,-0.6);
			this.scene.scale(0.1,0.2,0.3);
			this.scene.rotate(-90*degToRad,0,1,0);
			this.headLightAppearance.apply();
            this.headLights.display();
        this.scene.popMatrix();  

		this.scene.pushMatrix();
			this.scene.translate(-1.25,-0.5,0.9);
			this.scene.rotate(this.frontWheels.directionAngle*degToRad,0,1,0);
			this.frontWheels.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.25,-0.5,-1.15);
			this.scene.rotate(this.frontWheels.directionAngle*degToRad,0,1,0);
			this.frontWheels.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.25,-0.5,0.9);
			this.backWheels.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.25,-0.5,-1.15);
			this.backWheels.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.scale(3.7, 1, 2);
			this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].wrap.apply();
            this.bottom.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        	this.scene.scale(2, 0.7, 2);
            this.scene.translate(0.2,1.2,0);
            this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].wrap.apply();
            this.top.display();
        this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-2,0,0);
        	this.scene.scale(0.3, 1, 2);
        	this.scene.rotate(90*degToRad,0,0,1);   
        	this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].wrap.apply();
            this.end.display();
        this.scene.popMatrix();   

        this.scene.pushMatrix();
			this.scene.translate(2,0,0);
        	this.scene.scale(0.3, 1, 2);
        	this.scene.rotate(-90*degToRad,0,0,1);  
        	this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].wrap.apply();
            this.end.display();
        this.scene.popMatrix(); 
	};
};