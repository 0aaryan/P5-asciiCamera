function asciiChar(c,x,y){
  this.c=c;
  this.x=x;
  this.y=y;
  this.angle=0;
  this.size=h;
  this.angularvel=0.000;
  this.cx=this.x-width/2;
  this.cy=this.y-height/2;
  this.velx=0;
  this.vely=0;
  this.show=function(){
    fill(144,238,144);
    textSize(this.size);
    text(this.c,this.cx,this.cy);
  }
  this.move=function(){
    push();
    translate(width/2,height/2);
    rotate(this.angle);
    this.angle+=this.angularvel;
    this.angularvel+=0.000;
    this.x+=this.velx;
    this.y+=this.vely;
    this.cx=this.x-width/2;
    this.cy=this.y-height/2;
    this.show();
    //this.shrink();
    pop();
  }

  this.blast=function(){
    this.velx=random(-100,100);
    this.vely=random(-100,100);
  }
}


const density = "Ñ@#W$9876543210?!abc;:+=-,._                           ";
let video;
let w,h;
let charArr=[];

function setup() {
  createCanvas(1440,820);
  video=createCapture(VIDEO);
  video.size(60,60);
  w=width/(video.width);
  h=height/(video.height);
  for(var i=0;i<video.height;i++){
    let arr=[];
    for(var j=0;j<video.width;j++){
      arr.push(new asciiChar(" ",i*w,j*h));
    }
    charArr.push(arr);
  }
}

function draw() {
  background(0);
  video.loadPixels();
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      charArr[i][j].c=c;
      charArr[i][j].move();
    }
  }
}



function keyPressed(){
    for (let j = 0; j < video.height; j++) {
      for (let i = 0; i < video.width; i++) {
        charArr[i][j].blast(); 
      }
    }
}