const revealItems = document.querySelectorAll('.reveal');

const aziraProjectGrid = document.querySelector('.projects-section .project-group .project-grid');
if (aziraProjectGrid) {
  const projectOrder = [
    'Demand-side platform',
    'Device identity resolution',
    'Semantic search platform',
    'Campaign Measurement',
    'Shared backend building blocks',
    'Authentication & authorization'
  ];
  const aziraCards = [...aziraProjectGrid.querySelectorAll('.project-card')];
  const sdkCard = aziraCards.find((card) => card.querySelector('h3')?.textContent.trim() === 'Shared backend building blocks');
  if (sdkCard) sdkCard.querySelector('h3').textContent = 'Backend Components as SDKs';
  aziraCards.sort((first, second) => {
    const firstTitle = first.querySelector('h3')?.textContent.trim() === 'Backend Components as SDKs' ? 'Shared backend building blocks' : first.querySelector('h3')?.textContent.trim();
    const secondTitle = second.querySelector('h3')?.textContent.trim() === 'Backend Components as SDKs' ? 'Shared backend building blocks' : second.querySelector('h3')?.textContent.trim();
    return projectOrder.indexOf(firstTitle) - projectOrder.indexOf(secondTitle);
  }).forEach((card) => aziraProjectGrid.appendChild(card));
}

const viewCounter = document.querySelector('.footer-counter img');
if (viewCounter) {
  const counterUrl = new URL(viewCounter.src);
  counterUrl.searchParams.set('v', Date.now().toString());
  viewCounter.src = counterUrl.toString();
}

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isDark ? '#111b1c' : '#fbfaf6');
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light mode' : 'Dark mode';
  themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '◐';
}

setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', nextTheme);
  setTheme(nextTheme);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const navigationLinks = [...document.querySelectorAll('.nav-links a')];
const navigationSections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

navigationSections.forEach((section) => sectionObserver.observe(section));

const scrollStops = [...document.querySelectorAll('.scroll-stop')];
const scrollSections = scrollStops
  .map((stop) => document.getElementById(stop.dataset.section))
  .filter(Boolean);

const scrollRailObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    scrollStops.forEach((stop) => {
      stop.classList.toggle('is-active', stop.dataset.section === entry.target.id);
    });
  });
}, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });

scrollSections.forEach((section) => scrollRailObserver.observe(section));

const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (canHover && !reduceMotion) {
  document.addEventListener('pointermove', (event) => {
    document.documentElement.style.setProperty('--spotlight-x', `${event.clientX}px`);
    document.documentElement.style.setProperty('--spotlight-y', `${event.clientY + window.scrollY}px`);
  }, { passive: true });

  document.querySelectorAll('.highlight-card, .capability-card, .orbit-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -2;
      const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      card.style.setProperty('--tilt-x', `${rotateX}deg`);
      card.style.setProperty('--tilt-y', `${rotateY}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
}
