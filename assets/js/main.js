/* ==========================================================================
   KAPS  ·  v1.0
   No dependencies. MOTION_INTENSITY 4 does not need a scroll library.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Reveal -------------------------------------------------------------
     Three fallbacks, because a reveal that fails leaves the page blank rather
     than merely unanimated. This was a real bug in the previous build.
     1. Anything in the viewport on load is shown immediately.
     2. IntersectionObserver handles the rest.
     3. A timeout shows everything if 1 and 2 both fail.
  ------------------------------------------------------------------------ */
  function initReveal() {
    // motion.js owns reveals when it arms. It adds .motion-on at parse time,
    // which is before this runs on DOMContentLoaded, so this check is safe.
    if (document.documentElement.classList.contains('motion-on')) return;

    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    function show(el) { el.classList.add('is-in'); }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(show);
      return;
    }

    var below = [];
    items.forEach(function (el, i) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        setTimeout(function () { show(el); }, Math.min(i, 5) * 60);
      } else {
        below.push(el);
      }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
    below.forEach(function (el) { io.observe(el); });

    setTimeout(function () { items.forEach(show); }, 2500);
  }

  /* ---- Mobile nav ---------------------------------------------------------- */
  function initNav() {
    var header = document.querySelector('[data-header]');
    var toggle = header && header.querySelector('.nav-toggle');
    if (!toggle) return;

    function set(open) {
      header.dataset.open = open ? 'true' : 'false';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    }
    toggle.addEventListener('click', function () {
      set(header.dataset.open !== 'true');
    });
    header.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () { set(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.dataset.open === 'true') set(false);
    });
  }

  /* ---- FAQ ----------------------------------------------------------------- */
  function initFaq() {
    document.querySelectorAll('.faq__q').forEach(function (q) {
      var item = q.closest('.faq__item');
      q.setAttribute('aria-expanded', item.dataset.open === 'true' ? 'true' : 'false');
      q.addEventListener('click', function () {
        var open = item.dataset.open !== 'true';
        item.dataset.open = open ? 'true' : 'false';
        q.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ---- Header lift on scroll ----------------------------------------------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var set = function () {
      header.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';
    };
    set();
    window.addEventListener('scroll', set, { passive: true });
  }

  /* ---- Client marquee -------------------------------------------------------
     House rule: a marquee is Splide, initialised globally by id. This replaced
     a GSAP pinned horizontal scroll that took the page hostage while it ran.

     Progressive enhancement, as with everything else here: without Splide the
     list is a plain flex row that scrolls with overflow-x, which is a working
     roster rather than a broken one. */
  function initMarquee() {
    var el = document.getElementById('client-marquee');
    if (!el) return;

    if (typeof window.Splide !== 'function') {
      el.classList.add('marquee--static');
      return;
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var AutoScroll =
      window.splide && window.splide.Extensions && window.splide.Extensions.AutoScroll;

    var opts = {
      type: 'loop',
      drag: 'free',
      perPage: 5,
      gap: 0,
      arrows: false,
      pagination: false,
      breakpoints: {
        1200: { perPage: 4 },
        900:  { perPage: 3 },
        640:  { perPage: 2 },
        460:  { perPage: 1 }
      }
    };
    // Extension options belong in the constructor. Assigning splide.options
    // after construction and before mount silently produced an unmounted,
    // empty band.
    if (AutoScroll && !reduce) {
      opts.autoScroll = { speed: 0.6, pauseOnHover: true, pauseOnFocus: true };
    }

    try {
      var splide = new window.Splide(el, opts);
      splide.mount(AutoScroll && !reduce ? { AutoScroll: AutoScroll } : {});
    } catch (e) {
      // A carousel that fails is a plain scrolling row, never an empty band.
      el.classList.add('marquee--static');
    }
  }

  /* ---- Loading screen -------------------------------------------------------
     Owned here, not in motion.js, and on a hard timer. A loading screen that
     outlives its own script hides the entire site, so the dismissal must not
     depend on GSAP arriving, on images decoding, or on anything else that can
     fail. Whichever of these fires first wins, and the 2.2s backstop fires
     regardless. */
  function initLoader() {
    var loader = document.querySelector('[data-loader]');
    if (!loader) return;

    var done = false;
    function dismiss() {
      if (done) return;
      done = true;
      loader.classList.add('is-done');
    }

    if (document.readyState === 'complete') setTimeout(dismiss, 260);
    else window.addEventListener('load', function () { setTimeout(dismiss, 260); });

    setTimeout(dismiss, 2200);

    // Shown again on the way out, so a page change reads as one movement.
    window.kapsShowLoader = function () { loader.classList.remove('is-done'); };
  }

  function init() {
    initLoader();
    initReveal(); initNav(); initFaq(); initHeader(); initMarquee();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
