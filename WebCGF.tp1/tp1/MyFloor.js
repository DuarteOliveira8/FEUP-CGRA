/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyFloor extends CGFobject
{

	constructor(scene) 
	{
	     super(scene);
	     this.cubeQuad = new MyUnitCubeQuad(this.scene);
	};

	display()
	{ 
            this.scene.pushMatrix();
                  this.scene.scale(8,0.1,6);
                  this.cubeQuad.display();
            this.scene.popMatrix();
	};
};
