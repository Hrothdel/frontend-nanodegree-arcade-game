const cellHeight = 83,
      cellWidth = 101,
      characterOffestY = 25,
      enemyOffestY = 25,
      maxEnemySpeed = 500,
      minEnemySpeed = 200,
      maxEnemyNumber = 4,
      minEnemySpawnTime = 200,
      maxEnemySpawnTime = 1000,
      rightMargin = cellWidth * 5;

// Enemies our player must avoid
class Enemy{
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    constructor(){
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.initialize();
    };

    initialize(){
        this.x = -100;
        this.y = 1 + Math.floor(Math.random() * 3);

        this.speed = minEnemySpeed + Math.random() * (maxEnemySpeed - minEnemySpeed);
        this.willSpawn = false;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.

        this.x += this.speed * dt;

        if(this.x > rightMargin && !this.willSpawn){
                setTimeout(function () {this.initialize();}.bind(this), getSpawnTime());
                this.willSpawn = true;
        }
    };

    // Draw the enemy on the screen, required method for game
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y * cellHeight - enemyOffestY);
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player{
    constructor (spriteUrl){
        Resources.load(spriteUrl);
        this.sprite = spriteUrl;

        this.x = 2;
        this.y = 5;

        this.left = true; this.right = true;
        this.up = true; this.down = true;
    };

    handleInput (key){
        switch (key){
            case 'left':
                if(this.left && this.x > 0){
                    this.x--;
                    this.left = false;
                }
                break;
            case 'right':
                if(this.right && this.x < 4){
                    this.x++;
                    this.right = false;
                }
                break;
            case 'up':
                if(this.up && this.y > 0){
                    this.y--;
                    this.up = false;
                }
                break;
            case 'down':
                if(this.down && this.y < 5){
                    this.y++;
                    this.down = false;
                }
                break;
        };
    };

    unlockDirection(key){
        switch(key){
            case 'left':
                this.left = true;
                break;
            case 'right':
                this.right = true;
                break;
            case 'up':
                this.up = true;
                break;
            case 'down':
                this.down = true;
                break;
        }
    };

    update(){};

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x * cellWidth, this.y * cellHeight - characterOffestY);
    };
};

let getSpawnTime = function (){
    return minEnemySpawnTime + Math.random() * maxEnemySpawnTime;
}

let spawnEnemy = function () {
    if(allEnemies.length < maxEnemyNumber){
        allEnemies.push(new Enemy);
    }

    setTimeout(spawnEnemy, getSpawnTime());
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [], player = new Player('images/char-boy.png');

// allEnemies.push(new Enemy);
spawnEnemy();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.unlockDirection(allowedKeys[e.keyCode]);
});
