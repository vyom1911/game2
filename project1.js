var can=document.getElementById('project');
var ctx= can.getContext('2d');
var gameTime;
var Image_start_x=0;
var Image_start_y=0;
var zombie_start_x=0;
var zombie_start_y=0;
var Width = can.width;
var Height = can.height;
var Score = 0;
var zombieCount=1;
var zombieCurrX= zombie_start_x;
var zombieCurrY= zombie_start_y;
var currX = Image_start_x;
var currY = Image_start_y;
var CHAR_WIDTH=64;
var CHAR_HEIGHT=64;
var SPRITE_WIDTH=832;
var zombie_spriteWitdth = 574;
var AssignId=1;
var ArrowCurrX = Image_start_x;
var ArrowCurrY = Image_start_y;
var Arrow_Width = 16;
var Arrow_Height = 16;
var Arrow_Sprite_Width=16;
var throwArrow=false;
var ArrowId=1; 
var checker = false;
    // draw Background
var background = new Image();
var backgroundReady =false;
    background.src = "images/Grass.png"
background.onload = function(){
    backgroundReady = true;
    };  
//create hero image object
var heroReady=false;
var heroImage=new Image();

//create arrow image object
var ArrowReady=false;
var ArrowImage=new Image();

//create zombie image object
var zombieReady=false;
var zombieImage= new Image();

//load hero image
heroImage.onload = function(){
    heroReady = true;
    };
heroImage.src="images/hero.png";

//load zombie Image
zombieImage.onload = function(){
    zombieReady=true;
    };
zombieImage.src="images/zombie.png";


//load hero image
ArrowImage.onload = function(){
    ArrowReady = true;
    };
ArrowImage.src="images/Arrow.png";

//creating hero with Characteristics
var hero ={
            speed:50,
            x:0,
            y:0,
            width:64,
            height:64,
            hp:100
          };

//creating Arrow & zombies with Characteristics
var Arrows;

function createArrow(herox,heroy){       
    var arrow={
            speed:100,
            x:herox,
            y:heroy,
  //          id:ArrowId,
            width:16,
            height:16
            };
    
    Arrows= arrow;
//    ArrowId+=1;
}
function deleteArrow(){
    delete Arrows.x;
    delete Arrows.y;
    delete Arrows.width;
    delete Arrows.height;
}
var zombies = {};

//creating zombie entity
function createZombie(id,x,y,speed){       
    var zombie={
            speed:speed,
            speedx:1,
            speedy:1,         
            x:x,
            y:y,
            id:id,
            width:64,
            height:64,
            };
    
    zombies[id]=zombie;
    AssignId +=1;
}

//Adding Event Listeners
var pressKey = {};
        addEventListener("keydown",function(e){
            pressKey[e.keyCode] = true;0
        },false);

        addEventListener("keyup",function(e){
            delete pressKey[e.keyCode];
        },false);

        //Reset the game
        var reset = function(){
            hero.x = 0;             
            hero.y=0;
        }



//Move hero, zombie and arrow
var move = function (modifier){
    
     if(throwArrow==true){
         moveArrow();
     }
        for(i=1;i<AssignId;i++){
               moveZombie(i,modifier);
               //collision of zombie and player
            if (testCollision(hero,zombies[i])){
                hero.x=hero.x-1;
                hero.y=hero.y-1;
                hero.hp -= 1;
                console.log("hp:",hero.hp);
            }
            if(throwArrow){
            if(Arrows.x>Width || Arrows.x<0 ||Arrows.y>Height || Arrows.y<0){
                deleteArrow();
                }
            }
            //collision of zombie and Arrow
            if(throwArrow){
                if (testCollisionArrow(Arrows,zombies[i])){
                    console.log("Collision");
                    delete zombies[i];
                    Score=Score+1;
                    checker=true;
                    zombieCount+=1;    
                    console.log("deleted");
                    AssignId -=1;
                    createZombieRandomly(i,checker);
                    deleteArrow();
                    if (zombieCount>3)
                        zombieCount=2;
                    for(var j =1;j<zombieCount;j++){
                        createZombieRandomly(AssignId,checker);
                        }
                }
            }
        }
        //Movement of Player.
            if(38 in pressKey){
                if(hero.y<0)
                {
                    hero.y=0;
                }
                else
                hero.y -= hero.speed*modifier;
            }

                if(40 in pressKey){
                    if(hero.y+hero.height>Height)
                {
                    hero.y=Height-hero.height;
                }
                    else
                    hero.y += hero.speed*modifier;
                    
            }
            
                if(37 in pressKey){
                    if(hero.x<0)
                {
                    hero.x=0;
                }
                else
                hero.x -= hero.speed*modifier;
            }
            
                if(39 in pressKey){
                    if(hero.x+hero.width>Width)
                {
                    hero.x=Width-hero.width;
                }
                else
                hero.x += hero.speed*modifier;
            }

}


//Functions to Draw Movements
function displayRight(){
                    ctx.drawImage(heroImage,
                        currX,currY+64*11,            // sprite upper left positino	
                        CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 
                        hero.x,hero.y,  // canvas position
                        1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
                        );
                        facing = 11;
                        
                    currX += CHAR_WIDTH;
                    if (currX >= SPRITE_WIDTH-4*64)
                        currX = 0;    
                    }

function displayLeft(){
                    ctx.drawImage(heroImage,
                        currX,currY+64*9,            // sprite upper left positino	
                        CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 
                        hero.x,hero.y,  // canvas position
                        1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
                        );
                        facing = 9;
                    currX += CHAR_WIDTH;
                    if (currX >= SPRITE_WIDTH-4*64)
                        currX = 0; 
                    }

function displayUp(){
                    ctx.drawImage(heroImage,
                        currX,currY+64*8,            // sprite upper left position
                        CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite
                        hero.x,hero.y,  // canvas position
                        1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
                        );
                        facing = 8;
                    currX += CHAR_WIDTH;
                    if (currX >= SPRITE_WIDTH-4*64)
                        currX = 0;
                    }


function displayDown(){
                    ctx.drawImage(heroImage,
                        currX,currY+64*10,            // sprite upper left positino	
                        CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 
                        hero.x,hero.y,  // canvas position
                        1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
                        );
                        facing = 10;
                        currX += CHAR_WIDTH;
                        if (currX >= SPRITE_WIDTH-4*64)
                        currX = 0;
                    }

//killing functions
function displaykill(){
            if(32 in pressKey){
                var comparer = facekilling;
                 ctx.drawImage(heroImage,
                      currX,currY+64*facekilling,            // sprite upper left positino	
                      CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 
                      hero.x,hero.y,  // canvas position
                      1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
                      );
            
                      currX += CHAR_WIDTH;   
                      if(currX > 64*7)
                          {  createArrow(hero.x,hero.y);
                            if(comparer==19)
                                displayArrowRight();
                            if(comparer==18)
                                displayArrowDown();
                            if(comparer==17)
                                displayArrowLeft();
                            if(comparer==16)
                                displayArrowUp();
                         }
                         if(currX > 64*11)
                                throwArrow=true;
                      if (currX >= SPRITE_WIDTH-64)
                      currX = 0;
                            }
                    }


function displayArrowUp(){
                 ctx.drawImage(ArrowImage,
                 ArrowCurrX,ArrowCurrY+16*1,            // sprite upper left positino	
                      Arrow_Width,Arrow_Height, // size of a sprite 
                      Arrows.x+hero.width/2-12,Arrows.y,  // canvas position
                      1*Arrow_Width,1*Arrow_Height      // sprite size shrinkage
                      ); 
                        }

function displayArrowLeft(){
                 ctx.drawImage(ArrowImage,
                      ArrowCurrX,ArrowCurrY+16*2,            // sprite upper left positino	
                      Arrow_Width,Arrow_Height, // size of a sprite 
                      Arrows.x,Arrows.y+hero.width/2-5,  // canvas position
                      1*Arrow_Width,1*Arrow_Height      // sprite size shrinkage
                      );
                                   
                       }

function displayArrowDown(){
                 ctx.drawImage(ArrowImage,
                      ArrowCurrX,ArrowCurrY+16*3,            // sprite upper left positino	
                      Arrow_Width,Arrow_Height, // size of a sprite 
                      Arrows.x+hero.width/2-12,Arrows.y+hero.height-10,  // canvas position
                      1*Arrow_Width,1*Arrow_Height      // sprite size shrinkage
                      );
                        }

function displayArrowRight(){       
                 ctx.drawImage(ArrowImage,
                      ArrowCurrX,ArrowCurrY+16*0,            // sprite upper left positino	
                      Arrow_Width,Arrow_Height, // size of a sprite 
                      Arrows.x+hero.width/2+10,Arrows.y+hero.height/2-5,  // canvas position
                      1*Arrow_Width,1*Arrow_Height      // sprite size shrinkage
                      );
                                   
                       }

//Draw image of characters on canvas
var facing=16;
var facekilling = 19;
var zombieFacing=16;
var render = function(){
    
    clear();
    
    if(backgroundReady){
    ctx.drawImage(background,0,0); 
    }

    if(32 in pressKey){
                 displaykill();
                          
            }
    else ctx.drawImage(heroImage,
                        currX,currY+64*facing,            // sprite upper left positino	
                        CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 
                        hero.x,hero.y,  // canvas position
                        1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
                        );

    if(heroReady){
        if(38 in pressKey){
            facekilling=16;
                if(32 in pressKey)
                    displaykill();
                else
                    displayUp();
            }
            
        if(40 in pressKey){
            facekilling=18;
                if(32 in pressKey)
                    displaykill();
                else
                    displayDown();
            }
        if(37 in pressKey){
            facekilling= 17; 
                if(32 in pressKey)
                    displaykill();
                else
                    displayLeft();
            }
            
        if(39 in pressKey){
            facekilling=19;
                if(32 in pressKey)
                    displaykill();
                else
                    displayRight();
            }

          
    }

for(var i=1;i<AssignId;i++)
    {           if(zombieReady){
                ctx.drawImage(zombieImage,
                        zombieCurrX,zombieCurrY+64*zombieFacing,            // sprite upper left position	
                        CHAR_WIDTH,CHAR_HEIGHT, // size of a sprite 
                        zombies[i].x,zombies[i].y,  // canvas position
                        1*CHAR_WIDTH,1*CHAR_HEIGHT      // sprite size shrinkage
                        );

                        zombieCurrX += CHAR_WIDTH;
                        if (zombieCurrX >= zombie_spriteWitdth)
                        zombieCurrX = 0;
                        }
    }
}

//getting distance between the entities
function distanceBetweenCharacters(char1,char2)
            {
                var dx = char1.x - char2.x;
                var dy = char1.y - char2.y;
                
                return Math.sqrt(dx*dx-dy*dy);
            }

//Finding if characters collide

function testCollision(hero,zombie){	//return if colliding (true/false)
		var rect1 = {
			x:hero.x+hero.width/2,
			y:hero.y+hero.height/2,
			width:hero.width/2-5,
			height:hero.height/2,
		}
		var rect2 = {
			x:zombie.x+zombie.width/2,
			y:zombie.y+zombie.height/2,
			width:zombie.width/2-5,
			height:zombie.height/2,
		}   
		return testCollisionRect(rect1,rect2);
	}

function testCollisionArrow(Arrows,zombie){	//return if colliding (true/false)
		var rect1 = {
			x:Arrows.x+Arrows.width,
			y:Arrows.y+Arrows.height,
			width:Arrows.width,
			height:Arrows.height,
		}
		var rect2 = {
			x:zombie.x+zombie.width/2-5,
			y:zombie.y+zombie.height/2-5,
			width:zombie.width/2-5,
			height:zombie.height/2,
		}   
		return testCollisionRect(rect1,rect2);
	}
function testCollisionRect(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width 
		&& rect2.x <= rect1.x+rect1.width
		&& rect1.y <= rect2.y + rect2.height
		&& rect2.y <= rect1.y + rect1.height;
}

// Creating zombies at Random position
function createZombieRandomly(i,checker){
        var id;
        var x =1 + Math.random()*(Width-64);
        var y =1 + Math.random()*(Height-64);
        var speed = 5 + Math.random()*80;
        if(checker)
            id = i; 
        else 
            id = AssignId;
        createZombie(id,x,y,speed);
        checker=false;
}

function clear(){
    ctx.clearRect(0,0,640,480);
}

var DirectionSignx = 1;
var DirectionSigny = 1; 

function moveArrow(modifier){
    if(throwArrow){

        if(facekilling==16)
            {Arrows.y-= 2;
                displayArrowUp();
            }
        if(facekilling==17)
            {Arrows.x-= 2;
                displayArrowLeft();
            }
        if(facekilling==18)
            {Arrows.y+= 2;
                displayArrowDown();
            }
        if(facekilling==19)
            {Arrows.x+= 2;
                displayArrowRight();
            }
    }
}

//Moves Zombie Randomly
function moveZombie(i,modifier){
    zombies[i].x += zombies[i].speed*modifier*DirectionSignx;
    zombies[i].y += zombies[i].speed*modifier*DirectionSigny;
    
    if(zombies[i].x<0 || zombies[i].x+zombies[i].width>Width){
        DirectionSignx=-DirectionSignx;
    }

    if(zombies[i].y<0 || zombies[i].y+zombies[i].height>Height){
        DirectionSigny=-DirectionSigny;
    }

    if(DirectionSignx<0){
        zombieFacing=9;
    }
    if(DirectionSignx>0){
        zombieFacing=11;
    }
}

//Main game loop
var main = function(){
            //Display player Hp.
            ctx.font="20px Georgia";
            ctx.fillText("Player HP:" + hero.hp,20,20);

            //Display Score
            ctx.font="25px Georgia";
            ctx.fillText("Score:" + Score,530,20);

            //Display Timer
            gameTime = Math.ceil((Date.now() - gameTimeStart)/1000);
            ctx.font = "20px Georgia";
            ctx.fillText("Time:"+ gameTime + " sec",250,20);

            var now = Date.now();
            var delta = now-then;

            move(delta/1000);

            then=now;

            if(hero.hp<0)
                gameOver();

            if(gameTime>200)
                gameWon();

            Animframe = requestAnimationFrame(main)
            
            };

function gameOver(){
    clearInterval(rendering);
    cancelAnimationFrame(Animframe);
    ctx.clearRect(0,0,Width,Height);

    //Display Game Over.
    ctx.font="50px Georgia";
    ctx.fillText("Game Over!",200,200);

    //Display Final Score.
    ctx.font="30px Georgia";
    ctx.fillText("Zombies Killed: " + Score,200,250);

    //Display Time Survived.
    ctx.font="30px Georgia";
        ctx.fillText("You survived for " +gameTime + " seconds",150,300); 
        setTimeout(main,refresh);
}

function gameWon(){

    clearInterval(rendering);
    cancelAnimationFrame(Animframe);
    ctx.clearRect(0,0,Width,Height);
    //Display Game Over.
    ctx.font="50px Georgia";
    ctx.fillText("You Win!",200,200);

    //Display Final Score.
    ctx.font="30px Georgia";
    ctx.fillText("Zombies Killed: " + Score,200,250);

}
requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame;

var then=Date.now();
var gameTimeStart=  Date.now();


function newgame(){
    reset();
    createZombieRandomly();
    rendering = setInterval(render,200);
    main();
}