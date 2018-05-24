/**
 * MyCoveredCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCoveredCylinder extends CGFobject
{

	constructor(scene, slices, stacks) 
	{
      super(scene);

      this.cylinder = new MyCylinder(scene, slices, stacks);
      this.circle = new MyCircle(scene, slices);

      this.craneCylinderAppearance = new CGFappearance(this.scene);
      this.craneCylinderAppearance.setAmbient(0.6,0.6,0.6,1);
      this.craneCylinderAppearance.setDiffuse(0.6,0.6,0.6,1);
      this.craneCylinderAppearance.setSpecular(0.5,0.5,0.5,1);
      this.craneCylinderAppearance.setShininess(150);
      this.craneCylinderAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
      this.craneCylinderAppearance.loadTexture("../resources/images/craneCylinder.png");

      this.craneCircleAppearance = new CGFappearance(this.scene);
      this.craneCircleAppearance.setAmbient(0.6,0.6,0.6,1);
      this.craneCircleAppearance.setDiffuse(0.6,0.6,0.6,1);
      this.craneCircleAppearance.setSpecular(0.5,0.5,0.5,1);
      this.craneCircleAppearance.setShininess(150);
      this.craneCircleAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
      this.craneCircleAppearance.loadTexture("../resources/images/craneCircle.png");
  };

	display()
	{ 
      var degToRad = Math.PI / 180;

      this.scene.pushMatrix();

        this.craneCylinderAppearance.apply();
        this.cylinder.display();

        this.scene.pushMatrix();
            this.scene.rotate(180*degToRad,1,0,0);
            this.craneCircleAppearance.apply();
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,1);
            this.craneCircleAppearance.apply();
            this.circle.display();
        this.scene.popMatrix();

      this.scene.popMatrix();
	};
};
