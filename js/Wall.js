import App from "./App.js";
import BoundingBox from "./BoundingBox.js";
import { randomNumBetween } from "./utils.js";
export default class Wall {
  constructor(config){
    this.img = document.querySelector('#wall-img');
    this.type = config.type // 'BIG', 'SMALL'

    switch(this.type){
      case 'BIG':
        this.sizeX = 18 / 30;
        this.sx = this.img.width * (9 / 30);
        break;
      case 'SMALL':
        this.sizeX = 9 / 30;
        this.sx = this.img.width * (0 / 30);
        break;

    }
    this.width = App.height * this.sizeX;
    this.height = App.height;

    this.gapY = randomNumBetween(App.height * 0.2 , App.height * 0.35 ) // 장애물 간격=화면크기의 10%~20%
    // this.gapY = App.height * 0.4
    this.x = App.width;
    
    // 장애물 위치
    // -this.height 최소
    // App.height - this.gapY - this.height 최대
    this.y1 = - this.height + randomNumBetween(30, App.height - this.gapY -30);
    this.y2 = this.y1 + this.height + this.gapY;

    this.vx = -6

    this.boundingBox1 = new BoundingBox(this.x + 30, this.y1 + 30, this.width - 60, this.height - 60);
    this.boundingBox2 = new BoundingBox(this.x + 30, this.y2 + 30, this.width - 60, this.height - 60);

    this.generatedNext = false;
    this.gapNextX = App.width * randomNumBetween(0.6, 0.75); // 벽 나오는 속도

    // this.gapNextX = App.width * 0.4;//test 용
  }
  get isOutside(){
    //boolean 화면에서 나갔는지 않나갔는지
    return this.x + this.width < 0
  }

  get canGenerateNext(){
    return (
      !this.generatedNext && 
      this.x + this.width < this.gapNextX
    )
  }

  isColliding(target){
    return(
      this.boundingBox1.isColliding(target) ||
      this.boundingBox2.isColliding(target)
    )
  }
  update(){
    this.x += this.vx
    this.boundingBox1.x = this.x + 30;
    this.boundingBox2.x = this.x + 30;
  }

  // test(){
  //   this.x = 700
  //   this.boundingBox1.x = this.x + 30;
  //   this.boundingBox2.x = this.x + 30;
  // }

  draw(){
    // this.test();

    App.ctx.drawImage(
      this.img,
      this.sx, 0, this.img.width * this.sizeX, this.img.height,
      this.x, this.y1, this.width, this.height
    )
    // this.boundingBox1.draw();
    App.ctx.drawImage(
      this.img,
      this.sx, 0, this.img.width * this.sizeX, this.img.height,
      this.x, this.y2, this.width, this.height
    );
    // this.boundingBox2.draw();
  }
}