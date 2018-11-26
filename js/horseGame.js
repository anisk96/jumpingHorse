"use strict"
var spriteSheet = [];
var jump = []
console.log = () => {};
var land = [];
var clouds = []
var enemies= []
var chance = 3;
var score = 0;
var blueApple;
var theme;
var coin;
var Enemies = [];
var coins = [];
var Land_img, Background1, Land_img1, Background2;
var Cloud;
var button, button1;
var blueApples = []
function preload(){
 spriteSheet[0] = loadImage("https://image.ibb.co/hnpyYV/ice-horse.png");
 spriteSheet[1] = loadImage("https://image.ibb.co/fb5afA/ice-horse-run-06.png");
 spriteSheet[2] = loadImage("https://image.ibb.co/cw4e7q/ice-horse-run-05.png");
 spriteSheet[3] = loadImage("https://image.ibb.co/g4NGnq/ice-horse-run-04.png");
 spriteSheet[4] = loadImage("https://image.ibb.co/fuPe7q/ice-horse-run-03.png");
 spriteSheet[5] = loadImage("https://image.ibb.co/kbVY0A/ice-horse-run-02.png");
 spriteSheet[6] = loadImage("https://image.ibb.co/bNJE7q/ice-horse-run-01.png");
 spriteSheet[7] = loadImage("https://image.ibb.co/dk6HSq/ice-horse-run-00.png");
 jump[4] = loadImage("https://image.ibb.co/kEa80A/ice-horse-jump-02.png");
 Land_img = loadImage("https://image.ibb.co/fEdXvA/tile-fall-2.png");
 Background1 = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDwkkGVU2zV31r9IST6Ah0X2dscppon438PZyfJjAfO1NZTOmb");
 Cloud = loadImage("https://image.ibb.co/iT0jQA/8i6o-A9x5-T.png");
 blueApple = loadImage("https://image.ibb.co/gEeiJV/8b1eb71d81e991476ed7607d73f61644.png");
 coin = loadImage("https://image.ibb.co/jRAp0y/coin.png") ;
 Enemies[0] = loadImage("https://image.ibb.co/nPQwOV/Haunter-Shiny.png");
 Background2 = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_dkePeR56d4VVoZGkdhssFrL9BnOegf1QplPzyRsbDatQFzW-" );
}

var sprit ;
var life = []
function setup(){
  var c = createCanvas(windowWidth,windowHeight);
  c.position(0,0);
  background(0);
  sprit = new Sprite ();
  theme = new background_1();
  button = createButton("Restart").class("btn btn-primary");
  button.position(width / 2 - 50, height - height/3);
  button.mousePressed(restart);
  button.hide();
  for(var i = 0; i < chance; i++){
  	life.push(new helath(i * 20));
  }
  var al = alert('Instruction:\nClick or tap to jump');
  var a = confirm(`1.Click "Ok" to play in Light mode\n2.click "Cancel" to play in dark mode `);
  if(a==true){
  	theme.img = Background1;
  }
  else{
  	  theme.img = Background2;
  }
}

function draw(){
  background(0);
  frameRate(20);//speed
  theme.show();
  for(var i =0;i< life.length-1;i++){
	   life[i].show();
  }
  if(frameCount % 10==0){
	   clouds.push(new Clouds());
  }
  else if(frameCount % 85==0){
	   enemies.push(new Enemy());
  }

  for(var i = clouds.length-1;i>0; i--){
	  clouds[i].show();
	  clouds[i].update();

	  if(clouds[i].x<-clouds[i].w){
		    clouds.splice(i,1);
	  }
  }

  fill("red")
  textAlign(CENTER) ;
  textSize(25);
  text("Score:"+score,width-100,40);
  sprit.show()
  sprit.animate();
  if(frameCount%25==0){
	  land.push(new Land());
  }
  if(frameCount % 10==0){
	   coins.push(new Coin());
  }
  if(frameCount % 80==0){
	   blueApples.push(new BlueApple());
  }
  for(var i = 0;i<blueApples.length;i++){
    blueApples[i].show();
    blueApples[i].update();
  }
  for(var i = 0;i<blueApples.length;i++){
    if(blueApples[i].x<-blueApples[i].w){
  	   blueApples.splice(i,1);
    }
  }
  for(var i = 0;i<blueApples.length;i++){
    if(collision(sprit,blueApples[i]) ){
    	   blueApples.splice(i,1);
    	   score+=10;
       }
  }
  for(var i = 0;i<coins.length;i++){
    coins[i].show();
  	coins[i].update();

  }
  for(var i = 0;i<coins.length;i++){
  	 if(collision(sprit,coins[i])){
  		 coins.splice(i,1);
  		 score++;
     }
	}
  for(var i = 0;i<coins.length;i++){
  	 if(coins[i].x<-coins[i].w){
  		 coins.splice(i,1);
  	 }
  }
  for(var i = 0;i<enemies.length;i++){
  	 enemies[i].show();
  	 enemies[i].update();
  }
  for(var i = 0;i<enemies.length;i++){
    if(enemies[i].x<-enemies[i].w){
	     enemies.splice(i,1);
     }
  }
   //console.log(spriteSheet.length);
  for(var i = land.length-1;i>0;i--){
	  land[i].show();
	  land[i].update();
	  if(collision(sprit,land[i])){
		  sprit.y = land[i].y-land[i].h*4+10;
	  }
	  if(land[i].x<-land[i].w){
		    land.splice(i,1);
	  }
  }
  for(var j =0;j<life.length;j++){
    if(sprit.y>height-95){
      sprit.y =0;
      life.splice(j,1);
      chance -=1;
    }
  }
  for(var j =0;j<life.length;j++){
    for(var i = 0;i<enemies.length;i++){
      if(collision(sprit,enemies[i])){
	       enemies.splice(i,1);
	       life.splice(j,1);
	       chance-=1;
       }
     }
  }
  if(chance ==0) {
	   game_over();
  }
}

function Sprite(){
 this.x = 50;
 this.y = 0;
 this.index = 0;
 this.w = 100;
 this.h = 100;
 this.speed = 1;
 this.img = spriteSheet[this.index%spriteSheet.length];
 this.show = function(){
   image(this.img,this.x,this.y,100,100);
}
this.animate = function(){
   this.index+=this.speed;
   if(mouseIsPressed){
	     this.img = jump[4];
	     this.y-=20;
   }
   else {
	     this.img = spriteSheet[this.index%spriteSheet.length];
   }
   this.y+=8;
   if(this.y<0){
      this.y = 0;
   }
 }
}

function collision(a,b){
 return a.x < b.x + b.w &&
  a.x + a.w >b.x &&
	a.y < b.y + b.h &&
	a.y + a.w > b.y;
}

function Land(){
 this.x = width;
 this.y = random(height *1/4,height-20);
 this.w = random(150,260);
 this.h = 50/2;
 this.dx = 20;
 this.img = Land_img;
 this.show = function(){
   image(this.img,this.x,this.y,this.w,this.h);
 }
 this.update = function(){
    this.x-=this.dx;
 }
}

function background_1(){
 this.x = -width/2;
 this.y = 0;
 this.w = width * 3 / 2;
 this.h = height;
 this.img = Background1;
 this.show = function(){
   image(this.img,this.x,this.y,this.w,this.h);
 }
}

function Clouds(){
 this.x = width;
	 this.y = random(0,height * 2 / 3);
	 this.w = 100;
	 this.h = 70;
 this.dx = 15;
 this.img = Cloud;
 this.show = function(){
   image(this.img,this.x,this.y,this.w,this.h)
 }
 this.update = function(){
	  this.x -= this.dx;
 }
}

function Coin(){
 this.x = width;
 this.y = random(0,height-10);
 this.w = 40;
 this.h = 40;
 this.dx = 5;
 this.img = coin;
 this.show = function(){
   image(coin,this.x,this.y,this.w,this.h);
	 }
 this.update = function(){
    this.x -= this.dx;
 }
}

function BlueApple(){
 this.x = width;
 this.y = random(height/2-100,height-100);
 this.w = 60;
 this.h = 60;
 this.img = blueApple;
 this.dx = 8;
 this.show = function(){
   image(this.img,this.x,this.y,this.w,this.h);
 }
 this.update = function(){
	 this.x -=this.dx;
 }
}

function game_over(){
 frameRate(0);
 fill(0);
 rect(0,0,width,height);
 textAlign(CENTER);
 textSize(85);
 fill("blue")
 text("Game Over",width/2,height/2);
 textSize(35);
 fill("white")
 text("Your Score:"+score,width/2,height/4);
 button.show()
}

// var aud = new Audio("http://k002.kiwi6.com/hotlink/4q6mm0em6u/bach_sonata_525_mvmt_3.mp3");
// var isPlay = 0;
// function song(){
//   if(!isPlay) {
//      aud.play();
//   }
//   isPlay = 1;
// }

function restart(){
 frameRate(20);
 for(var i = 0;i<land.length;i++){
   land.splice(i,2);
 }
 for(var i = 0;i<clouds.length ;i++){
    clouds.splice(i,5);
 }
 for(var i = 0;i<blueApples.length;i++){
    blueApples.splice(i,5);
 }
 for(var i = 0;i<coins.length;i++){
    coins.splice(i,6);
 }

 sprit.y = 0;
 button.hide()
 score =0;
 chance = 3;
 for(var i =0;i< 3;i++){
    life.push(new helath(i*30));
 }
}

function Enemy(){
 this.x = width;
 this.y = random(0,height * 2/ 3);
 this.w = 70;
 this.h = 70;
 this.dx = 8;
 this.img = Enemies[0];
 this.show = function(){
   image(this.img,this.x,this.y,this.w,this.h)
 }
 this.update = function(){
   this.x -=this.dx;
 }
}

function helath(x){
 this.x = x;
 this.y = 20;
 this.w = 30;
 this.h = 30;
 this.show = function(){
   image(spriteSheet[0],this.x,this.y,this.w,this.h);
 }
}
