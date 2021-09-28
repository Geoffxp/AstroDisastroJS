import Particle from "./Particle.js";
import { GAME_WIDTH, GAME_HEIGHT } from "./index.js";

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

export function shockwaveShipCollision(shockwaves, ships, particles) {
    let hit = 0;
    for (let shockwave of shockwaves) {
        for (let i = 0; i < ships.length; i++) {
            const randAngle = getRandom(0, 360)
            const randXPos = getRandom(0, GAME_WIDTH);
            const randYPos = getRandom(0, GAME_HEIGHT);
            if (waveDistance(shockwave, ships[i]) <= 0 && !ships[i].shocked) {
                particles.push(new Particle(ships[i].xCenter, ships[i].yCenter, 1, 0));
                particles.push(new Particle(ships[i].xCenter, ships[i].yCenter, -1, 0));
                particles.push(new Particle(ships[i].xCenter, ships[i].yCenter, 1, 1));
                particles.push(new Particle(ships[i].xCenter, ships[i].yCenter, -1, -1));
                particles.push(new Particle(ships[i].xCenter, ships[i].yCenter, 1, -1));
                particles.push(new Particle(ships[i].xCenter, ships[i].yCenter, -1, 1));
                particles.push(new Particle(ships[i].xCenter, ships[i].yCenter, 0, 1));
                particles.push(new Particle(ships[i].xCenter, ships[i].yCenter, 0, -1));
                ships[i].shocked = true;
                ships[i].setDirection(randAngle);
                ships[i].xPos = randXPos;
                ships[i].yPos = randYPos;
                ships[i].xCenter = randXPos;
                ships[i].yCenter = randYPos;
                hit++;
            }
        }
    }
    return (hit > 0) ? true : false;
}

export function shockwaveCollision(wave, balls, particles) {
    let hit = 0;
    for (let i = 0; i < balls.length; i++) {
        const randAngle = getRandom(0, 360)
        const randXPos = getRandom(0, GAME_WIDTH);
        const randYPos = getRandom(0, GAME_HEIGHT);

        if (waveDistance(wave, balls[i]) <= 0 && !balls[i].shocked) {
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, 0));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, 0));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, 1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, -1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, -1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, 1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 0, 1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 0, -1));
            balls[i].shocked = true;
            balls[i].setDirection(randAngle);
            balls[i].xPos = randXPos;
            balls[i].yPos = randYPos;
            balls[i].xCenter = randXPos;
            balls[i].yCenter = randYPos;
            hit++;
        }
    }
    return (hit > 0) ? true : false;
}

export function triangleCollision(balls, triangle, particles) {
    let hit = 0;
    for (let i = 0; i < balls.length; i++) {
        const randAngle = getRandom(0, 360)
        const randXPos = getRandom(0, GAME_WIDTH);
        const randYPos = getRandom(0, GAME_HEIGHT);

        if (triDistance(balls[i], triangle) <= 75 && !balls[i].shocked) {
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, 0));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, 0));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, 1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, -1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, -1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, 1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 0, 1));
            particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 0, -1));
            balls[i].setDirection(randAngle);
            balls[i].xPos = randXPos;
            balls[i].yPos = randYPos;
            balls[i].xCenter = randXPos + balls[i].size / 2;
            balls[i].yCenter = randYPos + balls[i].size / 2;
            hit++;
        }
    }
    return (hit > 0) ? true : false;
}

function triDistance(ball, triangle) {
    const dx = Math.abs(ball.xCenter - triangle.xCenter);
    const dy = Math.abs(ball.yCenter - triangle.yCenter);
    const distance = Math.sqrt((dy ** 2) + (dx ** 2));
    return distance;
}
function waveDistance(wave, ball) {
    const dx = Math.abs(ball.xCenter - wave.xCenter);
    const dy = Math.abs(ball.yCenter - wave.yCenter);
    const distance = Math.sqrt((dy ** 2) + (dx ** 2));
    return distance - wave.size - ball.size;
}

export function ballCollision(balls, particles) {
    let hit = 0;
    for (let ball of balls) {
        
        for (let i = 0; i < balls.length; i++) {
            const rn = Math.random();
            const randAngle = rn * 360;
            const randXPos = rn * GAME_WIDTH;
            const randYPos = rn * GAME_HEIGHT;
            if (balls[i] !== ball) {
                if (triDistance(balls[i], ball) <= 20) {
                    particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, 0));
                    particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, 0));
                    particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, 1));
                    particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, -1));
                    particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 1, -1));
                    particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, -1, 1));
                    particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 0, 1));
                    particles.push(new Particle(balls[i].xCenter, balls[i].yCenter, 0, -1));
                    balls[i].setDirection(randAngle);
                    balls[i].xPos = randXPos;
                    balls[i].yPos = randYPos;
                    balls[i].xCenter = randXPos + balls[i].size / 2;
                    balls[i].yCenter = randYPos + balls[i].size / 2;
                    hit++;
                }
            }
        }
        
    }
    return (hit > 0) ? true : false;
    
}

export function avoid(balls) {
    for (let ball of balls) {
        for (let i = 0; i < balls.length; i++) {
            if (balls[i] !== ball) {
                ball.avoid(triDistance(balls[i], ball) <= 50, balls[i].yCenter < ball.yCenter);
            }
        }
    }
}

