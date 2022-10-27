var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var blastImg
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var deadImg
var zombieGroup;
var shootingSound, loseSound, winSound;
var bullets = 70;
var life = 3;
var explosionSound
var gameState = "fight"
var score= 0
var bg2Img
function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
blastImg = loadImage("assets/R.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
deadImg = loadImage("assets/P.png")
  zombieImg = loadImage("assets/zombie.png")
  shootingSound = loadSound("assets/explosion.mp3")
  explosionSound = loadSound("assets/explosion.wav")
loseSound = loadSound("assets/lose.mp3")
winSound = loadSound("assets/win.mp3")
  bgImg = loadImage("assets/bg.jpeg")
bg2Img = loadImage("assets/bg2.jpg")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //go to gameState "lost" when 0 lives are remaining
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    gameState = "lost"
    loseSound.play()
  }
if (score == 100){
  winSound.play()
  gameState = "win"
  bg.changeImage("change",bg2Img)
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.addImage(blastImg)
  bullet.scale=0.08
  bullet.velocityX = 20
  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1
  shootingSound.play()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "bullet"
    loseSound.play()
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      //write a condition for zombiegroup touches bulletGroup
   if(zombieGroup[i].isTouching(bulletGroup)){
    var blast = createSprite(zombieGroup[i].x,zombieGroup[i].y,50,50)
blast.addImage(deadImg)
blast.life=10
blast.scale = 0.3
explosionSound.play()
explosionSound.setVolume(0.4)
score+=20
//destroy zombie
        bulletGroup.destroyEach()
       zombieGroup[i].destroy()
        } 
  
  }
}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life -= 1
//Decrease the life
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
}

drawSprites();
textSize(20)
fill("red")
text("Score: "+score,displayWidth-200,displayHeight/2-220)
text ("Bullets: "+bullets,displayWidth-210,displayHeight/2-250)

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){

  textSize(100)
  fill("red")
text("You Lost",400,400)
zombieGroup.destroy()
player.destroy()
  //use text to display you lost
  //destroy zombie group
  //destroy player
 

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "win"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
