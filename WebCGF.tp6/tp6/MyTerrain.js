/**
 * MyTerrain
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTerrain extends Plane
{
	constructor(scene, nrDivs, altimetry)
	{
		super(scene, nrDivs, altimetry, 0, 1, 0, 1);
	};
};
