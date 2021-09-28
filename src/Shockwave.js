import { shockwaveCollision } from "./Collision.js";

export default class Shockwave {
    constructor(x, y, game) {
        this.game = game;
        this.xCenter = x;
        this.yCenter = y;
        this.size = 0;
        this.remove = false;
    }
    update() {
        this.size += 10;
        if (this.size >= this.game.width){ 
            this.size = 0;
            this.remove = true;
            this.game.balls.forEach(ball => {
                ball.shocked = false;
                console.log(ball.shocked)});
            this.game.ships.forEach(ship => {
                ship.shocked = false;
                console.log(ship.shocked)});
        }
        if (shockwaveCollision(this, this.game.balls, this.game.particles)) return 1;
        return 0;
    }
    draw(ctx) {
        ctx.strokeStyle = "rgb(255, 255, 150)";
        ctx.beginPath();
        ctx.arc(this.xCenter, this.yCenter, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
}