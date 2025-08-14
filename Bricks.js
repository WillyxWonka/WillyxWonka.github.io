

class Player //copy paste from chat gpt
{
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5; // Adjust speed as needed
    }

    // Method to draw the player
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Method to move the player left
    moveLeft() {
        this.x -= this.speed;
    }

    // Method to move the player right
    moveRight() {
        this.x += this.speed;
    }
}
class Brick 
{
    constructor(x, y,width, height) {
        this.x = x; //x pos
        this.y = y; // y pos
        this.width = 20; //brick width
        this.height = 10; // brick height
        this.color = 'rgba(60,20,5,1)';
        this.HP = 5; // Brick hit points
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height/1.5);
    }

    destroybrick()
    {
        //if hp == 0 delete from canvas
    }
}

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var player = new Player(canvas.width / 2 - 20, canvas.height * 0.9, 40, 8, 'rgba(0, 20, 5, 1)')

onload = GenerateBricks();
onload = GeneratePlayer();

function GenerateBricks()
{
    for (var i = 0; i < 8; i++)
    {
        var brick = new Brick(Math.random() * (canvas.width - 20), Math.random() * ((canvas.height/1.5) - 10))
        brick.draw(ctx);
        console.log(brick)
    }    

    //save into an array
}

function GeneratePlayer(){
    player.draw(ctx);
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    player.draw(ctx); // Draw players
    GenerateBricks();
}


window.addEventListener('keydown', (e)=> 
{
    switch(e.key)
    {
        case "ArrowLeft":
            document.getElementById('playerLeft').click()
            console.log("left");
            movePlayerLeft();
        return;
        case "ArrowRight":
            document.getElementById('playerRight').click()
            movePlayerRight();
        return;
    }
})

function movePlayerRight()
{
    console.log("Right");
    player.moveRight();
    updateCanvas();
}
function movePlayerLeft()
{
    console.log("Left");
    player.moveLeft();
    updateCanvas();
}

/*function GenerateBricks1()
{
    var brick = canvas.getContext('2d');

    
    var brickWidth = 20;
    var brickHeight = 10;
    var cWidth = canvas.width;
    var cHeight = canvas.height;


    for (var i = 0; i < 8; i++)
    {
        var x = Math.random() * (cWidth - brickWidth)  // x pos max
        var y = Math.random() * (cHeight/1.5 - brickHeight) // y pos max

        brick.fillStyle = 'rgba(60,20,5,1)'; // brick color
        brick.fillRect(x,  y, brickWidth, brickHeight) // brick scale and spawn location
    }
    GeneratePlayer();
}*/