/* =========================================================================
   Suhasini — QA Automation Engineer Portfolio
   Shared behaviour for all pages. Vanilla JS, no dependencies.

   Features:
     1. Dark / light theme toggle  (IN-MEMORY only — no localStorage)
     2. Mobile hamburger menu
     3. Active-page highlighting in the nav
     4. Scroll-reveal animations (IntersectionObserver)
     5. Animated skill bars
     6. Contact form front-end validation (no backend)
     7. Footer year auto-fill
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. THEME TOGGLE — remembered for the session in a JS variable only.
      (Requirement: no localStorage. The choice persists while the tab is
      open and across in-site navigation is NOT automatic because each page
      is a fresh load — so we also honour the user's OS preference on load.)
   ------------------------------------------------------------------------- */
let currentTheme = 'light'; // in-memory store

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }
}

function initTheme() {
  // On first load, follow the visitor's operating-system preference.
  const prefersDark = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');

  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }
}

/* -------------------------------------------------------------------------
   2. MOBILE HAMBURGER MENU
   ------------------------------------------------------------------------- */
function initMobileNav() {
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (!burger || !links) return;

  function closeMenu() {
    burger.classList.remove('is-open');
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  // Close after tapping a link, or pressing Escape.
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

/* -------------------------------------------------------------------------
   3. ACTIVE-PAGE HIGHLIGHT
      Compares each nav link's filename to the current page.
   ------------------------------------------------------------------------- */
function initActiveNav() {
  let path = window.location.pathname.split('/').pop();
  if (!path || path === '') path = 'index.html';
  document.querySelectorAll('.nav__links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* -------------------------------------------------------------------------
   4. SCROLL REVEAL
   ------------------------------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el) => io.observe(el));
}

/* -------------------------------------------------------------------------
   5. ANIMATED SKILL BARS
      Fills each .skillbar__fill to its data-value (%) when scrolled in.
   ------------------------------------------------------------------------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skillbar__fill');
  if (!bars.length) return;
  if (!('IntersectionObserver' in window)) {
    bars.forEach((b) => { b.style.width = (b.dataset.value || 0) + '%'; });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const b = entry.target;
        b.style.width = (b.dataset.value || 0) + '%';
        io.unobserve(b);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach((b) => io.observe(b));
}

/* -------------------------------------------------------------------------
   6. CONTACT FORM VALIDATION (front-end only — no server)
   ------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const note = document.getElementById('form-note');

  function setInvalid(field, invalid) {
    field.closest('.field').classList.toggle('invalid', invalid);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // never actually posts — static site
    let ok = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim()) { setInvalid(name, true); ok = false; } else setInvalid(name, false);

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (!emailOk) { setInvalid(email, true); ok = false; } else setInvalid(email, false);

    if (message.value.trim().length < 10) { setInvalid(message, true); ok = false; } else setInvalid(message, false);

    if (ok && note) {
      note.textContent = 'Thanks, ' + name.value.trim().split(' ')[0] +
        '! Your message has been captured. (This demo form does not send email — wire it to a service like Formspree or EmailJS to go live.)';
      note.classList.add('show');
      form.reset();
    }
  });
}

/* -------------------------------------------------------------------------
   7. FOOTER YEAR
   ------------------------------------------------------------------------- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* -------------------------------------------------------------------------
   BOOT
   ------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initActiveNav();
  initReveal();
  initSkillBars();
  initContactForm();
  initYear();
});
