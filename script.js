// Efecto de hiperespacio al inicio, luego estrellas normales

const STAR_COUNT = 180;
const SPEED = 12;
const MAX_RADIUS = 2.8;
let stars = [];
let hyperSpace = true; // Hiperespacio activo sólo al inicio

function initStars(canvas) {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * canvas.width * 0.4;
    stars.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      angle: angle,
      distance: distance,
      speed: Math.random() * SPEED + 2,
      radius: Math.random() * MAX_RADIUS + 0.5
    });
  }
}

function drawHyperSpace() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let star of stars) {
    star.distance += star.speed;
    const x = canvas.width / 2 + Math.cos(star.angle) * star.distance;
    const y = canvas.height / 2 + Math.sin(star.angle) * star.distance;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#ffe81f";
    ctx.globalAlpha = 0.83;
    ctx.moveTo(x, y);
    ctx.lineTo(
      x - Math.cos(star.angle) * star.speed * 3,
      y - Math.sin(star.angle) * star.speed * 3
    );
    ctx.lineWidth = star.radius;
    ctx.stroke();
    ctx.restore();

    if (
      x < 0 || x > canvas.width ||
      y < 0 || y > canvas.height
    ) {
      star.angle = Math.random() * 2 * Math.PI;
      star.distance = Math.random() * canvas.width * 0.1;
      star.speed = Math.random() * SPEED + 2;
      star.radius = Math.random() * MAX_RADIUS + 0.5;
    }
  }

  if (hyperSpace) {
    requestAnimationFrame(drawHyperSpace);
  }
}

// Efecto de estrellas estáticas (fondo normal)
function drawStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 200; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 1.2 + 0.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe81f';
    ctx.globalAlpha = Math.random() * 0.7 + 0.3;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function resizeCanvas() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (hyperSpace) {
    initStars(canvas);
  }
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', () => {
  resizeCanvas();
  initStars(document.getElementById('stars'));
  drawHyperSpace();
  // Después de 3.5 segundos, cambiamos al fondo estático
  setTimeout(() => {
    hyperSpace = false;
    drawStars();
  }, 3500); // Cambia el tiempo aquí si quieres más o menos segundos
});

// Control de música de fondo
document.getElementById('music-toggle').addEventListener('click', function() {
  const audio = document.getElementById('bgmusic');
  if (audio.paused) {
    audio.play();
    this.textContent = '⏸ Pausar música';
  } else {
    audio.pause();
    this.textContent = '▶️ Reanudar música';
  }
});

// Formulario Google Apps Script
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/library/d/1dye5omjKX3aRyDT1LKMkaSc6iaTDn_8sYtI0P_fQWxb1ONjqoyQS2xc-/1";

document.getElementById("confirmation-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = this.nombre.value;
  const acompanante = this.acompanante.checked ? "Sí" : "No";

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `nombre=${encodeURIComponent(nombre)}&acompanante=${encodeURIComponent(acompanante)}`
  })
  .then(r => r.text())
  .then(res => {
    document.getElementById("response-msg").textContent = "¡Gracias por confirmar!";
    this.reset();
  })
  .catch(() => {
    document.getElementById("response-msg").textContent = "Hubo un error enviando tu confirmación.";
  });
});