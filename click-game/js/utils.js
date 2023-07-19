export  const randomNumBetween = (min, max) => {
  return Math.random()*( max - min) + min ;
}

//x,y 좌표를 받아 대각선 길이 구하는 함수
export const hypotenuse = (x,y)=> {
  return  Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
}