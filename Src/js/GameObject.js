"use strict"; 
let GameObject = function(mesh) { 
  this.mesh = mesh;
  this.position = new Vec3(-55, -55, 0); 
  this.orientation = 0; 
  this.scale = new Vec3(0.45, 0.45, 1); 
  this.angularVelocity = 0;
  this.rotateAxis = new Vec3(0,0,0);
  this.featherFall = new Vec3(0,0,0);
  this.modelMatrix = new Mat4(); 
  this.startShrink = false;
  this.isFalling = false;
  this.typeID;
};

GameObject.prototype.move = function(dt){
  this.angularVelocity += 11*dt;
}

GameObject.prototype.starRotate = function(dt){
  this.angularVelocity += 5*dt;
}

GameObject.prototype.diamondRotate = function(dt){
  this.angularVelocity += 3*dt;
  this.rotateAxis.set(0,1,0);
}

GameObject.prototype.fallYDown = function(){
    this.position.sub(this.featherFall);
    this.featherFall.add(0,0.05,0);
}

GameObject.prototype.fallYUp = function(){
    this.position.sub(this.featherFall);
    this.featherFall.sub(0,0.05,0);
}

GameObject.prototype.fallXDown = function(){
    this.position.sub(this.featherFall);
    this.featherFall.add(0.05,0,0);
}

GameObject.prototype.fallXUp = function(){
    this.position.sub(this.featherFall);
    this.featherFall.sub(0.05,0,0);
}

GameObject.prototype.shrink = function(){
  if (this.scale.x <= 0.03){
    this.scale.set(0,0,0);
  } else {
    this.scale.sub(0.03,0.03,0);
  }
}


GameObject.prototype.updateModelMatrix = function(){ 
// TODO: set the model matrix according to the 
// position, orientation, and scale
  this.modelMatrix.set().
    scale(this.scale).
    translate(0,0,0).
    rotate(this.angularVelocity, this.rotateAxis).
    rotate(this.orientation).
    translate(this.position);
};

GameObject.prototype.draw = function(){ 
  this.updateModelMatrix();
// TODO: Set the uniform modelViewProjMatrix 
//(reflected in the material) from the modelMatrix (no camera yet). 
//Operator = cannot be used. Use Mat4 methods set() and/or mul().
  this.mesh.material.modelViewProjMatrix.set().mul(this.modelMatrix);
  this.mesh.draw(); 
};

GameObject.prototype.draw = function(camera){ 
  this.updateModelMatrix();
// TODO: Set the uniform modelViewProjMatrix (reflected in the material) to modelMatrix multiplied by the camera’s viewProjMatrix. Use Mat4 methods set() and/or mul().
  this.mesh.material.modelViewProjMatrix.set().
  	mul(this.modelMatrix).
    mul(camera.viewProjMatrix);
  this.mesh.draw(); 
};


