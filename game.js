var bg;
var img;
var dead = false;
var deadFish = 0;

var player;
var player_stand_sprites;
var player_stand;

var fish_swim_sprites;
var fish_swim; 
var fish = [];

var garbage_drop_sprites;
var garbage_drop;
var garbage = [];

var score = 0;
//////////////////////////////////////////

function preload() {
    bg = loadImage("../images/final-bg.png");
    img = loadImage("../images/fish.png");
    
    player_stand_sprites = loadSpriteSheet("../images/player2.png", 100, 100, 1);
    player_stand = loadAnimation(player_stand_sprites);
    
    fish_swim_sprites = loadSpriteSheet("../images/fish.png", 75, 75, 1);
    fish_swim = loadAnimation(fish_swim_sprites);
    
    garbage_drop_sprites = loadSpriteSheet("../images/metal.png", 41, 75, 1);
    garbage_drop = loadAnimation(garbage_drop_sprites);
}

//////////////////////////////////////////

function setup() {
    createCanvas(720, 360);

    player = createSprite(100, 0);
    player.addAnimation("stand", player_stand);
    player.setCollider("circle", 0, 0, 32, 32);
    player.depth = 10;
    //player.debug = true;
    
    //to make fish
    for (var i = 0; i < 10; i++){
        fish.push( new Fish(random(0,width), random(height/2, height)) );
        for (var i = 0; i < fish.length; i++) {
            fish[i].init();
        }
    }
    
    //to make garbage
    for (var a = 0; a < 5; a++){
        garbage.push( new Garbage(random(0,width), random(width/2, width)));
    }
}

function draw() {  
    scene_start();
}

//////////////////////////////////////////

function scene_start(){
    push();
    background("green");
    fill("white");
    textAlign(CENTER);
    textSize(50);
    textStyle(BOLD);
    text("SPOT A FISH", width/2,height/3.5);
    image(img, width/2.3, height/3);
    textSize(15);
    text("Rules: dont let the cans touch the fish. 5 fish die and you must start over", width/2, height/1.5);
    textSize(30);
    text("press up arrow key to start", width/2, height/1.2);
    pop();
    if (keyCode == UP_ARROW) {
        scene_1();
	}
}

function scene_1(){
    background(bg);
    score_card();

      if(!dead){
        player.position.x = mouseX;
        player.position.y = mouseY;
        
        for (var i = 0; i < fish.length; i++) {
            fish[i].update();
        }
          
       for (var i = 0; i < garbage.length; i++) {
            garbage[i].update();
        }

        for (var a = 0; a < garbage.length; a++) {
            for (var b = 0; b < fish.length; b++) {
                if(fish[b].sprite.collide(garbage[a].sprite)){
                    fish[b].sprite.position.x = random(-500, -100);
                    deadFish ++;
                    if(deadFish === 5){
                       dead = true;
                   }
                }
            }
        }
 
        drawSprites();
    }else{
        score_card();
        textSize(30);
        textStyle(BOLD);
        textAlign(CENTER);
        
        text("YOU DIED PLEASE TRY AGAIN",width/2,height/2);
        text("press any button to start again",width/2,height/1.5);
        
        if(keyIsPressed === true){
            deadFish = 0;
            dead = false;
        }
        
        
    }
}

function Garbage(x,y){
    this.sprite = createSprite(x, y);
    this.sprite.addAnimation("drop", garbage_drop);
    this.sprite.setCollider("circle",0,0,32,32);
    this.speed = random(1,2);
    //this.sprite.debug = true;
    
    this.update = function() {
        this.sprite.position.y += this.speed;
        if(this.sprite.position.y > height){
            this.sprite.position.y = 0;
        }
        if(this.sprite.overlapPoint(player.position.x, player.position.y)){
            this.sprite.position.x = random(0,width);
            this.sprite.position.y = random(-200,-75);
            score++;
        }
        if(score === 100){
            this.speed = random(2,3);
            score += 1000;
        }else if(score === 1200){
            this.speed = random(3,3.5);
            score += 1000;
        }
    }
}

var score_card = function(){
    fill("black");
    rect(0,0,width,30);
    textStyle(BOLD);
    fill("white");
    text("SCORE: "+score,10,20);
    text("DEAD FISH: "+deadFish,width/1.2,20)
}


function Fish(x,y) {
    this.sprite = createSprite(x, y);
    this.sprite.addAnimation("swim", fish_swim);
    this.sprite.setCollider("rectangle",0,0,75,32);
    this.speed = 0;
    this.sprite.debug = false;
    this.init = function() {
        if (this.sprite.position.x < width/2) {
            this.sprite.mirrorX(-1);
            this.speed = random(1, 2);
        } else {
            this.speed = -random(1,2);
        }
    }
    this.update = function() {
        this.sprite.position.x += this.speed;
        if(this.sprite.position.x > width){
            this.sprite.position.x = 0;
        }else if(this.sprite.position.x < -width){
            this.sprite.position.x = width;
        }
    }  
}	
