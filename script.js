const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');
const indicator = document.querySelector('.indicator');
const glow = document.querySelector('.bg-glow');

const glowPositions = {
  profile:  { x: '-220px', y: '-220px' },
  projects: { x: '58%',    y: '-160px' },
  skills:   { x: '-160px', y: '58%' },
  contact:  { x: '62%',    y: '60px' }
};

let driftX = 0;
let driftY = 0;

function animateDrift() {
  driftX += 0.025;
  driftY += 0.018;

  glow.style.transform =
    `translate(${Math.sin(driftX) * 90}px,
               ${Math.cos(driftY) * 70}px)
     scale(${1 + Math.sin(driftX / 4) * 0.04})`;

  requestAnimationFrame(animateDrift);
}

function moveGlow(target) {
  const pos = glowPositions[target];
  glow.style.transition = 'top 2.8s ease, left 2.8s ease';
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

moveIndicator(document.querySelector('.tab.active'));
moveGlow('profile');
animateDrift();
