/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{

	constructor(scene) 
	{
	     super(scene);
	     this.cubeQuad = new MyUnitCubeQuad(this.scene);
	};

	display()
	{ 
            this.scene.pushMatrix();
                  this.scene.scale(5,0.3,3);

                  this.scene.materialC.apply();
                  this.cubeQuad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                  this.scene.scale(0.3,3.5,0.3);

                  this.scene.translate(-7.5,-0.5,-4.2);
                  this.scene.materialD.apply();
                  this.cubeQuad.display();

                  this.scene.translate(15,0,0);
                  this.cubeQuad.display();

                  this.scene.translate(0,0,8.4);
                  this.cubeQuad.display();

                  this.scene.translate(-15,0,0);
                  this.cubeQuad.display();
            this.scene.popMatrix();
	};
};
