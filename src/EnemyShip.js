import { shockwaveShipCollision } from "./Collision.js";
function toDegrees(radians) {
    const pi = Math.PI;
    return radians * (180/pi);
}
function toRadians(degrees) {
    const pi = Math.PI;
    return degrees * (pi/180);
}
export default class Ship {
    constructor(x, y, angle, game) {
        this.xPos = x;
        this.yPos = y;
        this.angle = angle;
        this.xDir = 3 * Math.cos(toRadians(angle));
        this.yDir = 3 * Math.cos(toRadians(angle));
        this.targetX = game.triangle.xCenter;
        this.targetY = game.triangle.yCenter;
        this.game = game;
        this.width = game.width;
        this.height = game.height;
        this.rotationAngleL = this.angle + 30;
        this.rotationAngleR = this.angle - 30;
        this.topX = this.xPos;
        this.leftX = this.xPos + 50 * Math.cos(2 * Math.PI * this.rotationAngleL / 360);
        this.rightX = this.xPos + 50 * Math.cos(2 * Math.PI * this.rotationAngleR / 360);
        this.topY = this.yPos;
        this.leftY = this.yPos + 50 * Math.sin(2 * Math.PI * this.rotationAngleL / 360);
        this.rightY = this.yPos + 50 * Math.sin(2 * Math.PI * this.rotationAngleR / 360);
        this.xCenter = (this.topX + this.rightX + this.leftX) / 3;
        this.yCenter = (this.topY + this.rightY + this.leftY) / 3;
        this.following = false;
        this.size = 25;
        this.shocked = false;
        
    }

    update(triangle) {
        if (!this.shocked) {
            if (this.xPos < 100 || this.xPos > this.width - 100) {
                this.turnAround();
            }
            if (this.yPos < 100 || this.yPos > this.height - 100) {
                this.turnAround();
            }
            this.follow(triangle.xCenter, triangle.yCenter);
            this.turn();
            this.xPos += this.xDir;
            this.yPos += this.yDir;
            this.rotationAngleL = this.angle + 30;
            this.rotationAngleR = this.angle - 30;
            this.topX = this.xPos + 30 * Math.cos(2 * Math.PI * this.rotationAngleL / 360); 
            this.leftX = this.xPos;
            this.rightX = this.xPos + 30 * Math.cos(2 * Math.PI * this.rotationAngleR / 360);
            this.topY = this.yPos + 30 * Math.sin(2 * Math.PI * this.rotationAngleL / 360);
            this.leftY = this.yPos;
            this.rightY = this.yPos + 30 * Math.sin(2 * Math.PI * this.rotationAngleR / 360);
            this.xCenter = (this.topX + this.rightX + this.leftX) / 3;
            this.yCenter = (this.topY + this.rightY + this.leftY) / 3;
            if (shockwaveShipCollision(this.game.shockwaves, this.game.ships, this.game.particles)) return 5;
        }
        return 0;
    }

    draw(ctx) {
        if (!this.shocked) {
            ctx.beginPath();
            ctx.moveTo(this.leftX, this.leftY);
            ctx.lineTo(this.topX,this.topY);
            ctx.lineTo(this.rightX, this.rightY);
            ctx.lineTo(this.leftX, this.leftY);
            ctx.closePath();
            ctx.fillStyle = "rgb(255,35,35)";
            ctx.fill();
        }
        
    }

    follow(x, y) {
        this.targetX = x;
        this.targetY = y;
        this.dx = this.targetX - this.xPos;
        this.dy = this.targetY -this.yPos;
        if (Math.sqrt(this.dy**2 + this.dx**2) <= 250) {
            this.following = true;
            this.angle = toDegrees(Math.atan2(this.dy, this.dx));
            return this.setDirection(this.angle);
        }
        return this.following = false;
    }

    turn() {
        const rand = Math.random();
        const plusOrMinus = Math.random() < 0.5 ? -1 : 1
        if (!this.following) {
            this.angle += plusOrMinus * rand * 5;
            this.setDirection(this.angle);
        }
    }
    turnAround() {
        this.angle += 5;
        this.setDirection(this.angle);
    }

    setDirection(angle) {
        this.xDir = 3 * Math.cos(toRadians(angle));
        this.yDir = 3 * Math.sin(toRadians(angle))
    }
    avoid() {

    }
}