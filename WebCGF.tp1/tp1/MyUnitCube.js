/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
			0.5, 0.5, 0.5,
			-0.5, 0.5, 0.5,
			-0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
			0.5, -0.5, 0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5
		];

		this.indices = [
			0, 2, 1, 
			0, 3, 2,
			5, 6, 4,
			6, 7, 4,
			5, 4, 1,
			0, 1, 4,
			4, 7, 0,
			7, 3, 0,
			2, 3, 7,
			6, 2, 7,
			5, 1, 6,
			1, 2, 6
		];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
