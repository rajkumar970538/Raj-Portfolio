// ===== Dark/Light Mode Toggle =====
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  toggleBtn.textContent = document.body.dataset.theme === 'light' ? 'Dark Mode' : 'Light Mode';
});

// ===== Skill Bars Animation =====
const skills = document.querySelectorAll('.skill-bar div');
window.addEventListener('scroll', () => {
  const skillsTop = document.getElementById('skills').offsetTop - window.innerHeight + 100;
  if(window.scrollY > skillsTop) skills.forEach(bar => bar.style.width = bar.style.getPropertyValue('--skill-level'));
});

// ===== Timeline Animation =====
const timelineItems = document.querySelectorAll('.timeline-item');
window.addEventListener('scroll', () => {
  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if(itemTop < window.innerHeight - 100) item.classList.add('show');
  });
});

// ===== Canvas Bat & Ball =====
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = { x:100, y:100, radius:15, dx:4, dy:3 };
let bat = { width:120, height:20, x:canvas.width/2-60, y:canvas.height-50 };

window.addEventListener('mousemove', e => { bat.x = e.clientX - bat.width/2; bat.y = e.clientY - bat.height/2; });

// Ball movement
function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  // Ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = '#ff5733';
  ctx.fill();
  ctx.closePath();
  
  // Bat
  ctx.fillStyle = '#1f78ff';
  ctx.fillRect(bat.x, bat.y, bat.width, bat.height);
  
  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  // Bounce off walls
  if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;
  if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;
  
  // Collision with bat
  if(ball.x + ball.radius > bat.x && ball.x - ball.radius < bat.x + bat.width &&
     ball.y + ball.radius > bat.y && ball.y - ball.radius < bat.y + bat.height){
    ball.dy *= -1;
    ball.dx *= 1;
  }
  
  requestAnimationFrame(animate);
}
animate();

// Resize canvas
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
