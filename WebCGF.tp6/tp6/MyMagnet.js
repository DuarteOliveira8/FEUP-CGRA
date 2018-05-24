/**
 * MyMagnet
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyMagnet extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.coveredCylinder = new MyCoveredCylinder(this.scene, 30, 1);
	};

	display()
	{
		var degToRad = Math.PI / 180;

        this.scene.pushMatrix();
        	this.scene.translate(0,-2,0);
        	this.scene.rotate(-90*degToRad,1,0,0);
			this.scene.scale(0.05,0.05,2);
			this.coveredCylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        	this.scene.translate(0,-2,0);
        	this.scene.rotate(90*degToRad,1,0,0);
			this.scene.scale(1.5,1.5,0.5);
			this.coveredCylinder.display();
        this.scene.popMatrix();
	};
};