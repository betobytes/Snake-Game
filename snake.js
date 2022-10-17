let board;
let context;
let blockSize = 20;
let cols = 30;
let rows = 20;

let appleAudio;
let gameOverAudio;

let snakeX = 0;
let snakeY = 0;
let tail = [];

let foodX = 0;
let foodY = 0;
let score = 0;

let velocityX = 1;
let velocityY = 0;
    
let gameOver = false;

window.onload = () => {
    board = document.getElementById('board');
    context = board.getContext('2d');

    //appleAudio = new AudioY('Apple_sound.mp3');
    //gameOverAudio = new Audio('game_over_sound.mp3');

    board.width = cols * blockSize;
    board.height = rows * blockSize;

    document.addEventListener('keyup', changeDirection);
    board.addEventListener('click', () => {
            gameOver = false;
            score = 0;
    })

    foodPlace();
    setInterval(update, 1000/14);//se tienen que poner los frames por second fps 1000/10
}

function update(){ 
   //limpiar pantalla;
   createRect(0, 0, board.width, board.height);

   if(gameOver){
     //pantalla Game Over
     createText('Game Over', board.width/2, board.height/2-25, 'center', 50);
     createText(`Score: ${score}`, board.width/2, board.height/2 + 25, 'center');
     createText(`Click to restart`, (cols * blockSize) / 2, board.height - 50, 'center');

    return
   }
   //imprimir puntaje(score)
   createText(`Score: ${score}`, 30, 40);

   //crear la comida 
   createRect (foodX, foodY, blockSize, blockSize, 'red');//se tenian que poner dos dimensiones de blocksize para hacer el cuadro!!

   //comer manzana (interseccion de vectores)
   if(snakeX == foodX && snakeY == foodY){
    tail.push([foodX, foodY]);
    score += 10;
    //appleAudion.play();
    foodPlace()
   }

   //snake tail
   for(let i = tail.length - 1; i > 0; i--){
        tail[i] = tail[i - 1];
   }

   if(tail.length){
    tail[0] = [snakeX, snakeY];
   }
   //snake position 
   snakeX += velocityX * blockSize;
   snakeY += velocityY * blockSize;
    //con creteRecto creamos el cuerpo de la snake    
   createRect(snakeX, snakeY, blockSize,blockSize, "cyan");

   for(let i = 0; i < tail.length; i++){
        createRect(tail[i][0], tail[i][1], blockSize, blockSize, "orange");
   }
   
   //chocar con la pared
   if(snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize){
        gameOverEvent()
   }
   //impact herself
   for(let i = 0; i < tail.length; i++){
        if(snakeX == tail[i][0] && snakeY == tail[i][1]){
            gameOverEvent()
        }
   }

}

function foodPlace(){
    foodX = Math.floor(Math.random() * cols)* blockSize;
    foodY = Math.floor(Math.random() * rows)* blockSize;

}

function changeDirection(e){
    if(e.code == "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }else if(e.code == "ArrowRight"){
        velocityX = 1;
        velocityY = 0;  
    }
}

function gameOverEvent(){
    gameOver = true;
    //gameOverAudio.play();
    tail = [];
    snakeX = 0;
    snakeY = 0;
    velocityX = 1;
    velocityY = 0;

}

function createRect(x, y, width, height, color = "black"){
    context.fillStyle = color;
    context.fillRect(x, y, width, height);

}

function createText(text, x, y, textAlign = "start", fontSize = 20){
    context.fillStyle = 'cyan';
    context.font = `${fontSize}px monospace`;
    context.textAlign = textAlign;
    context.fillText(text, x, y);

}



/*//codigo js de Snake - Game con clases
class Snake{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{x:this.x, y:this.y}]; //arreglo de longitud de cola que va desede x hasta la propiedad x del objeto
        this.rotateX = 0;
        this.rotateY = 1;
    }
    move(){
        var newRect;
         if(this.rotateX == 1){
            newRect = {
                // el arreglo se reescribe en si mismo con el valor de uno antes de su longitud
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length -1].x - this.size,
                y: this.tail[this.tail.length].y
            }
        }else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        }else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }
        this.tail.shift()//el metodo shift elimina el primer elemento del array y lo retorna
        this.tail.push(newRect)//agraga un nuevo elemento al final del array y retorna su nuevo valor 


    }
}

class Apple{
    constructor(){
        var  isTouching;
        while(true){
            isTouching = false;
            //genera aleatoriamente el valor de la manzan dentro del marco de referencia con respecto a la longitud de la serpiente 
            this.x = Math.floor(Math.random() * canvas.width/snake.size) * snake.size;
            this.y = Math.floor(Math.random() * canvas.height/snake.size) * snake.size; 

            for(var i = 0; i < snake.tail.length; i++){
                //avaluamos si existe interseccion de coordenadas de apple con snake
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true;
                } 
            }
            this.size = snake.size;//propiedad tamaño(size) de apple
            this.color = "pink";
            console.log(this.x, this.y);
            if(!isTouching){
                break;
            }

        }
    }
}


var canvas = document.getElementById("canvas");

var snake = new Snake(20, 20, 20);

var apple = new Apple();

var canvasContext = canvas.getContext('2d');

window.onload = () => {
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/15)//fotogramas por segundo
}

function show(){
    update();
    draw();
}

function update(){
    canvasContext.clearRect(0,0, canvas.width, canvas.height);
    console.log("update");
    snake.move();
    eatApple();

}

function eatApple(){
    if(snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y){
       snake.tail[snake.tail.length] = {x:apple.x, y:apple.y};
        apple = new Apple();
    }
}


function draw(){
    createRect(0,0, canvas.width, canvas.height, "block");
    createRect(0,0, canvas.width, canvas.height);
    for( var i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, 'white');
    }
    
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00ff40";
    canvasContext.fillText("Score: " + (snake.tail.length + 1), canvas.width - 120, 18);
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);

}

function createRect(x, y, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height); 

}
window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{

        if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = 1;
            snake.rotateY = 0;
        }else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0;
            snake.rotateY = -1;

        }else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1;
            snake.rotateY = 0;

        }else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0;
            snake.rotateY = 1; 
        }
    }, 1)
})
*/
