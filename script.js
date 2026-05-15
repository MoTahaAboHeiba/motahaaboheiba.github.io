// =============================================
// TYPING EFFECT FOR HERO ROLE
// =============================================

const roleEl = document.getElementById("typed-role");
const roles = [
  "Data Engineer & AI Engineer",
  "RAG & EduTech Specialist",
  "Cloud & Analytics Engineer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = 200;

function type() {
  const current = roles[roleIndex];
  const text = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);

  if (roleEl) {
    roleEl.textContent = text;
  }

  if (!isDeleting && charIndex === current.length) {
    typingTimeout = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingTimeout = 500;
  }

  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

  setTimeout(type, typingTimeout);
}

// =============================================
// SLIDESHOW PROJECT ORB (5s per image)
// =============================================

const slideshowImages = [
  "img/edumate-rag-1.png",
  "img/online-retail-1.png",
  "img/edu-mate-design-1.png"
  // Add more image paths as needed
];

const orbImg = document.getElementById("slideshow-img");
let currentImgIndex = 0;
let slideshowTimer = null;

function nextImage() {
  currentImgIndex = (currentImgIndex + 1) % slideshowImages.length;
  if (orbImg) {
    orbImg.src = slideshowImages[currentImgIndex];
  }
}

function startSlideshow() {
  if (slideshowImages.length <= 1) return;
  slideshowTimer = setInterval(nextImage, 5000);
}

// Pause on hover
if (orbImg) {
  orbImg.addEventListener("mouseenter", () => {
    if (slideshowTimer) {
      clearInterval(slideshowTimer);
      slideshowTimer = null;
    }
  });

  orbImg.addEventListener("mouseleave", () => {
    if (!slideshowTimer) {
      slideshowTimer = setInterval(nextImage, 5000);
    }
  });
}

// =============================================
// SIMPLE CANVAS PARTICLE BACKGROUND
// =============================================

const canvas = document.getElementById("hero-particles");
const ctx = canvas && canvas.getContext("2d");

if (canvas && ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const numParticles = 100;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function initParticles() {
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1 + Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
        color: "rgba(100, 180, 255, 0.7)"
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(drawParticles);
  }

  initParticles();
  drawParticles();
}

// =============================================
// START BOTH ON DOM READY
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  if (roleEl) {
    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    type();
  }

  startSlideshow();
});
