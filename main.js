const canvas = document.getElementById('canvas');
const continueButton = document.getElementById('continue');
const pauseButton = document.getElementById('pause');
const gameButton = document.getElementById('game');
const levelTitle = document.getElementById('level');
const score = document.getElementById('score');
const time = document.getElementById('time');
let balls = [];
let intervalId = 0;
let startTime = null;
let endTime = null;
let allGameTime = null;
let removedBall = 0;
let allRemovedBalls = 0;
let ballId = 0;
let level = 1;
let currentBallsNumber = 5;
const BALL_SIZE = 100;
const canvasWidth = parseFloat(window.getComputedStyle(this.canvas).width);
const canvasHeigth = parseFloat(window.getComputedStyle(this.canvas).height);

class Ball {
    constructor(ball, canvas, id) {
        this.ball = ball;
        this.canvas = canvas;
        this.horizontalDirection = Math.random() > 0.5 ? 'RIGHT' : 'LEFT';
        this.verticalDirection = Math.random() > 0.5 ? 'BOTTOM' : 'TOP';
        this.left = Math.floor(Math.random() * (canvasWidth - BALL_SIZE));
        this.top = Math.floor(Math.random() * (canvasHeigth - BALL_SIZE));
        this.id = id;
        this.color = null;
        this.speedX = Math.floor(Math.random() * 3 + 1);
        this.speedY = Math.floor(Math.random() * 3 + 1);
        this.ball.style.top = this.top + 'px';
        this.ball.style.left = this.left + 'px';
        this.ball.style.width = BALL_SIZE + 'px';
        this.ball.style.height = BALL_SIZE + 'px';
    }

    changeDirection() {
        
        const ballLeft = parseFloat(window.getComputedStyle(this.ball).left);
        const ballTop = parseFloat(window.getComputedStyle(this.ball).top);
       
        if (ballLeft >= canvasWidth - BALL_SIZE) {
            this.horizontalDirection = 'LEFT';
        } else if (ballLeft <= 0) {
            this.horizontalDirection = 'RIGHT';
        }

        if (ballTop >= canvasHeigth - BALL_SIZE) {
            this.verticalDirection = 'TOP';
        } else if (ballTop <= 0) {
            this.verticalDirection = 'BOTTOM';
        }

        
    }

    toggleDirection() {
        this.horizontalDirection === 'LEFT' ?
            this.horizontalDirection = 'RIGHT' :
            this.horizontalDirection = 'LEFT';

        this.verticalDirection === 'TOP' ?
            this.verticalDirection = 'BOTTOM' :
            this.verticalDirection = 'TOP';
    }

    currentColor() {
        this.ball.style.backgroundColor = this.color;
    }

    removeBall() {
        this.ball.remove();
    }

    move() {
        this.currentColor();
        this.changeDirection();
        
        const ballLeft = parseFloat(window.getComputedStyle(this.ball).left);
        const ballTop = parseFloat(window.getComputedStyle(this.ball).top);
        let updatedBallLeft = 0;
        let updatedBallTop = 0;

        if (this.horizontalDirection === 'RIGHT') {
            this.ball.style.left = `${ballLeft + this.speedX}px`;
            updatedBallLeft = ballLeft + this.speedX;
        } else {
            this.ball.style.left = `${ballLeft - this.speedX}px`;
            updatedBallLeft = ballLeft - this.speedX
        }

        if (this.verticalDirection === 'BOTTOM') {
            this.ball.style.top = `${ballTop + this.speedY}px`;
            updatedBallTop = ballTop + this.speedY;
        } else {
            this.ball.style.top = `${ballTop - this.speedY}px`;
            updatedBallTop = ballTop - this.speedY;
        }

        this.left = updatedBallLeft;
        this.top = updatedBallTop
    }
}

const removeBallFromArray = (id) => {
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].id === id) {
            balls.splice(i, 1);
        }
    }
}

const checkGreenColor = () => {
    return balls.some((ball) => ball.color === 'lime');
}

const getMinutes = (millisec) => {
    let seconds = Math.floor(millisec / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    allGameTime += millisec;

    return minutes + 'min' + seconds + 'sec';
}

const reset = () => {
    startTime = Date.now();
    endTime = 0;
    ballId = 0;
    removedBall = 0;
}

const changeColor = () => {
    balls.forEach((ball) => {
        ball.color = 'lime';
        ball.ball.classList.add('bubble');
    });
}

const startGame = () => {
    balls = [];
    canvas.innerHTML = null;
    levelTitle.textContent = `Level ${level}`;
    addBall(currentBallsNumber);
    
    startTime = Date.now();
    if (!intervalId) {
        intervalId = setInterval(() => {
            balls.forEach((ball, index) => {

                ball.move(ball.id, balls);
                for (let i = 0; i < balls.length; i++) {

                    if (i !== index) {
                        let distanse = calcDistanse(ball.left, ball.top, balls[i].left, balls[i].top);

                        if (distanse < 101) {
                            ball.toggleDirection();
                            break;
                        }
                    }
                }
            });
        }, 32);
    }
}

const checkBallsLength = () => {
    if (balls.length === 0) {
        endTime = Date.now();
        alert(`You removed ${removedBall} balls. You spent ${getMinutes(endTime - startTime)} on it.`);
        reset();
        clearInterval(intervalId);
        intervalId = null;
        if (level < 5) {
            const message = prompt('The game is over. Do you want to continue playing?');
            level++;
            currentBallsNumber += 5;
        if (message && message.toLowerCase() === "y") {
            startGame();
          } else if (message && message.toLowerCase() === "n" || !message) {
            alert('If you want to play more press START button');
          }
        } else {
            const message = prompt(`Game is over! You removed ${allRemovedBalls} balls. You spent ${getMinutes(allGameTime)}
             on it. Do you want to start a new game?`);
            level = 1;
            levelTitle.textContent = `Level ${level}`;
            currentBallsNumber = 5;
            if (message && message.toLowerCase() === "y") {
                startGame();
              } else if (message && message.toLowerCase() === "n" || !message) {
                alert('If you want to play more press START button');
              }
        }
    }
}

const calcDistanse = (left1, top1, left2, top2) => {
    var x1 = left1;
    var x2 = left2;
    var y1 = top1;
    var y2 = top2;
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
}

const checkDistanse = (left, top) => {
    let x1 = left;
    let y1 = top;
    let x2 = null;
    let y2 = null;
        for (let i = 0; i < balls.length; i++) {
            x2 = balls[i].left ;
            y2 = balls[i].top ;
            const carrentDistanse = calcDistanse(x1, y1, x2, y2);
            if (carrentDistanse < BALL_SIZE) {
                return false;
            }
        }
            return true;
}

const addBall = (num) => {    
        const colorClass = Math.random() < 0.5 ? 'lime' : 'deeppink';
        const ball = document.createElement('div');
        if (colorClass === 'lime') {
            ball.classList.add('ball', 'bubble');
        } else {
            ball.classList.add('ball');
        }
        const newBall = new Ball(ball, canvas, ballId);  
        ball.id = ballId;

        if (checkDistanse(newBall.left, newBall.top)) {
            canvas.appendChild(ball);
            ballId++;
            newBall.color = colorClass;
            balls.push(newBall);
            num--;
            const handleBallClick = () => {
                if (newBall.color === 'lime') {
                    newBall.removeBall();

                    removeBallFromArray(newBall.id);
                    removedBall++;
                    allRemovedBalls++;

                    if (!checkGreenColor()) {
                        changeColor();
                    }   
                    checkBallsLength();
                } else if (newBall.color === 'deeppink') {
                    addBall(2);
                }
            }
            ball.addEventListener('click', handleBallClick);
    }

    if (num <= 0) {
            return;
        } 
        addBall(num);
}

const handlePauseButtonClick = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    } else {
        intervalId = setInterval(() => {
            balls.forEach((ball, index) => {

                ball.move(ball.id, balls);
                for (let i = 0; i < balls.length; i++) {

                    if (i !== index) {
                        let distanse = calcDistanse(ball.left, ball.top, balls[i].left, balls[i].top);

                        if (distanse < 101) {
                            ball.toggleDirection();
                            break;
                        }
                    }
                }
            });
        }, 32);
    }
}
pauseButton.addEventListener('click', handlePauseButtonClick);

const handleContinuetClick = () => {
    if (!intervalId) {
        intervalId = setInterval(() => {
            balls.forEach((ball, index) => {

                ball.move(ball.id, balls);
                for (let i = 0; i < balls.length; i++) {

                    if (i !== index) {
                        let distanse = calcDistanse(ball.left, ball.top, balls[i].left, balls[i].top);

                        if (distanse < 101) {
                            ball.toggleDirection();
                            break;
                        }
                    }
                }
            });
        }, 32);
    }
}

continueButton.addEventListener('click', handleContinuetClick);

const handleGameClick = () => {
    startGame();
}

gameButton.addEventListener('click', handleGameClick);