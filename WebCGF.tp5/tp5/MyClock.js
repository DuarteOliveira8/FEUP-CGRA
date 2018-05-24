/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyClock extends CGFobject
{

	constructor(scene) 
	{
      super(scene);

      this.cylinder = new MyCylinder(scene, 12, 1);
      this.circle = new MyCircle(scene, 12);
      this.clockHands = [new MyClockHand(scene,0.25,1), //segundos
                         new MyClockHand(scene,0.75,0.75), //minutos
                         new MyClockHand(scene,1, 0.5)]; //horas

      this.clockAppearance = new CGFappearance(scene);
      this.clockAppearance.setAmbient(0.3,0.3,0.3,1);
      this.clockAppearance.setDiffuse(0.3,0.3,0.3,1);
      this.clockAppearance.setSpecular(0.5,0.5,0.5,1);
      this.clockAppearance.setShininess(150);
      this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
      this.clockAppearance.loadTexture("../resources/images/clock.png");
  };

	display()
	{ 
      var degToRad = Math.PI / 180;

      this.scene.pushMatrix();

        this.scene.pushMatrix();
          this.scene.translate(0,0,0.21);

          this.scene.pushMatrix();
              this.clockHands[0].display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
              this.clockHands[1].display();
          this.scene.popMatrix();

          this.scene.pushMatrix();
              this.clockHands[2].display();
          this.scene.popMatrix();
        this.scene.popMatrix();

        this.scene.scale(0.6,0.6,0.2);

        this.cylinder.display();

        this.scene.pushMatrix();
            this.scene.rotate(180*degToRad,1,0,0);
            this.circle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,0,1);
            this.clockAppearance.apply();
            this.circle.display();
        this.scene.popMatrix();

      this.scene.popMatrix();
	};

  update(currTime)
  {
      var degToRad = Math.PI / 180;
      var d = new Date(0);
      d.setUTCMilliseconds(currTime);

      var currSeconds = (d.getHours() * 60 * 60) + (d.getMinutes() * 60) + d.getSeconds();

      this.clockHands[0].setAngle(((currSeconds%60)*360)/60);
      this.clockHands[1].setAngle(((currSeconds%3600)*360)/3600);
      this.clockHands[2].setAngle(((currSeconds%(60*60*12))*360)/(60*60*12));
  };
};
