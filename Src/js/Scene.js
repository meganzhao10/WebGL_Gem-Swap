"use strict";
let Scene = function(gl) {
  this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "solid_fs.essl");
  this.fsColor = new Shader(gl, gl.FRAGMENT_SHADER, "color_fs.essl");
  this.fsChange = new Shader(gl, gl.FRAGMENT_SHADER, "change_fs.essl");

  this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);
  this.colorProgram = new Program(gl,this.vsIdle, this.fsColor);
  this.pulsateProgram = new Program(gl,this.vsIdle, this.fsChange);

  this.starGeometry = new StarGeometry(gl);
  this.starGeometry2 = new StarGeometry2(gl);
  this.heartGeometry = new HeartGeometry(gl);
  this.diamondGeometry = new DiamondGeometry(gl);

  this.beginningTime = new Date().getTime();
  this.timeAtLastFrame = new Date().getTime();

  // this.blueMaterial = new Material(gl, this.solidProgram);
  // this.blueMaterial.solidColor.set(19/255, 155/255, 214/255, 0.3);
  // this.greenMaterial = new Material(gl, this.solidProgram);
  // this.greenMaterial.solidColor.set(9/255, 165/255,119/255, 0.3);
  // this.orangeMaterial = new Material(gl, this.solidProgram);
  // this.orangeMaterial.solidColor.set(224/255, 123/255, 0/255, 0.3);
  // this.purpleMaterial = new Material(gl, this.solidProgram);
  // this.purpleMaterial.solidColor.set(47/255, 54/255, 132/255, 0.3);
  
  this.colorMaterial = new Material(gl,this.colorProgram);

  this.pulsateMaterial = new Material(gl, this.pulsateProgram);
  this.pulsateMaterial.time.set(this.startTime);
  this.pulsateMaterial.changeColor.set(252/255, 153/255, 151/255);

  this.starMesh = new Mesh(this.starGeometry,this.colorMaterial);  
  this.starMesh2 = new Mesh(this.starGeometry2,this.colorMaterial);
  this.diamondMesh = new Mesh(this.diamondGeometry,this.colorMaterial);
  this.heartMesh = new Mesh(this.heartGeometry,this.colorMaterial);
  this.heartPulsateMesh = new Mesh(this.heartGeometry,this.pulsateMaterial);

  this.camera = new OrthoCamera();

  this.gameObjects = [];

  this.idDown;
  this.idUp;
  this.numberOfFramesQuake = 0;

  for (var i = 0; i < 14; i++) {
    this.gameObjects[i] = [];
    for (var j = 0; j < 14; j++) {
      	let random = Math.floor(Math.random() * 5);
      	let randomMesh;	      
        if (random == 0){
      		randomMesh = this.starMesh;
        } else if (random == 1){
       		randomMesh = this.diamondMesh;
        } else if (random == 2){
      		randomMesh = this.heartMesh;
      	} else if (random == 3){
      		randomMesh = this.heartPulsateMesh;
      	} else {
          randomMesh = this.starMesh2;
        }
      	let newGameObject = new GameObject(randomMesh);
      	if (i<2 || i>11 || j<2 || j>11)	{
      		newGameObject.scale.set(0,0,0);
      		newGameObject.typeID = -1;
      	} else {
      		newGameObject.typeID = random;
      	}
      	this.gameObjects[i].push(newGameObject);
    };
  };

  this.score = 0;
  var scoreElement = document.getElementById("score");
  this.scoreNode = document.createTextNode(String(this.score));
  scoreElement.appendChild(this.scoreNode); 

  this.plusScoreOpacity = 1;
  this.plusScore = 0;
  this.plusScoreElement = document.getElementById("plusScore");

  this.secondsLeft = 100;
  this.counter = 100;
  this.timePrg = document.getElementById('progress');
  this.percent = document.getElementById('percentCount');
  this.secondsInterval = 0;

  //level2 swap
  this.swaps = 15;
  this.swapsSection = document.getElementById("swapsSection");
  var swapsElement = document.getElementById("swaps");
  this.swapsNode = document.createTextNode(String(this.swaps));
  swapsElement.appendChild(this.swapsNode); 
  this.level1 = true;
  this.level2 = false;
  this.level3 = false;

  this.cameraRotateAngle = 0.005;

  this.startSwap = false;
  this.gameOver = false;
};

Scene.prototype.update = function(gl, keysPressed, mouse) {  
  let elapseTime = (new Date().getTime() - this.beginningTime)/500;
  let timeAtThisFrame = new Date().getTime();
  let dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
  if (this.secondsInterval == 5) this.secondsInterval = -1;
  this.secondsInterval++;

  this.timeAtLastFrame = timeAtThisFrame;
  this.pulsateMaterial.time.set(elapseTime);

  // clear the screen
  // gl.clearColor(0/255, 25/255, 25/255, 1.0);
  gl.clearDepth(1.0);
  // gl.enable(gl.BLEND);
   //gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //timerBar
  if (this.secondsInterval == 0 && this.secondsLeft > 0 && this.counter > 0 
    && this.startSwap == true && this.gameOver == false){
      this.secondsLeft -= 1;
      this.counter -= 1;
      this.timePrg.style.width = this.secondsLeft + '%';
      this.percent.innerHTML = this.counter + ' %';
  } 
  //lose
  if (this.secondsLeft == 0 && this.counter == 0 || this.swaps == 0 && (this.level2 == true || this.level3 == true)){
    this.percent.innerHTML = "GAME OVER";
    this.gameOver = true;
    this.percent.style.color = "green";
    this.percent.style.fontWeight = "900";
  }
  //win
  if (this.score >= 500 && this.gameOver == false){
    let scene = this;
    this.percent.innerHTML = "YOU WIN!";
    this.percent.style.color = "green";
    this.percent.style.fontWeight = "900";
    this.gameOver = true;
    var button = document.createElement("button");
    if (this.level2 == false && this.level3 == false){
      button.innerHTML = "Start  level 2";
    } else if (this.level3 == false){
      button.innerHTML = "Start  level 3";
    } else{
      button.innerHTML = "Play again";
    }
    button.className = "button";
    var overlay = document.getElementById("overlay");
    overlay.appendChild(button);
    button.addEventListener("click", function(){  
        if (scene.level1 == true) {
          scene.level1 = false;
          scene.level2 = true;
          document.styleSheets[0].addRule('.levelbar li.active2','color: green');
          document.styleSheets[0].addRule('.levelbar li.active2:before','border-color: green');
          document.styleSheets[0].addRule('.levelbar li.active2:before','border-width: 2px;');
          document.styleSheets[0].addRule('.levelbar li.active2 + li:after','background-color: green');
          scene.swaps = 15;
        } else {
          scene.level2 = false;
          scene.level3 = true;
          document.styleSheets[0].addRule('.levelbar li.active3','color: green');
          document.styleSheets[0].addRule('.levelbar li.active3:before','border-width: 2px;');
          document.styleSheets[0].addRule('.levelbar li.active3:before','border-color: green');
          scene.swaps = 20;
        }
           
        button.style.display = "none";
        scene.swapsSection.style.display = "block";
        scene.gameOver = false;
        scene.counter = 100;
        scene.secondsLeft = 100;
        scene.score = 0;
        scene.scoreNode.nodeValue = String(scene.score);
        scene.swapsNode.nodeValue = String(scene.swaps);
    });
  }

  if (this.level3){
    this.camera.rotation += this.cameraRotateAngle;
    this.camera.updateViewProjMatrix(); 
    if (this.secondsInterval == 0 && Math.random() < 0.01){
      this.cameraRotateAngle *= -1;
    } 
  }

  if (this.plusScore != 0 && this.gameOver == false){
    this.plusScoreElement.innerHTML = "  + " + this.plusScore;
  } else {
    this.plusScoreElement.innerHTML = "";
    this.plusScoreOpacity = 1;
  }
  this.plusScoreElement.style.opacity = this.plusScoreOpacity;


  for(var i=0; i<14; i++){
    for(var j=0; j<14; j++){
      if(this.gameObjects[i][j].mesh == this.diamondMesh)
       	  this.gameObjects[i][j].diamondRotate(dt);
      if(this.gameObjects[i][j].mesh == this.starMesh2)
          this.gameObjects[i][j].starRotate(dt);
      this.gameObjects[i][j].position = new Vec3(i-2, j-2, 0);
    };
  };

  this.keyPressedFeatures(dt, mouse, keysPressed, elapseTime);
  this.mouseSwap(dt, mouse, keysPressed);
  this.checkThreeInALine(dt);
  this.downShift();

  //draw
	for(var i=2; i<12; i++){
  	for(var j=2; j<12; j++){
      if (this.gameObjects[i][j].scale.x == 0)
        this.gameObjects[i][j].typeID = -1;

      var emptyBelow = false;
      if (j==2) {
        this.gameObjects[i][j].isFalling = false;
      }else {
        for (var n=j-1; n>1; n--){
          if (this.gameObjects[i][n].typeID == -1) emptyBelow = true;
        }
      }

      if (!emptyBelow) {
        this.gameObjects[i][j].isFalling = false;
      }else{
        this.gameObjects[i][j].isFalling = true;
      }
      if (this.gameObjects[i][j].startShink == true) {
          this.gameObjects[i][j].shrink();
          this.gameObjects[i][j].move(50*dt);
      }
  		this.gameObjects[i][j].draw(this.camera);
	 };
  };
}

Scene.prototype.keyPressedFeatures = function(dt, mouse, keysPressed, elapseTime) {
  //Quake
  if (keysPressed.Q){
    this.startSwap = true;
    if (this.numberOfFramesQuake < 150){
      this.camera.position = new Vec2(4.5, 4.5).
      add(Math.sin(elapseTime*30)*0.1,Math.sin(elapseTime*30)*0.1); 
      this.camera.updateViewProjMatrix(); 
      this.numberOfFramesQuake++;
    
      for(var i=2; i<12; i++){
        for(var j=2; j<12; j++){
          if(Math.random()*1000 < 1){
          this.gameObjects[i][j].move(5*dt);
          this.gameObjects[i][j].shrink();
          } 
        };
      };
    }
  }

  if (keysPressed.A){
    this.startSwap = true;
    this.camera.rotation -= 0.01;
    this.camera.updateViewProjMatrix(); 
  }

  if (keysPressed.D){
    this.startSwap = true;
    this.camera.rotation += 0.01;
    this.camera.updateViewProjMatrix(); 
  }
}



Scene.prototype.mouseSwap = function(dt, mouse, keysPressed){
  var xDown = Math.floor(mouse.Down.x + 2.5);
  var yDown = Math.floor(mouse.Down.y + 2.5);
  var xMove = mouse.Move.x;
  var yMove = mouse.Move.y;   
  var xUp = Math.floor(mouse.Up.x + 2.5);
  var yUp = Math.floor(mouse.Up.y + 2.5);

  //check if click inside game field
  if (xDown > 1 && xDown < 12 && yDown > 1 && yDown < 12 && 
    xUp > 1 && xUp < 12 && yUp > 1 && yUp < 12){

      if (mouse.pressedDown){
      this.idDown = this.gameObjects[xDown][yDown].typeID;
      //Bomb
      if(keysPressed.B){
        this.gameObjects[xDown][yDown].scale.set(0,0,0);
        }
      }

      //Sticky
      if (mouse.pressedMove){
        this.gameObjects[xDown][yDown].position = new Vec3(xMove, yMove, 0);
      }

      if (mouse.pressedUp){
        if (this.level2 == true || this.level3 == true && this.gameOver==false){
          this.swaps--;
          if (this.swaps < 0) this.swaps = 0;
          this.swapsNode.nodeValue = String(this.swaps);
        } 

        this.idUp = this.gameObjects[xUp][yUp].typeID;
        var highX;
        var highY;
        if (xDown-xUp == 1)
          highX = xDown;
        else if (xDown-xUp == -1)
          highX = xUp;
        else if (yDown-yUp == 1)
          highY = yDown;
        else if (yDown-yUp == -1)
          highY = yUp;
        var itemsInLine = false;

        //Legal: check if form 3 items on one line
          //when switch vertically
          if (Math.abs(xDown-xUp) == 1 && Math.abs(yDown-yUp) == 0 &&
            (this.gameObjects[highX][yUp].typeID == this.gameObjects[highX-2][yUp].typeID && 
            this.gameObjects[highX][yUp].typeID == this.gameObjects[highX-3][yUp].typeID ||
            this.gameObjects[highX-1][yUp].typeID == this.gameObjects[highX+2][yUp].typeID && 
            this.gameObjects[highX-1][yUp].typeID == this.gameObjects[highX+1][yUp].typeID ||

            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp][yUp+1].typeID && 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp][yUp-1].typeID || 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp][yUp+1].typeID && 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp][yUp+2].typeID || 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp][yUp-1].typeID && 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp][yUp-2].typeID || 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown][yDown+1].typeID && 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown][yDown-1].typeID ||
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown][yDown+1].typeID && 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown][yDown+2].typeID ||
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown][yDown-1].typeID && 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown][yDown-2].typeID))
              itemsInLine = true;
          //when switch horizontaly
          else if (Math.abs(xDown-xUp) == 0 && Math.abs(yDown-yUp) == 1 &&
            (this.gameObjects[xDown][highY].typeID == this.gameObjects[xDown][highY-2].typeID && 
            this.gameObjects[xDown][highY].typeID == this.gameObjects[xDown][highY-3].typeID ||
            this.gameObjects[xDown][highY-1].typeID == this.gameObjects[xDown][highY+2].typeID && 
            this.gameObjects[xDown][highY-1].typeID == this.gameObjects[xDown][highY+1].typeID ||

            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp+1][yUp].typeID && 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp-1][yUp].typeID || 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp+1][yUp].typeID && 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp+2][yUp].typeID ||
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp-1][yUp].typeID && 
            this.gameObjects[xDown][yDown].typeID == this.gameObjects[xUp-2][yUp].typeID || 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown+1][yDown].typeID && 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown-1][yDown].typeID || 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown+1][yDown].typeID && 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown+2][yDown].typeID || 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown-1][yDown].typeID && 
            this.gameObjects[xUp][yUp].typeID == this.gameObjects[xDown-2][yDown].typeID))
              itemsInLine = true;
        

        //swap two game objects
        if (itemsInLine){
          var mesh = this.gameObjects[xUp][yUp].mesh;
          var id = this.gameObjects[xUp][yUp].typeID;
          this.gameObjects[xUp][yUp] = new GameObject(this.gameObjects[xDown][yDown].mesh);
          this.gameObjects[xUp][yUp].typeID = this.gameObjects[xDown][yDown].typeID;
          this.gameObjects[xDown][yDown] = new GameObject(mesh);
          this.gameObjects[xDown][yDown].typeID = id;
          this.startSwap = true;
        }

        mouse.pressedDown = false;
        mouse.pressedUp = false; 
      }
    }

}

Scene.prototype.checkThreeInALine = function(dt){
    //Three-in-a-line
    var timerPlus = 20;
    this.plusScore = 0;
    for(var i=2; i<13; i++) {
      for(var j=2; j<13; j++) {

        //check horizontally
        if (this.gameObjects[i][j].typeID != -1 &&
          this.gameObjects[i][j].typeID == this.gameObjects[i-1][j].typeID &&
          this.gameObjects[i-1][j].typeID == this.gameObjects[i+1][j].typeID && 
            this.gameObjects[i][j].isFalling == false && this.gameObjects[i-1][j].isFalling == false &&
          this.gameObjects[i+1][j].isFalling == false){

          var l = -1;
          while (i+l!=1 && this.gameObjects[i+l][j].typeID == this.gameObjects[i+l-1][j].typeID){
            l--;
          }
          var r = 1;
          while (i+r!=13 && this.gameObjects[i+r][j].typeID == this.gameObjects[i+r+1][j].typeID){
            r++;
          }
          var finishShrink = false;
          for(var m = l; m <= r; m++) {
            if (!finishShrink){
                this.gameObjects[i+m][j].startShink = true;
                if (this.gameObjects[i+m][j].scale.x == 0){
                    for(var h = l; h <= r; h++) {
                      this.gameObjects[i+h][j].scale.set(0,0,0); 
                      this.gameObjects[i+h][j].startShink = false;                   
                    }
                    finishShrink = true;
                } 
            }
          }

          if (this.gameOver == false && this.startSwap){
             if (r-l == 2) {
              this.plusScore = 10;
             } else if (r-l == 3){
                this.plusScore = 20;
              } else {
                this.plusScore = 50;
              } 
              this.plusScoreOpacity -= 0.05;
          }

          if (this.gameOver == false && this.startSwap && finishShrink){
              if (r-l == 2) {
                this.score += 10;
              } else if (r-l == 3){
                this.score += 20;
              } else {
                this.score += 50;
              } 
              //score: 3 - 10points; 4 - 20points; 5 - 50points
              this.scoreNode.nodeValue = String(this.score);
              if (r-l==2) {
                timerPlus = 10;
              } else {
                timerPlus = 20;
              }
              if (this.secondsLeft + timerPlus <= 100){
                this.secondsLeft += timerPlus;
                this.counter += timerPlus;
              } else {
                this.secondsLeft = 100;
                this.counter = 100;
              }
          }
        }
        //check vertically
        if (this.gameObjects[i][j].typeID != -1 &&
          this.gameObjects[i][j-1].typeID == this.gameObjects[i][j].typeID &&
          this.gameObjects[i][j].typeID  == this.gameObjects[i][j+1].typeID && 
          this.gameObjects[i][j].isFalling == false && this.gameObjects[i][j-1].isFalling == false &&
          this.gameObjects[i][j+1].isFalling == false){

          var l = -1;
          while (j+l!=1 && this.gameObjects[i][j+l].typeID == this.gameObjects[i][j+l-1].typeID){
            l--;
          }
          var r = 1;
          while (j+r!=13 && this.gameObjects[i][j+r].typeID == this.gameObjects[i][j+r+1].typeID){
            r++;
          }
          var finishShrinkV = false;
          for(var n = l; n <= r; n++) {  
            if (!finishShrinkV){
              this.gameObjects[i][j+n].startShink = true;
              if (this.gameObjects[i][j+n].scale.x == 0){
                  for(var v = l; v <= r; v++) {
                    this.gameObjects[i][j+v].scale.set(0,0,0); 
                    this.gameObjects[i][j+v].startShink = false;
                  }
                  finishShrinkV = true;
              } 
            }
          }       

          if (this.gameOver == false && this.startSwap){
             if (r-l == 2) {
              this.plusScore = 10;
             } else if (r-l == 3){
                this.plusScore = 20;
              } else {
                this.plusScore = 50;
              } 
              this.plusScoreOpacity -= 0.05;
          }
 
           if (this.gameOver == false && this.startSwap && finishShrinkV){
              if (r-l == 2) {
                this.score += 10;
              } else if (r-l == 3){
                this.score += 20;
              } else {
                this.score += 50;
              } 
              //score: 3 - 10points; 4 - 30points; 5 - 90points
              this.scoreNode.nodeValue = String(this.score);
              if (r-l==2) {
                timerPlus = 10;
              } else {
                timerPlus = 20;
              } 
              if (this.secondsLeft + timerPlus <= 100){
                this.secondsLeft += timerPlus;
                this.counter += timerPlus;
              } else {
                this.secondsLeft = 100;
                this.counter = 100;
              }
          }

        }
        }
    }
  }


Scene.prototype.downShift = function() {
  var rotateAngle = this.camera.rotation % 6.2;
    if ((rotateAngle <= 0 && rotateAngle > -0.84) || rotateAngle <= -5.55 || (rotateAngle >= 0 && rotateAngle < 0.84) || rotateAngle >= 5.55){
        for(var i=2; i<12; i++){
          for(var j=2; j<12; j++){  

            this.gameObjects[i][j].orientation = 0;
            if (this.gameObjects[i][j].typeID == -1){
              var k = 1;
              while (j+k <12 && this.gameObjects[i][j+k].typeID == -1){
                k++;
              }
              if (j+k < 12){
                this.gameObjects[i][j+k].fallYDown();
                this.gameObjects[i][j+k].isFalling = true;
                if (this.gameObjects[i][j+k].position.y <= this.gameObjects[i][j].position.y) 
                {
                  this.gameObjects[i][j+k].scale.set(0,0,0); 
                  this.gameObjects[i][j] = new GameObject(this.gameObjects[i][j+k].mesh);
                  this.gameObjects[i][j].typeID = this.gameObjects[i][j+k].typeID;
                  this.gameObjects[i][j+k].typeID = -1;
                  this.gameObjects[i][j+k].featherFall.set(0,0,0);   
                }

              } else{
                let random = Math.floor(Math.random() * 4);
                  let randomMesh;       
                  if (random == 0){
                    randomMesh = this.starMesh;
                  } else if (random == 1){
                    randomMesh = this.diamondMesh;
                  } else if (random == 2){
                    randomMesh = this.heartMesh;
                  } else if (random == 3){
                    randomMesh = this.heartPulsateMesh;
                  } else {
                    randomMesh = this.star2Mesh;
                  }
                  this.gameObjects[i][11] = new GameObject(randomMesh);
                  this.gameObjects[i][11].typeID = random;
                  this.gameObjects[i][11].isFalling = true;
                }
              }       
          }
        }
    } if ((rotateAngle < 2.39 && rotateAngle >= 0.84) || (rotateAngle <= -3.97 && rotateAngle > -5.55)){
        for(var i=11; i>1; i--){
         for(var j=11; j>1; j--){  

           this.gameObjects[i][j].orientation = 1.6;

           if (this.gameObjects[i][j].typeID == -1){
              var l = 1;
             while (i-l > 1 && this.gameObjects[i-l][j].typeID == -1){
               l++;
             }
             if (i-l > 1){
               this.gameObjects[i-l][j].fallXUp();
               this.gameObjects[i-l][j].isFalling = true;
               if (this.gameObjects[i-l][j].position.x >= this.gameObjects[i][j].position.x) 
                {
                  this.gameObjects[i-l][j].scale.set(0,0,0); 
                  this.gameObjects[i][j] = new GameObject(this.gameObjects[i-l][j].mesh);
                  this.gameObjects[i][j].typeID = this.gameObjects[i-l][j].typeID;
                  this.gameObjects[i-l][j].typeID = -1;
                  this.gameObjects[i-l][j].featherFall.set(0,0,0);   
               }

             } else{
               let random = Math.floor(Math.random() * 4);
                 let randomMesh;       
                  if (random == 0){
                   randomMesh = this.starMesh;
                  } else if (random == 1){
                     randomMesh = this.diamondMesh;
                  } else if (random == 2){
                   randomMesh = this.heartMesh;
                 } else if (random ==3){
                   randomMesh = this.heartPulsateMesh;
                 } else {
                    randomMesh = this.star2Mesh;
                  }
                 this.gameObjects[2][j] = new GameObject(randomMesh);
                 this.gameObjects[2][j].typeID = random;
                 this.gameObjects[2][j].isFalling = true;
                }
             }       
          }
        }
    } if ((rotateAngle >= 2.39 && rotateAngle < 3.97) || (rotateAngle <= -2.39 && rotateAngle > -3.97)){
        for(var i=11; i>1; i--){
         for(var j=11; j>1; j--){  

           this.gameObjects[i][j].orientation = 3.2;
           if (this.gameObjects[i][j].typeID == -1){
              var k = 1;
             while (j-k > 1 && this.gameObjects[i][j-k].typeID == -1){
               k++;
             }
             if (j-k > 1){
               this.gameObjects[i][j-k].fallYUp();
                this.gameObjects[i][j-k].isFalling = true;
               if (this.gameObjects[i][j-k].position.y >= this.gameObjects[i][j].position.y) 
                {
                  this.gameObjects[i][j-k].scale.set(0,0,0); 
                  this.gameObjects[i][j] = new GameObject(this.gameObjects[i][j-k].mesh);
                  this.gameObjects[i][j].typeID = this.gameObjects[i][j-k].typeID;
                  this.gameObjects[i][j-k].typeID = -1;
                  this.gameObjects[i][j-k].featherFall.set(0,0,0);   
               }

             } else{
               let random = Math.floor(Math.random() * 4);
                 let randomMesh;       
                  if (random == 0){
                   randomMesh = this.starMesh;
                  } else if (random == 1){
                     randomMesh = this.diamondMesh;
                  } else if (random == 2){
                   randomMesh = this.heartMesh;
                 } else if (random == 3){
                    randomMesh = this.heartPulsateMesh;
                  } else {
                    randomMesh = this.star2Mesh;
                  }
                 this.gameObjects[i][2] = new GameObject(randomMesh);
                 this.gameObjects[i][2].typeID = random;
                 this.gameObjects[i][2].isFalling = true;
                }
             }       
          }
        }
    } if ((rotateAngle < 5.55 && rotateAngle >= 3.97) || (rotateAngle <= -0.84 && rotateAngle > -2.39)){
        for(var i=2; i<12; i++){
          for(var j=2; j<12; j++){  

            this.gameObjects[i][j].orientation = 4.8;

            if (this.gameObjects[i][j].typeID == -1){
              var l = 1;
              while (i+l <12 && this.gameObjects[i+l][j].typeID == -1){
                l++;
              }
              if (i+l < 12){
                this.gameObjects[i+l][j].fallXDown();
                this.gameObjects[i+l][j].isFalling = true;
                if (this.gameObjects[i+l][j].position.x <= this.gameObjects[i][j].position.x) 
                {
                  this.gameObjects[i+l][j].scale.set(0,0,0); 
                  this.gameObjects[i][j] = new GameObject(this.gameObjects[i+l][j].mesh);
                  this.gameObjects[i][j].typeID = this.gameObjects[i+l][j].typeID;
                  this.gameObjects[i+l][j].typeID = -1;
                  this.gameObjects[i+l][j].featherFall.set(0,0,0);   
                }

              } else{
                let random = Math.floor(Math.random() * 4);
                  let randomMesh;       
                  if (random == 0){
                    randomMesh = this.starMesh;
                  } else if (random == 1){
                    randomMesh = this.diamondMesh;
                  } else if (random == 2){
                    randomMesh = this.heartMesh;
                  }  else if (random == 3){
                    randomMesh = this.heartPulsateMesh;
                  } else {
                    randomMesh = this.star2Mesh;
                  }
                  this.gameObjects[11][j] = new GameObject(randomMesh);
                  this.gameObjects[11][j].typeID = random;
                  this.gameObjects[11][j].isFalling = true;
                }
              }
              
            }
          }
      }
    }



