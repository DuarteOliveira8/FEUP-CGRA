/**
 * MyPaperPlane
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPaperPlane extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.x = 13;
		this.y = 4.2;
		this.z = 8;
		this.angle = 0;

		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices.push(0,0,0);
		this.vertices.push(1,0,0.5);
		this.vertices.push(1,0,0.1);
		this.indices.push(0,1,2);
		this.normals.push(0,1,0);
		this.normals.push(0,1,0);
		this.normals.push(0,1,0);

		this.vertices.push(0,0,0);
		this.vertices.push(1,0,0.5);
		this.vertices.push(1,0,0.1);
		this.indices.push(5,4,3);
		this.normals.push(0,-1,0);
		this.normals.push(0,-1,0);
		this.normals.push(0,-1,0);

		this.vertices.push(0,0,0);
		this.vertices.push(1,0,-0.5);
		this.vertices.push(1,0,-0.1);
		this.indices.push(8,7,6);
		this.normals.push(0,1,0);
		this.normals.push(0,1,0);
		this.normals.push(0,1,0);

		this.vertices.push(0,0,0);
		this.vertices.push(1,0,-0.5);
		this.vertices.push(1,0,-0.1);
		this.indices.push(9,10,11);
		this.normals.push(0,-1,0);
		this.normals.push(0,-1,0);
		this.normals.push(0,-1,0);

		this.vertices.push(0,0,0);
		this.vertices.push(1,0,0.1);
		this.vertices.push(1,-0.5,0);
		this.indices.push(14,13,12);
		this.normals.push(0, -Math.sin(11*degToRad), Math.cos(11*degToRad));
		this.normals.push(0, -Math.sin(11*degToRad), Math.cos(11*degToRad));
		this.normals.push(0, -Math.sin(11*degToRad), Math.cos(11*degToRad));

		this.vertices.push(0,0,0);
		this.vertices.push(1,0,0.1);
		this.vertices.push(1,-0.5,0);
		this.indices.push(15,16,17);
		this.normals.push(0, Math.sin(11*degToRad), -Math.cos(11*degToRad));
		this.normals.push(0, Math.sin(11*degToRad), -Math.cos(11*degToRad));
		this.normals.push(0, Math.sin(11*degToRad), -Math.cos(11*degToRad));

		this.vertices.push(0,0,0);
		this.vertices.push(1,0,-0.1);
		this.vertices.push(1,-0.5,0);
		this.indices.push(18,19,20);
		this.normals.push(0, -Math.sin(11*degToRad), -Math.cos(11*degToRad));
		this.normals.push(0, -Math.sin(11*degToRad), -Math.cos(11*degToRad));
		this.normals.push(0, -Math.sin(11*degToRad), -Math.cos(11*degToRad));

		this.vertices.push(0,0,0);
		this.vertices.push(1,0,-0.1);
		this.vertices.push(1,-0.5,0);
		this.indices.push(23,22,21);
		this.normals.push(0, Math.sin(11*degToRad), Math.cos(11*degToRad));
		this.normals.push(0, Math.sin(11*degToRad), Math.cos(11*degToRad));
		this.normals.push(0, Math.sin(11*degToRad), Math.cos(11*degToRad));

		
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	update() 
	{
		if (this.x == 0.1 && this.angle == 0 && this.y == 0.5) {
			//do nothing!
		}
		else if ( this.x > 0.1 ) {
			this.x -= 0.2;
			this.y += 0.05;
		}
		else if (this.x <= 0.1 && this.angle == 0) {
			this.y -= 1;
			this.angle = 90;
			this.x += 0.01;
		}
		else if (this.y > 0.1){
			this.y -= 0.2;
		}
		else if (this.y <= 0.1) {
			this.angle = 0;
			this.x = 0.1;
			this.y = 0.5;
		}
	};
};
