import '../style/containers/MiniGame.css'
import bg1 from '../assets/minigame/bg1.png'
import bg2 from '../assets/minigame/bg2.png'
import bg3 from '../assets/minigame/bg3.png'

import bird from '../assets/minigame/bird.png'
import blueBird from '../assets/minigame/blue-bird.png'
import coin from '../assets/minigame/coin.png'
import play from '../assets/minigame/play.svg'
import replay from '../assets/minigame/replay.svg'
import title from '../assets/minigame/title2.png'
import wall from '../assets/minigame/Wall.png'
import gsap from 'gsap';


import { useEffect, useRef, useState } from 'react'
import { randomNumBetween } from '../utils/utils'

const canvasWidth = 1024;
const canvasHeight = 768;
const fps = 70;
const interval = 1000 / fps;

const MiniGame = () => {

  const canvasRef = useRef(null); 
  let gameHandler; 
  const [handlerStatus, setHandlerState] = useState('READY');
  useEffect(()=> {
    if(gameHandler !== undefined) //여기부터
      switch (handlerStatus){
        case 'READY': gameHandler.showReadyScreen(); break;
        case 'FINISH': gameHandler.showFinishScreen(); break;
      }
  }, [handlerStatus])

  useEffect(()=>{
    let frameId;
    const canvas = canvasRef.current;
    const cavasParnet = canvas.parentNode;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.style.width = canvasWidth + 'px';
    canvas.style.height = canvasHeight + 'px';
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const backbroundImageSrcs = [bg1,bg2, bg3];
    let backgroundLoaded = [];

    let walls = []
    let backgrounds = [];
    let coins = [];
    let score;
    let player;
    function resize(){
      //background image setting 
      preloadImages(backbroundImageSrcs, backgroundLoaded).then(()=>{
        backgrounds.push(createBackground({img :backgroundLoaded[2], speed: -1}))  
        backgrounds.push(createBackground({img :backgroundLoaded[1], speed: -2}))  
        backgrounds.push(createBackground({img :backgroundLoaded[0], speed: -4}))  
      });
      gameHandler = setGameHandler();
    }

    const setGameHandler = () => {
      setHandlerState(current=> current = "READY")

      const titleImg = new Image();
      const playImg = new Image();
      const replayImg = new Image();
      // const coinImg = new Image();
      const status = handlerStatus;
      const readyScreen = document.querySelector('.ready-screen');
      const finishScreen = document.querySelector('.finish-screen');
      const distanceText = finishScreen.querySelector('.distance');
      const coinText = finishScreen.querySelector('.coin');


      titleImg.src = title;
      playImg.src = play;
      replayImg.src = replay;
      // coinImg.src = coin;

      readyScreen.appendChild(titleImg);
      readyScreen.appendChild(playImg);
      // const initHandler = () => {

      // }


      const titleImgae = readyScreen.childNodes[0]
      titleImgae.setAttribute('className', "title-img");

      const playBtn = readyScreen.childNodes[1]
      playBtn.setAttribute('className', "play-img");
      const hideReadyScreen=()=>{
        gsap.to(readyScreen,{
          opacity: 0, pointerEvents: 'none', duration: 0.3, onComplete: () => {
            setHandlerState(current=> current = "PLAYING")
          }
        })
      }
      playBtn.addEventListener('click', () => {
        hideReadyScreen();
      })

     
      finishScreen.appendChild(replayImg);


      const replayBtn = finishScreen.childNodes[2];
      // console.log
      replayBtn.setAttribute('className','replay-img');
      const hidieFinishScreen = () => {
        gsap.fromTo(finishScreen, {opacity: 1}, {
          opacity: 0, pointerEvents: 'none', duration: 0.1
        });
        setHandlerState(current=> current = "PLAYING")
        reset();
      }
      replayBtn.addEventListener('click', () => {
        hidieFinishScreen();
      });
      const showReadyScreen =()=>{
        gsap.to(titleImgae,{
          scale: 1, rotation: 720, opacity: 1, duration: 0.5
        })
        gsap.to(playBtn, {
          scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5
          //gsap Ease option 중 하나, elastic.easeOut.config(값이 변화되는 크기, 바운스되는 정도)
        });
      }
      const showFinishScreen=()=>{
        // distanceText.innerText = Math.floor(score.distCount) + 'm';
        // coinText.innerText = score.coinCount + ' coin';
        gsap.fromTo(finishScreen,{opacity: 0},{
          opacity: 1, duration: 0.5, pointerEvents: 'all'
        });
    
        gsap.fromTo(distanceText, {opacity: 0, scale: 0}, {
          opacity: 1, scale: 1, duration: 0.5, delay: 1
        });
    
        gsap.fromTo(coinText, {opacity: 0,  scale: 0},{
          opacity: 1, scale: 1, duration: 0.5, delay: 1.1
        });
    
        gsap.fromTo(replayBtn, {opacity: 0, scale: 0}, {
          opacity: 1, scale: 1, rotation: 720, duration: 0.5, delay: 1.3
        });
      }
      const handler = {
        status : status,
        showReadyScreen: ()=> showReadyScreen(),
        showFinishScreen: ()=> showFinishScreen()
      }

      return handler; 
    }




    const reset = () => {
      walls.push(createWall({type: 'SMALL'}));
      player = createPlayer(Math.random() > 0.3 ? 'blue-bird' : 'bird');
      coins = [];
      score = [];
    }

    const createBoundingBox = (x, y, width, height) => {
      const boundX = x;
      const boundY = y;
      const boundW = width;
      const boundH = height;
      const boundingBox = {
          x : boundX,
          y : boundY,
          width : boundW,
          height : boundH,
          color : `rgba(255, 0, 0, 0.3)`,
          isColliding: (target) => {
            return (target.x + target.width >= boundX &&
              target.x <= boundX + boundW && 
              target.y + target.height >= boundY &&
              target.y <= boundY + boundH)
          }
      }
      return boundingBox;
    }

    const createBackground = (config) => {
      const image = config.img;
      const backHeight = canvasHeight;
      const backWidth = canvasHeight * (image.width / image.height);
      const background = {
        img : image,
        height : backHeight,
        width: backWidth,
        leftPos: {x: 0, y: 0},
        rightPos: {x: backWidth -4, y: 0},
        speed: config.speed
      }
      return background;
    }

    const createPlayer = (type) => {
      const img = new Image();
      const _x = canvasWidth * 0.1;
      const _y = canvasHeight * 0.5;
      const _width = 130;
      const _type = type;
      let height;
      let boundingBox;
      let imgCnt;
      let updateY;
      switch(_type){
        case 'blue-bird':
          img.src = blueBird
          height = _width * (33 / 32);
          boundingBox = createBoundingBox(_x + 1, _y + 20, _width - 9, height - 26 ); // 해당 상수는 img siz가 딱 그림에 맞지 않기 때문에 bound 조절 
          imgCnt = 9
          updateY= 20;
          break;
        case 'bird':
          img.src = bird
          height = _width * (96/140);
          boundingBox = createBoundingBox(_x + 10, _y + 16, _width - 20, height - 20 ); // 해당 상수는 img siz가 딱 그림에 맞지 않기 때문에 bound 조절 
          imgCnt = 15;
          updateY= 16;
          break;
      }
  
      let frameX = 0; // 몇번째 IMG
      let counter = 0;
      let vy = -10; //속도
      const gravity = 0.2;

      canvas.addEventListener("click", ()=> {
        player.frameX = 2;
        player.vy += -4;
      });
  
      return {
        img: img,
        x: _x,
        y: _y,
        vy: vy,
        width: _width,
        height: height,
        counter: counter,
        imgCnt :imgCnt,
        updateY: updateY,
        boundingBox: boundingBox,
        frameX: frameX,
        gravity: gravity,
      }
  
    }

    const drawBackground = () => {
      backgrounds.forEach((background, index) => {
        // if(background.leftPos.x + background.width <0){
        //   background.leftPos.x = background.rightPos.x + background.width -4
        // }
    
        // if(background.rightPos.x + background.width <0){
        //   background.rightPos.x = background.leftPos.x + background.width -4
        // }
        
        // background.leftPos.x += background.speed;
        // background.rightPos.x += background.speed;
        // background.update();
        ctx.drawImage(
          background.img, 
          background.leftPos.x, background.leftPos.y, background.width, background.height, 
        )
        ctx.drawImage(
          background.img, 
          background.rightPos.x, background.rightPos.y, background.width, background.height, 
        )
        // background.draw();
      })
    }

    const createWall = (config) => {
      const img = new Image();
      img.src = wall;
      // img.onload(()=> {
        
      // });
      const type = config.type // 'BIG', 'SMALL'
      let sizeX;
      let sidex;

      switch(type){
        case 'BIG':
          sizeX = 18 / 30;
          sidex = img.width * (9 / 30);
          break;
        case 'SMALL':
          sizeX = 9 / 30;
          sidex = img.width * (0 / 30);
          break;
  
      }
      let width = canvasHeight * sizeX;
      let height = canvasHeight;
  
      let gapY = randomNumBetween(canvasHeight * 0.2 , canvasHeight * 0.35 ) // 장애물 간격=화면크기의 10%~20%
      // gapY = height * 0.4 //test
      let x = canvasWidth;
      
      // 장애물 위치
      // -this.height 최소
      // App.height - this.gapY - this.height 최대
      const y1 = - height + randomNumBetween(30, canvasHeight - gapY -30);
      const y2 = y1 + height + gapY;
  
  
      const boundingBox1 = createBoundingBox(x + 30, y1 + 30, width - 60, height - 60);
      const boundingBox2 = createBoundingBox(x + 30, y2 + 30, width - 60, height - 60);
  
      const generatedNext = false;
      let gapNextX = canvasWidth * randomNumBetween(0.6, 0.75); // 벽 나오는 속도
  
      // gapNextX = canvasWidth * 0.4;//test 용
      return {
        img: img,
        x: x,
        y1: y1,
        y2: y2,
        gapY: gapY,
        vx : -6,
        sx: sidex,
        sizeX:sizeX,
        width: width,
        height: height,
        boundingBox1: boundingBox1,
        boundingBox2: boundingBox2,
        generatedNext: generatedNext,
        gapNextX: gapNextX,
      }
    }

    const preloadImages = (imageArray, endArray) =>{ // image load 한번만
      return new Promise((resolve, reject)=>{
        let loaded = 0;
        imageArray.forEach(src =>{
          const img = new Image();
          
          img.src = src;
          img.onload = ()=>{
            loaded += 1;
            endArray.push(img);
            if(loaded === imageArray.length) return resolve();
          }
        })
      })
    }

    const render = () => {
      let now, delta;
      let then = Date.now();

      
      const frame = ()=> {
        frameId =  requestAnimationFrame(frame);
      
        now = Date.now();
        delta = now - then;
      
        if(delta < interval) return ;

        if(handlerStatus !== 'PLAYING') return;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      
      //Background
      // drawBackground();

      //Wall
        for( let i = walls.length - 1 ; i >= 0; i--){
          walls[i].x +=  walls[i].vx
          boundingBox1.x = walls[i].x + 30;
          boundingBox2.x = walls[i].x + 30;
          ctx.drawImage(
            walls[i].img,
            walls[i].sx, 0, walls[i].img.width * walls[i].sizeX, walls[i].img.height,
            walls[i].x, walls[i].y1, walls[i].width, walls[i].height
          )
          ctx.drawImage(
            walls[i].img,
            walls[i].sx, 0, walls[i].img.width * walls[i].sizeX, walls[i].img.height,
            walls[i].x, walls[i].y2, walls[i].width, walls[i].height
          );
          // walls[i].update();
          // walls[i].draw();

          //장애물 삭제
          if(walls[i].x + walls[i].width < 0) {  walls.shift(); continue}
          console.log("walls[i]", walls[i]);

          //장애물 생성
          if(!walls[i].generatedNext && 
            walls[i].x + walls[i].width < walls[i].gapNextX){
            walls[i].generatedNext = true;
            const newWall = createWall({type: Math.random() > 0.3 ? 'SMALL' : 'BIG' })
            walls.push(newWall)
            
            if(Math.random() < 0.5 ){
              const x = newWall.x + newWall.width / 2;
              const y = newWall.y2 - newWall.gapY / 2;
              // this.coins.push(new Coin(x, y, newWall.vx))
            }
          
          }

          //player과 충돌
          if(walls[i].isColliding(player.boundingBox)){
            setHandlerState(current => current = 'FINISH');
            break;
          }
        }

      //player
      if(++player.counter % 2 === 0)
        player.frameX = ++ player.frameX % player.imgCnt;

      player.vy += player.gravity;
      player.y += player.vy;
      player.boundingBox.y = player.y + player.updateY;

      ctx.drawImage(
        player.img,
        player.img.width / player.imgCnt * player.frameX, 0, player.img.width / player.imgCnt, player.img.height,
        player.x, player.y, player.width, player.height
      );
      if(player.y >= canvasHeight || player.y + player.height <= 0){
        setHandlerState(current => current = 'FINISH');
      }

      // //Coin
      // for( let i = this.coins.length -1 ; i >= 0; i--){
      //   this.coins[i].update();
      //   this.coins[i].draw();

      //   if(this.coins[i].x + this.coins[i].width < 0){
      //     this.coins.shift();
      //     continue;
      //   }

      //   if(this.coins[i].boundingBox.isColliding(this.player.boundingBox)){
      //     this.coins.splice(i ,1);
      //     this.score.coinCount++;
      //   }
      // }
      
      // this.score.update();
      // this.score.draw();

      then = now - (delta % interval);
      }
      requestAnimationFrame(frame);
    }

      resize();
      reset();
      render();
      return () => {
        cancelAnimationFrame(frameId);
      }

    },[])



  return (
      <div className="minigame-wrapper">
        <div className="minigame">
          <section className="ready-screen">
           
          </section>

          <section className="finish-screen">
            <div className="distance">0m</div>
            <div className="coin">0coin</div>
           
          </section>
        </div> 

        <canvas ref={canvasRef}></canvas>
      </div>
  )
}

export default MiniGame;