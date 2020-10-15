var ghost, ghoststand, ghostjumping;
var door, doorimage, doorgroup;
var climber, climberimage, climbergroup;
var spookysound;
var tower, towerimages
var invisibleblock, invisiblegroup;
var gameState = "play";

function preload() {
  ghostjumping = loadImage("ghost-jumping.png");
  ghoststand = loadImage("ghost-standing.png");
  doorimage = loadImage("door.png");
  climberimage = loadImage("climber.png");
  spookysound = loadSound("spooky.wav");
  towerimage = loadImage("tower.png");
}

function setup() {
  createCanvas(400, 400);
  tower = createSprite(200, 200);
  tower.addImage("tower", towerimage);
  tower.scale = 0.7;
  tower.velocityY = 1;
  tower.y = tower.width / 2;

  ghost = createSprite(200, 200)
  ghost.addImage("ghost", ghoststand)
  ghost.scale = 0.3;
  doorgroup = createGroup();
  climbergroup = createGroup();
  invisiblegroup = createGroup();
}

function draw() {
  background(0);
  if (gameState === "play") {
    spookysound.loop();
    if (tower.y > 400) {
      tower.y = tower.width / 2;
    }
    if (keyDown("space")) {
      ghost.velocityY = -5;
    }
    if (keyDown("left_arrow")) {
      ghost.x -= 3
    }
    if (keyDown("right_arrow")) {
      ghost.x += 3
    }
    ghost.velocityY += 0.5;
    spawndoors();
   if (climbergroup.isTouching(ghost)){
ghost.velocityY=0
   }
    if(invisiblegroup.isTouching(ghost)||ghost.y>600){
ghost.destroy();
      gameState="end"
    }
     drawSprites();
  }
 if (gameState==="end"){
   stroke("white");
  textSize(20);
  fill("white")
text("GAMEOVER",150,200);
  }

}

function spawndoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(Math.round(random(100, 300)), -50)
    door.addImage("door", doorimage);
    door.velocityY = 1;
    climber = createSprite(door.x, 10);
    climber.addImage(climberimage)
    climber.velocityY = 1;
    invisibleblock = createSprite(door.x, 15);
    invisibleblock.width = climber.width;
    invisibleblock.velocityY = 1;
    invisibleblock.height = 2;
    invisibleblock.debug = true;
    invisibleblock.lifetime = 800;
    invisiblegroup.add(invisibleblock);
    climber.lifetime = 800;
    door.lifetime = 800;
    climbergroup.add(climber);
    doorgroup.add(door);
  }
}