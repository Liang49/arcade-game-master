let Game = function() {};
// show character modal and removes it on click
Game.prototype.showStartGame = function() {
startScreen.classList.add('show');
const removeModal = document.querySelector('.modal-content');
removeModal.addEventListener('click', function() {
startScreen.classList.remove('show');
});
};
// Enemies our player must avoid
var Enemy = function(x, y , speed) {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
this.x = x;
this.y = y;
this.speed = speed;
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
this.x += this.speed * dt;
// create the enemy continuously when enemy goes off map
if (this.x > 500) {
this.x = -100;
this.speed = Math.floor((Math.random() * 300) + 100);
}
// if player and enemy collide return player to original position
if (player.x < this.x + 60 &&
player.x + 40 > this.x &&
player.y < this.y + 30 &&
45 + player.y > this.y) {
player.lives -= 1;
player.x = 200;
player.y = 393;
}
// when life is less than 0 refresh the page with time delay
if (player.lives < 0) {
setTimeout(function(){location.reload()}, 1000);
}
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
this.x = 200;
this.y = 393;
this.speed = speed;
this.sprite = 'images/char-princess-girl.png';
this.lives = 3; 
this.heart = 'images/Heart.png';
this.score = 0;
};
// select character depending who is clicked
Player.prototype.changeCharacter = function(character) {
this.sprite = 'images/' + character + '.png';
};
// load the heart as lives and the score table
Player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
for (var i = 0; i < this.lives; i++) {
ctx.drawImage(Resources.get(this.heart), 420 - i*50, 30, 80, 80); // set the position of the heart to x and y and change the width and height
}
ctx.font = 'bold 20px Arial';
ctx.fillStyle = 'yellow';
ctx.fillText('SCORE: ' + this.score, 10, 80); 
};
Player.prototype.update = function() {
// Prevent player from moving beyond canvas wall boundaries
if (this.y >= 393) {
this.y = 393;
}
if (this.x > 400) {
this.x = 400;
}
if (this.x < 0) {
this.x = 0; 
}
// move player to original position when reaching the end and increase score by 1
if (this.y <= -5) {
player.x = 200;
player.y = 393;
player.score += 1;  
}
};
// allows us to control our character using the arrow keys
Player.prototype.handleInput = function(key) {
switch (key) {
case 'left':
this.x -= 100;
break;
case 'up':
this.y -= 80;
break;
case 'right':
this.x += 100;
break;
case 'down':
this.y += 80;
break;
}
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
// Position "y" where the enemies will are created
var enemyPosition = [60, 60, 142, 225];
var player = new Player();
var enemy;
enemyPosition.forEach(function(posY) {
enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 300));
allEnemies.push(enemy);
});
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
var allowedKeys = {
37: 'left',
38: 'up',
39: 'right',
40: 'down'
};
player.handleInput(allowedKeys[e.keyCode]);
});
const myGame = new Game();
// load the modal when the window load
window.onload = function() {
myGame.showStartGame();
}








    