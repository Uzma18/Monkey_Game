
var monkey , monkey_running;
var monkey_over;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;
var bananaGroup, obstacleGroup;
var survivalTime=0;
var gameState="play";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_over=loadAnimation("sprite_4.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey=createSprite(60,400,40,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("over",monkey_over);
  monkey.scale=0.08
  ground=createSprite(300,400,1200,10);
  ground.velocityX=-8;
  bananaGroup=new Group();
  obstacleGroup=new Group();
  monkey.debug=false;
  //monkey.setCollider("circle",0,0,200) 
}


function draw() {
  background("lightblue");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,480,50)
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+survivalTime,100,50);
  
  if(gameState==="play")
    { monkey.changeAnimation("running",monkey_running)
      survivalTime=Math.ceil(frameCount/frameRate());
     
      if(ground.x<0){
      ground.x=ground.width/2;
      }
    if(keyDown("space") && monkey.y>100)
      {
        monkey.velocityY=-7;
      }
    monkey.velocityY=monkey.velocityY+0.5;

    
    food();
    obstacles();
       if(bananaGroup.isTouching(monkey))
         {
           score=score+1;
           bananaGroup.destroyEach();
         }
       if(monkey.isTouching(obstacleGroup))
         {
           gameState="end"
         }
      } 
  else if(gameState==="end"){
    monkey.changeAnimation("over",monkey_over);
    monkey.velocityY=0;
    ground.velocityX=0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    text("Game Over", 200,200);
    }
  
monkey.collide(ground);
  drawSprites();
}

function food()
{if(frameCount%100===0)
  {var y=Math.round(random(180,250));
   var banana=createSprite(600,y,20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-6 ;
    banana.scale=0.1
    banana.lifetime=150;
    bananaGroup.add(banana);
  }
}

function obstacles()
{if(frameCount%300===0)
  {var rand=Math.round(random(0,600))
   var obstacle=createSprite(rand,400,40,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX=-5;
   obstacle.scale=0.2;
   obstacle.lifetime=120;
   obstacleGroup.add(obstacle);
  }
  
}



