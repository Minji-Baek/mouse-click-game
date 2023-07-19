var p=Object.defineProperty;var f=(n,t,r)=>t in n?p(n,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[t]=r;var c=(n,t,r)=>(f(n,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const h of document.querySelectorAll('link[rel="modulepreload"]'))o(h);new MutationObserver(h=>{for(const i of h)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(h){const i={};return h.integrity&&(i.integrity=h.integrity),h.referrerPolicy&&(i.referrerPolicy=h.referrerPolicy),h.crossOrigin==="use-credentials"?i.credentials="include":h.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(h){if(h.ep)return;h.ep=!0;const i=r(h);fetch(h.href,i)}})();class l{constructor(t){this.img=t.img,this.height=s.height,this.width=s.height*(this.img.width/this.img.height),this.leftPos={x:0,y:0},this.rightPos={x:this.width-4,y:0},this.speed=t.speed}update(){this.leftPos.x+this.width<0&&(this.leftPos.x=this.rightPos.x+this.width-4),this.rightPos.x+this.width<0&&(this.rightPos.x=this.leftPos.x+this.width-4),this.leftPos.x+=this.speed,this.rightPos.x+=this.speed}draw(){s.ctx.drawImage(this.img,this.leftPos.x,this.leftPos.y,this.width,this.height),s.ctx.drawImage(this.img,this.rightPos.x,this.rightPos.y,this.width,this.height)}}class d{constructor(t,r,o,h){this.x=t,this.y=r,this.width=o,this.height=h,this.color="rgba(255, 0, 0, 0.3)"}isColliding(t){return t.x+t.width>=this.x&&t.x<=this.x+this.width&&t.y+t.height>=this.y&&t.y<=this.y+this.height}draw(){s.ctx.fillStyle=this.color,s.ctx.fillRect(this.x,this.y,this.width,this.height)}}class w{constructor(t,r,o){this.img=document.querySelector("#coin-img"),this.width=50,this.height=50,this.x=t-this.width/2,this.y=r-this.height/2,this.counter=0,this.frameX=0,this.vx=o,this.boundingBox=new d(this.x,this.y,this.width,this.height)}update(){++this.counter%5===0&&(this.frameX=++this.frameX%10),this.x+=this.vx,this.boundingBox.x=this.x}draw(){s.ctx.drawImage(this.img,this.img.width/10*this.frameX,0,this.img.width/10,this.img.height,this.x,this.y,this.width,this.height)}}class S{constructor(t){this.app=t,this._status="READY",this.init()}get status(){return this._status}set status(t){switch(this._status=t,t){case"READY":this.showReadyScreen();break;case"FINISH":this.showFinishScreen();break}}init(){this.readyScreen=document.querySelector(".ready-screen"),this.titleImgae=this.readyScreen.querySelector(".title-img"),this.playBtn=this.readyScreen.querySelector(".play-img"),this.playBtn.addEventListener("click",()=>{this.hideReadyScreen()}),this.finishScreen=document.querySelector(".finish-screen"),this.distanceText=this.finishScreen.querySelector(".distance"),this.coinText=this.finishScreen.querySelector(".coin"),this.replayBtn=this.finishScreen.querySelector(".replay-img"),this.replayBtn.addEventListener("click",()=>{this.hidieFinishScreen()}),this.status="READY"}showReadyScreen(){gsap.to(this.titleImgae,{scale:1,rotation:720,opacity:1,duration:.5}),gsap.to(this.playBtn,{scale:1,duration:1,ease:Elastic.easeOut.config(2,.5),delay:.5})}hideReadyScreen(){gsap.to(this.readyScreen,{opacity:0,pointerEvents:"none",duration:.3,onComplete:()=>{this.status="PLAYING"}})}showFinishScreen(){this.distanceText.innerText=Math.floor(this.app.score.distCount)+"m",this.coinText.innerText=this.app.score.coinCount+" coin",gsap.fromTo(this.finishScreen,{opacity:0},{opacity:1,duration:.5,pointerEvents:"all"}),gsap.fromTo(this.distanceText,{opacity:0,scale:0},{opacity:1,scale:1,duration:.5,delay:1}),gsap.fromTo(this.coinText,{opacity:0,scale:0},{opacity:1,scale:1,duration:.5,delay:1.1}),gsap.fromTo(this.replayBtn,{opacity:0,scale:0},{opacity:1,scale:1,rotation:720,duration:.5,delay:1.3})}hidieFinishScreen(){gsap.fromTo(this.finishScreen,{opacity:1},{opacity:0,pointerEvents:"none",duration:.1}),this.status="PLAYING",this.app.reset()}}class b{constructor(t){switch(this.x=s.width*.1,this.y=s.height*.5,this.width=130,this.type=t,this.type){case"blue-bird":this.img=document.querySelector("#blue-bird-img"),this.height=this.width*(33/32),this.boundingBox=new d(this.x+1,this.y+20,this.width-9,this.height-26),this.imgCnt=9,this.updateY=20;break;case"bird":this.img=document.querySelector("#bird-img"),this.height=this.width*(96/140),this.boundingBox=new d(this.x+10,this.y+16,this.width-20,this.height-20),this.imgCnt=15,this.updateY=16;break}this.frameX=0,this.counter=0,this.vy=-10,this.gravity=.2,s.canvas.addEventListener("click",()=>{this.frameX=2,this.vy+=-4})}update(){++this.counter%2===0&&(this.frameX=++this.frameX%this.imgCnt),this.vy+=this.gravity,this.y+=this.vy,this.boundingBox.y=this.y+this.updateY}draw(){s.ctx.drawImage(this.img,this.img.width/this.imgCnt*this.frameX,0,this.img.width/this.imgCnt,this.img.height,this.x,this.y,this.width,this.height)}}class v{constructor(){this.coin=new w(s.width-50,50,0),this.coin.frameX=9,this.distCount=0,this.coinCount=0}update(){this.distCount+=.015}draw(){this.coin.draw(),s.ctx.font="55px Jua",s.ctx.fillStyle="#f1f1f1",s.ctx.textAlign="right",s.ctx.fillText(this.coinCount,s.width-90,69),s.ctx.textAlign="left",s.ctx.fillText(Math.floor(this.distCount)+"m",25,69)}}const g=(n,t)=>Math.random()*(t-n)+n;class u{constructor(t){switch(this.img=document.querySelector("#wall-img"),this.type=t.type,this.type){case"BIG":this.sizeX=18/30,this.sx=this.img.width*(9/30);break;case"SMALL":this.sizeX=9/30,this.sx=this.img.width*(0/30);break}this.width=s.height*this.sizeX,this.height=s.height,this.gapY=g(s.height*.2,s.height*.35),this.x=s.width,this.y1=-this.height+g(30,s.height-this.gapY-30),this.y2=this.y1+this.height+this.gapY,this.vx=-6,this.boundingBox1=new d(this.x+30,this.y1+30,this.width-60,this.height-60),this.boundingBox2=new d(this.x+30,this.y2+30,this.width-60,this.height-60),this.generatedNext=!1,this.gapNextX=s.width*g(.4,.6)}get isOutside(){return this.x+this.width<0}get canGenerateNext(){return!this.generatedNext&&this.x+this.width<this.gapNextX}isColliding(t){return this.boundingBox1.isColliding(t)||this.boundingBox2.isColliding(t)}update(){this.x+=this.vx,this.boundingBox1.x=this.x+30,this.boundingBox2.x=this.x+30}draw(){s.ctx.drawImage(this.img,this.sx,0,this.img.width*this.sizeX,this.img.height,this.x,this.y1,this.width,this.height),s.ctx.drawImage(this.img,this.sx,0,this.img.width*this.sizeX,this.img.height,this.x,this.y2,this.width,this.height)}}const e=class e{constructor(){this.backgrounds=[new l({img:document.querySelector("#bg3-img"),speed:-1}),new l({img:document.querySelector("#bg2-img"),speed:-2}),new l({img:document.querySelector("#bg1-img"),speed:-4})],this.gameHandler=new S(this),this.reset()}reset(){this.walls=[new u({type:"SMALL"})],this.player=new b(Math.random()>.3?"blue-bird":"bird"),this.coins=[],this.score=new v}init(){e.canvas.width=e.width*e.dpr,e.canvas.height=e.height*e.dpr,e.ctx.scale(e.dpr,e.dpr),this.backgrounds.forEach((t,r)=>{t.draw()})}render(){let t,r,o=Date.now();const h=()=>{if(requestAnimationFrame(h),t=Date.now(),r=t-o,!(r<e.interval)&&this.gameHandler.status==="PLAYING"){e.ctx.clearRect(0,0,e.width,e.height),this.backgrounds.forEach((i,a)=>{i.update(),i.draw()});for(let i=this.walls.length-1;i>=0;i--){if(this.walls[i].update(),this.walls[i].draw(),this.walls[i].isOutside){this.walls.shift();continue}if(this.walls[i].canGenerateNext){this.walls[i].generatedNext=!0;const a=new u({type:Math.random()>.3?"SMALL":"BIG"});if(this.walls.push(a),Math.random()<.5){const x=a.x+a.width/2,m=a.y2-a.gapY/2;this.coins.push(new w(x,m,a.vx))}}if(this.walls[i].isColliding(this.player.boundingBox)){this.gameHandler.status="FINISH";break}}this.player.update(),this.player.draw(),(this.player.y>=e.height||this.player.y+this.player.height<=0)&&(this.gameHandler.status="FINISH");for(let i=this.coins.length-1;i>=0;i--){if(this.coins[i].update(),this.coins[i].draw(),this.coins[i].x+this.coins[i].width<0){this.coins.shift();continue}this.coins[i].boundingBox.isColliding(this.player.boundingBox)&&(this.coins.splice(i,1),this.score.coinCount++)}this.score.update(),this.score.draw(),o=t-r%e.interval}};requestAnimationFrame(h)}};c(e,"canvas",document.querySelector("canvas")),c(e,"ctx",e.canvas.getContext("2d")),c(e,"dpr",devicePixelRatio>1?2:1),c(e,"fps",70),c(e,"interval",1e3/e.fps),c(e,"width",1024),c(e,"height",768);let s=e;const y=new s;window.addEventListener("load",()=>{y.init(),y.render()});
