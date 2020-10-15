var bg,bg1;
var ghost,ghost1;
var door,door1;
var climber,climber1,spookySound ;
var gamestate="play";

function preload(){
  bg1=loadImage("tower.png");
  ghost1=loadImage("ghost-standing.png");
 door1=loadImage("door.png");
  climber1=loadImage("climber.png");
   spookySound = loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600)
  
  bg=createSprite(300,300);
  bg.addImage(bg1);
  bg.velocityY=3;
  
  ghost=createSprite(300,300)
  ghost.addImage(ghost1);
  ghost.scale=0.35;
  
  doorgroup = new Group();
  climbergroup= new Group();
  
  ghost.setCollider("rectangle",0,30,200,250);
  ghost.debug=false;  
}

function draw(){
  background(0);
  
      stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 225,300);

  if(gamestate==="play"){
    
     if(bg.y >=600){
      bg.y = 300
    }
     spookySound.play();
    
    
  if(keyDown("space")){
    ghost.velocityY=-12;
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-12;
  }
  
   if(keyDown("right")){
    ghost.x=ghost.x+12;
  }
    
    if(ghost.y>600 || climbergroup.isTouching(ghost)){
      gamestate="end";
    }
    
  }else if (gamestate==="end"){
      
    
    background(0);
   background.lifetime=-1;
    ghost.destroy();
    bg.destroy(0);
    doorgroup.destroyEach();
    climbergroup.destroyEach();
    ghost.velocityY = 0; 
  
    
    
      stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 225,300);

    
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
   spawndoor();
   drawSprites();
   
  
}

function spawndoor(){
  if(frameCount%160===0){
     var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    
     door.x = Math.round(random(120,400));
    climber.x=door.x;
    
    climber.addImage(climber1);
    door.addImage(door1);
    
    door.velocityY=3;
    climber.velocityY=3;
    
    door.lifetime=200;
    climber.lifetime=200;
    
    ghost.depth=door.depth;
    ghost.depth=door.depth+1;
    
    doorgroup.add(door);
    climbergroup.add(climber);
  }
 
  
  
}