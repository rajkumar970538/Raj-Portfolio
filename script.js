/* Neon / cyber style */
:root{
  --bg:#071025;
  --panel: rgba(255,255,255,0.04);
  --neon:#1ff1d6;
  --accent:#6f8cff;
  --muted:rgba(255,255,255,0.6);
  --glass: rgba(255,255,255,0.03);
  --ui-z: 100;
}

*{box-sizing:border-box;margin:0;padding:0;font-family:Inter,system-ui,Segoe UI,Roboto,"Helvetica Neue",Arial;}

html,body{height:100%;}
body{background:linear-gradient(180deg,#03102a,#071025);color:white;overflow:hidden;}

/* canvas covers full page behind UI */
canvas#gameCanvas {
  position:fixed; left:0; top:0; width:100%; height:100%; z-index:0;
  background: radial-gradient(circle at 10% 10%, rgba(111,140,255,0.06), transparent 10%),
              radial-gradient(circle at 90% 80%, rgba(31,241,214,0.03), transparent 15%),
              linear-gradient(180deg,#00101a, #03102a 60%);
}

/* UI container */
#ui{ position:relative; z-index:120; pointer-events:none; }

/* Start screen */
.screen{ position:fixed; left:50%; top:50%; transform:translate(-50%,-50%); width:92%; max-width:720px; text-align:center; pointer-events:auto; }
.screen.hidden{ display:none; }
.screen.active{ display:block; }

#startScreen{
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  border-radius:14px; padding:28px; box-shadow:0 12px 40px rgba(0,0,0,0.6);
  border: 1px solid rgba(111,140,255,0.12);
  backdrop-filter: blur(6px);
}

#profilePreview{ width:120px; height:120px; object-fit:cover; border-radius:50%; border:4px solid rgba(255,255,255,0.06); display:block; margin:0 auto 12px; }

h1{ font-size:28px; letter-spacing:0.6px; color:var(--neon); text-shadow:0 0 12px rgba(31,241,214,0.08); }
h3{ margin-top:6px; color:var(--accent); font-weight:500; }
.muted{ color:var(--muted); margin:12px 0; }
.small{ color:var(--muted); margin-top:10px; font-size:13px; }

.primary{
  background: linear-gradient(90deg,var(--neon),var(--accent));
  color:#00101a; border:none; padding:10px 18px; border-radius:8px; font-weight:700; cursor:pointer;
  box-shadow: 0 8px 30px rgba(111,140,255,0.12), 0 2px 8px rgba(31,241,214,0.05);
}

/* HUD (top) */
#hud{ position:fixed; top:18px; left:50%; transform:translateX(-50%); display:flex; gap:14px; align-items:center; padding:8px 14px; background:var(--panel); border-radius:12px; pointer-events:auto; z-index:120; }
#levelIndicator{ color:var(--neon); font-weight:700; padding-right:8px; border-right:1px solid rgba(255,255,255,0.04); }
#score{ color:var(--muted); font-weight:600; }
#hud button{ margin-left:8px; background:transparent; border:1px solid rgba(255,255,255,0.04); color:var(--muted); padding:6px 8px; border-radius:8px; cursor:pointer; }

/* Modal */
#modal{ position:fixed; left:50%; top:50%; transform:translate(-50%,-50%); z-index:200; width:90%; max-width:560px; }
#modalContent{ background:var(--glass); border-radius:12px; padding:18px; border:1px solid rgba(111,140,255,0.08); }
#modal h2{ color:var(--neon); margin-bottom:6px; }
#modal p{ color:var(--muted); margin-bottom:12px; }
#modal a{ color:var(--accent); font-weight:700; }

/* End screen */
#endScreen{ max-width:520px; background:var(--panel); padding:20px; border-radius:12px; }

/* Footer */
#footer{ position:fixed; bottom:8px; left:50%; transform:translateX(-50%); font-size:12px; color:var(--muted); z-index:120; }

/* Responsive */
@media(max-width:760px){
  #hud{ top:auto; bottom:12px; left:auto; right:12px; transform:none; flex-direction:column; align-items:flex-end; }
  .screen{ width:95%; padding:16px; }
}
