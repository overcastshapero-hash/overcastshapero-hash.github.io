const shell = document.getElementById('film-shell');
const pills = Array.from(document.querySelectorAll('.timeline-pill'));
const panes = Array.from(document.querySelectorAll('.scene-pane'));

let current = 0;
let timer = null;
const duration = 3200;

function setScene(index) {
  current = index;
  shell.className = `film-shell scene-${index}`;
  panes.forEach((pane, paneIndex) => {
    pane.classList.toggle('active', paneIndex === index);
  });
  pills.forEach((pill, pillIndex) => {
    pill.classList.toggle('active', pillIndex === index);
  });
}

function scheduleNext() {
  clearTimeout(timer);
  timer = window.setTimeout(() => {
    setScene((current + 1) % panes.length);
    scheduleNext();
  }, duration);
}

pills.forEach((pill) => {
  pill.addEventListener('click', () => {
    const index = Number(pill.dataset.scene || 0);
    setScene(index);
    scheduleNext();
  });
});

setScene(0);
scheduleNext();
