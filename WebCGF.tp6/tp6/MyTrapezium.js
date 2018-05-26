/**
 * MyTrapezium
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTrapezium extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
			0.3, 0.5, 0,
			-0.3, 0.5, 0,
			-0.5, -0.5, 0,
			0.5, -0.5, 0
		];

		this.indices = [
			3, 0, 1,
			1, 2, 3
		];

		this.primitiveType=this.scene.gl.TRIANGLES;

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.texCoords = [
			0.8, 0,
			0.2, 0,
			0, 1,
			1, 1
		];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
