const DEAFAUL_SNAKE_POSITION = [41,21,1];
let snake = DEAFAUL_SNAKE_POSITION.slice(0);
let fruitPosition;
let currentScore = 0;
const SNAKE_DIRECTIONS = {
    NONE: 'NONE',
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
};
let currentSnakeDirection = SNAKE_DIRECTIONS.BOTTOM; 
let pressedDirection = SNAKE_DIRECTIONS.BOTTOM;
let runGame; 

starNewGame();

function changeSnakeDirection(pressedButton) {
    if (pressedButton.code === "KeyS" && currentSnakeDirection !== SNAKE_DIRECTIONS.TOP) pressedDirection = SNAKE_DIRECTIONS.BOTTOM; 
    if (pressedButton.code === "KeyD" && currentSnakeDirection !== SNAKE_DIRECTIONS.LEFT) pressedDirection = SNAKE_DIRECTIONS.RIGHT; 
    if (pressedButton.code === "KeyW" && currentSnakeDirection !== SNAKE_DIRECTIONS.BOTTOM) pressedDirection = SNAKE_DIRECTIONS.TOP; 
    if (pressedButton.code === "KeyA" && currentSnakeDirection !== SNAKE_DIRECTIONS.RIGHT) pressedDirection = SNAKE_DIRECTIONS.LEFT; 
    }

function createField(counter){
        if (counter === 0) return
        let square = document.createElement("div");
        (snake.includes(counter)) ? square.className = "snake_body" : square.className= "field_Square";
        if (counter === snake[0]) square.innerHTML="^_^";
        if (counter === fruitPosition) square.innerHTML = "&#127822;";
        mainFrame.prepend(square);
        createField(counter-1);
        currentSnakeDirection=pressedDirection;
    }

function changeSnakePosition(){
    mainFrame.innerHTML = "";
    let snakeTail = snake.slice(0);

if (currentSnakeDirection === SNAKE_DIRECTIONS.TOP) {
    snake=snake.map((item, index)=>{
        if (index === 0 ) {
            if (item-20 < 0) {return item+380
        } else {
            return item-20 }}
        return snakeTail[index-1];       
    }) 
}

if (currentSnakeDirection === SNAKE_DIRECTIONS.BOTTOM) {
    snake=snake.map((item, index)=>{
        if (index === 0 ) {
            if (item+20 > 400) {return item-380
        } else {
            return item+20 }}
        return snakeTail[index-1];       
    }) 
}

if (currentSnakeDirection === SNAKE_DIRECTIONS.RIGHT) {
    snake=snake.map((item, index)=>{
        if (index === 0) {
            if (item%20 === 0) {return item-19
        } else {
            return item+1 }}
        return snakeTail[index-1];       
    }) 
}

if (currentSnakeDirection === SNAKE_DIRECTIONS.LEFT) {
    snake=snake.map((item, index)=>{
        if (index === 0) {
            if ((item+19)%20 === 0) {return item+19
        } else {
            return item-1 }}
        return snakeTail[index-1];       
    }) 
}

if (snake[0] === fruitPosition) makeSnakeLonger(snakeTail);
if (snake.slice(1).includes(snake[0])) gameOver();

createField(400);
}

function makeSnakeLonger(snakeTail){
    snake.push(snakeTail[snakeTail.length]);
    createFruit();
    showScore(++currentScore);
}

function createFruit() {
    fruitPosition= Math.floor(Math.random() * 399)+1;
    if (snake.includes(fruitPosition)) return createFruit()
  }

function showScore(score){
    scoreBar.innerHTML="";
    let scoreOut = document.createElement("p");
    scoreOut.innerHTML=`Score: ${score}`;
    scoreBar.append(scoreOut);
}

function gameOver(){
   pauseGame();
   alert(`GAME OVER!!\nYou ate ${currentScore} fruits\nPress Ok to play again`);
   starNewGame();
}

function starNewGame(){ 
    snake = DEAFAUL_SNAKE_POSITION.slice(0);
    currentSnakeDirection = SNAKE_DIRECTIONS.BOTTOM; 
    pressedDirection = SNAKE_DIRECTIONS.BOTTOM;
    createFruit();
    createField(400);
    showScore(currentScore=0);
    runGame = setInterval(changeSnakePosition, 100);
    document.addEventListener('keydown', changeSnakeDirection);
}

function pauseGame(){
    document.removeEventListener('keydown', changeSnakeDirection);
    currentSnakeDirection = SNAKE_DIRECTIONS.NONE;  
    clearInterval(runGame);

}