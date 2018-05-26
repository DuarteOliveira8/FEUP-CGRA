/**
 * MyWheel
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyWheel extends CGFobject
{

	constructor(scene)
	{
      super(scene);

      this.cylinder = new MyCylinder(this.scene, 30, 1);
      this.circle = new MyCircle(this.scene, 30);
      this.directionAngle = 0; //current direction angle
      this.movingAngle = 0; // current angle of rotation

			// TIRE TEXTURE
      this.tireAppearance = new CGFappearance(this.scene);
      this.tireAppearance.setAmbient(0.3,0.3,0.3,1);
      this.tireAppearance.setDiffuse(0.3,0.3,0.3,1);
      this.tireAppearance.setSpecular(0.5,0.5,0.5,1);
      this.tireAppearance.setShininess(150);
      this.tireAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
      this.tireAppearance.loadTexture("../resources/images/tire.png");

			// RIMS TEXTURE
      this.rimsAppearance = new CGFappearance(this.scene);
      this.rimsAppearance.setAmbient(0.3,0.3,0.3,1);
      this.rimsAppearance.setDiffuse(0.3,0.3,0.3,1);
      this.rimsAppearance.setSpecular(0.5,0.5,0.5,1);
      this.rimsAppearance.setShininess(150);
      this.rimsAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
      this.rimsAppearance.loadTexture("../resources/images/rims.png");
  };

	display()
	{
      var degToRad = Math.PI / 180;

      this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.25);

        this.scene.rotate(this.movingAngle*degToRad,0,0,1);
        this.tireAppearance.apply();
        this.cylinder.display();

        this.scene.pushMatrix();
        	this.scene.rotate(180*degToRad,1,0,0);
          this.rimsAppearance.apply();
          this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
          this.scene.translate(0,0,1);
          this.rimsAppearance.apply();
          this.circle.display();
        this.scene.popMatrix();

      this.scene.popMatrix();
	};

  setDirectionAngle(angle)
  {
      this.directionAngle = angle;
  };

  setMovingAngle(angle)
  {
      this.movingAngle = angle;
  };
};
