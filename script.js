//constants->
let expansionRate=1;
let gameBoard=document.querySelector(".board");
let direction={x:0,  y:0};
let moveSound=new Audio('music/move.mp3');
let foodSound=new Audio('music/food.mp3');
let gameoverSound=new Audio('music/gameover.mp3');
let musicSound=new Audio('music/music.mp3');
let speed=5;
let score=document.getElementById('scoreBox');
let hiscore=document.getElementById('hiscoreBox')
let lastRenderTime=0;
let score1=0;
let snakeBody=[
    {x:10 ,y:10},
]
let food={x:3,y:2};


function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime-lastRenderTime)/1000<1/speed){
        return;
    }
    lastRenderTime=currentTime;
    musicSound.play();
    update();
    draw(gameBoard);
}
function isCollide(snaksnakeBody) {
    // If you bump into yourself 
    for (let i = 1; i < snakeBody.length; i++) {
        if(snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snakeBody[0].x >= 18 || snakeBody[0].x <=0 || snakeBody[0].y >= 18 || snakeBody[0].y <=0){
        return true;
    }
        
    return false;
}

function draw(gameBoard){
        //Display snake 
        gameBoard.innerHTML='';
        snakeBody.forEach(segment=> {
            snakeElement=document.createElement('div');
            snakeElement.style.gridRowStart=segment.y;
            snakeElement.style.gridColumnStart=segment.x;
            snakeElement.classList.add('snake');
            gameBoard.appendChild(snakeElement);
        });
//----------------------------------------------------------
        //Display food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
}
function update(){
    //collision
    if(isCollide(snakeBody)){
        musicSound.pause();
        gameoverSound.play();
        direction =  {x: 0, y: 0}; 
        alert("Game Over!! Press any key to play again!");
        snakeBody = [{x: 13, y: 15}];
        musicSound.play();
        score1=0;
        score.innerHTML = "Score: " + score1;
        
    }

    //-----------------------------------------------
    //eating food->
    if(snakeBody[0].x===food.x && snakeBody[0].y===food.y){
        score1+=1;
        if(score.innerHTML>hiscore.innerHTML){
            score.innerHTML = "Score: " + score1;
            hiscore.innerHTML = "High-Score: " + score1;
        }
        snakeBody.push({...snakeBody[snakeBody.length-1]});
        switch (snakeBody.length) {
            case 1:
                speed=5;
                break;
            case 3:
                speed=6;
                break;
            case 5:
                speed=8;
                break;
            case 8:
                speed=10;
                break;
            case 12:
                speed=12;
                break;
            case 15:
                speed=14;
                break;
        }
        food = {
            x: Math.floor(Math.random() * 17) + 1,
            y: Math.floor(Math.random() * 17) + 1
          };          
          
        foodSound.play();
    }

    //---------------------------------------------------------
    //moving snake->

    for (let i = snakeBody.length-2; i>=0; i--) {
        snakeBody[i+1]={ ...snakeBody[i] };
        //{...}-> creates a new object Spread Operator
    }
    document.addEventListener("keydown",(event)=>{
        switch (event.key) {
            case 'ArrowUp':
               if(direction.y!==0)break;
               direction={x:0,y:-1};  
               break;
            case 'ArrowDown':
                if(direction.y!==0)break;
                direction={x:0,y:1}
                break;
            case 'ArrowLeft':
                if(direction.x!==0)break;
                direction={x:-1,y:0}
                break;
            case 'ArrowRight':
                if(direction.x!==0)break;
                direction={x:1,y:0}
                break;
        }
    }) 
    snakeBody[0].x+=direction.x;
    snakeBody[0].y+=direction.y;
}
window.requestAnimationFrame(main);


















window.requestAnimationFrame(main);