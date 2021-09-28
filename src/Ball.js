import { ballCollision } from "./Collision.js";

function toDegrees(radians) {
    const pi = Math.PI;
    return radians * (180/pi);
}
function toRadians(degrees) {
    const pi = Math.PI;
    return degrees * (pi/180);
}
export default class Ball {
    constructor(xPos, yPos, angle, gWidth, gHeight) {
        this.size = 10;
        this.xPos = xPos;
        this.yPos = yPos;
        this.angle = angle
        this.xDir = 5 * Math.cos(toRadians(angle));
        this.yDir = 5 * Math.sin(toRadians(angle));
        this.xCenter = this.xPos + this.size / 2;
        this.yCenter = this.yPos + this.size / 2;
        this.prevAngle = this.angle;
        this.avoiding = false;
        this.width = gWidth;
        this.height = gHeight;
        this.shocked = false;
    }

    update(balls, particles) {
        if (!this.shocked) {
            if (this.xPos < 0 || this.xPos + this.size > this.width) {
                this.xDir = -this.xDir;
            }
            if (this.yPos < 0 || this.yPos + this.size > this.height) {
                this.yDir = -this.yDir;
            }
            if (!this.avoiding) {
                this.prevAngle = this.angle;
            }
            this.angle = toDegrees(Math.atan2(this.yDir, this.xDir));
            this.xPos += this.xDir;
            this.yPos += this.yDir;
            this.xCenter += this.xDir;
            this.yCenter += this.yDir;
    
            if (ballCollision(balls, particles));
        }
        
    }

    draw(ctx) {
        if (!this.shocked) {
            ctx.fillStyle = "#fff";
            ctx.beginPath();
            ctx.arc(this.xCenter, this.yCenter, this.size, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }
    setDirection(angle)  {
        this.angle = angle;
        this.xDir = 5 * Math.cos(toRadians(angle));
        this.yDir = 5 * Math.sin(toRadians(angle));
    }
    turn(rand) {
        if (!this.avoiding) {
            this.angle += rand;
            this.setDirection(this.angle);
        }
        

    }
    avoid(isTrue, isAbove) {
        if (isTrue) this.avoiding = isTrue;
        if (isAbove) {
            if (this.avoiding && this.angle !== this.prevAngle + 5) {
                this.angle += 0.05;
                this.setDirection(this.angle);
            } 
        } else {
            if (this.avoiding && this.angle !== this.prevAngle - 5) {
                this.angle -= 0.05;
                this.setDirection(this.angle);
            } 
        }
        
    }
}