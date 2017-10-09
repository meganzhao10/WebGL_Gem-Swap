"use strict";
let DiamondGeometry = function(gl) {
  this.gl = gl;

  function toRadins(angle) {
    return angle * (Math.PI / 180);
  }

  var vertexArray = [];
  var degree = 90;
  for (var i = 0; i < 4; i++){
    vertexArray.push(0.7*Math.cos(toRadins(degree)), 0.9*Math.sin(toRadins(degree)), 0.5,);
    vertexArray.push(0,0,0.5);
    degree += 90;
    vertexArray.push(0.7*Math.cos(toRadins(degree)), 0.9*Math.sin(toRadins(degree)), 0.5,);
  }

  // vertex buffer
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(vertexArray),
    gl.STATIC_DRAW);

  var indexArray = [];
  for (var i = 0; i < 12; i++){
    indexArray.push(i);
  }

  // index buffer
  this.indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indexArray),
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
  // set index buffer to pipeline input
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

  gl.drawElements(gl.TRIANGLES, 12, gl.UNSIGNED_SHORT, 0);
};
