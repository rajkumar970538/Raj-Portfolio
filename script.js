// Improved game script with safer guards and DPR scaling
window.addEventListener('load', () => {
  // Elements (guarded — may be null if markup differs)
  const canvas = document.getElementById('gameCanvas');
  if(!canvas){ console.error('Game canvas not found (id=gameCanvas).'); return; }
  const ctx = canvas.getContext('2d');

  const startBtn = document.getElementById('startBtn');
  const startScreen = document.getElementById('startScreen');
  const hud = document.getElementById('hud');
  const levelIndicator = document.getElementById('levelIndicator');
  const orbsCountEl = document.getElementById('orbsCount');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const muteBtn = document.getElementById('muteBtn');
  const restartBtn = document.getElementById('restartBtn');
  const endScreen = document.getElementById('endScreen');
  const replayBtn = document.getElementById('replayBtn');

  if(!startBtn) console.warn('startBtn not found — cannot start from UI.');
  if(!hud) console.warn('HUD element not found.');

  // audio optional
  let audioEnabled = false;
  const blip = new Audio('assets/blip.mp3');
  blip.volume = 0.25;

  // canvas sizing with DPR
  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Game state & profile
  const PROFILE = {
    name: "Raj Kumar Guguloth",
    title: "Front-End Developer | MCA 2021",
    phone: "7013511294",
    email: "rajkumar970538@gmail.com",
    projects: [
      { id: "proj1", title: "Online Public Shaming Detection on Twitter", text: "Analysis & mitigation. (NLP, sentiment analysis).", link: "#" },
      { id: "proj2", title: "Email Alerts on WhatsApp by Twilio", text: "Email -> WhatsApp alerts using Twilio.", link: "#" }
    ],
    skills: [ {name:"HTML", level:"90%"}, {name:"CSS", level:"85%"}, {name:"JavaScript", level:"80%"} ]
  };

  const state = {
    running: false,
    level: 1,
    orbs: 0,
    maxLevel: 3,
    player: { x: 120, y: 120, r: 14, speed: 4 },
    orbsList: [],
    projBlocks: [],
    bat: { w: 120, h: 18, x: canvas.width/2 - 60, y: canvas.height - 90 },
    ball: { x: 200, y: 140, r: 12, dx: 3.5, dy: 3.2 }
  };

  // Helpers
  function dist(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
  function rectCircleCollide(rect, circle){
    const rx = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
    const ry = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
    return ( (circle.x - rx)**2 + (circle.y - ry)**2 ) < circle.r**2;
  }
  function roundRect(x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.closePath();
  }

  // spawn orbs & projects
  function spawnOrbs(n=6){
    state.orbsList = [];
    const pad = 80;
    for(let i=0;i<n;i++){
      const x = pad + Math.random()*(window.innerWidth-2*pad);
      const y = pad + Math.random()*(window.innerHeight-2*pad);
      state.orbsList.push({ x, y, r: 12, id: `orb${i}`, name: PROFILE.skills[i % PROFILE.skills.length].name });
    }
  }
  function spawnProjects(){
    state.projBlocks = [];
    const gap = 220;
    const mid = window.innerWidth/2;
    state.projBlocks.push({ x: mid - gap/2 - 120, y: window.innerHeight/2 - 40, w:220, h:120, id:"proj1", title: PROFILE.projects[0].title });
    state.projBlocks.push({ x: mid + gap/2 - 100, y: window.innerHeight/2 - 40, w:220, h:120, id:"proj2", title: PROFILE.projects[1].title });
  }

  // show/hide modal (pause/resume)
  function showModal(title, text, linksHtml=""){
    if(!modal){ console.warn('Modal not found.'); return; }
    modal.classList.remove('hidden');
    modal.querySelector('#modalTitle')?.textContent = title;
    modal.querySelector('#modalText')?.textContent = text;
    modal.querySelector('#modalLinks') && (modal.querySelector('#modalLinks').innerHTML = linksHtml || '');
    // pause
    state.running = false;
    console.log('Modal opened, game paused.');
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.add('hidden');
    // resume
    state.running = true;
    console.log('Modal closed, game resumed.');
  }
  modalClose?.addEventListener('click', closeModal);

  // HUD / UI initial state
  hud && hud.classList.add('hidden');
  document.getElementById('endScreen')?.classList.add('hidden');
  modal && modal.classList.add('hidden');

  // Start button
  startBtn?.addEventListener('click', () => {
    startScreen?.classList.add('hidden');
    hud && hud.classList.remove('hidden');
    state.running = true;
    state.level = 1; state.orbs = 0;
    orbsCountEl && (orbsCountEl.textContent = state.orbs);
    levelIndicator && (levelIndicator.textContent = `Level ${state.level}`);
    spawnOrbs(6); spawnProjects();
    console.log('Game started');
    if(audioEnabled) blip.play().catch(()=>{});
  });

  // Mute toggle
  muteBtn?.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    muteBtn.textContent = audioEnabled ? '🔇' : '🔈';
  });

  restartBtn?.addEventListener('click', () => { location.reload(); });
  replayBtn?.addEventListener('click', () => { location.reload(); });

  // Controls
  const keys = { ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false };
  window.addEventListener('keydown', e => { if(keys.hasOwnProperty(e.key)) keys[e.key] = true; });
  window.addEventListener('keyup', e => { if(keys.hasOwnPropert
