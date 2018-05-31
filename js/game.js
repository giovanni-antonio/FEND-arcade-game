// Enemies our player must avoid
let Enemy = function (x, y, w, h, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > WIDTH) {
        this.x = -(getRandomIntInclusive(gutter, gutter * 5)); // gutter is a global variable that sets the spacing 
    }
    // this set a random speed for every bug so watch out for speedy bugs if game is too fast lower the rate here
    let speedRate = 6; // change rate if too fast, you can set it to as low as 2
    this.x += this.speed * getRandomIntInclusive(dt, speedRate);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y, w, h) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    // Player points, lives, level played
    this.points = 0;
    this.lives = 5;
    this.levels = 1;
    this.winLevel = false;
}

Player.prototype.update = function () {
    this.advanceLevel();
}

Player.prototype.advanceLevel = function () {
    if (this.y === 0) {
        this.countLevels();
        this.countPoints();
        this.winLevel = true;
        this.resetPosition();
    } else {
        return false;
    }
}

Player.prototype.countPoints = function () {
    return this.points += 100;
}

Player.prototype.countLives = function () {
    return this.lives--;
}

Player.prototype.countLevels = function () {
    return this.levels++;
}

Player.prototype.resetGame = function () {
    this.lives = 5;
    this.points = 0;
    this.levels = 1;
}

Player.prototype.resetPosition = function () {
    this.x = (WIDTH - this.w) / 2;
    this.y = HEIGHT - this.h;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * Call direction to change player x,y position
 * @param {*} x to set x-coordinate direction -1[left], 1[right] and y-coordinate 0
 * @param {*} y to set y-coordinate direction -1[up], 1[down] and x-coordinate 0
 */
Player.prototype.direction = function (x, y) {
    this.x += x * this.w;
    this.y += y * this.h;
    // Call constrain() to set boundaries
    this.x = this.constrain(this.x, WIDTH - this.w, 0);
    this.y = this.constrain(this.y, HEIGHT - this.h, 0);
}

Player.prototype.constrain = function (target, max, min) {
    return Math.max(Math.min(target, max), min);
}

/**
 * Detect 2d collision rect w/ rect
 * Base on the mozilla.org tutorial, I adopted to check collision with other
 * objects 
 * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 * @param {*} obj 
 */
Player.prototype.collision = function (obj) {
    if (this.x < obj.x + (obj.w / 2) &&
        this.x + (this.w / 2) > obj.x &&
        this.y < obj.y + (obj.h / 2) &&
        (this.h / 2) + this.y > obj.y) {
        return true;
    } else {
        return false;
    }
}

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            this.direction(-1, 0);
            break;
        case 'up':
            this.direction(0, -1);
            // TODO: add points if player moves up.
            break;
        case 'right':
            this.direction(1, 0);
            break;
        case 'down':
            this.direction(0, 1);
            break;
        default:
            break;
    }
}
