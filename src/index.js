import Game from "./Game.js"
import addInstructions from "./instructions.js"
let lives = 5

const canvas = document.createElement("canvas");
const body = document.querySelector("body");
export const GAME_WIDTH = window.innerWidth -20;
export const GAME_HEIGHT = window.innerHeight -20;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();
addInstructions(game);
body.appendChild(canvas);
const ctx = canvas.getContext("2d");



const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function gameLoop() {
    game.update();
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);