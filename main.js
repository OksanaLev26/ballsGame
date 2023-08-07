const canvas = document.getElementById('canvas');
const addButton = document.getElementById('addBall');
const stopButton = document.getElementById('stop');
const balls = [];
const intervalId = 0;
let removedBall = 0;
let ballId = 0;
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

    currentColor() {
        this.ball.style.backgroundColor = this.color;
    }

    removeBall(id) {
        const ballToRemove = document.getElementById(id);
        ballToRemove.remove();
    }

    clickBall(ball) {
        const handleBallClick = () => {
            console.log('click', ball)
                if (ball.color === 'green') {
                    ball.removeBall(ball.id);

                    removeBallFromArray(ball.id);
                    removedBall++;

                    if (!checkGreenColor()) {
                        changeColor();
                    }

                    checkBallsLength();
                } 
                else if (ball.color === 'red') {
                    addBall(2);
                }
        }
        this.ball.addEventListener('click', handleBallClick);
    }
}

const removeBallFromArray = (id) => {
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].id === id) {
            balls.splice(i, 1);
        }
    }
    console.log('balls', balls)
}

const checkGreenColor = () => {
    for (let i = 0; i < balls.length; i++) {
       return balls[i].color === 'green' ? true : false
    }
}

const getMinutes = (millisec) => {
    const minutes = Math.floor(millisec / 60000);
    const seconds = ((millisec % 60000) / 1000).toFixed(0);
    return minutes + ':' + seconds;
}

const reset = () => {
    startTime = Date.now();
    endTime = 0;
    ballId = 0;
    removedBall = 0;
}

const changeColor = () => {
    balls.forEach((ball) => {
        ball.color = 'green';
    });
}

const checkBallsLength = () => {
    if (balls.length === 0) {
        endTime = Date.now();
        alert(`You removed ${removedBall} balls. You spent ${getMinutes(endTime - startTime)} on it.`);
        reset();
    }
}

const calcDistanse = (left1, top1, left2, top2) => {
    var x1 = left1 ;
    var x2 = left2 ;
    var y1 = top1;
    var y2 = top2 ;
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))
}

const checkDistanse = (left, top) => {
    let x1 = left + BALL_SIZE;
    let y1 = top + BALL_SIZE;
    let x2 = null;
    let y2 = null;
        for (let i = 0; i < balls.length; i++) {
            x2 = balls[i].left + BALL_SIZE;
            y2 = balls[i].top + BALL_SIZE;
            const carrentDistanse = calcDistanse(x1, y1, x2, y2);
            console.log('carrentDistanse', carrentDistanse)
            if (carrentDistanse < BALL_SIZE) {
                return false;
            }
        }
            return true;
}

const addBall = (num) => {    
    startTime = Date.now();
        const colorClass = Math.random() < 0.5 ? 'green' : 'red';
        const ball = document.createElement('div');
        ball.classList.add('ball', `${colorClass}`);
        const newBall = new Ball(ball, canvas, ballId);  
        ball.id = ballId;

        if (checkDistanse(newBall.left, newBall.top)) {
            canvas.appendChild(ball);
            ballId++;
            newBall.color = colorClass;
            balls.push(newBall);
            console.log('balls', balls)
            num--;
            newBall.clickBall(newBall);
    }

    if (num <= 0) {
            return;
        } 
        addBall(num);
}

const handleAddButtonClick = () => {
    addBall(1);
}
addButton.addEventListener('click', handleAddButtonClick);

const handleStopButtonClick = () => {
    clearInterval(intervalId);
    intervalId = null;
}
stopButton.addEventListener('click', handleStopButtonClick);