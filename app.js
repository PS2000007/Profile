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

  qsa('a,button,.tag,.pill,.project-card,.skill-group,.cert-card,.info-card,.timeline__card').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.7, duration: 0.3, ease: 'back.out(2)' }));
    el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1,   duration: 0.3, ease: 'back.out(2)' }));
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

  window.addEventListener('scroll', () => {
    const pct = scrollY / (document.body.scrollHeight - innerHeight) * 100;
    bar.style.width = pct + '%';
    nav.classList.toggle('scrolled', scrollY > 40);

    let cur = '';
    sections.forEach(s => { if (scrollY >= s.offsetTop - 160) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });
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

  // Orbit badges pop in
  tl.fromTo(qsa('.orbit-badge'),
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2.5)' },
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

  // Skill groups
  const skillGroups = qsa('.skill-group');
  if (skillGroups.length) st(skillGroups,
    { y: 60, opacity: 0, scale: 0.92 },
    { y: 0,  opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.4)' });

  // Timeline items
  qsa('.timeline__item').forEach((item, i) =>
    st(item,
      { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }));

  // Featured project cards
  const featuredCards = qsa('.project-card');
  if (featuredCards.length) st(featuredCards,
    { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' });

  // Small project cards
  const smallCards = qsa('.project-small');
  if (smallCards.length) st(smallCards,
    { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' });

  // Cert cards
  const certCards = qsa('.cert-card');
  if (certCards.length) st(certCards,
    { scale: 0.8, opacity: 0 },
    { scale: 1,   opacity: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.8)' });

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
        gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: function() { el.textContent = Math.floor(this.targets()[0].val); },
          onComplete: () => { el.textContent = target; }
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

  // Small project & cert cards
  qsa('.project-small, .cert-card').forEach(card => {
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
  el.style.transformStyle = 'preserve-3d';
  const rxTo = gsap.quickTo(el, 'rotateX', { duration: 0.3, ease: 'power2.out' });
  const ryTo = gsap.quickTo(el, 'rotateY', { duration: 0.3, ease: 'power2.out' });

  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    rxTo(-y * 10); ryTo(x * 10);
  });
  el.addEventListener('mouseleave', () => { rxTo(0); ryTo(0); });
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

  // Mouse parallax on avatar
  document.addEventListener('mousemove', e => {
    if (!wrap) return;
    const xTo = gsap.quickTo(wrap, 'x', { duration: 1.2, ease: 'power1.out' });
    const yTo = gsap.quickTo(wrap, 'y', { duration: 1.2, ease: 'power1.out' });
    xTo((e.clientX / innerWidth  - 0.5) * 14);
    yTo((e.clientY / innerHeight - 0.5) * 14);
  });

  // Subtle section title parallax
  qsa('.section__title').forEach(el => {
    gsap.to(el, {
      y: -20, ease: 'none',
      scrollTrigger: { trigger: el.closest('.section'), start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });
  });
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
   16. CONTACT FORM + NOTIFICATIONS
════════════════════════════════════════════════════ */
(function initEmailJS() {
  const cfg = C.notifications?.email;
  if (cfg?.enabled && cfg.publicKey && window.emailjs) emailjs.init(cfg.publicKey);
})();

async function sendWhatsApp(name, email, subject, message) {
  const cfg = C.notifications?.whatsapp;
  if (!cfg?.enabled || !cfg.phone || cfg.apiKey === 'XXXXXXX') return;
  const text = encodeURIComponent(
    `📬 *New Portfolio Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject || '—'}\n\n💬 *Message:*\n${message}\n\n⏰ ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
  );
  try { await fetch(`https://api.callmebot.com/whatsapp.php?phone=${cfg.phone}&text=${text}&apikey=${cfg.apiKey}`, { mode: 'no-cors' }); } catch (_) {}
}

async function sendEmail(name, email, subject, message) {
  const cfg = C.notifications?.email;
  if (!cfg?.enabled || cfg.serviceId.includes('XXXXX') || !window.emailjs) return;
  await emailjs.send(cfg.serviceId, cfg.templateId, {
    from_name: name, from_email: email,
    subject: subject || 'Portfolio Contact',
    message, to_email: cfg.toEmail, reply_to: email,
  });
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

$('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target, btn = form.querySelector('button');
  const name    = form.querySelector('#f-name').value.trim();
  const email   = form.querySelector('#f-email').value.trim();
  const subject = form.querySelector('#f-subject').value.trim();
  const message = form.querySelector('#f-msg').value.trim();

  if (!name || !email || !message) { showToast('Please fill all required fields.', 'error'); return; }

  btn.disabled = true;
  $('sendBtnText').textContent = 'Sending…';
  $('sendIcon').style.opacity = '0';
  gsap.to(btn, { scale: 0.97, duration: 0.1 });

  await Promise.allSettled([
    sendWhatsApp(name, email, subject, message),
    sendEmail(name, email, subject, message),
  ]);

  btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
  btn.style.boxShadow  = '0 0 28px rgba(16,185,129,.4)';
  $('sendBtnText').textContent = 'Message Sent! ✓';
  gsap.to(btn, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  showToast('Message delivered via Email & WhatsApp!');

  setTimeout(() => {
    $('sendBtnText').textContent = 'Send Message';
    $('sendIcon').style.opacity = '1';
    btn.style.background = ''; btn.style.boxShadow = '';
    btn.disabled = false; form.reset();
  }, 3500);
});

/* ════════════════════════════════════════════════════
   17. BUILD DOM FROM CONFIG
════════════════════════════════════════════════════ */
function buildNav() {
  $('navLogo').textContent = C.personal.nameShort + '.';
  const ul = $('navLinks'), mob = $('mobileMenu');
  C.navLinks.forEach(l => {
    const li = mk('li'), a = mk('a');
    a.href = l.href; a.textContent = l.label;
    li.appendChild(a); ul.appendChild(li);
    const ma = mk('a'); ma.href = l.href; ma.textContent = l.label; mob.appendChild(ma);
  });
  $('resumeBtn').href = C.personal.resume;
}

function buildHero() {
  $('heroTagline').textContent = C.personal.tagline;
  const core = $('avatarImg');
  core.innerHTML = C.personal.avatar
    ? `<img src="${C.personal.avatar}" alt="${C.personal.name}" style="width:100%;height:100%;object-fit:cover;">`
    : `<svg viewBox="0 0 100 100"><circle cx="50" cy="36" r="22" fill="var(--accent)" opacity=".7"/><ellipse cx="50" cy="88" rx="34" ry="24" fill="var(--accent)" opacity=".7"/></svg>`;

  const orbitEl = $('avatarOrbit');
  ['.NET 8','Angular','Azure','SQL'].forEach((b, i) => {
    const positions = ['top:8%;right:-12%','bottom:12%;right:-10%','bottom:8%;left:-12%','top:12%;left:-10%'];
    const colors    = ['#a78bfa','#f87171','#34d399','#60a5fa'];
    const span = mk('span', 'orbit-badge');
    span.textContent = b; span.style.cssText = positions[i] + `;color:${colors[i]}`;
    orbitEl.appendChild(span);
  });

  // Set initial hidden state for entrance animation
  gsap.set(qs('.hero__visual'), { opacity: 0 });
  gsap.set(qsa('.orbit-badge'), { scale: 0, opacity: 0 });

  const statsEl = $('heroStats');
  C.stats.forEach((s, i) => {
    if (i > 0) { const d = mk('div'); d.style.cssText = 'width:1px;height:40px;background:var(--border)'; statsEl.appendChild(d); }
    const div = mk('div', 'stat');
    div.innerHTML = `<span class="stat__num" data-target="${s.value}">0</span><span class="stat__label">${s.label}</span>`;
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
    { icon:'📧', title:'Email',    val:`<a href="mailto:${C.personal.email}">${C.personal.email}</a>` },
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
        <ul class="timeline__list">${job.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
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
    { icon:'📧', title:'Email',    val:`<a href="mailto:${C.personal.email}">${C.personal.email}</a>` },
    { icon:'📍', title:'Location', val:`<span>${C.personal.location}</span>` },
    { icon:'💼', title:'LinkedIn', val:`<a href="${C.personal.linkedin}" target="_blank">linkedin.com/in/suryavanshiprasad</a>` },
    { icon:'🐙', title:'GitHub',   val:`<a href="${C.personal.github}" target="_blank">github.com/suryavanshiprasad007</a>` },
    { icon:'📱', title:'Phone',    val:`<span>${C.personal.phone}</span>` },
  ].forEach(i => {
    const div = mk('div', 'contact__item');
    div.innerHTML = `<div class="contact__icon">${i.icon}</div><div><h4>${i.title}</h4><p>${i.val}</p></div>`;
    info.appendChild(div);
  });
}

function buildFooter() {
  $('footerLogo').textContent = C.personal.nameShort + '.';
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
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  buildCerts();
  buildContact();
  buildFooter();

  requestAnimationFrame(() => {
    animateHeroEntrance();
    initScrollReveal();
    initSkillBars();
    initCounters();
    initHoverAnimations();
    initParallax();
  });
});
