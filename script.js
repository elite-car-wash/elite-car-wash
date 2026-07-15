const loader = document.querySelector('.loader');
const cursorGlow = document.querySelector('.cursor-glow');
const progressBar = document.querySelector('.scroll-progress');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const form = document.getElementById('bookingForm');
const formStatus = document.querySelector('.form-status');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter-card strong');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
const compareSlider = document.querySelector('.slider');
const compareAfter = document.querySelector('.compare-after');
const compareHandle = document.querySelector('.compare-handle');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1200);
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
  progressBar.style.transform = `scaleX(${progress})`;

  revealItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 120) item.classList.add('visible');
  });

  counters.forEach((counter) => animateCounter(counter));
});

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

document.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursorGlow.style.opacity = '1';
}, true);

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

let testimonialIndex = 0;
function showTestimonial(index) {
  testimonialCards.forEach((card, i) => card.classList.toggle('active', i === index));
}
function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
  showTestimonial(testimonialIndex);
}
function prevTestimonial() {
  testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
  showTestimonial(testimonialIndex);
}
nextBtn?.addEventListener('click', nextTestimonial);
prevBtn?.addEventListener('click', prevTestimonial);
setInterval(nextTestimonial, 6000);

function animateCounter(counter) {
  if (counter.dataset.animated) return;
  const target = Number(counter.dataset.target || 0);
  let current = 0;
  const duration = 1400;
  const stepTime = 20;
  const stepValue = target / (duration / stepTime);
  const timer = setInterval(() => {
    current += stepValue;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    counter.textContent = Math.floor(current).toLocaleString();
  }, stepTime);
  counter.dataset.animated = 'true';
}

if (compareSlider) {
  compareSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    compareAfter.style.clipPath = `inset(0 0 0 ${value}%)`;
    compareHandle.style.left = `${value}%`;
  });
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const requiredFields = Array.from(form.querySelectorAll('[required]'));
  const empty = requiredFields.some((field) => !field.value.trim());
  if (empty) {
    formStatus.textContent = 'Please fill in all required fields.';
    return;
  }

  formStatus.textContent = 'Preparing your WhatsApp booking...';
  const formData = new FormData(form);
  const message = [
    'Hello Elite Car Wash!',
    `Customer Name: ${formData.get('name')}`,
    `Phone Number: ${formData.get('phone')}`,
    `Vehicle Type: ${formData.get('vehicleType')}`,
    `Vehicle Model: ${formData.get('vehicleModel')}`,
    `Service: ${formData.get('service')}`,
    `Preferred Date: ${formData.get('date')}`,
    `Preferred Time: ${formData.get('time')}`,
    `Special Instructions: ${formData.get('instructions') || 'None'}`
  ].join('%0A');

  setTimeout(() => {
    window.open(`https://wa.me/919906474260?text=${message}`, '_blank', 'noopener,noreferrer');
    formStatus.textContent = 'Redirecting to WhatsApp...';
  }, 700);
});

const navLinksList = document.querySelectorAll('a[href^="#"]');
navLinksList.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

document.querySelector('.back-top')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const rippleButtons = document.querySelectorAll('.btn');
rippleButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = button.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
