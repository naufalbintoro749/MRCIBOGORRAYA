// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Close mobile menu on link click
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('hidden');
  });
});

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for fade-in and counters
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger counter if applicable
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Apply fade-in to sections and cards
document.querySelectorAll('section, .stat-card, .event-card, .member-card, .gallery-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Form submission — kirim ke WhatsApp
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nama  = document.getElementById('nama').value.trim();
  const nowa  = document.getElementById('nowa').value.trim();
  const motor = document.getElementById('motor').value.trim();
  const pesan = document.getElementById('pesan').value.trim();

  if (!nama || !nowa || !motor) {
    alert('Mohon isi Nama, Nomor WA, dan Jenis Motor terlebih dahulu.');
    return;
  }

  const teks = `Halo MRC Bogor Raya! 🏍️\n\nSaya ingin mendaftar sebagai member:\n\n👤 Nama: ${nama}\n📱 No WA: ${nowa}\n🏍️ Motor: ${motor}\n📝 ${pesan || 'Tidak ada pesan tambahan.'}\n\nTerima kasih!`;
  const url = `https://wa.me/6282316111208?text=${encodeURIComponent(teks)}`;
  window.open(url, '_blank');
  e.target.reset();
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('text-orange-400');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('text-orange-400');
    }
  });
});
