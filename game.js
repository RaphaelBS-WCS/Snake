import { score, update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from "./snake.js";
import { update as updateFood, draw as drawFood } from './food.js';
import {outsideGrid} from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
    if (gameOver) {
        if(confirm('You loose. Press OK to restart.')) {
            window.location.reload();
        }
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRenderTime < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();

}

window.requestAnimationFrame(main);

export function update() {
    updateSnake();
    updateFood();
    checkDeath();
    checkScore();
}

export function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function checkScore() {
    document.getElementById('score').innerHTML=score.toString();
}

