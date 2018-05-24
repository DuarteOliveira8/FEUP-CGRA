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
	
            this.tableAppearance = new CGFappearance(this.scene);
            this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
            this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);
            this.tableAppearance.setSpecular(0.1,0.1,0.1,1);      
            this.tableAppearance.setShininess(50);
            this.tableAppearance.loadTexture("../resources/images/table.png");

      };

	display()
	{ 
            this.scene.pushMatrix();
                  this.scene.scale(5,0.3,3);

                  this.tableAppearance.apply();
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
