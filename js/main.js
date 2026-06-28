/* =====================================================================
   main.js — storefront catalogue + interactions
   ===================================================================== */

const PRODUCTS = [
  // ---------------- GOLD ----------------
  { id: 'g1', cat: 'gold', type: 'Necklaces', icon: 'necklace', name: 'Lakshmi Temple Necklace', weight: '38.4 g', purity: '22K · 916', price: 412000, badge: '916 BIS', tag: 'new' },
  { id: 'g2', cat: 'gold', type: 'Necklaces', icon: 'necklace', name: 'Peacock Haram', weight: '52.1 g', purity: '22K · 916', price: 561000, badge: '916 BIS' },
  { id: 'g3', cat: 'gold', type: 'Chains', icon: 'chain', name: 'Rope Twist Chain', weight: '14.2 g', purity: '22K · 916', price: 154000, badge: '916 BIS' },
  { id: 'g4', cat: 'gold', type: 'Chains', icon: 'chain', name: 'Box Link Chain', weight: '11.8 g', purity: '18K · 750', price: 121000, badge: '750 BIS', tag: 'new' },
  { id: 'g5', cat: 'gold', type: 'Bangles', icon: 'bangle', name: 'Antique Kada (pair)', weight: '46.0 g', purity: '22K · 916', price: 498000, badge: '916 BIS' },
  { id: 'g6', cat: 'gold', type: 'Bangles', icon: 'bangle', name: 'Filigree Bangle', weight: '22.6 g', purity: '22K · 916', price: 246000, badge: '916 BIS' },
  { id: 'g7', cat: 'gold', type: 'Earrings', icon: 'earring', name: 'Jhumka Drops', weight: '9.4 g', purity: '22K · 916', price: 104000, badge: '916 BIS', tag: 'new' },
  { id: 'g8', cat: 'gold', type: 'Earrings', icon: 'earring', name: 'Polki Studs', weight: '6.1 g', purity: '18K · 750', price: 88000, badge: '750 BIS' },
  { id: 'g9', cat: 'gold', type: 'Rings', icon: 'ring', name: 'Solitaire Halo Ring', weight: '4.8 g', purity: '18K · 750', price: 132000, badge: 'Diamond' },
  { id: 'g10', cat: 'gold', type: 'Rings', icon: 'ring', name: 'Engraved Band', weight: '5.2 g', purity: '22K · 916', price: 58000, badge: '916 BIS' },

  // ---------------- SILVER ----------------
  { id: 's1', cat: 'silver', type: 'Bracelets', icon: 'bracelet', name: 'Oxidised Charm Bracelet', weight: '28.0 g', purity: '925 Sterling', price: 4200, badge: '925', tag: 'new' },
  { id: 's2', cat: 'silver', type: 'Bracelets', icon: 'bracelet', name: 'Cuff with Filigree', weight: '34.5 g', purity: '925 Sterling', price: 5600, badge: '925' },
  { id: 's3', cat: 'silver', type: 'Anklets', icon: 'anklet', name: 'Ghungroo Payal (pair)', weight: '62.0 g', purity: '92.5 Pure', price: 7800, badge: '925' },
  { id: 's4', cat: 'silver', type: 'Anklets', icon: 'anklet', name: 'Beaded Anklet', weight: '40.0 g', purity: '92.5 Pure', price: 5200, badge: '925', tag: 'new' },
  { id: 's5', cat: 'silver', type: 'Idols', icon: 'idol', name: 'Ganesha Idol', weight: '120 g', purity: '90% Silver', price: 14500, badge: 'Pooja' },
  { id: 's6', cat: 'silver', type: 'Idols', icon: 'idol', name: 'Lakshmi Idol', weight: '145 g', purity: '90% Silver', price: 17200, badge: 'Pooja' },
  { id: 's7', cat: 'silver', type: 'Coins', icon: 'coin', name: 'Lakshmi Coin 10g', weight: '10 g', purity: '999 Fine', price: 1150, badge: '999' },
  { id: 's8', cat: 'silver', type: 'Coins', icon: 'coin', name: 'Investment Bar 50g', weight: '50 g', purity: '999 Fine', price: 5400, badge: '999', tag: 'new' },
  { id: 's9', cat: 'silver', type: 'Decorative Items', icon: 'decor', name: 'Engraved Diya Set', weight: '210 g', purity: '90% Silver', price: 9800, badge: 'Decor' },
  { id: 's10', cat: 'silver', type: 'Decorative Items', icon: 'decor', name: 'Kumkum Box', weight: '88 g', purity: '90% Silver', price: 6300, badge: 'Decor' },
];

const inr = (n) => '₹' + n.toLocaleString('en-IN');

function cardHTML(p) {
  return `
    <article class="card reveal-on-scroll" data-id="${p.id}" data-type="${p.type}" data-name="${p.name.toLowerCase()}">
      <div class="card-media">
        <span class="hallmark">${p.badge}</span>
        <button class="wish" aria-label="Add to wishlist" data-wish="${p.id}">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 14S1.5 9.6 1.5 5.6A3.6 3.6 0 018 3a3.6 3.6 0 016.5 2.6C14.5 9.6 8 14 8 14z"/></svg>
        </button>
        <span class="gold-ico">${(window.ICONS || ICONS)[p.icon]}</span>
      </div>
      <div class="card-body">
        <span class="type">${p.type}</span>
        <h3>${p.name}</h3>
        <div class="specs">
          <span>Weight <strong>${p.weight}</strong></span>
          <span>Purity <strong>${p.purity}</strong></span>
        </div>
        <div class="card-foot">
          <span class="price">${inr(p.price)}</span>
          <button class="view-btn" data-view="${p.id}">View Details</button>
        </div>
      </div>
    </article>`;
}

function renderInto(selector, list) {
  const host = document.querySelector(selector);
  if (!host) return;
  host.innerHTML = list.length
    ? list.map(cardHTML).join('')
    : `<p class="empty">No pieces match your search. Try another term.</p>`;
  wireCards(host);
  initScrollReveal();
}

const wishlist = new Set();

function wireCards(scope) {
  scope.querySelectorAll('[data-wish]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.wish;
      const p = PRODUCTS.find(x => x.id === id);
      if (wishlist.has(id)) { wishlist.delete(id); btn.classList.remove('active'); toast(`Removed ${p.name} from wishlist`, '♡'); }
      else { wishlist.add(id); btn.classList.add('active'); toast(`Saved ${p.name} to wishlist`, '♥'); }
    });
  });
  scope.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => openDetail(btn.dataset.view));
  });
}

/* ---------- product detail modal -------------------------------------- */
function openDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  let overlay = document.getElementById('detailOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'detailOverlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('show'); });
  }
  overlay.innerHTML = `
    <div class="glass" role="dialog" aria-modal="true" style="width:min(460px,100%)">
      <button class="glass-close" aria-label="Close" onclick="document.getElementById('detailOverlay').classList.remove('show')">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l10 10M16 6L6 16"/></svg>
      </button>
      <div class="card-media" style="border-radius:14px;margin-bottom:1.4rem">
        <span class="hallmark">${p.badge}</span>
        <span class="gold-ico" style="width:42%;height:42%">${(window.ICONS||ICONS)[p.icon]}</span>
      </div>
      <span class="type" style="color:var(--gold);font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase">${p.type}</span>
      <h3 style="font-size:2rem;margin:0.2rem 0 0.8rem">${p.name}</h3>
      <div class="specs" style="margin-bottom:1rem">
        <span>Weight <strong>${p.weight}</strong></span>
        <span>Purity <strong>${p.purity}</strong></span>
      </div>
      <p class="muted" style="font-size:0.92rem">Crafted in our Mumbai atelier and certified BIS-hallmarked. Each piece includes a lifetime exchange guarantee and a certificate of authenticity.</p>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:1.4rem">
        <span class="price">${inr(p.price)}</span>
        <button class="btn btn-gold" onclick="window.toast('Added ${p.name.replace(/'/g,'')} to bag','✦');document.getElementById('detailOverlay').classList.remove('show')">Add to Bag</button>
      </div>
    </div>`;
  requestAnimationFrame(() => overlay.classList.add('show'));
}

/* ---------- collection page controller -------------------------------- */
function initCollection(cat, gridSel) {
  let items = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => cat === 'new' ? p.tag === 'new' : p.cat === cat);
  let activeType = 'All';
  let term = '';

  const types = ['All', ...new Set(items.map(p => p.type))];
  const chipHost = document.querySelector('[data-filters]');
  if (chipHost) {
    chipHost.innerHTML = types.map((t, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-filter="${t}">${t}</button>`).join('');
    chipHost.querySelectorAll('[data-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        chipHost.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeType = chip.dataset.filter;
        apply();
      });
    });
  }

  const searchInput = document.querySelector('[data-search]');
  if (searchInput) searchInput.addEventListener('input', (e) => { term = e.target.value.toLowerCase().trim(); apply(); });

  function apply() {
    let list = items;
    if (activeType !== 'All') list = list.filter(p => p.type === activeType);
    if (term) list = list.filter(p => p.name.toLowerCase().includes(term) || p.type.toLowerCase().includes(term));
    renderInto(gridSel, list);
  }
  apply();
}

/* ---------- carousel controls ----------------------------------------- */
function initCarousel(carouselSel) {
  const track = document.querySelector(carouselSel);
  if (!track) return;
  const prev = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const step = () => Math.min(track.clientWidth * 0.8, 340);
  prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}

/* expose for inline use */
window.PRODUCTS = PRODUCTS;
window.cardHTML = cardHTML;
window.renderInto = renderInto;
window.initCollection = initCollection;
window.initCarousel = initCarousel;
