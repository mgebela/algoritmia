const radionicaImages = [
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
  { src: 'images/gallery/radionica-17.jpg', alt: 'Grupni rad oko LEGO Spike Prime robota u učionici' },
  { src: 'images/gallery/radionica-18.jpg', alt: 'Voditelj objašnjava koncepte na ploči s dijagramom srca' },
  { src: 'images/gallery/radionica-19.jpg', alt: 'Planiranje scene na bijeloj ploči uz sastavljanje robota' },
  { src: 'images/gallery/radionica-20.jpg', alt: 'Dva robota na crvenom srcu — susret Romea i Julije' },
  { src: 'images/gallery/radionica-21.jpg', alt: 'Robot s mobitelom za izraz lica i zvuk' },
];

const predstavaImages = [
  { src: 'images/gallery/predstava-01.jpg', alt: 'Glumac u dramatičnoj pozi uz glazbenika s gitarom' },
  { src: 'images/gallery/predstava-02.jpg', alt: 'Scenska izvedba ispred projekcije algoritma' },
  { src: 'images/gallery/predstava-03.jpg', alt: 'Predstava u dvorani s projektorom i publikom' },
  { src: 'images/gallery/predstava-04.jpg', alt: 'Glumci na pozornici — trenutak iz predstave' },
  { src: 'images/gallery/predstava-05.jpg', alt: 'Izvođač gestikulira pred projekcijom algoritma i publikom' },
  { src: 'images/gallery/predstava-06.jpg', alt: 'Kazališna scena s glumcima i scenskom rasvjetom' },
  { src: 'images/gallery/predstava-07.jpg', alt: 'Interaktivni trenutak između izvođača i publike' },
  { src: 'images/gallery/predstava-08.jpg', alt: 'Izvođač pred publikom — pogled kroz ogradu dvorane' },
  { src: 'images/gallery/predstava-09.jpg', alt: 'Scena predstave s projekcijom na platnu' },
  { src: 'images/gallery/predstava-10.jpg', alt: 'Glumac u crnom pred učenikima i projektorom' },
  { src: 'images/gallery/predstava-11.jpg', alt: 'Ensemble na sceni — grupna izvedba' },
  { src: 'images/gallery/predstava-12.jpg', alt: 'Tri glumca s lančićima ispred projekcije algoritma' },
  { src: 'images/gallery/predstava-13.jpg', alt: 'Dramatičan trenutak iz predstave Algoritmija' },
  { src: 'images/gallery/predstava-14.jpg', alt: 'Scenski rad glumaca uz glazbenu pratnju' },
  { src: 'images/gallery/predstava-15.jpg', alt: 'Scena s ležećim glumcem, ansamblom i dijagramom algoritma' },
  { src: 'images/gallery/predstava-16.jpg', alt: 'Završni trenutak kazališne izvedbe' },
];

const galleries = {
  radionica: radionicaImages,
  predstava: predstavaImages,
};

function galleryLayoutClass(index) {
  if (index === 0) return 'gallery-item--hero';
  if (index === 1) return 'gallery-item--accent';
  if (index === 2) return 'gallery-item--tall';
  if (index % 5 === 3) return 'gallery-item--wide';
  return 'gallery-item--standard';
}

function buildGallery(containerId, images, galleryKey) {
  const container = document.getElementById(containerId);
  images.forEach((img, i) => {
    const item = document.createElement('div');
    item.className = `gallery-item ${galleryLayoutClass(i)}`;
    item.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy">`;
    item.addEventListener('click', () => openLightbox(galleryKey, i));
    container.appendChild(item);
  });
}

buildGallery('gallery-radionica-grid', radionicaImages, 'radionica');
buildGallery('gallery-predstava-grid', predstavaImages, 'predstava');

/* Gallery tabs */
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryPanels = document.querySelectorAll('.gallery-panel');

galleryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.gallery;

    galleryTabs.forEach((t) => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active);
    });

    galleryPanels.forEach((panel) => {
      const active = panel.id === `gallery-${target}`;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  });
});

/* Lightbox */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentGallery = 'radionica';
let currentIndex = 0;

function openLightbox(galleryKey, index) {
  currentGallery = galleryKey;
  currentIndex = index;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  if (!navLinks.classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function currentImages() {
  return galleries[currentGallery];
}

function updateLightbox() {
  const img = currentImages()[currentIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
}

function nextImage() {
  const images = currentImages();
  currentIndex = (currentIndex + 1) % images.length;
  updateLightbox();
}

function prevImage() {
  const images = currentImages();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
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
const navBackdrop = document.querySelector('.nav-backdrop');

function setNavOpen(open) {
  navLinks.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  if (navBackdrop) {
    navBackdrop.classList.toggle('is-visible', open);
    navBackdrop.hidden = !open;
  }
  const lightboxOpen = lightbox && !lightbox.hidden;
  document.body.style.overflow = open || lightboxOpen ? 'hidden' : '';
}

toggle.addEventListener('click', () => {
  setNavOpen(!navLinks.classList.contains('open'));
});

if (navBackdrop) {
  navBackdrop.addEventListener('click', () => setNavOpen(false));
}

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setNavOpen(false));
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
