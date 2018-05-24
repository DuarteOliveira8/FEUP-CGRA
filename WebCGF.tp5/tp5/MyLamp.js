/**
 * MyObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyLamp extends CGFobject
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
		var angleFiInc = 90/this.stacks;

		var z = 0;
		var angleFi = 0;
		for (var j = 0; j < this.stacks; j++) {
			m = this.slices * 2 * j;

			var angleTeta = 0;
			for (var i = 0; i < this.slices; i++) {
				this.vertices.push(Math.sin(angleFi * degToRad) * Math.cos(angleTeta * degToRad), Math.sin(angleFi * degToRad) * Math.sin(angleTeta * degToRad), Math.cos(angleFi * degToRad));
				this.vertices.push(Math.sin((angleFi+angleFiInc) * degToRad) * Math.cos(angleTeta * degToRad), Math.sin((angleFi+angleFiInc) * degToRad) * Math.sin(angleTeta * degToRad), Math.cos((angleFi+angleFiInc) * degToRad));
				angleTeta += 360/this.slices; 
			}

			z+= substack;

			// INDICES DEFINITION
			k = m;
			for (var i = 0; i < this.slices; i++) {
				this.indices.push((k%verticesN)+m, ((k+1)%verticesN)+m, ((k+2)%verticesN)+m);
				this.indices.push(((k+3)%verticesN)+m, ((k+2)%verticesN)+m, ((k+1)%verticesN)+m);
				k += 2;
			}

			this.primitiveType=this.scene.gl.TRIANGLES;

			// NORMALS DEFINITION
			angleTeta = 0;
			for (var i = 0; i < this.slices; i++) {
				this.normals.push(Math.sin(angleFi * degToRad) * Math.cos(angleTeta * degToRad), Math.sin(angleFi * degToRad) * Math.sin(angleTeta * degToRad), Math.cos(angleFi * degToRad));
				this.normals.push(Math.sin((angleFi+angleFiInc) * degToRad) * Math.cos(angleTeta * degToRad), Math.sin((angleFi+angleFiInc) * degToRad) * Math.sin(angleTeta * degToRad), Math.cos((angleFi+angleFiInc) * degToRad));
				angleTeta += 360/this.slices; 
			}

			angleFi += angleFiInc;
		}

		this.initGLBuffers();
	};
	
};
