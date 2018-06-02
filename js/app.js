'use strict';
/**
 *
 * Author : Giovanni De andre
 * v1.0
 * 05/2018
 *
 */
// Set globals
const ROWS = 6;
const COLS = 5;
const TILE_HEIGHT = 83;
const TILE_WIDTH = 101;
const WIDTH = TILE_WIDTH * COLS;
const HEIGHT = TILE_HEIGHT * ROWS;
let isRunning = false; // is game on/off

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player((WIDTH - TILE_WIDTH) / 2, HEIGHT - TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);

const GUTTER = TILE_WIDTH * 2; // set spacing between enemies

/* TODO: game dificulty
 * Dificulty : add dificulty every 5th level completed
 * const DIFICULTY_VALUE = 5;
 * let dificulty = 5;
 * Add dificulty level to enemies stack 2 and 3
 * let incrementSpeedLevel = 0.5;
 * if (game leveld === dificulty) {
 *     dificulty += DIFICULTY_VALUE;
 *     incrementSpeedLevel++;
 * }*/

// Set enemies stack:
// [enemy1 , enemy2, enemy3] 3 per row in a grid of 3 x 4 = 12 enemies total
let enemies0 = [];
let enemies1 = [];
let enemies2 = [];
let enemies3 = [];
let allEnemies = []; // to then add all the enemies
let enemiesLenght = 3;
for (let i = 0; i < enemiesLenght; i++) {
    let x = TILE_WIDTH * 2 * i;
    enemies0[i] = new Enemy(x, TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
    enemies1[i] = new Enemy(x - TILE_WIDTH, TILE_HEIGHT * 2, TILE_WIDTH, TILE_HEIGHT);
    enemies2[i] = new Enemy(x, TILE_HEIGHT * 3, TILE_WIDTH, TILE_HEIGHT);
    enemies3[i] = new Enemy(x - TILE_WIDTH, TILE_HEIGHT * 4, TILE_WIDTH, TILE_HEIGHT);
}

allEnemies.push(...enemies0, ...enemies1, ...enemies2, ...enemies3);

/**
 * Game UI: here is handle all the user interface components to play the game.
 * Starts with the timer and then the game stages, scores and events and controls.
 */

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

let gameTimeID = null; // to track time

let sec = 0, // seconds
    min = 0, // minutes
    hour = 0; // hours

// Call to initialize timer
function timer() {
    // Display time
    let timeEl = document.querySelectorAll('.timer');
    let timeToText = `${hour < 10 ? '0' + hour : hour}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0'+ sec : sec}`;
    timeEl[0].textContent = timeToText;
    timeEl[1].textContent = timeToText;

    if (sec++ === 59) {
        sec = 0;
        min++;
        if (min === 59) {
            min = 0;
            hour++;
            if (hour === 24) {
                hour = 0;
            }
        }
    }

    gameTimeID = setTimeout(() => {
        timer();
    }, 1000);

}
/**
 *
 * @param {*} el pass element to remove from screen
 */
function removeModal(el) {
    document.querySelector('.modal').classList.remove('show');
    document.querySelector(el).classList.remove('show');
}
/**
 *
 * @param {*} el pass element to show in screen
 */
function showModal(el) {
    document.querySelector('.modal').classList.add('show');
    document.querySelector(el).classList.add('show');
}
// Call to play start playing game
function playGame() {
    removeModal('.modal .play-screen');
    isRunning = true;
    timer();
}
// Call to display winner stage
function displayWinLevel() {
    showModal('.modal .play-level');
}
// Call to display game over stage
function displayGameOver() {
    showModal('.modal .game-over');
}
// Call to update all player progress stats
function updateGameStats() {
    let pointsEl = document.querySelectorAll('.points');
    let levelsEl = document.querySelectorAll('.levels');
    let livesEl = document.querySelector('.lives');
    // if game running update game scores
    if (isRunning) {
        pointsEl[0].textContent = player.points;
        pointsEl[1].textContent = player.points;
        levelsEl[0].textContent = player.levels;
        levelsEl[1].textContent = player.levels;
        levelsEl[2].textContent = player.levels;
        livesEl.textContent = player.lives;
    }
}

// Start playing
document.querySelector('.play-screen button').addEventListener('click', playGame, false);
// Play next level
document.querySelector('.play-level button').addEventListener('click', function () {
    removeModal('.modal .play-level');
    isRunning = true;
    timer();
});
// Quits game
document.getElementById('quitGame').addEventListener('click', function () {
    removeModal('.modal .play-level');
    showModal('.modal .play-screen');
    player.resetGame();
    isRunning = false;
});
// Go back home / splash screen
document.querySelector('.game-over button').addEventListener('click', function () {
    removeModal('.modal .game-over');
    showModal('.modal .play-screen');
});

/**
 * HELPERS
 */
/**
 * To get a random integer tutorial from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {*} min pass the lowest number to target
 * @param {*} max pass the highest number to target
 */

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}