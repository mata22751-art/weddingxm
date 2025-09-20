// Efecto de estrellas estilo Star Wars
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

window.addEventListener('resize', drawStars);
window.addEventListener('load', drawStars);

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
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyuFpxNldX0zwNFPyIsNicEoU7xbDGSVVudtoV6nyGl/dev";

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