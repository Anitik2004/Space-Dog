var PLAY = 1;
var END = 0;
gameState = PLAY;
var score = 0;

var background, backgroundImage;
var ground;
var obstacle, obstacleImage, obstacleGroup;
var objects, objectsImage, objectsGroup;
var stones, stonesImage, stonesGroup;
var flames_moving, flamesGroup;
var bullet_firing, bulletBillGroup;
var firebreath_moving, fireBreathGroup;
var laser, laserImage, laserGroup;
var body, bodyImage;
var jumpSound, gameoverSound, bulletBillSound, flameSound, laserSound;
var gameOver, gameOverImage;


function preload(){
  backgroundImage = loadImage ("background.png");
  objectsImage = loadImage ("star.png");
  bodyImage = loadImage ("dog.png");
  obstacleImage = loadImage ("obstacle.png");
  stonesImage = loadImage("stone.png");
  laserImage = loadImage("bullet.png");
  laserSound = loadSound("bullet.mp3");
  jumpSound = loadSound ("jump.mp3");
  firebreath_moving = loadAnimation ("firebreath1.png","firebreath2.png");
  bullet_firing = loadAnimation ("1.png","2.png","3.png","4.png","5.png");
  flames_moving = loadAnimation ("flame1.png","flame2.png","flame3.png");
  gameoverSound = loadSound ("gameover.mp3");
  bulletBillSound = loadSound ("bullet_bill.mp3");
  flameSound = loadSound ("flame.mp3");
  gameOverImage = loadImage ("gameover.png");
}

function setup() {
  createCanvas(500,500);
  
  ground = createSprite(600,280,100,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = true;
  ground.addImage (backgroundImage);
  
  body = createSprite (150,110,10,10);
  body.addImage (bodyImage);
  body.scale = 0.15;
  
  gameOver = createSprite (250,130,25,25);
  gameOver.addImage (gameOverImage);
  gameOver.scale = 0.50;
  gameOver.visible = false;
  
  fireBreathGroup = new Group();
  obstacleGroup = new Group();
  objectsGroup = new Group();
  flamesGroup = new Group();
  stonesGroup = new Group();
  laserGroup = new Group();
  bulletBillGroup = new Group();
  
}

function draw() {
  
  if (gameState === PLAY){
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  if (objectsGroup.isTouching(body)){
      objectsGroup.destroyEach ();
      score = score + 1;
      jumpSound.play();    
  }
  
  if (keyWentDown (UP_ARROW)){
    body.velocityY = - 5;
  }
  
   if (keyWentDown (DOWN_ARROW)){
    body.velocityY = 5;
         
  }
   if (obstacleGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
       gameoverSound.play();
     }

   if (laserGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
       gameoverSound.play();
     }
   
   if (stonesGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
       gameoverSound.play();
   }
   
   if (fireBreathGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
       gameoverSound.play();
   }
   
   if (bulletBillGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
       gameoverSound.play();
     }
   
   if (flamesGroup.isTouching(body)||body.y<0||body.y>500){
       gameState = END;
       gameoverSound.play();
     }
  }  
  
 if (gameState === END){
    ground.velocityX = 0;
    fireBreathGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    objectsGroup.setVelocityXEach(0);
    flamesGroup.setVelocityXEach(0);
    stonesGroup.setVelocityXEach(0);
    laserGroup.setVelocityXEach(0);
    bulletBillGroup.setVelocityXEach(0);
    fireBreathGroup.destroyEach();
    obstacleGroup.destroyEach();
    objectsGroup.destroyEach();
    flamesGroup.destroyEach();
    stonesGroup.destroyEach();
    laserGroup.destroyEach();
    bulletBillGroup.destroyEach();
    body.velocityY = 0;
    gameOver.visible = true;
    score = 0
   
 }
  
  spawnLaser();
  spawnFlames();
  spawnStones();
  spawnObjects();
  spawnObstacles();
  spawnBulletBill();
  spawnFireBreath();
    
  drawSprites();
 
  textSize(20);
  fill("white");
  text("Score: "+ score, 380,50);
}

function spawnLaser(){
  if (frameCount%500===0){
      laser = createSprite (650,400,10,10);
      laser.addImage (laserImage);
      laser.y = Math.round(random(100,490));
      laser.scale = 0.2;
      laser.lifetime = 800;
      laser.velocityX = -2;
      laserGroup.add (laser);
  }
}

function spawnObjects(){
 if (frameCount%300===0){
     objects = createSprite (600,250,10,20);
     objects.addImage (objectsImage);
     objects.scale = 0.1;
     objects.y = Math.round (random(100,490));
     objects.lifetime = 800;
     objects.velocityX = -5;
     objectsGroup.add (objects) ;     
   }
}

function spawnObstacles(){
  if (frameCount%500===0){
      obstacle = createSprite (700,220,10,10);
      obstacle.addImage (obstacleImage);
      obstacle.y = Math.round(random(100,490));
      obstacle.scale = 0.1;
      obstacle.lifetime = 800;
      obstacle.velocityX = -2;
      obstacleGroup.add (obstacle);
      
  }
}

function spawnStones(){
  if (frameCount%500===0){
      stones = createSprite (650,400,10,10);
      stones.addImage (stonesImage);
      stones.y = Math.round(random(100,490));
      stones.scale = 0.2;
      stones.lifetime = 800;
      stones.velocityX = -2;
      stonesGroup.add (stones);
  }
}

function spawnFireBreath(){
  if (frameCount%500===0){
      fireBreath = createSprite (700,350,10,10);
      fireBreath.addAnimation ("moving",firebreath_moving);
      fireBreath.y = Math.round(random(100,490));
      fireBreath.scale = 0.2;
      fireBreath.lifetime = 800;
      fireBreath.velocityX = -3;
      fireBreathGroup.add (fireBreath);
  }
}

function spawnBulletBill(){
  if (frameCount%500===0){
      bulletBill = createSprite (700,100,10,10);
      bulletBill.addAnimation ("firing",bullet_firing);
      bulletBill.y = Math.round(random(100,450));
      bulletBill.scale = 0.2;
      bulletBill.lifetime = 800;
      bulletBill.velocityX = -5;
      bulletBillGroup.add (bulletBill);
      bulletBillSound.play();
  }
}

function spawnFlames(){
  if (frameCount%500===0){
      flames = createSprite (700,320,10,10);
      flames.addAnimation ("moving",flames_moving);
      flames.y = Math.round(random(100,450));
      flames.scale = 0.2;
      flames.lifetime = 800;
      flames.velocityX = -3;
      flamesGroup.add (flames);
      flameSound.play();
  }
}