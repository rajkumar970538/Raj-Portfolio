// Theme Toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  const body = document.body;
  if(body.dataset.theme === 'light'){
    body.dataset.theme = 'dark';
    toggleBtn.textContent = 'Light Mode';
  } else {
    body.dataset.theme = 'light';
    toggleBtn.textContent = 'Dark Mode';
  }
});

// Animate skill bars on scroll
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-bar div');

window.addEventListener('scroll', () => {
  const sectionTop = skillsSection.offsetTop - window.innerHeight + 100;
  if(window.scrollY > sectionTop){
    skillBars.forEach(bar => {
      bar.style.width = bar.style.getPropertyValue('--skill-level');
    });
  }

  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if(itemTop < window.innerHeight - 100){
      item.classList.add('show');
    }
  });
});
