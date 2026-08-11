import fs from 'node:fs';

const ROOT = '/Users/alex/Desktop/WORK/PATTON MOTORS/mockup';
const cars = JSON.parse(fs.readFileSync(ROOT + '/assets/cars.json', 'utf8'));

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const FIX = {
  'CHEVORLET': 'Chevrolet', 'MERCEDES-BENZ BY KINDIG DESIGN': 'Mercedes-Benz',
  'BOSS 429-POWERED DETOMASO': 'De Tomaso', 'DETOMASO': 'De Tomaso',
  'SHELBY COBRA': 'Shelby', 'THE LITTLE CAR COMPANY': 'Little Car Co.',
};
const title = s => s.toLowerCase().replace(/(^|[\s-])(\w)/g, (m, a, b) => a + b.toUpperCase());
const marque = c => FIX[c.make.trim().toUpperCase()] || title(c.make.trim());
const model = c => {
  let m = [c.model, c.trim].filter(Boolean).join(' ').trim();
  m = m.replace(new RegExp('^' + c.make.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*', 'i'), '');
  if (m === m.toUpperCase() && m.length > 6) m = title(m)
    .replace(/\bSlr\b/g, 'SLR').replace(/\bGto\b/g, 'GTO').replace(/\bGts\b/g, 'GTS')
    .replace(/\bSv\b/g, 'SV').replace(/\bRs\b/g, 'RS').replace(/\bZrc1\b/g, 'ZRC1')
    .replace(/\bSrt\b/g, 'SRT').replace(/\bV12\b/gi, 'V12');
  m = m.replace(/(\S)\s+(By|Of|And|With|The|For)\s+/g, (x, p, w) => p + ' ' + w.toLowerCase() + ' ');
  return m;
};

const all = cars
  .filter(c => String(c.sold).toLowerCase() !== 'sold' && c.year !== '0' && c.make)
  .map(c => ({
    id: c.id, year: +c.year, marque: marque(c), model: model(c),
    body: (c.body || '').trim(), miles: +c.mileage || 0,
    price: +c.price > 0 ? c.lower_price : null,
    url: c.url_link || '#', img: `assets/img/car-${c.id}.jpg`,
    alt: `${c.year} ${marque(c)} ${model(c)} on the showroom floor at Patton Motors, Pompano Beach`,
    has: fs.existsSync(`${ROOT}/assets/img/car-${c.id}.jpg`),
  }));

const byId = id => all.find(c => c.id === String(id));

/* ---------------------------------------------------------------------------
   AUCTION DATA — SAMPLE FIGURES FOR THIS DESIGN PASS.
   The vehicles are real Patton stock pulled from /api/cars. The bids, bid
   counts and closing times are placeholders so the countdown and the sheet can
   be judged; they are not live commercial data and must be replaced by the
   real feed before this page goes anywhere near production.
   `endsIn` is seconds from page load, so the countdown reads correctly whenever
   the file is opened.
--------------------------------------------------------------------------- */
const LOTS = [
  { id: 52, lot: '104', state: 'live', bid: '$3,410,000', bids: 27, endsIn: 8_040,  reserve: 'Reserve met' },
  { id: 73, lot: '106', state: 'live', bid: '$1,842,500', bids: 19, endsIn: 19_500, reserve: 'Reserve met' },
  { id: 8,  lot: '109', state: 'live', bid: '$1,275,000', bids: 12, endsIn: 34_260, reserve: 'Reserve not met' },
  { id: 79, lot: '111', state: 'live', bid: '$742,000',   bids: 31, endsIn: 51_180, reserve: 'Reserve met' },
  { id: 54, lot: '115', state: 'soon', opens: 'Opens Fri 14 Aug, 11:00 EDT', est: '$4.2\u20114.8m' },
  { id: 70, lot: '118', state: 'soon', opens: 'Opens Fri 14 Aug, 11:00 EDT', est: '$395\u2011460k' },
];
const lotIds = LOTS.map(l => String(l.id));
const featured = LOTS[0];
const rest = LOTS.slice(1);

/* a car on the block is not on the floor — that is what keeps the two honest */
const floor = all.filter(c => !lotIds.includes(c.id)).sort((a, b) => a.year - b.year
  || a.marque.localeCompare(b.marque));

const decades = [];
for (const c of floor) {
  const d = Math.floor(c.year / 10) * 10;
  if (!decades.length || decades.at(-1).d !== d) decades.push({ d, cars: [] });
  decades.at(-1).cars.push(c);
}

const sold = cars.filter(c => String(c.sold).toLowerCase() === 'sold').length;
const marques = new Set(all.map(c => c.marque)).size;
const priced = floor.filter(c => c.price).length;

const fmtMiles = n => n ? n.toLocaleString('en-US') + ' mi' : '—';

/* --- fragments ----------------------------------------------------------- */

const sheetRow = l => {
  const c = byId(l.id);
  const live = l.state === 'live';
  return `
          <a class="sheet__row" href="${esc(c.url)}">
            <span class="state ${live ? 'state--live' : 'state--soon'}">
              <span class="state__dot"></span>${live ? 'Live' : 'Upcoming'}</span>
            <span class="sheet__thumb">${c.has
              ? `<img src="${esc(c.img)}" alt="${esc(c.alt)}" loading="lazy" width="240" height="160">` : ''}</span>
            <span class="sheet__name"><b>${esc(c.marque)}</b> ${esc(c.model)}
              <span class="mono" style="color:var(--muted)"> · ${c.year}</span></span>
            <span class="sheet__figs">${live
              ? `<span class="money">${esc(l.bid)}</span>`
              : `<span class="mono" style="color:var(--bone-64)">Est. ${esc(l.est)}</span>`}</span>
            <span class="mono sheet__time">${live
              ? `<span data-countdown="${l.endsIn}">—</span>`
              : 'Fri 11:00'}</span>
            <span class="mono sheet__bids">${live ? l.bids + ' bids' : 'Lot ' + l.lot}</span>
            <span class="sheet__go" aria-hidden="true">&rarr;</span>
          </a>`;
};

const regRow = c => `
            <a class="reg__row" href="${esc(c.url)}">
              <span class="mono reg__year">${c.year}</span>
              <span class="reg__thumb">${c.has
                ? `<img src="${esc(c.img)}" alt="${esc(c.alt)}" loading="lazy" width="240" height="160">` : ''}</span>
              <span class="reg__name"><b>${esc(c.marque)}</b> ${esc(c.model)}</span>
              <span class="mono reg__body">${esc(c.body || '—')}</span>
              <span class="mono reg__price ${c.price ? 'money' : 'money money--none'}">${
                c.price ? esc(c.price) : 'On request'}</span>
              <span class="reg__go" aria-hidden="true">&rarr;</span>
            </a>`;

const decadeBlock = g => `
            <div class="decade">
              <span class="mono decade__label">${g.d}s</span>
              <span class="mono decade__count">${g.cars.length} ${g.cars.length === 1 ? 'car' : 'cars'}</span>
            </div>
${g.cars.map(regRow).join('\n')}`;

const f = byId(featured.id);

/* --- the page ------------------------------------------------------------ */

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Patton Motors — Collector Cars and Auctions | Pompano Beach, Florida</title>
<meta name="description" content="Collector cars and auctions in Pompano Beach, Florida. ${LOTS.filter(l => l.state === 'live').length} lots on the block, ${floor.length} cars on the floor. Buy outright or bid.">
<link rel="stylesheet" href="css/patton-marketplace.css">
</head>
<body>

<a class="skip" href="#main">Skip to content</a>

<!-- ============================================================== header == -->
<header class="hdr">
  <div class="wrap hdr__bar">
    <a class="hdr__brand" href="/" aria-label="Patton Motors — home">
      <img src="assets/logo/goldenlogo_mobile.svg" alt="Patton Motors">
      <span class="mono">Collector cars<br>+ auctions</span>
    </a>

    <nav class="nav" id="nav" aria-label="Primary">
      <a href="#floor">Inventory</a>
      <a href="#block" aria-current="page">Auctions</a>
      <a href="#sell">Sell &amp; Consign</a>
      <a href="#house">About</a>
      <a href="/s-klub/">S-Klub</a>
      <span class="nav__sep" aria-hidden="true"></span>
      <a href="/my-collection/">My Collection</a>
    </nav>

    <a class="mono hdr__tel" href="tel:+16305500741">630&#8201;550&#8201;0741</a>

    <button class="mono burger" id="burger" type="button"
            aria-expanded="false" aria-controls="nav">Menu</button>
  </div>
</header>

<main id="main">

<!-- ================================================================ hero ==
     One car, at scale, on the deepest ground on the page — because the
     headline lot is on the block. The two routes in are given equal weight:
     bidding and buying are genuine alternatives, and ranking one above the
     other would misrepresent the business. -->
<section class="hero">
  <div class="hero__grid">

    <div class="hero__type">
      <span class="mono eyebrow hero__eyebrow">Pompano&nbsp;Beach, Florida</span>
      <h1 class="mega hero__title"><b>Forty cars</b> <em>on the floor.</em>
        <b>Four</b> <em>on the block.</em></h1>
      <p class="lead hero__lead">One room. Two ways to take a car out of it —
        win it at auction, or buy it where it stands.</p>
      <div class="hero__actions">
        <a class="btn btn--gold" href="#block">View the auctions</a>
        <a class="btn btn--ghost" href="#floor">Browse the floor</a>
      </div>
    </div>

    <figure class="hero__media">
      <img src="${esc(f.img)}" alt="${esc(f.alt)}" width="1600" height="1067" fetchpriority="high">
      <dl class="mono hero__plate">
        <div><dt>Lot ${featured.lot} &middot; ${f.year} ${esc(f.marque)} ${esc(f.model)}</dt></div>
        <div><dd><span class="state state--live"><span class="state__dot"></span>Live now</span></dd></div>
      </dl>
    </figure>

  </div>
</section>

<!-- the house instrument: the one place the page reports its own live state -->
<section class="tick" aria-label="Current state of the house">
  <div class="wrap tick__row">
    <div class="tick__cell">
      <span class="mono tick__k">Lots live now</span>
      <span class="tick__v">${LOTS.filter(l => l.state === 'live').length}</span>
    </div>
    <div class="tick__cell">
      <span class="mono tick__k">Next lot closes</span>
      <span class="tick__v tick__v--mono" data-countdown="${featured.endsIn}">—</span>
    </div>
    <div class="tick__cell">
      <span class="mono tick__k">Cars on the floor</span>
      <span class="tick__v">${floor.length}</span>
    </div>
    <div class="tick__cell">
      <span class="mono tick__k">Sold to date</span>
      <span class="tick__v">${sold}</span>
    </div>
  </div>
</section>

<!-- =========================================================== the block ==
     One lot at full width because it is the one closing next; the others as a
     timing sheet. Six identical cards would be the auction-template look. -->
<section class="sec sec--block" id="block">
  <div class="wrap">

    <header class="sechead" data-reveal>
      <h2 class="h2"><b>On the block</b> <em>Live and upcoming</em></h2>
      <p class="sechead__note">Bidding is open to registered collectors. Every lot
        is catalogued, photographed and inspected in the Pompano Beach showroom
        before it opens.</p>
    </header>

    <article class="lot" data-reveal>
      <figure class="lot__media">
        <span class="mono lot__no">Lot ${featured.lot}</span>
        <img src="${esc(f.img)}" alt="${esc(f.alt)}" loading="lazy" width="1200" height="900">
      </figure>
      <div>
        <span class="state state--live lot__state"><span class="state__dot"></span>Live now</span>
        <h3 class="display lot__title">${f.year} ${esc(f.marque)}<br>${esc(f.model)}</h3>
        <p class="mono lot__sub">${[f.body, f.miles ? fmtMiles(f.miles) : null, featured.reserve]
          .filter(Boolean).map(esc).join(' &middot; ')}</p>

        <dl class="lot__figs">
          <div class="lot__fig">
            <dt class="mono">Current bid</dt>
            <dd class="money">${esc(featured.bid)}</dd>
          </div>
          <div class="lot__fig">
            <dt class="mono">Time remaining</dt>
            <dd class="mono" data-countdown="${featured.endsIn}" style="font-size:inherit">—</dd>
          </div>
          <div class="lot__fig">
            <dt class="mono">Bids</dt>
            <dd>${featured.bids}</dd>
          </div>
          <div class="lot__fig">
            <dt class="mono">Lot</dt>
            <dd>${featured.lot}</dd>
          </div>
        </dl>

        <div class="lot__actions">
          <a class="btn btn--gold" href="${esc(f.url)}">Place a bid</a>
          <a class="btn btn--ghost" href="${esc(f.url)}">View the lot</a>
        </div>
      </div>
    </article>

    <div class="sheet" data-reveal>
      <div class="mono sheet__head" aria-hidden="true">
        <span>State</span><span></span><span>Vehicle</span>
        <span>Current bid</span><span>Closes</span><span>Bids</span><span></span>
      </div>
${rest.map(sheetRow).join('\n')}
    </div>

    <div class="sheet__foot" data-reveal>
      <a class="btn btn--ghost" href="/auctions/">All auctions</a>
      <a class="link" href="/auctions/register/">Register to bid <i>&rarr;</i></a>
    </div>

  </div>
</section>

<!-- =========================================================== the floor ==
     Same room, other state — and the state is carried by the material. The
     block is a dark, time-bound event; the floor is a printed catalogue sheet.
     The register runs chronologically with the year as its spine, because this
     floor spans seventy years and that is the fact a collector wants. -->
<section class="sec sec--floor" id="floor">
  <div class="wrap">
    <div class="panel">

      <header class="sechead" data-reveal>
        <h2 class="h2"><b>On the floor</b> <em>Available now</em></h2>
        <p class="sechead__note">No bidding, no closing time. ${floor.length} cars
          standing in the showroom, ${floor.length - priced} of them priced on
          request. Ask, and it is yours.</p>
      </header>

      <div class="reg">
        <div class="mono reg__head" aria-hidden="true">
          <span>Year</span><span></span><span>Marque and model</span>
          <span>Body</span><span>Asking price</span><span></span>
        </div>
${decades.map(decadeBlock).join('\n')}
      </div>

      <div class="reg__foot">
        <a class="btn btn--ghost" href="/inventory/">Search the full inventory</a>
      </div>

    </div>
  </div>
</section>

<!-- ================================================================= sell ==
     The one section where a photograph carries speech rather than evidence, so
     it is the one place the ground is a picture. -->
<section class="sell" id="sell">
  <div class="sell__bg">
    <img src="assets/site/where_prestige_still.jpg" alt="" aria-hidden="true">
  </div>
  <div class="wrap sell__inner">
    <div class="sell__grid">

      <div data-reveal>
        <span class="mono eyebrow" style="margin-bottom:var(--s4)">Sell &middot; Consign &middot; Submit</span>
        <h2 class="display" style="margin-bottom:var(--s5)"><b>Bring us the car.</b> <em>We will tell you
          which room it belongs in.</em></h2>
        <p class="lead" style="margin-bottom:var(--s7)">Some cars sell faster standing
          on the floor with a price on them. Some do better in front of a room of
          bidders. We will say which, before you commit to either.</p>
        <div class="hero__actions">
          <a class="btn btn--bone" href="/sell-your-car/">Submit a vehicle</a>
          <a class="link" href="tel:+16305500741">Or call 630&#8201;550&#8201;0741 <i>&rarr;</i></a>
        </div>
      </div>

      <ol class="steps" data-reveal>
        <li class="step">
          <span class="mono step__n">01</span>
          <div>
            <h3 class="h3">Tell us what it is</h3>
            <p>Specification, mileage, ownership, history. The detail decides the
              valuation more than the mileage does.</p>
          </div>
        </li>
        <li class="step">
          <span class="mono step__n">02</span>
          <div>
            <h3 class="h3">We route it</h3>
            <p>A valuation against current market evidence, and a recommendation:
              outright sale, consignment on the floor, or a lot in the next sale.</p>
          </div>
        </li>
        <li class="step">
          <span class="mono step__n">03</span>
          <div>
            <h3 class="h3">We catalogue and sell it</h3>
            <p>Photography, the write-up, qualified buyers only. No fees, no
              commissions, enclosed transport arranged either way.</p>
          </div>
        </li>
      </ol>

    </div>
  </div>
</section>

<!-- ================================================================ house ==
     Credibility as figures, not adjectives. -->
<section class="sec sec--block" id="house">
  <div class="wrap">
    <header class="sechead" data-reveal>
      <h2 class="h2"><b>Why Patton</b> <em>Founded by Martin Patton</em></h2>
      <p class="sechead__note">Between Miami and Palm Beach, run as a collection
        that happens to be for sale. Exclusive dealer for S-Klub, Los Angeles.</p>
    </header>

    <div class="house__grid" data-reveal>
      <div class="house__fig">
        <span class="house__n">${sold}</span>
        <span class="mono house__k">Cars sold</span>
        <span class="house__d">From a Chiron Super Sport to a 190 SL, delivered
          worldwide with enclosed transport.</span>
      </div>
      <div class="house__fig">
        <span class="house__n">${marques}</span>
        <span class="mono house__k">Marques on the floor</span>
        <span class="house__d">Ferrari to Excalibur. The floor is curated by
          interest, not by franchise.</span>
      </div>
      <div class="house__fig">
        <span class="house__n">70</span>
        <span class="mono house__k">Years represented</span>
        <span class="house__d">1955 to 2025, standing together in one room in
          Pompano Beach.</span>
      </div>
      <div class="house__fig">
        <span class="house__n">1&nbsp;of&nbsp;1</span>
        <span class="mono house__k">S-Klub, exclusively</span>
        <span class="house__d">The only dealer for S-Klub of Los Angeles — four of
          their builds are here now.</span>
      </div>
    </div>
  </div>
</section>

<!-- ================================================================== cta == -->
<section class="cta">
  <div class="wrap cta__inner">
    <h2 class="display"><b>Come and stand in it.</b> <em>2901 Center Port Circle, Pompano Beach</em></h2>
    <div class="cta__actions">
      <a class="btn btn--bone" href="/directions/">Book a viewing</a>
      <a class="btn btn--ghost" href="/contact-us/">Contact the house</a>
    </div>
  </div>
</section>

</main>

<!-- =============================================================== footer == -->
<footer class="ftr">
  <div class="wrap">
    <div class="ftr__grid">
      <div class="ftr__brand">
        <img src="assets/logo/goldenlogo_mobile.svg" alt="Patton Motors">
        <p>Collector cars and auctions. 2901 Center Port Circle, Pompano Beach,
          FL 33064. Monday to Friday 8&ndash;6, Saturday 9&ndash;5, Sunday by
          appointment.</p>
      </div>
      <div>
        <h4 class="mono">Acquire</h4>
        <ul>
          <li><a href="#block">Auctions</a></li>
          <li><a href="#floor">Inventory</a></li>
          <li><a href="/auctions/register/">Register to bid</a></li>
          <li><a href="/my-collection/">My Collection</a></li>
        </ul>
      </div>
      <div>
        <h4 class="mono">Sell</h4>
        <ul>
          <li><a href="/sell-your-car/">Submit a vehicle</a></li>
          <li><a href="/consignment/">Consignment</a></li>
          <li><a href="/sold-inventory/">Sold archive</a></li>
        </ul>
      </div>
      <div>
        <h4 class="mono">House</h4>
        <ul>
          <li><a href="#house">About</a></li>
          <li><a href="/s-klub/">S-Klub</a></li>
          <li><a href="/directions/">Visit</a></li>
          <li><a href="tel:+16305500741">630 550 0741</a></li>
        </ul>
      </div>
    </div>
    <div class="mono ftr__legal">
      <span>&copy; 2026 Patton Motors. All rights reserved.
        &nbsp;<a href="/privacy-policy/">Privacy</a>&nbsp;
        <a href="/sitemap/">Sitemap</a></span>
      <span>Pompano Beach, Florida</span>
    </div>
  </div>
</footer>

<script>
/* ---------------------------------------------------------------------------
   Vanilla. No dependencies, nothing to build.
--------------------------------------------------------------------------- */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
               window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- countdowns --------------------------------------------------------
     Each element carries an offset in seconds from page load, so the sheet
     reads correctly whenever the file is opened. Figures are tabular, so the
     digits do not reflow as they tick. */
  var clocks = [].slice.call(document.querySelectorAll('[data-countdown]'));
  if (clocks.length) {
    clocks.forEach(function (el) {
      el.dataset.target = String(Date.now() + parseInt(el.dataset.countdown, 10) * 1000);
    });
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    var tick = function () {
      clocks.forEach(function (el) {
        var left = Math.max(0, Math.floor((+el.dataset.target - Date.now()) / 1000));
        if (!left) { el.textContent = 'Closed'; return; }
        var d = Math.floor(left / 86400), h = Math.floor(left % 86400 / 3600),
            m = Math.floor(left % 3600 / 60), s = left % 60;
        el.textContent = d ? d + 'd ' + pad(h) + ':' + pad(m) + ':' + pad(s)
                           : pad(h) + ':' + pad(m) + ':' + pad(s);
      });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* --- reveals -----------------------------------------------------------
     The hidden state is applied by script and only when motion is allowed, so
     a JS failure or a reduced-motion request leaves every word on the page. */
  var reveals = [].slice.call(document.querySelectorAll('[data-reveal]'));
  if (reveals.length && !reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* --- navigation --------------------------------------------------------- */
  var burger = document.getElementById('burger'), nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
</script>

</body>
</html>
`;

fs.writeFileSync(ROOT + '/index.html', html);
console.log('index.html written');
console.log('lots', LOTS.length, '(live ' + LOTS.filter(l => l.state === 'live').length + ')',
            '| floor', floor.length, '| decades', decades.map(d => d.d + 's:' + d.cars.length).join(' '),
            '| sold', sold, '| marques', marques);
