//codigo js de Snake - Game
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