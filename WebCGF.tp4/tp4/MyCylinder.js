/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder extends CGFobject
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
		// VERTICES DEFINITION
		var degToRad = Math.PI / 180;
		var substack = 1/this.stacks;
		var k = 0;
		var verticesN = this.slices*2;
		var m;

		var z = 0;
		for (var j = 0; j < this.stacks; j++) {
			m = this.slices * 2 * j;

			var angle = 0;
			for (var i = 0; i < this.slices; i++) {
				this.vertices.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), z);
				this.vertices.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), z+substack);
				angle += 360/this.slices;
			}

			z+= substack;

			// INDICES DEFINITION
			k = m;
			for (var i = 0; i < this.slices; i++) {
				this.indices.push(((k+2)%verticesN)+m, ((k+1)%verticesN)+m, (k%verticesN)+m);
				this.indices.push(((k+1)%verticesN)+m, ((k+2)%verticesN)+m, ((k+3)%verticesN)+m);
				k += 2;
			}

			this.primitiveType=this.scene.gl.TRIANGLES;

			// NORMALS DEFINITION
			angle = 0;
			for (var i = 0; i < this.slices; i++) {
				this.normals.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), 0);
				this.normals.push(Math.cos(angle * degToRad), Math.sin(angle * degToRad), 0);
				angle += 360/this.slices;
			}
		}

		this.initGLBuffers();
	};
	
};
