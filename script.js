const bat = document.getElementById("bat");
const ball = document.getElementById("ball");
const scoreEl = document.getElementById("score");

let score = 0;
let ballX = 100;
let ballY = 100;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Move bat with mouse
document.addEventListener("mousemove", (e) => {
  let x = e.clientX - bat.offsetWidth / 2;
  x = Math.max(0, Math.min(x, window.innerWidth - bat.offsetWidth));
  bat.style.left = x + "px";
});

// Ball animation
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX <= 0 || ballX >= window.innerWidth - ball.offsetWidth) ballSpeedX *= -1;
  if (ballY <= 0) ballSpeedY *= -1;

  const batRect = bat.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  if (
    ballRect.bottom >= batRect.top &&
    ballRect.right >= batRect.left &&
    ballRect.left <= batRect.right &&
    ballRect.top <= batRect.bottom
  ) {
    ballSpeedY *= -1;
    score++;
    scoreEl.textContent = score;

    bat.style.boxShadow = "0 0 30px #fff";
    setTimeout(() => bat.style.boxShadow = "0 0 15px #ff8800", 150);
  }

  if (ballY > window.innerHeight) {
    ballX = Math.random() * (window.innerWidth - 50);
    ballY = 50;
    score = 0;
    scoreEl.textContent = score;
  }

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  requestAnimationFrame(moveBall);
}

moveBall();
