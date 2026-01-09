const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');
const indicator = document.querySelector('.indicator');
const glow = document.querySelector('.bg-glow');

/* Glow anchor positions per section */
const glowPositions = {
  profile:  { x: '-200px', y: '-200px' },
  projects: { x: '60%',    y: '-150px' },
  skills:   { x: '-150px', y: '55%' },
  contact:  { x: '65%',    y: '50px' }
};

/* Continuous drift */
let driftX = 0;
let driftY = 0;

function animateDrift() {
  driftX += 0.02;
  driftY += 0.015;
  glow.style.transform =
    `translate(${Math.sin(driftX) * 60}px, ${Math.cos(driftY) * 50}px)
     scale(${1 + Math.sin(driftX / 4) * 0.03})`;
  requestAnimationFrame(animateDrift);
}

function moveGlow(target) {
  const pos = glowPositions[target];
  glow.style.transition = 'top 2.5s ease, left 2.5s ease';
  glow.style.left = pos.x;
  glow.style.top = pos.y;
}

function moveIndicator(tab) {
  const rect = tab.getBoundingClientRect();
  const navRect = tab.parentElement.getBoundingClientRect();
  indicator.style.top = `${rect.top - navRect.top}px`;
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');

    moveIndicator(tab);
    moveGlow(tab.dataset.target);
  });
});

/* Init */
moveIndicator(document.querySelector('.tab.active'));
moveGlow('profile');
animateDrift();
