import { triangleCollision } from "./Collision.js";
import Shockwave from "./Shockwave.js";


function toDegrees(radians) {
    const pi = Math.PI;
    return radians * (180/pi);
}

export default class Triangle {
    constructor(gWidth, gHeight, game) {
        this.game = game;
        this.x = gWidth / 2;
        this.y = gHeight / 2;
        this.mouseX = 720;
        this.mouseY = 450;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.score = 0;
        this.power = 0;
        this.docShock = document.getElementById("blastDiv");
        this.xDistance = this.x - this.mouseX;
        this.yDistance = this.y - this.mouseY;
        this.rotationAngle = toDegrees(Math.atan2(this.yDistance, this.xDistance));
        this.rotationAngleL = this.rotationAngle + 30;
        this.rotationAngleR = this.rotationAngle - 30;
        this.topX = this.x;
        this.leftX = this.x + 100 * Math.cos(2 * Math.PI * this.rotationAngleL / 360);
        this.rightX = this.x + 100 * Math.cos(2 * Math.PI * this.rotationAngleR / 360);
        this.topY = this.y;
        this.leftY = this.y + 100 * Math.sin(2 * Math.PI * this.rotationAngleL / 360);
        this.rightY = this.y + 100 * Math.sin(2 * Math.PI * this.rotationAngleR / 360);
        this.xCenter = (this.topX + this.rightX + this.leftX) / 3;
        this.yCenter = (this.topY + this.rightY + this.leftY) / 3;
        this.health = 25;
        this.glow = 0;
        this.glowUp = true;
        this.glowDown = false;
        this.pulseCount = 1;

    }
    draw(ctx) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.leftX, this.leftY);
        ctx.lineTo(this.topX,this.topY);
        ctx.lineTo(this.rightX, this.rightY);
        ctx.lineTo(this.leftX, this.leftY);
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, ${this.power < 25 ? 255 : 150}, ${this.power / 25})`;
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = `rgba(${255 - this.power}, 255, ${125 + this.power}, ${(this.power <= 25) ? this.power / 100 : 0.25})`;
        ctx.beginPath();
        ctx.arc(this.xCenter, this.yCenter, 60, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        this.pulse()
        ctx.fillStyle = `rgba(255, 50, 50, ${this.glow})`;
        ctx.fillRect(0, 0, this.game.width, this.game.height);
        
        
    }
    update(balls, particles, ships) {
        this.xDistance = this.x - this.mouseX;
        this.yDistance = this.y - this.mouseY;
        this.rotationAngle = toDegrees(Math.atan2(this.yDistance, this.xDistance));
        this.rotationAngleL = this.rotationAngle + 30;
        this.rotationAngleR = this.rotationAngle - 30;
        this.topX = this.x;
        this.leftX = this.x + 100 * Math.cos(2 * Math.PI * this.rotationAngleL / 360);
        this.rightX = this.x + 100 * Math.cos(2 * Math.PI * this.rotationAngleR / 360);
        this.topY = this.y;
        this.leftY = this.y + 100 * Math.sin(2 * Math.PI * this.rotationAngleL / 360);
        this.rightY = this.y + 100 * Math.sin(2 * Math.PI * this.rotationAngleR / 360);
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.xCenter = (this.topX + this.rightX + this.leftX) / 3;
        this.yCenter = (this.topY + this.rightY + this.leftY) / 3;

        if (triangleCollision(balls, this, particles)) {
            this.power++
            return 1;
        }
        if (triangleCollision(ships, this, particles)) {
            this.pulseCount = 0;
            if (this.power > 0) this.power -= 3;
            else {
                this.power = 0;
                this.health -= 5;
            }
        }
        return 0;

    }
    
    goTo() {
        const dx = this.topX - this.mouseX;
        const dy = this.topY - this.mouseY;
        this.xSpeed = -dx / 15;
        this.ySpeed = -dy / 15;
    }

    blast() {
        if (this.power >= 25) {
            this.game.shockwaves.push(new Shockwave(this.xCenter, this.yCenter, this.game))
            this.power -= 25;
            this.game.pulseCount = 0;
        }
    }

    pulse() {
        if (this.pulseCount < 1) {
            if (this.glowUp) {
                this.glow += 0.02;
                if (this.glow > 0.2) this.glowUp = false;
            } else {
                this.glow -= 0.02;
                if (this.glow < 0) {
                    this.pulseCount++
                    this.glowUp = true;
                }
            }
        } 
    }

}