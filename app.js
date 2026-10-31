'use strict';
/* ════════════════════════════════════════════════════
   PORTFOLIO ENGINE — GSAP + ScrollTrigger
════════════════════════════════════════════════════ */

const C = CONFIG;

/* ── helpers ── */
const $ = id => document.getElementById(id);
const qs  = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const mk  = (tag, cls) => { const el = document.createElement(tag); if (cls) el.className = cls; return el; };
const svgIcon = path => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${path}</svg>`;

const GH_ICON  = svgIcon('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>');
const EXT_ICON = svgIcon('<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>');

/* ════════════════════════════════════════════════════
   1. GSAP SETUP
════════════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults — smooth, professional easing
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

/* ── Smooth momentum scrolling (Lenis) ──────────────────
   Drives the page through GSAP's ticker so ScrollTrigger
   reveals glide instead of snapping. Falls back to native
   scrolling if Lenis is unavailable or motion is reduced. */
let lenis = null;
function initSmoothScroll() {
  if (!window.Lenis) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // smooth expo-out
    smoothWheel: true,
    smoothTouch: false,                                       // native on touch = reliable
    wheelMultiplier: 0.9,
    touchMultiplier: 1.4,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* Smoothly scroll to a target (element or position) using Lenis when present. */
function smoothScrollTo(target, opts = {}) {
  if (lenis) { lenis.scrollTo(target, { duration: 1.2, offset: 0, ...opts }); return; }
  if (typeof target === 'number') { window.scrollTo({ top: target, behavior: 'smooth' }); return; }
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ════════════════════════════════════════════════════
   2. THEME
════════════════════════════════════════════════════ */
(function initTheme() {
  const stored = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', stored || C.theme.defaultMode);

  const slider = qs('.theme-toggle__slider');
  if ((stored || C.theme.defaultMode) === 'light') {
    gsap.set(slider, { x: 24 });
  }

  $('themeToggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    gsap.to(slider, { x: next === 'light' ? 24 : 0, duration: 0.35, ease: 'back.out(2)' });
  });
})();

/* ════════════════════════════════════════════════════
   3. CUSTOM CURSOR
════════════════════════════════════════════════════ */
(function initCursor() {
  if (!C.theme.enableCursor) return;
  const cursor = $('cursor'), dot = $('cursorDot');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  gsap.ticker.add(() => {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    gsap.set(cursor, { x: cx, y: cy });
    gsap.set(dot,    { x: mx, y: my });
  });

  document.addEventListener('mousedown', () => gsap.to(cursor, { scale: 0.75, duration: 0.12 }));
  document.addEventListener('mouseup',   () => gsap.to(cursor, { scale: 1,    duration: 0.4, ease: 'back.out(3)' }));

  qsa('a,button,.tag,.pill,.project-card,.skill-group,.cert-card,.edu-card,.info-card,.timeline__card').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.7, duration: 0.3, ease: 'back.out(2)' }));
    el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1,   duration: 0.3, ease: 'back.out(2)' }));
  });

  // Form fields get the native text (I-beam) cursor via CSS — hide the
  // custom circle over them so it doesn't sit on top and obscure it,
  // making it clear you can click/select/copy/paste in the field.
  qsa('.form-group input, .form-group textarea').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to([cursor, dot], { opacity: 0, duration: 0.15 }));
    el.addEventListener('mouseleave', () => gsap.to([cursor, dot], { opacity: 1, duration: 0.15 }));
  });
})();

/* ════════════════════════════════════════════════════
   4. PARTICLES
════════════════════════════════════════════════════ */
(function initParticles() {
  if (!C.theme.enableParticles) return;
  const canvas = $('particles'), ctx = canvas.getContext('2d');
  let W, H, pts = [];

  const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < C.theme.particleCount; i++) {
    pts.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4, r: Math.random()*1.5+.5 });
  }

  gsap.ticker.add(() => {
    ctx.clearRect(0, 0, W, H);
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    pts.forEach(p => {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = dark ? 'rgba(160,140,220,.5)' : 'rgba(100,60,200,.3)';
      ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.hypot(dx,dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = dark
            ? `rgba(124,58,237,${(1-d/120)*.22})`
            : `rgba(100,50,200,${(1-d/120)*.12})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
  });
})();

/* ════════════════════════════════════════════════════
   5. SCROLL PROGRESS + NAV ACTIVE
════════════════════════════════════════════════════ */
(function initScrollUI() {
  const bar = $('scrollProgress'), nav = $('nav');
  const sections = qsa('section[id]'), links = qsa('.nav__links a');
  const toTop = $('toTop'), toTopProg = $('toTopProg');
  const RING = 2 * Math.PI * 20;            // r = 20
  if (toTopProg) toTopProg.style.strokeDasharray = RING;

  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - innerHeight;
    const ratio = max > 0 ? scrollY / max : 0;
    bar.style.width = (ratio * 100) + '%';
    nav.classList.toggle('scrolled', scrollY > 40);

    if (toTop) {
      toTopProg.style.strokeDashoffset = RING * (1 - ratio);
      toTop.classList.toggle('show', scrollY > 600);
    }

    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 160) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });

  if (toTop) toTop.addEventListener('click', () => smoothScrollTo(0));
})();

/* ════════════════════════════════════════════════════
   6. HERO ENTRANCE — GSAP timeline
════════════════════════════════════════════════════ */
function animateHeroEntrance() {
  const tl = gsap.timeline({ delay: 0.15 });

  // Nav slides down
  tl.fromTo($('nav'),
    { y: -80, opacity: 0 },
    { y: 0,   opacity: 1, duration: 0.7, ease: 'power3.out' }
  );

  // Hero text elements stagger in
  const heroEls = [
    qs('.hero__eyebrow'),
    qs('.hero__name'),
    qs('.hero__role'),
    qs('.hero__tagline'),
    qs('.hero__actions'),
    qs('.hero__stats'),
  ].filter(Boolean);

  tl.fromTo(heroEls,
    { y: 50, opacity: 0 },
    { y: 0,  opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
    '-=0.4'
  );

  // Avatar bounces in
  tl.fromTo(qs('.hero__visual'),
    { scale: 0.6, opacity: 0 },
    { scale: 1,   opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' },
    '-=0.7'
  );

  // Orbit chips pop in
  tl.fromTo(qsa('.orbit-chip'),
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(2.5)' },
    '-=0.5'
  );

  // Scroll hint
  tl.fromTo(qs('.hero__scroll-hint'),
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0,  duration: 0.6 },
    '-=0.2'
  );
}

/* ════════════════════════════════════════════════════
   7. SCROLL-TRIGGERED REVEALS — ScrollTrigger
════════════════════════════════════════════════════ */
/* helper — fromTo with scrollTrigger */
function st(els, from, to, triggerEl) {
  if (!els || (Array.isArray(els) && !els.length)) return;
  const trigger = triggerEl || (Array.isArray(els) ? els[0] : els);
  gsap.fromTo(els, from, {
    ...to,
    scrollTrigger: { trigger, start: 'top 88%', once: true },
  });
}

function initScrollReveal() {

  // Section labels
  qsa('.section__label').forEach(el =>
    st(el, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }));

  // Section titles — blur + rise
  qsa('.section__title').forEach(el =>
    st(el, { y: 40, opacity: 0, filter: 'blur(10px)' },
           { y: 0,  opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }));

  // Section subtitles
  qsa('.section__sub').forEach(el =>
    st(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.1 }));

  // About text
  const aboutTxt = qs('.about__text');
  if (aboutTxt) st(aboutTxt,
    { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });

  // About sidebar
  const aboutSide = qs('.about__sidebar');
  if (aboutSide) st(aboutSide,
    { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });

  // Info cards stagger
  const aboutCards = qsa('.info-card');
  if (aboutCards.length) st(aboutCards,
    { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' });

  // Skill groups — rise & tilt up in 3D
  const skillGroups = qsa('.skill-group');
  if (skillGroups.length) st(skillGroups,
    { y: 70, opacity: 0, rotationX: -24, transformPerspective: 900, transformOrigin: '50% 100%' },
    { y: 0,  opacity: 1, rotationX: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' });

  // Timeline items
  qsa('.timeline__item').forEach((item, i) =>
    st(item,
      { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }));

  // Featured project cards — rise & tilt up in 3D
  const featuredCards = qsa('.project-card');
  if (featuredCards.length) st(featuredCards,
    { y: 80, opacity: 0, rotationX: -20, transformPerspective: 1000, transformOrigin: '50% 100%' },
    { y: 0,  opacity: 1, rotationX: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' });

  // Small project cards
  const smallCards = qsa('.project-small');
  if (smallCards.length) st(smallCards,
    { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' });

  // Education cards — swing in on the Y axis
  const eduCards = qsa('.edu-card');
  if (eduCards.length) st(eduCards,
    { y: 50, opacity: 0, rotationY: -18, transformPerspective: 1000, transformOrigin: '0% 50%' },
    { y: 0,  opacity: 1, rotationY: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out' });

  // Cert cards — flip in on the Y axis
  const certCards = qsa('.cert-card');
  if (certCards.length) st(certCards,
    { opacity: 0, rotationY: -55, scale: 0.9, transformPerspective: 800, transformOrigin: '50% 50%' },
    { opacity: 1, rotationY: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' });

  // Contact items
  const cItems = qsa('.contact__item');
  if (cItems.length) st(cItems,
    { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' });

  // Contact form
  const cForm = qs('.contact__form');
  if (cForm) st(cForm,
    { x: 40, opacity: 0, scale: 0.97 },
    { x: 0,  opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' });
}

/* ════════════════════════════════════════════════════
   8. SKILL BARS — ScrollTrigger animate width
════════════════════════════════════════════════════ */
function initSkillBars() {
  qsa('.skill-group').forEach(group => {
    ScrollTrigger.create({
      trigger: group,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        qsa('.skill-item__fill', group).forEach((fill, i) => {
          gsap.fromTo(fill,
            { width: '0%' },
            { width: fill.dataset.level + '%', duration: 1.2, delay: i * 0.09, ease: 'power2.out' }
          );
        });
      }
    });
  });
}

/* ════════════════════════════════════════════════════
   9. COUNTER ANIMATION
════════════════════════════════════════════════════ */
function initCounters() {
  const statsEl = $('heroStats');
  if (!statsEl) return;
  ScrollTrigger.create({
    trigger: statsEl, start: 'top 85%', once: true,
    onEnter: () => {
      qsa('.stat__num', statsEl).forEach(el => {
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const decimals = (el.dataset.target.split('.')[1] || '').length;
        gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: function() { el.textContent = this.targets()[0].val.toFixed(decimals); },
          onComplete: () => { el.textContent = target + suffix; }
        });
      });
    }
  });
}

/* ════════════════════════════════════════════════════
   10. HOVER ANIMATIONS — GSAP quickTo for performance
════════════════════════════════════════════════════ */
function initHoverAnimations() {

  // Project cards
  qsa('.project-card').forEach(card => {
    const yTo = gsap.quickTo(card, 'y', { duration: 0.4, ease: 'back.out(2)' });
    card.addEventListener('mouseenter', () => yTo(-10));
    card.addEventListener('mouseleave', () => yTo(0));
  });

  // Small project, cert & education cards
  qsa('.project-small, .cert-card, .edu-card').forEach(card => {
    const yTo = gsap.quickTo(card, 'y', { duration: 0.35, ease: 'back.out(2)' });
    card.addEventListener('mouseenter', () => yTo(-6));
    card.addEventListener('mouseleave', () => yTo(0));
  });

  // Timeline cards
  qsa('.timeline__card').forEach(card => {
    const xTo = gsap.quickTo(card, 'x', { duration: 0.35, ease: 'power3.out' });
    card.addEventListener('mouseenter', () => xTo(8));
    card.addEventListener('mouseleave', () => xTo(0));
  });

  // Info / contact cards
  qsa('.info-card, .contact__item').forEach(card => {
    const xTo = gsap.quickTo(card, 'x', { duration: 0.3, ease: 'power3.out' });
    card.addEventListener('mouseenter', () => xTo(8));
    card.addEventListener('mouseleave', () => xTo(0));
  });

  // Tags + pills
  qsa('.tag, .pill').forEach(el => {
    el.addEventListener('mouseenter', () =>
      gsap.to(el, { y: -4, scale: 1.06, duration: 0.25, ease: 'back.out(3)' }));
    el.addEventListener('mouseleave', () =>
      gsap.to(el, { y: 0,  scale: 1,    duration: 0.3,  ease: 'power2.out' }));
  });

  // Buttons
  qsa('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () =>
      gsap.to(btn, { y: -3, duration: 0.25, ease: 'back.out(2)' }));
    btn.addEventListener('mouseleave', () =>
      gsap.to(btn, { y: 0,  duration: 0.3,  ease: 'power2.out' }));
    btn.addEventListener('mousedown', () =>
      gsap.to(btn, { scale: 0.95, duration: 0.1 }));
    btn.addEventListener('mouseup', () =>
      gsap.to(btn, { scale: 1, duration: 0.35, ease: 'back.out(3)' }));
  });

  // Nav logo
  const logo = qs('.nav__logo');
  if (logo) {
    logo.addEventListener('mouseenter', () =>
      gsap.to(logo, { scale: 1.08, duration: 0.25, ease: 'back.out(2)' }));
    logo.addEventListener('mouseleave', () =>
      gsap.to(logo, { scale: 1, duration: 0.3, ease: 'power2.out' }));
  }
}

/* ════════════════════════════════════════════════════
   11. 3D TILT — GSAP quickTo rotateX/Y
════════════════════════════════════════════════════ */
function initTilt(el) {
  if (!C.theme.enableTilt) return;
  if (matchMedia('(hover: none)').matches) return;   // skip on touch
  gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d', transformOrigin: 'center' });

  const ease = 'power3.out';
  const rxTo = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease });
  const ryTo = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease });
  const zTo  = gsap.quickTo(el, 'z',         { duration: 0.5, ease });
  const sTo  = gsap.quickTo(el, 'scale',     { duration: 0.5, ease });
  const MAX = 9;

  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    rxTo(-y * MAX); ryTo(x * MAX);
  });
  el.addEventListener('mouseenter', () => {
    gsap.set(el, { transformOrigin: 'center' });   // reset origin left by the 3D entrance reveal
    zTo(38); sTo(1.015);                            // card lifts toward you
  });
  el.addEventListener('mouseleave', () => { rxTo(0); ryTo(0); zTo(0); sTo(1); });
}

/* ════════════════════════════════════════════════════
   11b. AVATAR 3D — floats & tilts in space with the mouse
════════════════════════════════════════════════════ */
function initAvatar3D() {
  const wrap = qs('.avatar-wrap');
  if (!wrap || matchMedia('(hover: none)').matches) return;
  gsap.set(wrap, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
  const rxTo = gsap.quickTo(wrap, 'rotationX', { duration: 1,   ease: 'power2.out' });
  const ryTo = gsap.quickTo(wrap, 'rotationY', { duration: 1,   ease: 'power2.out' });
  const xTo  = gsap.quickTo(wrap, 'x',         { duration: 1.2, ease: 'power2.out' });

  window.addEventListener('mousemove', e => {
    const dx = e.clientX / innerWidth  - 0.5;
    const dy = e.clientY / innerHeight - 0.5;
    ryTo(dx * 18);
    rxTo(-dy * 18);
    xTo(dx * 12);                 // gentle horizontal drift (vertical is owned by scroll parallax)
  }, { passive: true });
}

/* ════════════════════════════════════════════════════
   12. PARALLAX
════════════════════════════════════════════════════ */
function initParallax() {
  // Avatar drifts up on hero scroll
  const wrap = qs('.avatar-wrap');
  if (wrap) {
    gsap.to(wrap, {
      y: 60, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
  }

  // (avatar mouse parallax handled in 3D by initAvatar3D)

  // Subtle section title parallax
  qsa('.section__title').forEach(el => {
    gsap.to(el, {
      y: -20, ease: 'none',
      scrollTrigger: { trigger: el.closest('.section'), start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });
  });
}

/* ════════════════════════════════════════════════════
   12b. MAGNETIC ELEMENTS — pull toward the cursor
════════════════════════════════════════════════════ */
function initMagnetic() {
  if (matchMedia('(hover: none)').matches) return;
  qsa('.nav__cta, .hero__actions .btn--primary, .footer__socials a, [data-magnetic]').forEach(el => {
    const strength = 0.45;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width  / 2)) * strength);
      yTo((e.clientY - (r.top  + r.height / 2)) * strength);
    });
    el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
  });
}

/* ════════════════════════════════════════════════════
   12c. CARD SPOTLIGHT — radial glow follows the pointer
════════════════════════════════════════════════════ */
function initSpotlight() {
  if (matchMedia('(hover: none)').matches) return;
  qsa('.skill-group, .project-card, .cert-card, .edu-card, .timeline__card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
    });
  });
}

/* ════════════════════════════════════════════════════
   12d. PRELOADER — count up, then lift the curtain
════════════════════════════════════════════════════ */
function setHeroInitialState() {
  gsap.set('#nav', { y: -80, opacity: 0 });
  const heroEls = ['.hero__eyebrow', '.hero__name', '.hero__role', '.hero__tagline', '.hero__actions', '.hero__stats']
    .map(s => qs(s)).filter(Boolean);
  gsap.set(heroEls, { y: 50, opacity: 0 });
  gsap.set('.hero__visual', { scale: 0.6, opacity: 0 });
  gsap.set('.hero__scroll-hint', { opacity: 0, y: 16 });
}

function initPreloader(done) {
  const pre = $('preloader');
  if (!pre) { done(); return; }
  const logo = $('preloaderLogo'), fill = $('preloaderFill'), pct = $('preloaderPct');
  if (logo) logo.textContent = C.personal.name;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pre.style.display = 'none';
    done();
    return;
  }

  const counter = { v: 0 };
  const tl = gsap.timeline();
  tl.to(counter, {
    v: 100, duration: 1.5, ease: 'power2.inOut',
    onUpdate() {
      const n = Math.round(counter.v);
      if (pct)  pct.textContent = n + '%';
      if (fill) fill.style.width = n + '%';
    }
  });
  tl.to('.preloader__inner', { opacity: 0, y: -24, duration: 0.4, ease: 'power2.in' }, '+=0.12');
  tl.to(pre, {
    yPercent: -100, duration: 0.8, ease: 'power4.inOut',
    onStart: () => done(),                       // launch hero entrance as the curtain lifts
    onComplete() { pre.style.display = 'none'; }
  }, '-=0.05');
}

/* ════════════════════════════════════════════════════
   13. TYPEWRITER
════════════════════════════════════════════════════ */
(function initTypewriter() {
  const el = $('typewriter'), roles = C.personal.roles;
  let ri = 0, ci = 0, del = false;
  function tick() {
    const w = roles[ri];
    if (!del) {
      el.textContent = w.slice(0, ++ci);
      if (ci === w.length) { del = true; setTimeout(tick, 2000); return; }
      setTimeout(tick, 72);
    } else {
      el.textContent = w.slice(0, --ci);
      if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
      setTimeout(tick, 36);
    }
  }
  tick();
})();

/* ════════════════════════════════════════════════════
   14. TEXT SCRAMBLE
════════════════════════════════════════════════════ */
(function initScramble() {
  const el = $('heroName'), target = C.personal.name;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
  let frame = 0;
  function run() {
    el.textContent = target.split('').map((c, i) =>
      c === ' ' ? ' ' : i < frame / 2 ? c : chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    frame++;
    if (frame < target.length * 2 + 12) requestAnimationFrame(run);
    else el.textContent = target;
  }
  setTimeout(run, 500);
})();

/* ════════════════════════════════════════════════════
   15. MOBILE NAV
════════════════════════════════════════════════════ */
(function initMobileNav() {
  const burger = $('burger'), menu = $('mobileMenu');
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    menu.classList.toggle('open', open);
    if (open) {
      gsap.from(menu, { opacity: 0, y: -12, duration: 0.35, ease: 'power3.out' });
      gsap.from(qsa('a', menu), { opacity: 0, x: -20, duration: 0.4, stagger: 0.06, ease: 'power3.out' });
    }
  });
  qsa('a', menu).forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open'); menu.classList.remove('open');
  }));
})();

/* ════════════════════════════════════════════════════
   15b. CONTENT PROTECTION
   Deters casual right-click / copy / drag-save of page
   content. Elements (or ancestors) marked .allow-copy —
   the email and phone in About/Contact — are exempt, so
   recruiters can still grab your contact details. Inputs
   and textareas are always exempt too (the contact form
   must stay fully editable/copy-pasteable).

   NOTE — this is a deterrent, not real security. Anyone
   can still view source, disable JavaScript, or use their
   browser's dev tools before this script runs; no client-
   side script can truly prevent that.
════════════════════════════════════════════════════ */
(function initContentProtection() {
  let lastToast = 0;
  const notify = msg => {
    const now = Date.now();
    if (now - lastToast < 2500) return;   // throttle so rapid attempts don't spam toasts
    lastToast = now;
    showToast(msg, 'error');
  };

  const isExempt = target =>
    !!target.closest?.('input, textarea, .allow-copy, [contenteditable="true"]');

  document.addEventListener('contextmenu', e => {
    if (isExempt(e.target)) return;
    e.preventDefault();
    notify('Right-click is disabled on this page.');
  });

  ['copy', 'cut'].forEach(evt => {
    document.addEventListener(evt, e => {
      if (isExempt(e.target)) return;
      e.preventDefault();
      notify(evt === 'copy' ? 'Copying is disabled on this page.' : 'Cutting is disabled on this page.');
    });
  });

  document.addEventListener('selectstart', e => {
    if (isExempt(e.target)) return;
    e.preventDefault();
  });

  document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG' && !isExempt(e.target)) e.preventDefault();
  });

  // Best-effort only — modern Chrome/Firefox ignore these for their own
  // DevTools shortcuts, but some browsers/older versions still respect them.
  document.addEventListener('keydown', e => {
    const k = e.key.toLowerCase();
    const blockCombo =
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(k)) ||
      (e.ctrlKey && (k === 'u' || k === 's'));
    if (blockCombo) { e.preventDefault(); notify('Developer tools are disabled on this page.'); }
  });
})();

/* ════════════════════════════════════════════════════
   16. CONTACT FORM — WhatsApp / Email channel picker
════════════════════════════════════════════════════ */

/* Recipient — pulled from CONFIG so it stays in sync */
const WA_PHONE = (C.personal.phone || '').replace(/\D/g, '');   // digits only, e.g. 918975674089
const TO_EMAIL = C.personal.email;

/* Build the visitor's message in WhatsApp + email formats */
function composeMessage({ name, email, subject, message }) {
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const subj = subject || 'New portfolio enquiry';
  return {
    waText: `📬 *New message from your portfolio*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subj}\n\n💬 *Message:*\n${message}\n\n⏰ ${time}`,
    mailSubject: `Portfolio — ${subj}`,
    mailBody: `Name: ${name}\nEmail: ${email}\nSubject: ${subj}\n\nMessage:\n${message}\n\n— Sent from your portfolio site on ${time}`,
  };
}

function showToast(msg, type = 'success') {
  const t = mk('div');
  Object.assign(t.style, {
    position: 'fixed', bottom: '28px', right: '28px', zIndex: '9999',
    padding: '14px 22px', borderRadius: '14px', fontSize: '.875rem', fontWeight: '600',
    display: 'flex', alignItems: 'center', gap: '10px',
    background: type === 'success'
      ? 'linear-gradient(135deg,#10b981,#059669)'
      : 'linear-gradient(135deg,#ef4444,#dc2626)',
    color: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,.3)',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    opacity: 0, transform: 'translateY(20px) scale(0.9)',
  });
  t.textContent = (type === 'success' ? '✓  ' : '✕  ') + msg;
  document.body.appendChild(t);
  gsap.to(t, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' });
  setTimeout(() => {
    gsap.to(t, { opacity: 0, y: 16, scale: 0.9, duration: 0.35, ease: 'power2.in',
      onComplete: () => t.remove() });
  }, 4200);
}

/* ── Validation rule sets ───────────────────────────── */
const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','guerrillamail.com','guerrillamailblock.com','sharklasers.com','grr.la',
  '10minutemail.com','10minutemail.net','tempmail.com','temp-mail.org','tempmailo.com','tmail.com',
  'throwawaymail.com','yopmail.com','yopmail.net','getnada.com','nada.email','trashmail.com',
  'dispostable.com','maildrop.cc','fakeinbox.com','mailnesia.com','mintemail.com','mailcatch.com',
  'mohmal.com','emailondeck.com','spam4.me','moakt.com','mvrht.com','spamgourmet.com','discard.email',
  'inboxbear.com','tempinbox.com','mytemp.email','fakemail.net','tempr.email','dropmail.me',
  'example.com','example.org','example.net','test.com','email.com','domain.com','mail.com',
]);

const TYPO_DOMAINS = {
  'gmial.com':'gmail.com','gmai.com':'gmail.com','gmal.com':'gmail.com','gmil.com':'gmail.com',
  'gamil.com':'gmail.com','gnail.com':'gmail.com','gmaill.com':'gmail.com','gmail.co':'gmail.com',
  'gmail.con':'gmail.com','gmail.cm':'gmail.com','gmail.comm':'gmail.com','gmail.om':'gmail.com',
  'gmsil.com':'gmail.com','gmial.co':'gmail.com','gmaul.com':'gmail.com',' gmail.com':'gmail.com',
  'hotmial.com':'hotmail.com','hotmai.com':'hotmail.com','hotmal.com':'hotmail.com','hotmil.com':'hotmail.com',
  'yahooo.com':'yahoo.com','yaho.com':'yahoo.com','yahho.com':'yahoo.com','yahoo.co':'yahoo.com',
  'outlok.com':'outlook.com','outloo.com':'outlook.com','outlook.co':'outlook.com','iclod.com':'icloud.com',
};

const FAKE_LOCALPARTS = new Set([
  'test','tests','testing','test123','testtest','fake','faker','fakeemail','asdf','asdfasdf','asdfgh',
  'qwerty','qwertyuiop','abc','abcd','abcde','abcdef','xxx','xxxx','aaa','aaaa','zzz','zzzz','none',
  'na','nil','null','noreply','no-reply','donotreply','example','sample','demo','user','users',
  'admin','foo','bar','foobar','baz','anonymous','anon','dummy','temp','temporary','nobody',
  'nothing','whatever','blah','asd','qwe','lorem','ipsum','email','mail',
]);

const FAKE_NAMES = new Set([
  'test','testing','test test','asdf','asdfasdf','qwerty','fake','fake name','name','none','na',
  'nobody','anonymous','anon','user','admin','dummy','xxx','abc','abcd','lorem ipsum','john doe',
]);

function validateName(raw) {
  const v = raw.trim();
  if (!v)            return 'Please enter your name.';
  if (v.length < 2)  return 'Name is too short.';
  if (v.length > 60) return 'Name is too long.';
  if (/\d/.test(v))             return 'Name should not contain numbers.';
  if (/(https?:|www\.|@)/i.test(v)) return 'Please enter a valid name.';
  if (/^(.)\1+$/.test(v.replace(/\s/g, ''))) return 'Please enter your real name.';
  if (FAKE_NAMES.has(v.toLowerCase()))       return 'Please enter your real name.';
  if (!/^[A-Za-zÀ-ɏ]+(?:[ '.\-][A-Za-zÀ-ɏ]+)*$/.test(v))
    return 'Use letters, spaces, hyphens or apostrophes only.';
  return '';
}

function validateEmail(raw) {
  const v = raw.trim();
  if (!v)            return 'Please enter your email address.';
  if (/\s/.test(v))  return 'Email cannot contain spaces.';
  const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
  if (!EMAIL_RE.test(v)) return 'Please enter a valid email address.';

  const lower = v.toLowerCase();
  const at = lower.lastIndexOf('@');
  const local = lower.slice(0, at);
  const domain = lower.slice(at + 1);

  const base = local.split('+')[0];   // ignore "+alias" sub-addressing

  if (TYPO_DOMAINS[domain])        return `Did you mean @${TYPO_DOMAINS[domain]}? Please check your email.`;
  if (DISPOSABLE_DOMAINS.has(domain)) return 'Temporary / disposable emails are not allowed.';
  if (FAKE_LOCALPARTS.has(local) || FAKE_LOCALPARTS.has(base)) return 'Please enter your real email address.';
  if (/^(.)\1+$/.test(base))       return 'Please enter your real email address.';
  if (/^\d+$/.test(base))          return 'Please enter your real email address.';

  // Gmail / Google Mail — enforce Google's actual account rules
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    if (!/^[a-z0-9.]+$/.test(base))  return 'A Gmail address uses only letters, numbers and dots.';
    if (base.startsWith('.') || base.endsWith('.')) return 'A Gmail address cannot start or end with a dot.';
    if (base.includes('..'))         return 'A Gmail address cannot contain consecutive dots.';
    const bare = base.replace(/\./g, '');
    if (bare.length < 6)  return 'A real Gmail username is at least 6 characters.';
    if (bare.length > 30) return 'A Gmail username is at most 30 characters.';
  }
  return '';
}

function validateSubject(raw) {
  const v = raw.trim();
  if (v && v.length > 100) return 'Subject is too long (max 100 characters).';
  return '';
}

function validateMessage(raw) {
  const v = raw.trim();
  if (!v)             return 'Please enter a message.';
  if (v.length < 10)  return 'Message is too short — please write at least 10 characters.';
  if (v.length > 1500) return 'Message is too long (max 1500 characters).';
  if (/^(.)\1+$/.test(v.replace(/\s/g, ''))) return 'Please enter a real message.';
  if (!/[A-Za-z]/.test(v)) return 'Please enter a meaningful message.';
  return '';
}

(function initContactForm() {
  const form     = $('contactForm');
  const choice   = $('sendChoice');
  const sendBtn  = $('sendBtn');
  const waLink   = $('waSendLink');
  const mailLink = $('emailSendLink');
  const backBtn  = $('sendBack');
  if (!form || !choice) return;

  /* field → validator + error slot */
  const FIELDS = [
    { input: 'f-name',    err: 'err-name',    fn: validateName,    optional: false },
    { input: 'f-email',   err: 'err-email',   fn: validateEmail,   optional: false },
    { input: 'f-subject', err: 'err-subject', fn: validateSubject, optional: true  },
    { input: 'f-msg',     err: 'err-msg',     fn: validateMessage, optional: false },
  ];

  function setFieldState(input, errId, msg) {
    const group = input.closest('.form-group');
    const errEl = $(errId);
    if (msg) {
      group.classList.add('is-invalid');
      group.classList.remove('is-valid');
      if (errEl) errEl.textContent = msg;
    } else {
      group.classList.remove('is-invalid');
      group.classList.toggle('is-valid', input.value.trim().length > 0);
      if (errEl) errEl.textContent = '';
    }
    return !msg;
  }

  function validateField(f) {
    const input = $(f.input);
    return setFieldState(input, f.err, f.fn(input.value));
  }

  function validateForm() {
    let firstInvalid = null;
    FIELDS.forEach(f => { if (!validateField(f) && !firstInvalid) firstInvalid = $(f.input); });
    if (firstInvalid) {
      const group = firstInvalid.closest('.form-group');
      group.classList.remove('shake');
      void group.offsetWidth;          // restart the shake animation
      group.classList.add('shake');
      firstInvalid.focus({ preventScroll: false });
      return false;
    }
    return true;
  }

  function clearValidation() {
    FIELDS.forEach(f => {
      const group = $(f.input).closest('.form-group');
      group.classList.remove('is-invalid', 'is-valid', 'shake');
      const errEl = $(f.err); if (errEl) errEl.textContent = '';
    });
    updateCount();
  }

  /* live validation — validate on blur, clear/re-check while typing */
  FIELDS.forEach(f => {
    const input = $(f.input);
    input.addEventListener('blur', () => {
      if (input.value.trim() || !f.optional) validateField(f);
    });
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group.classList.contains('is-invalid')) validateField(f);   // re-check once flagged
    });
  });

  /* message character counter */
  const msg = $('f-msg'), count = $('msgCount'), MAX = 1500;
  function updateCount() {
    if (!msg || !count) return;
    const n = msg.value.length;
    count.textContent = `${n} / ${MAX}`;
    count.classList.toggle('is-near', n > MAX * 0.9);
  }
  if (msg) msg.addEventListener('input', updateCount);

  function revealChoice() {
    choice.hidden = false;
    sendBtn.style.display = 'none';
    gsap.fromTo(choice, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
    gsap.fromTo(qsa('.btn', choice),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' });
  }

  function resetChoice(clearForm) {
    choice.hidden = true;
    sendBtn.style.display = '';
    if (clearForm) { form.reset(); clearValidation(); }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) { showToast('Please fix the highlighted fields.', 'error'); return; }
    if (!WA_PHONE && !TO_EMAIL) { showToast('No contact channel configured.', 'error'); return; }

    const data = {
      name:    $('f-name').value.trim(),
      email:   $('f-email').value.trim(),
      subject: $('f-subject').value.trim(),
      message: $('f-msg').value.trim(),
    };
    const m = composeMessage(data);
    waLink.href   = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(m.waText)}`;
    mailLink.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(m.mailSubject)}&body=${encodeURIComponent(m.mailBody)}`;
    revealChoice();
  });

  function onDeliver(channel) {
    showToast(`Opening ${channel}… tap send there to deliver your message.`);
    setTimeout(() => resetChoice(true), 2800);
  }
  waLink.addEventListener('click',   () => onDeliver('WhatsApp'));
  mailLink.addEventListener('click', () => onDeliver('Email'));
  backBtn.addEventListener('click',  () => resetChoice(false));
})();

/* ════════════════════════════════════════════════════
   17. BUILD DOM FROM CONFIG
════════════════════════════════════════════════════ */
function buildNav() {
  $('navLogo').textContent = C.personal.name;
  const ul = $('navLinks'), mob = $('mobileMenu');
  C.navLinks.forEach(l => {
    const li = mk('li'), a = mk('a');
    a.href = l.href; a.textContent = l.label;
    li.appendChild(a); ul.appendChild(li);
    const ma = mk('a'); ma.href = l.href; ma.textContent = l.label; mob.appendChild(ma);
  });
  const resumeBtn = $('resumeBtn');
  resumeBtn.href = C.personal.resume;
  resumeBtn.target = '_blank';
  resumeBtn.rel = 'noopener noreferrer';
}

/* ════════════════════════════════════════════════════
   ORBIT — revolving tech-concept badges around the avatar
   Three counter-rotating rings of compact, fixed-size
   badges (not long text pills) — a badge's footprint is
   uniform in every direction, so overlap math is simple:
   two badges are safe whenever center-distance exceeds
   ~74px (their combined bounding-circle diameter).

   All 3 rings hold the SAME chip count (6) and are phased
   20° apart — like an 18-tooth gear — so every badge in
   one ring sits at a guaranteed ≥20° angular gap from its
   nearest neighbors in the adjacent ring, at every instant
   of rotation *and* in the permanently-frozen reduced-
   motion state. Radii below were solved so that a 20° gap
   always clears the 74px safety distance with margin.
   Abbreviated labels carry a native title= tooltip with
   the full name — hover/long-press to see it spelled out.

   Radii were solved from the ACTUAL rendered pill sizes
   (measured headlessly, not guessed): ring0 max 90×34px,
   ring1 max 84×34px, ring2 max 71×34px.

   IMPORTANT: all three rings share the exact same duration
   AND direction. This is deliberate, not an oversight — if
   rings spun at different speeds (even "counter-rotating"),
   their *relative* phase would drift continuously, meaning
   any initially-safe 20°/40° gap would inevitably rotate
   back into alignment sooner or later (verified empirically:
   an earlier counter-rotating version produced ~1.5 collided
   pairs per second on average once running). With identical
   speed+direction, the safe starting arrangement (verified
   zero-overlap via the frozen reduced-motion snapshot) is
   preserved permanently — the whole assembly just turns
   together, like a fixed constellation.
════════════════════════════════════════════════════ */
const ORBIT_DUR = 70;
const ORBIT_RINGS = [
  { frac: 0.97, dur: ORBIT_DUR, dir: 1, ringColor: '#a78bfa', chips: [   // .NET / data — also the only ring shown on mobile
    { t: 'EF Core',   c: '#a78bfa', full: 'Entity Framework Core' },
    { t: 'Code-1st',  c: '#c4b5fd', full: 'Code-First Migrations' },
    { t: 'DB-1st',    c: '#93c5fd', full: 'Database-First Approach' },
    { t: 'LINQ',      c: '#a78bfa', full: 'LINQ' },
    { t: 'Dapper',    c: '#93c5fd', full: 'Dapper Micro-ORM' },
    { t: 'Angular',   c: '#f87171', full: 'Angular' },
  ]},
  { frac: 1.30, dur: ORBIT_DUR, dir: 1, ringColor: '#22d3ee', phase: Math.PI / 9, chips: [   // Azure / messaging
    { t: 'Blob',      c: '#22d3ee', full: 'Azure Blob Storage' },
    { t: 'Azure Fn',  c: '#34d399', full: 'Azure Functions' },
    { t: 'Svc Bus',   c: '#22d3ee', full: 'Azure Service Bus' },
    { t: 'HTTP',      c: '#5eead4', full: 'HTTP Trigger' },
    { t: 'Timer',     c: '#34d399', full: 'Timer Trigger' },
    { t: 'App Svc',   c: '#5eead4', full: 'Azure App Services' },
  ]},
  { frac: 1.35, dur: ORBIT_DUR, dir: 1, ringColor: '#f59e0b', phase: 2 * Math.PI / 9, chips: [   // architecture / tooling
    { t: 'SOLID',     c: '#f59e0b', full: 'SOLID Principles' },
    { t: 'Repo',      c: '#fbbf24', full: 'Repository Pattern' },
    { t: 'UoW',       c: '#fb923c', full: 'Unit of Work' },
    { t: 'JWT',       c: '#f472b6', full: 'JWT & RBAC Security' },
    { t: 'DI',        c: '#fbbf24', full: 'Dependency Injection' },
    { t: 'CI/CD',     c: '#fb923c', full: 'CI/CD Pipelines' },
  ]},
];
let ORBIT_ITEMS = [];
let ORBIT_TRACKS = [];

function buildOrbit(orbitEl) {
  if (!orbitEl) return;
  ORBIT_ITEMS = [];
  ORBIT_TRACKS = [];
  let chipIndex = 0;

  ORBIT_RINGS.forEach((ring, ri) => {
    // one faint radar sonar pulse per ring track
    const track = mk('span', 'orbit-track orbit-track--r' + ri);
    track.style.color = ring.ringColor;
    track.style.animationDelay = (ri * 1.4) + 's';
    orbitEl.appendChild(track);
    ORBIT_TRACKS.push({ el: track, frac: ring.frac });

    const n = ring.chips.length;
    ring.chips.forEach((c, i) => {
      const el = mk('span', 'orbit-chip orbit-chip--r' + ri);
      el.innerHTML = `<span class="orbit-chip__dot"></span><span>${c.t}</span>`;
      el.style.color = c.c;
      el.title = c.full || c.t;
      el.style.setProperty('--pulse-delay', (chipIndex++ * 0.22) + 's');
      orbitEl.appendChild(el);
      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });
      ORBIT_ITEMS.push({
        el,
        frac:  ring.frac,
        base:  (i / n) * Math.PI * 2 + (ring.phase || 0),
        speed: ring.dir * (Math.PI * 2 / ring.dur),
        setX:  gsap.quickSetter(el, 'x', 'px'),
        setY:  gsap.quickSetter(el, 'y', 'px'),
      });
    });
  });
}

function initOrbit() {
  const wrap = qs('.avatar-wrap');
  if (!wrap || !ORBIT_ITEMS.length) return;

  let baseR = wrap.offsetWidth / 2 || 190;     // layout width — ignores entrance scale / 3D tilt
  const sizeTracks = () => {
    ORBIT_TRACKS.forEach(t => {
      const d = baseR * t.frac * 2;
      t.el.style.width = d + 'px';
      t.el.style.height = d + 'px';
    });
  };
  const measure = () => { baseR = (wrap.offsetWidth / 2) || baseR; sizeTracks(); };
  window.addEventListener('resize', measure, { passive: true });
  sizeTracks();

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let elapsed = 0, paused = false, last = performance.now();

  // pause on hover over the avatar area (desktop only) + gentle lift cue
  const visual = qs('.hero__visual');
  if (visual && !matchMedia('(hover: none)').matches) {
    const chips = ORBIT_ITEMS.map(it => it.el);
    visual.addEventListener('mouseenter', () => {
      paused = true;
      gsap.to(chips, { scale: 1.08, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
    });
    visual.addEventListener('mouseleave', () => {
      paused = false;
      gsap.to(chips, { scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    });
  }

  gsap.ticker.add(() => {
    const now = performance.now();
    const dt = (now - last) / 1000; last = now;
    if (!reduce && !paused) elapsed += dt;          // freeze while paused → smooth resume
    for (const it of ORBIT_ITEMS) {
      const ang = it.base + elapsed * it.speed;
      const r = baseR * it.frac;
      it.setX(Math.cos(ang) * r);
      it.setY(Math.sin(ang) * r);
    }
  });
}

function buildHero() {
  $('heroTagline').textContent = C.personal.tagline;
  const core = $('avatarImg');
  core.innerHTML = C.personal.avatar
    ? `<img src="${C.personal.avatar}" alt="${C.personal.name}" style="width:100%;height:100%;object-fit:cover;">`
    : `<svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="22" fill="var(--accent)" opacity=".7"/><ellipse cx="50" cy="88" rx="34" ry="24" fill="var(--accent)" opacity=".7"/></svg>`;

  buildOrbit($('avatarOrbit'));

  // Set initial hidden state for entrance animation
  gsap.set(qs('.hero__visual'), { opacity: 0 });

  const statsEl = $('heroStats');
  C.stats.forEach(s => {
    const div = mk('div', 'stat');
    div.innerHTML = `<span class="stat__num" data-target="${s.value}" data-suffix="${s.suffix || ''}">0</span><span class="stat__label">${s.label}</span>`;
    statsEl.appendChild(div);
  });
}

function buildAbout() {
  const txt = $('aboutText');
  C.personal.bio.forEach(p => { const el = mk('p'); el.innerHTML = p; txt.appendChild(el); });
  const tags = mk('div', 'about__tags');
  C.aboutTags.forEach(t => { const s = mk('span', 'tag'); s.textContent = t; tags.appendChild(s); });
  txt.appendChild(tags);

  const cards = $('aboutCards');
  [
    { icon:'📧', title:'Email',    val:`<a class="allow-copy" href="mailto:${C.personal.email}">${C.personal.email}</a>` },
    { icon:'📍', title:'Location', val: C.personal.location },
    { icon:'💼', title:'LinkedIn', val:`<a href="${C.personal.linkedin}" target="_blank">View Profile</a>` },
    { icon:'🐙', title:'GitHub',   val:`<a href="${C.personal.github}" target="_blank">View Repos</a>` },
    { icon:'⚡', title:'Status',   val:'Open to opportunities' },
  ].forEach(i => {
    const div = mk('div', 'info-card');
    div.innerHTML = `<div class="info-card__icon">${i.icon}</div><div><h4>${i.title}</h4><p>${i.val}</p></div>`;
    cards.appendChild(div);
  });
}

function buildSkills() {
  const grid = $('skillsGrid');
  C.skillCategories.forEach(cat => {
    const group = mk('div', 'skill-group');
    group.innerHTML = `
      <div class="skill-group__header">
        <span class="skill-group__icon">${cat.icon}</span>
        <span class="skill-group__title">${cat.title}</span>
      </div>
      ${cat.skills.map(s => {
        const c = s.color === 'accent' ? 'var(--accent)' : s.color === 'accent2' ? 'var(--accent-2)' : s.color;
        return `<div class="skill-item">
          <div class="skill-item__info">
            <span class="skill-item__name">${s.name}</span>
            <span class="skill-item__pct" style="color:${c}">${s.level}%</span>
          </div>
          <div class="skill-item__track">
            <div class="skill-item__fill" data-level="${s.level}" style="background:linear-gradient(90deg,${c},${c}aa)"></div>
          </div>
        </div>`;
      }).join('')}`;
    grid.appendChild(group);
    if (C.theme.enableTilt) initTilt(group);
  });

  const track = $('marqueeTrack');
  [...C.techBadges, ...C.techBadges].forEach(t => {
    const span = mk('span', 'pill'); span.textContent = t; track.appendChild(span);
  });
}

function buildExperience() {
  const tl = $('timeline');
  C.experience.forEach(job => {
    const item = mk('div', 'timeline__item');
    item.innerHTML = `
      <div class="timeline__dot"></div>
      <div class="timeline__card">
        <div class="timeline__header">
          <div><h3 class="timeline__role">${job.role}</h3><p class="timeline__company">${job.company}</p></div>
          <div class="timeline__meta">
            <span class="timeline__period">${job.period}</span>
            <span class="timeline__type">${job.type}</span>
          </div>
        </div>
        ${job.highlights.length ? `<ul class="timeline__list">${job.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
        ${(job.projects || []).map(p => `
          <div class="timeline__project">
            <h4 class="timeline__project-name">${p.name}</h4>
            ${p.stack ? `<p class="timeline__project-stack">${p.stack}</p>` : ''}
            <ul class="timeline__list">${p.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
          </div>`).join('')}
        <div class="timeline__tags">${job.tags.map(t => `<span>${t}</span>`).join('')}</div>
      </div>`;
    tl.appendChild(item);
  });
}

function buildProjects() {
  const fEl = $('projectsFeatured'), gEl = $('projectsGrid');
  C.projects.filter(p => p.featured).forEach(p => {
    const card = mk('div', 'project-card');
    if (C.theme.enableTilt) initTilt(card);
    card.innerHTML = `
      <div class="project-card__bar" style="background:${p.color}"></div>
      <div class="project-card__body">
        <div class="project-card__top">
          <span class="project-card__icon">${p.icon}</span>
          <div class="project-card__links">
            ${p.github ? `<a href="${p.github}" target="_blank">${GH_ICON}</a>` : ''}
            ${p.live   ? `<a href="${p.live}"   target="_blank">${EXT_ICON}</a>` : ''}
          </div>
        </div>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__tech">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
      </div>`;
    fEl.appendChild(card);
  });

  C.projects.filter(p => !p.featured).forEach(p => {
    const card = mk('div', 'project-small');
    card.innerHTML = `
      <div class="project-small__icon">${p.icon}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
        <h4 class="project-small__title" style="margin:0">${p.title}</h4>
        <div style="display:flex;gap:6px">
          ${p.github ? `<a href="${p.github}" target="_blank" style="color:var(--text-muted)">${GH_ICON}</a>` : ''}
          ${p.live   ? `<a href="${p.live}"   target="_blank" style="color:var(--text-muted)">${EXT_ICON}</a>` : ''}
        </div>
      </div>
      <p class="project-small__desc">${p.desc}</p>
      <div class="project-small__tech">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>`;
    gEl.appendChild(card);
  });
}

function buildEducation() {
  const grid = $('eduGrid');
  if (!grid) return;
  C.education.forEach(ed => {
    const card = mk('div', 'edu-card');
    card.innerHTML = `
      <div class="edu-card__icon">${ed.icon}</div>
      <div class="edu-card__body">
        <div class="edu-card__top">
          <h3 class="edu-card__degree">${ed.degree}</h3>
          <span class="edu-card__score">${ed.score}</span>
        </div>
        <p class="edu-card__school">${ed.school}</p>
        <div class="edu-card__meta">
          <span class="edu-card__place">📍 ${ed.place}</span>
          <span class="edu-card__period">${ed.period}</span>
        </div>
      </div>`;
    if (C.theme.enableTilt) initTilt(card);
    grid.appendChild(card);
  });
}

function buildCerts() {
  const grid = $('certsGrid');
  C.certifications.forEach(cert => {
    const card = mk('div', 'cert-card');
    const bar = mk('div');
    bar.style.cssText = `position:absolute;top:0;left:0;right:0;height:3px;background:${cert.color}`;
    card.appendChild(bar);
    card.innerHTML += `
      <div class="cert-card__badge">${cert.badge}</div>
      <div class="cert-card__code gradient-text">${cert.code}</div>
      <p class="cert-card__title">${cert.title}</p>
      <div class="cert-card__org" style="color:${cert.color}">${cert.org}</div>
      <div class="cert-card__year">${cert.year}</div>`;
    if (C.theme.enableTilt) initTilt(card);
    grid.appendChild(card);
  });
}

function buildContact() {
  const info = $('contactInfo');
  [
    { icon:'📧', title:'Email',    val:`<a class="allow-copy" href="mailto:${C.personal.email}">${C.personal.email}</a>` },
    { icon:'📍', title:'Location', val:`<span>${C.personal.location}</span>` },
    { icon:'💼', title:'LinkedIn', val:`<a href="${C.personal.linkedin}" target="_blank">${C.personal.linkedin.replace(/^https?:\/\//, '')}</a>` },
    { icon:'🐙', title:'GitHub',   val:`<a href="${C.personal.github}" target="_blank">${C.personal.github.replace(/^https?:\/\//, '')}</a>` },
    { icon:'📱', title:'Phone',    val:`<span class="allow-copy">${C.personal.phone}</span>` },
  ].forEach(i => {
    const div = mk('div', 'contact__item');
    div.innerHTML = `<div class="contact__icon">${i.icon}</div><div><h4>${i.title}</h4><p>${i.val}</p></div>`;
    info.appendChild(div);
  });
}

function buildFooter() {
  $('footerLogo').textContent = C.personal.name;
  $('footerCopy').textContent = `© ${new Date().getFullYear()} ${C.personal.name}. Built with clean code.`;
  const socials = $('footerSocials');
  [
    { label:'📧', href:`mailto:${C.personal.email}` },
    { label:'💼', href: C.personal.linkedin },
    { label:'🐙', href: C.personal.github },
  ].forEach(s => {
    const a = mk('a'); a.href = s.href; a.target = '_blank'; a.textContent = s.label;
    socials.appendChild(a);
  });
}

/* smooth anchor scroll — native, no plugin needed */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const hash = a.getAttribute('href');
  if (!hash || hash === '#') return;          // ignore bare "#" placeholder links
  let target = null;
  try { target = document.querySelector(hash); } catch (_) { return; }  // invalid selector guard
  if (!target) return;
  e.preventDefault();
  smoothScrollTo(target);
});

/* ════════════════════════════════════════════════════
   18. BOOT
════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildHero();
  buildAbout();
  buildSkills();
  buildExperience();
  buildProjects();
  buildEducation();
  buildCerts();
  buildContact();
  buildFooter();

  requestAnimationFrame(() => {
    initSmoothScroll();             // momentum scrolling first, so ScrollTrigger syncs to it
    setHeroInitialState();          // hide hero/nav so there's no flash behind the preloader
    initScrollReveal();
    initSkillBars();
    initCounters();
    initHoverAnimations();
    initParallax();
    initMagnetic();
    initSpotlight();
    initAvatar3D();
    initOrbit();
    initPreloader(animateHeroEntrance);   // reveal the hero once the curtain lifts
  });
});
