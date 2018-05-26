/**
 * MyTrapezoid
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezoid extends CGFobject
{
	constructor(scene, windows, minS, maxS, minT, maxT)
	{
		super(scene);

		this.quad = new MyQuad(this.scene, minS || 0, maxS || 1, minT || 0, maxT || 1);
    this.sideQuad = new MyQuad(this.scene);
		this.trapezium = new MyTrapezium(this.scene);
    this.windows = windows || false; // if the trapezoid needs windows

		this.initBuffers();
	};

	display()
	{
		var deg2rad = Math.PI/180.0;

        this.scene.pushMatrix();
        	this.scene.rotate(90*deg2rad, 1, 0, 0);
        	this.scene.translate(0, 0, 0.5);
          this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
          this.scene.translate(0, 0.5, 0);
          this.scene.rotate(-90*deg2rad, 1, 0, 0);
          this.scene.scale(0.6,1,1);
          this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
          this.scene.translate(-0.4, 0, 0);
          this.scene.rotate(-90*deg2rad, 0, 1, 0);
          this.scene.rotate(-Math.atan(0.2), 1, 0, 0);
          this.scene.scale(1,Math.sqrt(1+Math.pow(0.2,2)),1);
          if (this.windows) // when the trapezoid needs windows, the texture is applied
            this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].frontWindow.apply();
          this.sideQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
          this.scene.translate(0.4, 0, 0);
          this.scene.rotate(90*deg2rad, 0, 1, 0);
          this.scene.rotate(-Math.atan(0.2), 1, 0, 0);
          this.scene.scale(1,Math.sqrt(1+Math.pow(0.2,2)),1);
          if (this.windows)
            this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].backWindow.apply();
          this.sideQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
          this.scene.translate(0, 0, 0.5);
          if (this.windows)
            this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].rightWindow.apply();
          this.trapezium.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
          this.scene.rotate(180*deg2rad, 0, 1, 0);
          this.scene.translate(0, 0, 0.5);
          if (this.windows)
            this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].leftWindow.apply();
          this.trapezium.display();
        this.scene.popMatrix();
	};
};
