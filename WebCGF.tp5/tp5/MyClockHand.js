/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClockHand extends CGFobject
{

	constructor(scene, width, height) 
	{
	    super(scene);
	    this.myCylinder = new MyCylinder(scene, 12, 1);
	    this.angle = 0;
	    this.width = width;
	    this.height = height;
    };

	display()
	{ 
		var degToRad = Math.PI / 180;

        this.scene.pushMatrix();
			this.scene.rotate(-90*degToRad,1,0,0);
			this.scene.rotate(this.angle*degToRad,0,1,0);
			this.scene.scale(0.01*this.width,0.01*this.width,0.45*this.height);
			this.myCylinder.display();
		this.scene.popMatrix();
	};

	setAngle(angle)
	{ 
		var degToRad = Math.PI / 180;

		this.angle = angle;
	};
};
