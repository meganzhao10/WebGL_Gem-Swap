"use strict";
let DiamondGeometry = function(gl) {
  this.gl = gl;

  // vertex buffer
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
      //top --0
      0, 0.85, 0,
      //rightfront --1
      0.6, 0, 0,
      //rightback --2
      0.6, 0, 0,
      //front middle two: right - left 3456
      0.4, 0, 0.2,
      0.4, 0, 0.2,
      -0.4, 0, 0.2,
      -0.4, 0, 0.2,
      //back middle two: right - left 78910
      0.4, 0, -0.2,
      0.4, 0, -0.2,
      -0.4, 0, -0.2,
      -0.4, 0, -0.2,
      //leftfront  11
      -0.6, 0, 0,
      //left-back 12
      -0.6, 0, 0,
      //bottom 13
      0, -0.85, 0, 
    ]),
    gl.STATIC_DRAW);


      // vertex buffer
  this.colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
      //top
      179/255,229/255,252/255,
      //rightfront --1
      13/255,71/255,161/255,
      //rightback --2
      13/255,71/255,161/255,
      //front middle two: right - left 3456
      13/255,71/255,140/255,
      1/255,100/255,179/255, 
      1/255,100/255,179/255, 
      13/255,71/255,140/255,
      //back middle two: right - left 78910
      1/255,100/255,179/255, 
      3/255,87/255,155/255,
      3/255,87/255,155/255,
      1/255,100/255,179/255,  
      //leftfront  11
      13/255,71/255,161/255,
      //left-back   12
      13/255,71/255,161/255,
      //bottom 13
      179/255,229/255,252/255,
      ]

      ),
    gl.STATIC_DRAW);

  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([
      0, 1, 3,
      1, 3, 13,
      0, 4, 5,
      4, 5, 13, 
      0, 6, 11,
      6, 11, 13,

      0, 2, 7,
      2, 7, 13,
      0, 8, 9,
      8, 9, 13, 
      0, 10, 12,
      10, 12, 13,

    ]),
    gl.STATIC_DRAW);

};

DiamondGeometry.prototype.draw = function() {
  let gl = this.gl;
  // set vertex buffer to pipeline input
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0,
    3, gl.FLOAT, //< three pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );

      // set vertex buffer to pipeline input
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1,
    3, gl.FLOAT, //< three pieces of float
    false, //< do not normalize (make unit length)
    0, //< tightly packed
    0 //< data starts at array start
  );

  // set index buffer to pipeline input
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

  gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
};
