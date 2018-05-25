/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCubeQuad extends CGFobject
{

	constructor(scene, minS, maxS, minT, maxT) 
	{
		super(scene);
		this.quad = new MyQuad(this.scene, minS || 0, maxS || 1, minT || 0, maxT || 1);
		this.quad.initBuffers();
		this.deg2rad = Math.PI/180.0;
	};

	display()
	{
            this.scene.pushMatrix();
                  this.scene.translate(0,0,0.5);
                  this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                  this.scene.translate(0,0,-0.5);
                  this.scene.rotate(180 * this.deg2rad,1,0,0);
                  this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                  this.scene.translate(0,-0.5,0);
                  this.scene.rotate(90 * this.deg2rad,1,0,0);
                  this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                  this.scene.translate(0,0.5,0);
                  this.scene.rotate(-90 * this.deg2rad,1,0,0);
                  this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                  this.scene.translate(-0.5,0,0);
                  this.scene.rotate(-90 * this.deg2rad,0,1,0);
                  this.quad.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                  this.scene.translate(0.5,0,0);
                  this.scene.rotate(90 * this.deg2rad,0,1,0);
                  this.quad.display();
            this.scene.popMatrix();
	};
};
