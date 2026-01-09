const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');
const indicator = document.querySelector('.indicator');

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
  });
});

moveIndicator(document.querySelector('.tab.active'));
