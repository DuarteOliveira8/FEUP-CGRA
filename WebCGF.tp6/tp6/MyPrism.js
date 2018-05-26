/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		this.initBuffers();
	};

	initBuffers()
	{
		var degToRad = Math.PI / 180;
		var substack = 1/this.stacks;
		var k = 0;

		var z = 0;
		for (var j = 0; j < this.stacks; j++) {
			k = this.slices * 4 * j;

			// VERTICES DEFINITION
			var angle = 0;
			for (var i = 0; i < this.slices; i++) {
				this.vertices.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), z);
				this.vertices.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), z+substack);
				angle += 360/this.slices;
				this.vertices.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), z);
				this.vertices.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), z+substack);
			}

			z+= substack;

			// INDICES DEFINITION
			for (var i = 0; i < this.slices; i++) {
				this.indices.push(k+2, k+1, k);
				this.indices.push(k+1, k+2, k+3);
				k += 4;
			}

			this.primitiveType=this.scene.gl.TRIANGLES;

			// NORMALS DEFINITION
			angle = 360/(this.slices * 2);

			for (var i = 0; i < this.slices; i++) {
				this.normals.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), 0);
				this.normals.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), 0);
				this.normals.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), 0);
				this.normals.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), 0);

				angle += 360/this.slices;
			}
		}

		this.initGLBuffers();
	};

};
