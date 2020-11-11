var marioImg,bgImage,brickImg,checkPointsound;                                            
var collided,dieSound,gameOverImg,groundImg,redoImg,redo;                                      
var ground , mario , jump,obstacleGroup,brickGroup,riverBg,winnner, winnerImg;                                                        
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;
var score = 0;


function preload(){
  bgImg       = loadImage("bg.png");
  brickImg    = loadImage("brick.png");
  groundImg   = loadImage("ground2.png");
  marioImg    = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");        
  obstacleImg = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  jump        = loadSound("jump.mp3");
  die         = loadSound("die.mp3");
  level       = loadSound("TU.mp3");
  collided    = loadAnimation("collided.png");
  restartImg  = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");      
  riverBg     = loadImage("riverbg.png");       
  winnerImg   = loadImage("winner.jpg");
  redoImg     = loadImage("redo.png");            

}

function setup(){
 canvas = createCanvas(1200,600);
 ground = createSprite(600,520,1200,20);
 ground.addImage("ground",groundImg);
 ground.scale= 2;
 ground.velocityX = -3; 
 mario = createSprite(200,440,20,20);
 mario.addAnimation("mario",marioImg);
 mario.addAnimation("collided",collided);
 mario.scale = 2;
 mario.setCollider("rectangle",0,0,11,27);
 winner = createSprite(590,290,20,20);
 winner.addImage("winner",winnerImg);
 winner.scale.x= 1.0;
 winner.scale.y= 6.0;
 winner.visible= false;

 
 //mario.debug = true;
 obstacleGroup = new Group();
 brickGroup = new Group();
 restart = createSprite(600,300,20,50);
 restart.addAnimation("restart",restartImg);
 restart.visible = false;
 redo = createSprite(600,500,20,50);
 redo.addAnimation("redo",redoImg);
 redo.visible = false;
 gameOver= createSprite(600,200,20,50);
 gameOver.addAnimation("gameOver",gameOverImg);
 gameOver.visible = false;
}    
function draw(){
   background(bgImg);
   drawSprites();  
   mario.collide(ground);
   
   if(gameState === PLAY){
       fill("black")
       textSize(30);
       textFont("jokerman")
       text("score:"+ score , 1000,70)
   if(ground.x<0){
       ground.x=ground.width/2;                                        
   }                                                                  
   if(keyDown("Space")&&mario.y>400){
       mario.velocityY = -20; 
       jump.play();
       
   }
   
   mario.velocityY = mario.velocityY + 1
   for(var i = 0; i<brickGroup.length;i++){
   if(brickGroup.get(i).isTouching(mario)){
     brickGroup.get(i).remove();
     score =  score + 1 ;
     
   }

   }
   spawnObstacles();
   spawnBricks();
   if(obstacleGroup.isTouching(mario)){
    gameState = END
    die.play();
   
  }
  
  if(World.frameCount % 5000 === 0) {
     winner.visible = true;
     level.play();
     gameState = WIN
     redo.visible= true;
  }

} 
  else if(gameState === END){
    obstacleGroup.setVelocityXEach= 0;
    brickGroup.setVelocityXEach = 0;
    ground.velocityX = 0;
    mario.velocityY = 0;
    mario.changeAnimation("collided",collided);
    restart.visible = true;
    gameOver.visible = true;
    score = 0;
               
  }
  if(gameState === WIN){
    obstacleGroup.setVelocityXEach= 0;
    brickGroup.setVelocityXEach = 0;
    ground.velocityX = 0;
    mario.velocityY = 0;
    mario.visible = false;
    obstacleGroup.destroyEach();
    brickGroup.destroyEach();
    score = 0;

   
  }
  if(mousePressedOver(redo)){
    gameState = PLAY;
    redo.visible =  false;
    winner.visible = false;
    obstacleGroup.destroyEach();
    brickGroup.destroyEach();
    mario.changeAnimation("mario",marioImg);
    ground.velocityX = -3;
    mario.visible = true;

  }

  if(mousePressedOver(restart)){
    gameState = PLAY;
    restart.visible = false;
    gameOver.visible = false;
    obstacleGroup.destroyEach();
    brickGroup.destroyEach();
    mario.changeAnimation("mario",marioImg);
    ground.velocityX = -3;
  }
  
       
          
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(1100,405,10,40);
    obstacle.velocityX = -6;
    obstacle.addAnimation("obstacle",obstacleImg);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
 
  }
}
function spawnBricks() {
  if(World.frameCount % 70 === 0) {
    var brick = createSprite(random(370,430),random(275,305),10,40);
    brick.velocityX = -6;
    brick.addImage("collectigthign",brickImg);
    //assign scale and lifetime to the obstacle           
    brick.scale = 0.2;
    brick.lifetime = 70;
    //add each obstacle to the group
    brickGroup.add(brick);
 
  }
}


