
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstaclesGroup;
var eatScore, eTime;
const PLAY = 1;
const END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
    monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600,400);
   monkey = createSprite(200,380);
   monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided", monkey_collided);
   monkey.scale = 0.1;
   
   ground = createSprite(400,390,1000,10);
   ground.x = ground.width/2;
   ground.velocityX = -4;
   
   bananasGroup = createGroup();
   obstaclesGroup = createGroup();
   eatScore = 0;
  eTime = 0;
  
}


function draw() {
  background("white");
  textSize(20);
  strokeWeight(7);
  stroke("orange");
  fill("blue")
  
  text("Survival Time  : "+eTime + " msec", 380,50);
  text("Bananas Ate : "+eatScore, 380,70);
  if (gameState === PLAY) {
    if (ground.x < 0) {
      ground.x  = ground.width/2;
    }
     eTime = Math.ceil(frameCount/getFrameRate());
    ground.velocityX = -4;
    if (keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 1;
   
    
    
    spawnBananas();
    spawnObstacles();
    if (bananasGroup.isTouching(monkey)) {
       eatScore = eatScore+1;
       bananasGroup.destroyEach();
    }
    if (obstaclesGroup.isTouching(monkey)) {
       gameState = END;
      
    }
  }
  else {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.y = 380;
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    monkey.changeAnimation("collided",monkey_collided);
    bananasGroup.setLifetimeEach(-1);
    bananasGroup.setVelocityXEach(0);
    textSize(40);
    text("Game Over!!!",200,300);
  }
  
  monkey.collide(ground);
     
  drawSprites();
}

function spawnBananas() {
  if (frameCount % 100 === 0){
    var banana = createSprite(600,random(100,400));
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.lifetime = 150;
    banana.depth = monkey.depth;
    monkey.depth +=1;
    banana.scale = 0.1;
    bananasGroup.add(banana);
  }
}
function spawnObstacles() {
  if (frameCount % Math.round(random(50,200)) === 0){
    var obstacle = createSprite(600,350);
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 600;
    obstacle.velocityX = -4;
    obstacle.scale = 0.2;
    obstaclesGroup.add(obstacle);
  }
}