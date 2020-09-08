var PLAY=1;
var END=0;
var gameState=PLAY;
var trex,trex_running,groundImage,ground,invisibleGround;
var  cloud,obstacle,obstaclesGroup,cloudsGroup,trexcollided;
var gameOverImg,gameOver;
var restart;
var score=0;
var jumpSound,dieSound,checkPointSound;
function preload(){
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trexcollided=loadImage("trex_collided.png");
  gameOverImg=loadImage("gameOver.png");
 // restart_img=loadImage("restart.png");
  
  //jumpSound=loadSound("jump.mp3");
 // dieSound=loadSound("die.mp3");
  //checkPointSound("checkPoint.mp3");
  
}
function setup(){
  createCanvas(600,400)
  trex=createSprite(200,150,20,50);
  trex.addAnimation("running",trex_running);

  ground=createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //create invisible ground
  invisibleGround=createSprite(200,390,400,10);
  var rand=Math.round(random(1,100))
  console.log(rand)
  console.log(getFrameRate)
  
  //creating obstacle and clouds group
  obstaclesGroup=new Group();
  cloudsGroup=new Group();

  gameOver=createSprite(220,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  
 // restart=createSprite(220,100);
  //restart.addImage(restart_img);
  
  trex.setCollider("rectangle",0,0,400,trex.height);
}


function draw(){

  
  background("red");
  fill('white');
  text("score:" + score ,500,50);
  

  if(gameState === PLAY){
      gameOver.visible = false;
     ground.velocityX=-4;
     score=score + Math.round(getFrameRate()/60);
     ground.velocityX=-(4+3*score/100);   
      
    /*if(score>0 && score % 100 === 0){
      checkPointSound.play();
    }*/
     if(ground.x<0){
     ground.x = ground.width/2;
     }
    
    if(keyDown("space") && trex.y>=366)
     {
  
     trex.velocityX=0;
     trex.velocityY  =-12;
    // jumpSound.play();
     }
    trex.velocityY=trex.velocityY + 0.8;

    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
       trex.velocityY  =-12;
      //   gameState=END;
      //dieSound.play();
    }
    
  }  
  else if(gameState === END){
    trex.changeAnimation("collided",trexcollided);
          gameOver.visible = true;
         // restart.visible =  true;
          ground.velocityX = 0;
          trex.velocityY = 0;
    
    //change the trex animation
      
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
      
     
          }
  
  trex.velocityX=2;
  console.log(trex.y)

    
    edges=createEdgeSprites()

    // trex.collide(edges);
    trex.scale=0.4;
    trex.x=50;
    trex.collide(invisibleGround);

   
    
    invisibleGround.visible=false;

   
    drawSprites();  

  }  
 function spawnClouds(){
    if(frameCount%60===0){
       cloud=createSprite(600,100,40,10);
       cloud.scale=0.4;
       cloud.addImage("cloudy",cloudImage);
       cloud.y=Math.round(random(280,320))
       cloud.velocityX=-3;
       cloud.lifetime=200;
       cloud.depth=trex.depth;
       trex.depth=trex.depth+1;
        //adding cloud to the group
         cloudsGroup.add(cloud);
    }
}
function spawnObstacles(){
        if(frameCount % 60===0){
        obstacle=createSprite(600,359,50,40);
          obstacle.velocityX=-(6+score/100);   
        obstacle.velocityX=-2;
        obstacle.scale=0.3;
        obstacle.lifetime=300;
        //add each obstacles to the group
        obstaclesGroup.add(obstacle);
        var rand=Math.round(random(1,6));

        switch(rand){
        case 1: obstacle.addImage("obstacle",obstacle1);
            break;
        case 2: obstacle.addImage("obstacle",obstacle2);
            break;
        case 3: obstacle.addImage("obstacle",obstacle3);
            break;
        case 4: obstacle.addImage("obstacle",obstacle4);
            break;
        case 5: obstacle.addImage("obstacle",obstacle5);
            break;
        case 6: obstacle.addImage("obstacle",obstacle6);
            break;
            default:break;
        
        }
          obstacle.depth=trex.depth;
          trex.depth=trex.depth+1;
       
        }
}