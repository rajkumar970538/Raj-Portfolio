const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bat = { x: canvas.width / 2 - 50, y: canvas.height - 60, width: 100, height: 10, swing: 0 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4, radius: 10 };

document.addEventListener("mousemove", (e) => {
  bat.x = e.clientX - bat.width / 2;
});

document.addEventListener("click", () => {
  bat.swing = 15;
  setTimeout(() => (bat.swing = 0), 150);
});

function drawBat() {
  ctx.save();
  ctx.translate(bat.x + bat.width / 2, bat.y);
  ctx.rotate((-bat.swing * Math.PI) / 180);
  ctx.fillStyle = "#00eaff";
  ctx.fillRect(-bat.width / 2, 0, bat.width, bat.height);
  ctx.restore();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffeb3b";
  ctx.shadowBlur = 20;
  ctx.shadowColor = "#ffeb3b";
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;
  if (ball.y - ball.radius < 0) ball.dy *= -1;

  if (
    ball.y + ball.radius > bat.y &&
    ball.x > bat.x &&
    ball.x < bat.x + bat.width
  ) {
    ball.dy = -Math.abs(ball.dy);
    ball.dx += (Math.random() - 0.5) * 2;
  }

  if (ball.y + ball.radius > canvas.height) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBat();
  drawBall();
  moveBall();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
