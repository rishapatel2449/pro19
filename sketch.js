var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path, leftBoundary,rightBoundary;
var carImg
var obstacle,obstacleImg 
var restart,gameOver, gameOverImg;
var score=0
var obstaclesGroup
var cyclist,cyclistGroup,cyclistImage


function preload(){
    pathImg = loadImage("path.png");
    carImg = loadImage("cars4.png");
    obstacleImg = loadImage("car1.png");
    gameOverImg = loadImage("gameover.png")
   cyclistImage = loadAnimation("opponent1.png","opponent2.png","opponent2.png")
}

function setup() {
    createCanvas(400,400);

    path=createSprite(200,200);
    path.addImage(pathImg);
    path.velocityY = 4;
    path.scale=1.2;

    car = createSprite(180,340,30,30);
    car.addAnimation("running",carImg);
    car.scale=0.05;
    score=0;

    obstaclesGroup=new Group()
car.setCollider("rectangle",0,0,300,570);
 car.debug=false

 cyclistGroup=createGroup();

   // gameOver = createSprite(200,200);
   // gameOver.addImage(gameOverImg);
   // gameOver.scale = 0.8;
   // gameOver.visible = false; 
    
    //leftBoundary=createSprite(500,500,100,800);
    //leftBoundary.visible = false;
    
//rightBoundary=createSprite(410,0,100,800);
//rightBoundary.visible = false;

//car.collide(leftBoundary);
//car.collide(rightBoundary);

//var obstacle= createSprite(10,-50)
//obstacle.setLifetimeEach(-1);

  
}

function draw() {

   background(0);
   
   // car.collide(leftBoundary);
    //car.collide(rightBoundary);
    
    //edges= createEdgeSprites();
    //car.collide(edges[3]);
    
    if (gameState===PLAY){

        Cyclist();

        path.velocityY=4
        score=score+Math.round(frameCount/60)
        
    if (obstaclesGroup.isTouching(car)){
       gameState=END
        car.velocityY=0
        car.addImage(gameOverImg);
        car.scale=2;
        car.x=300;
       car.y=300;

    }
    }

    else if (gameState===END){
    
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart!", 100,250);
    car.addImage(gameOverImg);
        car.scale=2;
        car.x=300;
       car.y=300;


    path.velocityY=0
    obstaclesGroup.velocityY=0
    obstaclesGroup.destroyEach()

    if(keyDown("UP_ARROW")) {
        reset();
      }
        
      }
      if(cyclistGroup.isTouching(car)){
        gameState=END;
        cyclistGroup.destroyEach();
        cyclistGroup.setVelocityXEach(0);

    }
        //obstaclesGroup.setLifetimeEach(-1)
        //car.setLifetimeEach(-1)
       // car.velocityY=0
       // gameOver.visible = true;
       // car.addImage(gameOverImage);
    //edges= createEdgeSprites();
    
}

function reset(){
    gameState=PLAY
    car.addAnimation("running",carImg);
      obstaclesGroup.destroyEach()
     
      score=0
      // gameOver.visible = false
      spawnObstacles();

      car.scale=0.2
    car.x = World.mouseX;
    edges= createEdgeSprites();
    car.collide(edges);

    if(path.y > 400 ){path.y = height/2;}

     drawSprites();

     textSize(25);
    text("Score : "+ score,250,50);
}


function spawnObstacles() {
    if (frameCount %200  === 0) {
       obstacle= createSprite(10,-50);
       obstacle.addImage(obstacleImg)
       obstacle.x = Math.round(random(120,400));
       obstacle.scale=0.05
       obstacle.velocityY = 1;
        obstacle.lifetime=800;

        car.depth=obstacle.depth
        obstacle.depth+=1
 
        obstaclesGroup.add(obstacle)
        //score=score+2;
     }
  } 
        
 function Cyclist(){
    if(World.frameCount%150===0){
      cyclist=createSprite(400,200,20,20);
      cyclist.addAnimation("moving", cyclistImage);
      cyclist.y=Math.round(random(100,550));
      cyclist.velocityX=-(8+(score/10));
      cyclist.setLifetime=50;
      cyclist.scale=0.2
      
      cyclistGroup.add(cyclist);
    }
  }

