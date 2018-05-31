var rows = 6;
var cols = 5;
var GRID_HEIGHT = 83;
var GRID_WIDTH = 101;
var WIDTH = GRID_WIDTH * cols;
var HEIGHT = GRID_HEIGHT * rows;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player((WIDTH - GRID_WIDTH) / 2, HEIGHT - GRID_HEIGHT, GRID_WIDTH, GRID_HEIGHT);
// allEnemies: list of enemies per lane starts with 2 on each at a different spped.
var gutter = GRID_WIDTH * 2; // set spacing between enemies

// Dificulty : add dificulty every 5th level completed
var DIFICULTY = 5;
var addDificulty = 5; // Add dificulty level to lane 2 and 3
var incrementSpeedLevel = 0.5;

let allEnemies = [
    new Lane(GRID_HEIGHT, 3, gutter, 1 + incrementSpeedLevel),
    new Lane(2 * GRID_HEIGHT, 4, gutter, 0.5 + incrementSpeedLevel),
    new Lane(3 * GRID_HEIGHT, 3, gutter, 1.5 + incrementSpeedLevel),
    new Lane(4 * GRID_HEIGHT, 3, gutter, 0.5 + incrementSpeedLevel)
];


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Start GAME
var isRunning = false;
var gameTimeID = null;

var sec = 0,
    min = 0,
    hour = 0;
function timer() {
    // console.log(`${hour}h:${min}m:${sec}s`);
    document.querySelector('.timer').textContent = `${hour}:${min}:${sec}`;
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

function removeModal(el) {
    document.querySelector('.modal').classList.remove('show');
    document.querySelector(el).classList.remove('show');
}

function showModal(el) {
    document.querySelector('.modal').classList.add('show');
    document.querySelector(el).classList.add('show');
}

function playGame() {
    removeModal('.modal .play-screen');
    isRunning = true;
    timer();
}

function displayWinLevel() {
    showModal('.modal .play-level');
}

function displayGameOver() {
    showModal('.modal .game-over');
}

function updateGameStats() {
    var pointsEl = document.querySelectorAll('.points');
    var levelsEl = document.querySelectorAll('.levels');
    var livesEl = document.querySelector('.lives');
    // if game running  update game scores
    if (isRunning){
        pointsEl[0].textContent = player.points;
        pointsEl[1].textContent = player.points;
        levelsEl[0].textContent = player.levels;
        levelsEl[1].textContent = player.levels;
        levelsEl[2].textContent = player.levels;
        livesEl.textContent = player.lives;
        if (player.levels === addDificulty) {
            addDificulty += DIFICULTY;
            incrementSpeedLevel++;
        }
        
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