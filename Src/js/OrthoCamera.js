var OrthoCamera = function() { 
  this.position = new Vec2(4.5, 4.5); 
  this.rotation = 0; 
  this.windowSize = new Vec2(13.5, 13.5);
  
  this.viewProjMatrix = new Mat4(); 
  this.inverseViewProjMatrix = new Mat4();
  this.updateViewProjMatrix(); 
};

OrthoCamera.prototype.updateViewProjMatrix = function(){ 
  this.viewProjMatrix.set(). 
    scale(0.5). 
    scale(this.windowSize). 
    rotate(this.rotation). 
    translate(this.position). 
    invert(); 
}; 

OrthoCamera.prototype.setAspectRatio = function(ar) 
{ 
  this.windowSize.x = this.windowSize.y * ar;
  this.updateViewProjMatrix();
}; 
