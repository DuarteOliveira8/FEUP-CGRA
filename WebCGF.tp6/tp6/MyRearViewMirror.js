/**
 * MyRearViewMirror
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyRearViewMirror extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.hand = new MyCylinder(this.scene, 12, 1);
		this.cover = new MyHemisphere(this.scene,30,12);
		this.mirror = new MyCircle(this.scene,12);

		this.initBuffers();
	};

	display() 
	{
		var degToRad = Math.PI / 180;

		this.scene.pushMatrix();
			this.scene.scale(0.05,0.05,0.2);
			this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].wrap.apply();
			this.hand.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.05,0.01,0.2);
			this.scene.scale(0.1,0.1,0.14);
			this.scene.rotate(-90*degToRad,0,1,0);
			// this.wrapAppearance.apply();
			this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].wrap.apply();
			this.cover.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.05,0.01,0.2);
			this.scene.scale(0.1,0.1,0.14);
			this.scene.rotate(90*degToRad,0,1,0);
			// this.mirrorAppearance.apply();
			this.scene.vehicleAppearances[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].mirror.apply();
			this.mirror.display();
		this.scene.popMatrix();
	};
};