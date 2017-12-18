"use strict";
let StarGeometry2 = function(gl) {
  this.gl = gl;

  function toRadins(angle) {
    return angle * (Math.PI / 180);
  }

  var vertexArray = [0, 0, 0];
  var degree = 18;
  for (var i = 0; i < 5; i++){
    vertexArray.push(0.8*Math.cos(toRadins(degree)), 0.8*Math.sin(toRadins(degree)), 0,);
    degree += 36;
    vertexArray.push(0.34*Math.cos(toRadins(degree)), 0.34*Math.sin(toRadins(degree)), 0,);
    degree += 36;
  }

  // vertex buffer
  this.vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(vertexArray),
    gl.STATIC_DRAW);

    // vertex buffer
  this.colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array([
      75/255,195/255,159/255,
      47/255, 54/255, 132/255,
      75/255,195/255,159/255,
      47/255, 54/255, 132/255,
      75/255,195/255,159/255,
      47/255, 54/255, 132/255,
      75/255,195/255,159/255,
      47/255, 54/255, 132/255,
      75/255,195/255,159/255,
      47/255, 54/255, 132/255,
      75/255,195/255,159/255,
      ]

      ),
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
      0, 10, 1,
    ]),
    gl.STATIC_DRAW);

};

StarGeometry2.prototype.draw = function() {
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

  gl.drawElements(gl.TRIANGLES, 30, gl.UNSIGNED_SHORT, 0);
};
