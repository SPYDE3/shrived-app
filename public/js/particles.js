document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('diya-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * w;
      this.y = h + Math.random() * 200; // Start below screen
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = -(Math.random() * 1.5 + 0.5);
      this.radius = Math.random() * 4 + 2;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 100;
      this.opacity = Math.random() * 0.5 + 0.2;
      
      const colors = [
        '255, 180, 50', // gold
        '255, 107, 26', // saffron
        '255, 200, 80'  // light gold
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      
      // Horizontal drift
      this.vx += (Math.random() - 0.5) * 0.1;
      
      if (this.life > this.maxLife || this.y < -50) {
        this.reset();
      }
    }
    draw() {
      const currentOpacity = this.opacity * (1 - this.life / this.maxLife);
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
      gradient.addColorStop(0, `rgba(${this.color}, ${currentOpacity})`);
      gradient.addColorStop(1, `rgba(${this.color}, 0)`);
      
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  for (let i = 0; i < 70; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
