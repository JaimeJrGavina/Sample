/* The Good Luck Wall: site script (vanilla, no dependencies besides vendored canvas-confetti). */
(function (root) {
  'use strict';

  /* ===== CONFIG: the only things you should need to edit ===== */
  var CONFIG = {
    // If Jaime creates a PayPal.Me handle, put the full link here, e.g. 'https://www.paypal.com/paypalme/yourhandle'.
    // Leave '' to use the generic PayPal "Send" page plus the copy-the-email box.
    PAYPAL_ME_URL: '',
    PAYPAL_EMAIL: 'gavinajaimejr@gmail.com',
    PAYPAL_SEND_URL: 'https://www.paypal.com/myaccount/transfer/homepage/pay',
    FORM_ENDPOINT: 'https://formsubmit.co/ajax/gavinajaimejr@gmail.com',
    SUPPORTERS_JSON: 'supporters.json',
    // "Your name here" example lines (from supporters.json) are shown while there are fewer real supporters than this.
    HIDE_EXAMPLES_AT: 12
  };

  /* ===== Pure helpers (also used by tests in node) ===== */
  function safeUrl(raw) {
    if (typeof raw !== 'string') return null;
    var s = raw.trim();
    if (!s) return null;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) s = 'https://' + s; // bare domain -> https
    var u;
    try { u = new URL(s); } catch (e) { return null; }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    if (!u.hostname || u.hostname.indexOf('.') === -1 || u.username || u.password) return null;
    return u;
  }
  // Key used to merge repeat contributions: lowercase host, no trailing slash, no hash, scheme ignored.
  function urlKey(raw) {
    var u = safeUrl(raw);
    if (!u) return null;
    var path = u.pathname.replace(/\/+$/, '');
    return u.hostname.toLowerCase() + path + u.search;
  }
  function displayHost(u) {
    var h = u.hostname.toLowerCase().replace(/^www\./, '');
    var p = u.pathname.replace(/\/+$/, '');
    return h + (p && p !== '/' ? p : '');
  }
  function toAmount(v) {
    var n = typeof v === 'number' ? v : parseFloat(v);
    return isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0;
  }
  function validDate(d) { return typeof d === 'string' && /^\d{4}-\d{2}-\d{2}/.test(d) && !isNaN(Date.parse(d)) ? d : null; }

  // Turn raw supporters.json entries into ranked supporters + placeholder slots.
  function compute(data) {
    var list = Array.isArray(data) ? data : (data && Array.isArray(data.supporters) ? data.supporters : []);
    var groups = {}, order = [], placeholders = [];
    list.forEach(function (e, idx) {
      if (!e || typeof e !== 'object') return;
      if (e.placeholder) { placeholders.push({ name: String(e.name || 'Your name here'), placeholder: true }); return; }
      var name = String(e.name || '').trim();
      if (!name) return;
      var contribs = Array.isArray(e.contributions) && e.contributions.length
        ? e.contributions.map(function (c) { return { amount: toAmount(c && c.amount), date: validDate(c && c.date) }; })
        : [{ amount: toAmount(e.amount), date: validDate(e.date) }];
      contribs = contribs.filter(function (c) { return c.amount > 0; });
      if (!contribs.length) return;
      var u = safeUrl(e.url);
      var key = u ? 'u:' + urlKey(e.url) : 'n:' + name.toLowerCase().replace(/\s+/g, ' ');
      var g = groups[key];
      if (!g) { g = groups[key] = { name: name, url: u ? u.href : null, host: u ? displayHost(u) : '', total: 0, first: null, count: 0, idx: idx }; order.push(g); }
      contribs.forEach(function (c) {
        g.total = Math.round((g.total + c.amount) * 100) / 100;
        g.count++;
        if (c.date && (!g.first || c.date < g.first)) g.first = c.date;
      });
    });
    order.sort(function (a, b) {
      if (b.total !== a.total) return b.total - a.total;
      var ad = a.first || '9999', bd = b.first || '9999';
      if (ad !== bd) return ad < bd ? -1 : 1;
      return a.idx - b.idx;
    });
    order.forEach(function (g, i) { g.rank = i + 1; });
    return { ranked: order, placeholders: placeholders };
  }
  function money(n) {
    return '$' + (n % 1 ? n.toFixed(2) : String(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function raceText(ranked) {
    if (!ranked.length) return 'Be the first. Claim the #1 spot.';
    return 'Give more than ' + money(ranked[0].total) + ' to take the #1 spot.';
  }

  var core = { CONFIG: CONFIG, safeUrl: safeUrl, urlKey: urlKey, compute: compute, raceText: raceText, money: money };
  if (typeof module !== 'undefined' && module.exports) { module.exports = core; return; }
  root.GoodLuckWall = core;

  /* ===== Browser UI ===== */
  var doc = document;
  var reduced = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function el(tag, cls, text) { var n = doc.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function svgUse(id) {
    var ns = 'http://www.w3.org/2000/svg', s = doc.createElementNS(ns, 'svg'), u = doc.createElementNS(ns, 'use');
    s.setAttribute('aria-hidden', 'true'); u.setAttribute('href', '#' + id); s.appendChild(u); return s;
  }
  function link(g, cls) {
    // Only http(s) URLs (re-validated) become links; everything else is plain text. Names are always textContent.
    var u = g.url && safeUrl(g.url);
    if (!u) return el('span', cls, g.name);
    var a = el('a', cls, g.name);
    a.href = u.href; a.target = '_blank'; a.rel = 'sponsored noopener';
    return a;
  }

  // PayPal link
  var ppLink = $('[data-paypal-link]');
  if (ppLink && CONFIG.PAYPAL_ME_URL && safeUrl(CONFIG.PAYPAL_ME_URL)) {
    ppLink.href = CONFIG.PAYPAL_ME_URL;
    var hint = $('[data-paypal-hint]'); if (hint) hint.textContent = 'Opens my PayPal.Me page in a new tab.';
  } else if (ppLink) { ppLink.href = CONFIG.PAYPAL_SEND_URL; }

  // Copy email
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var field = $(btn.getAttribute('data-copy')), status = $('#copy-status'), label = btn.querySelector('span');
      var text = field ? field.value : CONFIG.PAYPAL_EMAIL;
      function ok() { btn.classList.add('is-done'); if (label) label.textContent = 'Copied'; if (status) status.textContent = 'Email copied. Paste it as the recipient in PayPal.'; setTimeout(function () { btn.classList.remove('is-done'); if (label) label.textContent = 'Copy'; }, 2400); }
      function fallback() { try { field.focus(); field.select(); if (doc.execCommand('copy')) return ok(); } catch (e) {} if (status) status.textContent = 'Select the email above and copy it.'; }
      if (navigator.clipboard && root.isSecureContext) navigator.clipboard.writeText(text).then(ok, fallback); else fallback();
    });
  });

  // Celebration
  var party = $('[data-party]'), modal = $('[data-modal]'), lastFocus = null;
  function burst() {
    var fire = root.confetti;
    if (reduced || typeof fire !== 'function') return;
    var colors = ['#f1cf7a', '#d9a93f', '#2f9e6b', '#38b27a', '#ffffff'];
    var opts = { colors: colors, zIndex: 300, disableForReducedMotion: true };
    fire(Object.assign({ particleCount: 160, spread: 100, startVelocity: 55, origin: { y: .6 } }, opts));
    setTimeout(function () { fire(Object.assign({ particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: .75 } }, opts)); fire(Object.assign({ particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: .75 } }, opts)); }, 250);
    var end = Date.now() + 1600;
    (function frame() {
      fire(Object.assign({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: .3 } }, opts));
      fire(Object.assign({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: .3 } }, opts));
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
  function openParty() {
    lastFocus = doc.activeElement;
    party.hidden = false; doc.body.style.overflow = 'hidden';
    burst();
    var b = $('[data-open-form]', party); if (b) b.focus();
  }
  function closeParty() { party.hidden = true; doc.body.style.overflow = ''; }
  function openForm() {
    if (party.hidden) lastFocus = doc.activeElement;
    closeParty();
    if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    var f = $('#f-name'); if (f) setTimeout(function () { f.focus(); }, 30);
  }
  function closeForm() { if (modal.open && modal.close) modal.close(); else modal.removeAttribute('open'); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  $$('[data-paid]').forEach(function (b) { b.addEventListener('click', openParty); });
  $$('[data-open-form]').forEach(function (b) { b.addEventListener('click', openForm); });
  $$('[data-close-party]').forEach(function (b) { b.addEventListener('click', function () { closeParty(); if (lastFocus && lastFocus.focus) lastFocus.focus(); }); });
  $$('[data-close-modal]').forEach(function (b) { b.addEventListener('click', closeForm); });
  if (party) {
    party.addEventListener('click', function (e) { if (e.target === party) closeParty(); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !party.hidden) closeParty(); });
  }
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeForm(); });

  // Form
  var form = $('[data-form]');
  function setErr(name, msg) {
    var p = $('[data-err="' + name + '"]', form), input = form.elements[name];
    if (p) p.textContent = msg || '';
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }
  function validate() {
    var ok = true, f = form.elements;
    var name = f.name.value.trim();
    setErr('name', ''); setErr('website', ''); setErr('amount_usd', ''); setErr('paypal_email', '');
    if (!name) { setErr('name', 'Please enter the name to show.'); ok = false; }
    var u = safeUrl(f.website.value);
    if (!u) { setErr('website', 'Enter a website starting with http:// or https://'); ok = false; } else f.website.value = u.href;
    var amt = toAmount(f.amount_usd.value);
    if (!amt) { setErr('amount_usd', 'Enter the amount you sent, in USD.'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.paypal_email.value.trim())) { setErr('paypal_email', 'Enter the PayPal email you paid from.'); ok = false; }
    return ok;
  }
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = $('[data-form-status]'), btn = $('[data-submit]');
    status.textContent = '';
    if (!validate()) { var bad = $('[aria-invalid=true]', form); if (bad) bad.focus(); return; }
    if (form.elements._honey.value) { showOk(); return; } // bot: pretend success, send nothing
    var payload = {};
    Array.prototype.forEach.call(form.elements, function (i) { if (i.name && i.name !== '_next') payload[i.name] = i.value.trim(); });
    payload.page = location.href;
    btn.disabled = true; btn.textContent = 'Sending…';
    fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || String(j.success) === 'false') throw new Error(j.message || 'error'); }); })
      .then(showOk)
      .catch(function () { status.textContent = 'That didn’t send. Please try again, or email your details to ' + CONFIG.PAYPAL_EMAIL + '.'; })
      .then(function () { btn.disabled = false; btn.textContent = 'Send my details'; });
  });
  function showOk() {
    $('[data-ok-name]').textContent = form.elements.name.value.trim() || 'friend';
    $('[data-form-wrap]').hidden = true; $('[data-form-ok]').hidden = false;
    form.reset();
  }

  // Wall
  function row(g) {
    var li = el('li', 'gl-row' + (g.placeholder ? ' gl-row--ph' : '') + (g.rank === 1 ? ' gl-row--top' : ''));
    li.appendChild(el('span', 'gl-row__n', g.placeholder ? '' : g.rank + '.'));
    var name = el('span', 'gl-row__name');
    if (g.placeholder) { name.textContent = g.name; }
    else {
      if (g.rank === 1) name.appendChild(el('span', 'gl-row__star', '\u2605'));
      name.appendChild(link(g));
    }
    li.appendChild(name);
    li.appendChild(el('span', 'gl-row__dots'));
    li.appendChild(el('span', 'gl-row__amt', g.placeholder ? 'example' : money(g.total)));
    if (!g.placeholder && g.rank === 1) li.setAttribute('aria-label', '#1 top supporter: ' + g.name + ', ' + money(g.total));
    return li;
  }
  function renderWall(data) {
    var res = compute(data), ranked = res.ranked;
    $$('[data-race]').forEach(function (n) { n.textContent = raceText(ranked); });
    var cta = $('.gl-race__cta'); if (cta) cta.textContent = ranked.length ? 'Take #1' : 'Claim it';
    var list = $('[data-list]'); list.textContent = '';
    ranked.forEach(function (g) { list.appendChild(row(g)); });
    var ph = ranked.length < CONFIG.HIDE_EXAMPLES_AT ? res.placeholders.slice(0, 4) : [];
    ph.forEach(function (g) { list.appendChild(row(g)); });
    $('.gl-legend').hidden = ph.length === 0;
  }
  var msg = $('[data-wall-msg]');
  fetch(CONFIG.SUPPORTERS_JSON, { cache: 'no-cache' })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(renderWall)
    .catch(function () { renderWall([]); if (msg) { msg.hidden = false; msg.textContent = 'The supporter list couldn’t load just now. Please refresh in a moment.'; } });

  // Progressive scroll reveal: content is visible by default; animate only once the visitor scrolls.
  if (!reduced && 'IntersectionObserver' in root) {
    var started = false;
    root.addEventListener('scroll', function () {
      if (started) return; started = true;
      var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
      $$('.reveal').forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.top > root.innerHeight) { doc.documentElement.classList.add('js-reveal'); io.observe(n); } else n.classList.add('is-in');
      });
    }, { passive: true });
  }
})(typeof window !== 'undefined' ? window : globalThis);
