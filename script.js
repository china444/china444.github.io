const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let stars = [];
const audio = document.getElementById('backgroundMusic');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.2
  }));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#a855f7';

  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(animate);
}

// Немедленный запуск аудио
function tryPlayAudio() {
  audio.play().then(() => {
    console.log('Аудио воспроизводится');
  }).catch(err => {
    console.error('Ошибка воспроизведения:', err.message);
    // Повторная попытка при взаимодействии
    document.addEventListener('click', tryPlayAudio, { once: true });
    document.addEventListener('keydown', tryPlayAudio, { once: true });
  });
}

// Предзагрузка и запуск аудио при загрузке
document.addEventListener('DOMContentLoaded', () => {
  audio.load(); // Предзагрузка аудио
  tryPlayAudio();
});

window.addEventListener('resize', resize);
resize();
animate();