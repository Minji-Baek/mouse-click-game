
import App from "./App.js";
import BoundingBox from "./BoundingBox.js";
export default class Player {
  constructor(type){
    this.x = App.width * 0.1;
    this.y = App.height * 0.5;
    this.width = 130;
    this.type = type
    switch(this.type){
      case 'blue-bird':
        this.img = document.querySelector('#blue-bird-img');
        this.height = this.width * (33 / 32);
        this.boundingBox = new BoundingBox(this.x + 1, this.y + 20, this.width - 9, this.height - 26 ); // 해당 상수는 img siz가 딱 그림에 맞지 않기 때문에 bound 조절 
        this.imgCnt = 9
        this.updateY= 20;
        break;
      case 'bird':
        this.img = document.querySelector('#bird-img');
        this.height = this.width * (96/140);
        this.boundingBox = new BoundingBox(this.x + 10, this.y + 16, this.width - 20, this.height - 20 ); // 해당 상수는 img siz가 딱 그림에 맞지 않기 때문에 bound 조절 
        this.imgCnt = 15;
        this.updateY= 16;
        break;
    }

    this.frameX = 0; // 몇번째 IMG
    this.counter = 0;
    this.vy = -10; //속도
    this.gravity = 0.2;

    App.canvas.addEventListener("click", ()=> {
      this.frameX = 2;
      this.vy += -4;
    });


  }

  update(){

    if(++this.counter % 2 === 0)
      this.frameX = ++ this.frameX % this.imgCnt;

    this.vy += this.gravity;
    this.y += this.vy;
    this.boundingBox.y = this.y + this.updateY;

  }
  draw(){
    App.ctx.drawImage(
      this.img,
      this.img.width / this.imgCnt * this.frameX, 0, this.img.width / this.imgCnt, this.img.height,
      this.x, this.y, this.width, this.height
    );
    // this.boundingBox.draw();
  }
}