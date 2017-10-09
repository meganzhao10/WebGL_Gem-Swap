"use strict"; 
let Material = function(gl, program) { 
  this.gl = gl; 
  this.program = program; 
  let theMaterial = this; 
  Object.keys(program.uniforms).forEach(function(uniformName) { 
    let uniform = program.uniforms[uniformName]; 
    let reflectionVariable = 
        UniformReflectionFactories.makeVar(gl,
                              uniform.type, uniform.size); 
    Object.defineProperty(theMaterial, uniformName,
				{value: reflectionVariable} ); 
  }); 
}; 

Material.prototype.commit = function() { 
  let gl = this.gl; 
  this.program.commit(); 
  let theMaterial = this; 
  Object.keys(this.program.uniforms).forEach( function(uniformName) { 
    let uniform = theMaterial.program.uniforms[uniformName]; 
    theMaterial[uniformName].commit(gl, uniform.location); 
  }); 
}; 

