"use strict";
let HeartGeometry = function(gl) {
  this.gl = gl;

  function parametricX(t) {
    return 16 * Math.pow((Math.sin(t)), 3);
  }

  function parametricY(t) {
      return 13 * Math.cos(t)- 5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) - Math.cos(4 * t);
  }

  // vertex buffer
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
      0, 0, 0,
      0.05*parametricX(0), 0.05*parametricY(0), 0,
      0.05*parametricX(0.4), 0.05*parametricY(0.4), 0,
      0.05*parametricX(0.8), 0.05*parametricY(0.8), 0,
      0.05*parametricX(1.2), 0.05*parametricY(1.2), 0,
      0.05*parametricX(1.6), 0.05*parametricY(1.6), 0,
      0.05*parametricX(1.9), 0.05*parametricY(1.9), 0,
      0.05*parametricX(2.1), 0.05*parametricY(2.1), 0,
      0.05*parametricX(2.2), 0.05*parametricY(2.2), 0,
      0.05*parametricX(2.5), 0.05*parametricY(2.5), 0,
      0.05*parametricX(2.7), 0.05*parametricY(2.7), 0,
      0.05*parametricX(3.0), 0.05*parametricY(3.0), 0, 
      0.05*parametricX(-2.7), 0.05*parametricY(-2.7), 0,
      0.05*parametricX(-2.5), 0.05*parametricY(-2.5), 0,
      0.05*parametricX(-2.2), 0.05*parametricY(-2.2), 0,
      0.05*parametricX(-2.1), 0.05*parametricY(-2.1), 0,
      0.05*parametricX(-1.9), 0.05*parametricY(-1.9), 0,
      0.05*parametricX(-1.6), 0.05*parametricY(-1.6), 0,
      0.05*parametricX(-1.2), 0.05*parametricY(-1.2), 0,
      0.05*parametricX(-0.8), 0.05*parametricY(-0.8), 0,
      0.05*parametricX(-0.4), 0.05*parametricY(-0.4), 0,
    ]),
    gl.STATIC_DRAW);


  // vertex buffer
  var vertexArray = [230/255,81/255,0/255];
  for (var i = 0; i < 20; i++){
    vertexArray.push(255/255,160/255,0/255);
  }
  this.colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(vertexArray),
    gl.STATIC_DRAW);

  // index buffer
  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([
      0, 1, 2,
      0, 2, 3,
      0, 3, 4,
      0, 4, 5,
      0, 5, 6,
      0, 6, 7,
      0, 7, 8,
      0, 8, 9,
      0, 9, 10,
      0, 10, 11,
      0, 11, 12,
      0, 12, 13,
      0, 13, 14,
      0, 14, 15,
      0, 15, 16,
      0, 16, 17,
      0, 17, 18,
      0, 18, 19,
      0, 19, 20,
      0, 20, 1,
    ]),
    gl.STATIC_DRAW);
};

HeartGeometry.prototype.draw = function() {
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

  gl.drawElements(gl.TRIANGLES, 60, gl.UNSIGNED_SHORT, 0);
};
