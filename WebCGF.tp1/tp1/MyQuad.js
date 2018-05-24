/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyQuad extends CGFobject
{
	constructor(scene) 
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [
			0.5, 0.5, 0,
			-0.5, 0.5, 0,
			-0.5, -0.5, 0,
			0.5, -0.5, 0
		];

		this.indices = [
			3, 0, 1, 
			1, 2, 3
		];
			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
