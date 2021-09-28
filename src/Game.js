import Triangle from "./Triangle.js";
import Ball from "./Ball.js";
import InputHandler from "./Input.js";
import Ship from "./EnemyShip.js";

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export default class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.score = 0;
        this.state = "menu"
        this.glow = 0;
        this.glowUp = true;
        this.glowDown = false;
        this.play = false;
        this.pulseCount = 0;
    }
    start() {
        this.score = 0;
        this.triangle = new Triangle(this.width, this.height, this);
        new InputHandler(this.triangle);
        this.balls = [];
        this.particles = [];
        this.shockwaves = [];
        this.ships = [];
        for (let d = 0; d < 360; d += 45) {
            this.balls.push(new Ball(this.width / 2, this.height / 2, d, this.width, this.height))
        }
    }
    update() {
        if (this.score > 25 && this.ships.length < parseInt(this.score / 25)) {
            const randAngle = getRandom(0, 360)
            this.ships.push(new Ship(this.width / 2, this.height / 2, randAngle, this))
        }
        if (this.play) {
            this.balls.forEach(ball => {
                ball.update(this.balls,this. particles);
                const plusOrMinus = Math.random() < 0.5 ? -1 : 1
                ball.turn(plusOrMinus * Math.random() * 5);
            });
            this.particles = this.particles.filter(part => !part.remove);
            this.shockwaves = this.shockwaves.filter(shock => !shock.remove)
            this.particles.forEach(particle => particle.update())
            this.shockwaves.forEach(shock => this.score += shock.update())
            this.triangle.goTo();
            this.score += this.triangle.update(this.balls, this.particles, this.ships);
            this.ships.forEach(ship => this.score += ship.update(this.triangle));
            if (this.triangle.health <= 0) this.start();
        }
        
    }

    draw(ctx) {
        if (this.play) {
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, this.width, this.height);
            if (this.triangle.power >= 25) {
                this.pulse()
                ctx.fillStyle = `rgba(255, 255, 150, ${this.glow})`;
                ctx.fillRect(0, 0, this.width, this.height);
                ctx.fillStyle = `rgba(255, 255, 150, ${this.glow + 0.1})`;
                ctx.font = "50px monospace";
                ctx.fillText(`WAVE READY`, this.width / 2 - 100, this.height-40)
            }
            ctx.fillStyle = "#fff";
            ctx.font = "50px monospace";
            ctx.fillText(`SCORE`, 20, this.height-60)
            ctx.fillText(`${this.score}`, 20, this.height-17)
            ctx.font = "50px monospace";
            ctx.fillText(`POWER`, this.width - 150, this.height-60)
            ctx.fillRect(this.width - 150, this.height-60, this.triangle.health * 3, 50);
            ctx.fillStyle = `rgba(255, 255, 100, 0.5)`;
            ctx.fillRect(
                this.width - 75, 
                this.height-60, 
                (this.triangle.power < 25) ? this.triangle.power * 2.5 : 62.5, 
                50);
            ctx.fillRect(
                this.width - 75, 
                this.height-60, 
                (this.triangle.power > 25) ? this.triangle.power * 2.5 - 62.5: 0, 
                50);
            this.balls.forEach(ball => ball.draw(ctx));
            this.particles.forEach(particle => particle.draw(ctx));
            this.shockwaves.forEach(shock => shock.draw(ctx));
            this.triangle.draw(ctx);
            this.ships.forEach(ship => ship.draw(ctx))
        }
        
    }
    pulse() {
        if (this.pulseCount < 1) {
            if (this.glowUp) {
                this.glow += 0.0075;
                if (this.glow > 0.2) this.glowUp = false;
            } else {
                this.glow -= 0.0075;
                if (this.glow < 0) {
                    this.pulseCount++
                    this.glowUp = true;
                }
            }
        }
        
    }
}