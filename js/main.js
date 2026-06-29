const galleryImages = [
  { src: 'images/gallery/radionica-01.jpg', alt: 'Početak radionice — predavanje sudionicima' },
  { src: 'images/gallery/radionica-02.jpg', alt: 'Sudionici slušaju upute voditelja' },
  { src: 'images/gallery/radionica-03.jpg', alt: 'Grupni rad u učionici' },
  { src: 'images/gallery/radionica-04.jpg', alt: 'Programiranje na laptopu — Scratch okruženje' },
  { src: 'images/gallery/radionica-05.jpg', alt: 'Timski rad oko računala' },
  { src: 'images/gallery/radionica-06.jpg', alt: 'Sudionici rade na zadacima' },
  { src: 'images/gallery/radionica-07.jpg', alt: 'Grupna rasprava i razmjena ideja' },
  { src: 'images/gallery/radionica-08.jpg', alt: 'Voditelj objašnjava koncepte algoritama' },
  { src: 'images/gallery/radionica-09.jpg', alt: 'Individualni rad sudionika' },
  { src: 'images/gallery/radionica-10.jpg', alt: 'Suradnja između polaznika' },
  { src: 'images/gallery/radionica-11.jpg', alt: 'Dokumentiranje rada — knjiga i smartphone' },
  { src: 'images/gallery/radionica-12.jpg', alt: 'Kreativni trenutak na radionici' },
  { src: 'images/gallery/radionica-13.jpg', alt: 'Sudionici u aktivnom učenju' },
  { src: 'images/gallery/radionica-14.jpg', alt: 'Prezentacija rada pred grupom' },
  { src: 'images/gallery/radionica-15.jpg', alt: 'Timski rad s robotima' },
  { src: 'images/gallery/radionica-16.jpg', alt: 'Sastavljanje LEGO Education robota' },
];

const gallery = document.getElementById('gallery');
galleryImages.forEach((img, i) => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy">`;
  item.addEventListener('click', () => openLightbox(i));
  gallery.appendChild(item);
});

/* Lightbox */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function updateLightbox() {
  const img = galleryImages[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightbox();
}

lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

/* Header scroll */
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* Mobile nav */
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
reveals.forEach((el) => observer.observe(el));
