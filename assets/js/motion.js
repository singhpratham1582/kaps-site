/* ==========================================================================
   KAPS motion  ·  v1.0
   Nine moves from DESIGN.md, driven by Lenis + GSAP ScrollTrigger.

   Contract: this file is progressive enhancement. It sets html.motion-on
   only once the libraries are confirmed present. Until then, and forever if
   they fail, motion.css releases every hidden state and the page reads as a
   complete static document.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  var ready = !reduce && gsap && ST;

  if (!ready) return;          // motion.css keeps everything visible
  root.classList.add('motion-on');
  gsap.registerPlugin(ST);

  var lenis = null;

  /* ---- 1 · Smooth scroll ------------------------------------------------ */
  function initLenis() {
    if (typeof window.Lenis !== 'function') return;
    lenis = new window.Lenis({
      duration: 1.05,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true
    });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      a.addEventListener('click', function (e) {
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -90 });
      });
    });
  }

  /* ---- 2 · Line mask ----------------------------------------------------
     Split by rendered line, not by word, so the mask follows real wrapping.
     Re-split on resize because the line breaks move. */
  function splitLines(el) {
    if (el.dataset.split === 'done') {
      el.innerHTML = el.dataset.raw;
    } else {
      el.dataset.raw = el.innerHTML;
      el.dataset.split = 'done';
    }
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    var spans = words.map(function (w, i) {
      var s = document.createElement('span');
      s.className = 'w';
      s.style.display = 'inline-block';
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      return s;
    });

    // Group words by their vertical offset: that is a line.
    var lines = [];
    var currentTop = null;
    spans.forEach(function (s) {
      var top = s.offsetTop;
      if (currentTop === null || Math.abs(top - currentTop) > 4) {
        currentTop = top;
        lines.push([]);
      }
      lines[lines.length - 1].push(s.textContent);
    });

    el.innerHTML = '';
    el.classList.add('lines');
    lines.forEach(function (words) {
      var line = document.createElement('span');
      line.className = 'line';
      var inner = document.createElement('span');
      inner.textContent = words.join(' ');
      line.appendChild(inner);
      el.appendChild(line);
    });
    return el.querySelectorAll('.line > span');
  }

  function initLines() {
    var heads = gsap.utils.toArray('[data-lines]');

    /* This used to be gsap.set(inners, {yPercent: 105}) plus a gsap.to on
       enter. That wrote an inline transform, which CSS cannot override, and
       there was no backstop. When the ScrollTrigger did not fire, every
       heading on the page stayed parked 105% below its own mask, invisible
       and unrecoverable. Headings are the one thing on this site that must
       never depend on a tween running.

       So: the hidden state lives in motion.css, the reveal is a class, and
       the stagger is a transition-delay. Three separate things now have to
       fail before a heading disappears. */
    function arm(el) {
      var inners = splitLines(el);
      for (var i = 0; i < inners.length; i++) {
        inners[i].style.transitionDelay = (i * 70) + 'ms';
      }
      return inners;
    }

    function show(el) { el.classList.add('is-in'); }

    heads.forEach(function (el) {
      arm(el);

      // Anything already on screen shows immediately. A heading above the
      // fold must not wait for a scroll that may never happen.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        show(el);
        return;
      }

      ST.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: function () { show(el); }
      });
    });

    // Backstop, the same one .reveal has always had.
    setTimeout(function () { heads.forEach(show); }, 2600);

    // Re-split on resize. The line breaks move, so the masks have to move
    // with them. is-in stays on the heading, so nothing re-hides.
    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        heads.forEach(function (el) {
          var inners = arm(el);
          for (var i = 0; i < inners.length; i++) inners[i].style.transitionDelay = '0ms';
        });
        ST.refresh();
      }, 250);
    });
  }

  /* ---- 3 · Stagger reveal ------------------------------------------------ */
  function initReveal() {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      ST.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: function () { el.classList.add('is-in'); }
      });
    });
    // Backstop: nothing stays hidden.
    setTimeout(function () {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
    }, 4000);
  }

  /* ---- 4 · Paper wipe ---------------------------------------------------- */
  function initWipe() {
    var wipes = gsap.utils.toArray('.wipe');
    wipes.forEach(function (el) {
      // Already on screen means show it now. The hero photograph must not
      // wait on a scroll event to exist.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add('is-in');
        return;
      }
      ST.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: function () { el.classList.add('is-in'); }
      });
    });
    // Backstop. A wipe that never opens is a photograph clipped to nothing.
    setTimeout(function () {
      wipes.forEach(function (el) { el.classList.add('is-in'); });
    }, 2600);
  }

  /* ---- 5 · Sticky choreography ------------------------------------------- */
  function initTracks() {
    gsap.utils.toArray('[data-track]').forEach(function (scope) {
      var fill = scope.querySelector('[data-track-fill]');
      var label = scope.querySelector('[data-track-label]');
      var items = scope.querySelectorAll('[data-track-item]');
      if (!fill) return;
      ST.create({
        trigger: scope,
        start: 'top 65%',
        end: 'bottom 80%',
        scrub: 0.4,
        onUpdate: function (self) {
          gsap.set(fill, { scaleX: self.progress });
          if (label && items.length) {
            var n = Math.min(items.length, Math.max(1, Math.ceil(self.progress * items.length) || 1));
            label.textContent = items[n - 1].dataset.trackItem || '';
          }
        }
      });
    });
  }

  /* ---- 6 · Horizontal travel ---------------------------------------------
     The rail moves sideways while the page scrolls vertically. Pinned only
     for the distance it needs, never longer. */
  function initTravel() {
    gsap.utils.toArray('[data-travel]').forEach(function (section) {
      var rail = section.querySelector('[data-travel-rail]');
      if (!rail) return;
      var distance = function () {
        // Cap the travel. 3,000px of pin for a client list is a hostage
        // situation, not an interaction.
        return Math.min(rail.scrollWidth - window.innerWidth, window.innerHeight * 1.6);
      };
      if (distance() <= 0) return;   // fits already, do not pin

      gsap.to(rail, {
        x: function () { return -distance(); },
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: function () { return '+=' + distance(); },
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    });
  }

  /* ---- 7 · Object tilt ---------------------------------------------------- */
  function initTilt() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    gsap.utils.toArray('[data-tilt]').forEach(function (el) {
      var stage = el.closest('.stage') || el.parentElement;
      var face = el.querySelector('.piece__face');
      var rx = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3' });
      var ry = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3' });
      var baseX = parseFloat(el.dataset.tiltX || '6');
      var baseY = parseFloat(el.dataset.tiltY || '-14');
      gsap.set(el, { rotationX: baseX, rotationY: baseY });
      gsap.to(el, { y: -12, duration: 4.4, ease: 'sine.inOut', repeat: -1, yoyo: true });

      stage.addEventListener('mousemove', function (e) {
        var r = stage.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5;
        var ny = (e.clientY - r.top) / r.height - 0.5;
        ry(baseY - nx * 26);
        rx(baseX + ny * 16);
        if (face) face.style.setProperty('--rake', (nx * 140 - 30) + '%');
      });
      stage.addEventListener('mouseleave', function () {
        ry(baseY); rx(baseX);
        if (face) face.style.setProperty('--rake', '-50%');
      });
    });
  }

  /* ---- 8 · Page transition ------------------------------------------------
     A paper wipe out, then in. Only for same-origin, same-tab navigations. */
  function initCurtain() {
    var curtain = document.querySelector('[data-curtain]');
    if (!curtain) return;

    // Uncover on arrival.
    gsap.set(curtain, { scaleY: 1, transformOrigin: 'top center' });
    gsap.to(curtain, {
      scaleY: 0, duration: 0.7, ease: 'expo.inOut', delay: 0.05,
      onComplete: function () { curtain.classList.remove('is-covering'); }
    });

    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') ||
          href.startsWith('tel:') || a.target === '_blank' ||
          a.hasAttribute('download') || /^https?:\/\//.test(href)) return;

      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        // Bring the mark back as the curtain closes, so leaving a page and
        // arriving at the next one is a single continuous movement.
        if (typeof window.kapsShowLoader === 'function') window.kapsShowLoader();
        curtain.classList.add('is-covering');
        gsap.set(curtain, { transformOrigin: 'bottom center' });
        gsap.to(curtain, {
          scaleY: 1, duration: 0.6, ease: 'expo.inOut',
          onComplete: function () { window.location.href = href; }
        });
      });
    });

    // Restore on back/forward, which would otherwise show a covered page.
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) gsap.set(curtain, { scaleY: 0 });
    });
  }

  /* ---- 9 · Scroll progress -------------------------------------------------- */
  function initProgress() {
    var fill = document.querySelector('[data-progress-fill]');
    if (!fill) return;
    ST.create({
      start: 0,
      end: function () { return document.body.scrollHeight - window.innerHeight; },
      scrub: 0.3,
      onUpdate: function (self) { gsap.set(fill, { scaleX: self.progress }); }
    });
  }


  /* ---- The press ----------------------------------------------------------
     Five stations across one sticky screen. Restored from the earlier
     prototype and retimed for the blue build. -------------------------- */
  function initPress() {
    var root = document.querySelector('[data-press]');
    if (!root) return;

    var STAGES = [
      ['Send us the file you have.', 'Whatever state it is in. AI, PDF, CDR or PSD. If it is in something else, send it anyway and we will tell you whether it will work.'],
      ['We check it before a plate is made.', 'Bleed, resolution, colour mode, embedded fonts, die line. What will fail on press, said before it fails rather than after.'],
      ['Printed to the specification on file.', 'Stock, ink values, finish, dimensions, folds. Recorded once, and every run after this one is measured against the record.'],
      ['Checked before it reaches you.', 'The run is measured against that record before it is packed. This is the step you would otherwise be doing yourself.'],
      ['Delivered to the date on the quote.', 'The date was the commitment, not an estimate. Thirty-one years, thirty-six organisations, ten sectors.']
    ];
    var title = root.querySelector('[data-hud-title]');
    var body  = root.querySelector('[data-hud-body]');
    var rails = root.querySelectorAll('[data-rail]');
    var slabs = root.querySelectorAll('[data-slabel]');
    var stations = root.querySelectorAll('.station');
    var current = -1;

    function setStage(i, immediate) {
      if (i === current) return;
      current = i;
      title.textContent = STAGES[i][0];
      body.textContent  = STAGES[i][1];
      rails.forEach(function (r, n) { r.dataset.on = String(n === i); });
      slabs.forEach(function (l, n) { l.classList.toggle('lbl--on', n === i); });
      stations.forEach(function (s, n) {
        gsap.set(s, { opacity: n === i ? 1 : 0.35 });
        if (!immediate) gsap.to(s, { opacity: n === i ? 1 : 0.35, duration: 0.35, overwrite: 'auto' });
      });
      // The first call paints the idle state. Animating it from opacity 0
      // would flash the HUD before the visitor has scrolled anything.
      if (immediate) {
        gsap.set([title, body], { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo([title, body], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05, overwrite: true });
    }

    // Paint stage one immediately, so the machine has a correct, legible idle
    // state while the section is arriving and during the settle beat below.
    setStage(0, true);

    var sheet = root.querySelector('[data-sheet]');
    var plate = root.querySelector('[data-plate]');
    var spokes = root.querySelectorAll('[data-spokes]');
    var beam = root.querySelector('[data-beam]');
    var glow = root.querySelector('[data-beam-glow]');
    var stack = root.querySelector('[data-stack]');
    var inks = { 1: root.querySelectorAll('[data-ink="1"]'), 2: root.querySelectorAll('[data-ink="2"]'), 3: root.querySelectorAll('[data-ink="3"]') };

    gsap.set(plate, { y: -46 });
    gsap.set(sheet, { x: 60 });
    setStage(0);

    /* The nav steps aside for the length of the press.

       Two reasons. The rail labels (File, Prepress, Colour...) sit at the top
       of the sticky and were running underneath the fixed header, which is
       what made the section look clipped. And a full-height machine competing
       with a fixed nav is one element too many on screen at once. The header
       comes back the moment the section ends, in either direction. */
    var header = document.querySelector('[data-header]');
    if (header) {
      ST.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onToggle: function (self) {
          header.dataset.hidden = String(self.isActive);
        },
        // Re-sync on refresh so a reload deep in the section, or a resize
        // that moves the boundaries, can never leave the nav stuck hidden.
        onRefresh: function (self) {
          header.dataset.hidden = String(self.isActive);
        }
      });
    }

    var tl = gsap.timeline({
      scrollTrigger: {
        /* A settle beat before anything moves.

           'top top' is the moment the sticky pins, which is technically the
           moment the machine is fully in view. Starting there meant the press
           was already part-way through its cycle by the time you had taken the
           section in: you arrived at 'Colour' rather than at 'File'.

           'top top-=60%' starts the scrub only after the section has been
           pinned and completely in view for 60% of a viewport of scrolling.
           The machine sits idle at stage one for that stretch, then runs.
           Function-based so it recalculates on resize, hence
           invalidateOnRefresh. */
        trigger: root,
        start: function () { return 'top top-=' + Math.round(window.innerHeight * 0.6); },
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          setStage(Math.min(4, Math.floor(self.progress * 5)));
          spokes.forEach(function (g, i) {
            gsap.set(g, { rotation: self.progress * 900 * (i === 0 ? 1 : -1), svgOrigin: i === 0 ? '620 118' : '620 282' });
          });
        }
      }
    });

    tl.to(sheet, { x: 250, ease: 'none', duration: 1 })
      .to(sheet, { x: 312, ease: 'none', duration: 0.55 })
      .to(plate, { y: 82, ease: 'power2.in', duration: 0.25 }, '<0.1')
      .to(inks[1], { opacity: 1, duration: 0.12 }, '>-0.02')
      .to(plate, { y: -46, ease: 'power2.out', duration: 0.25 })
      .to(sheet, { x: 470, ease: 'none', duration: 0.45 }, '<')
      .to(sheet, { x: 574, ease: 'none', duration: 0.6 })
      .to(inks[2], { opacity: 1, duration: 0.2 }, '>-0.15')
      .to(sheet, { x: 700, ease: 'none', duration: 0.6 })
      .to(inks[3], { opacity: 1, duration: 0.2 }, '<0.2')
      .to(sheet, { x: 838, ease: 'none', duration: 0.8 })
      .to([beam, glow], { opacity: 1, duration: 0.15 }, '<0.35')
      .to([beam, glow], { x: 118, ease: 'power1.inOut', duration: 0.7 }, '<')
      .to([beam, glow], { opacity: 0, duration: 0.2 })
      .to(sheet, { x: 1050, ease: 'none', duration: 0.9 }, '<0.1')
      .to(stack, { opacity: 1, duration: 0.3 }, '<0.45')
      .to(sheet, { x: 1104, y: 58, ease: 'power2.in', duration: 0.4 })
      .to(sheet, { opacity: 0, duration: 0.2 });
  }


  /* ------------------------------------------------------------------
     Parallax on the full-bleed bands. The image is 116% tall with an
     -8% offset (base.css), so it has room to travel without ever
     showing an edge. Small number on purpose: a band that slides more
     than about 12 percent of its own height reads as a broken sticky,
     not as depth.
     ------------------------------------------------------------------ */
  function initParallax() {
    document.querySelectorAll('.band .photo img').forEach(function (img) {
      gsap.fromTo(img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.band'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
    });
  }

  /* ---- 10 · The bundle ---------------------------------------------------
     Five sheets held open as a fan close into one bundle, and a cover lands
     on it. The open fan is the CSS default, so this only ever animates away
     from a readable state and back to it. Nothing here can strand content.
     ------------------------------------------------------------------------ */
  function initFan() {
    gsap.utils.toArray('[data-fan]').forEach(function (sec) {
      var leaves = sec.querySelectorAll('[data-leaf]');
      var cover = sec.querySelector('[data-fan-cover]');
      if (!leaves.length) return;

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          // Enough travel to read the close, not so much it holds you
          // hostage. Same cap as the roster.
          end: '+=' + Math.round(window.innerHeight * 1.25),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1
        }
      });

      leaves.forEach(function (leaf, i) {
        // Square up, then settle into a slightly imperfect stack. A pile of
        // paper that lines up to the millimetre looks like a render.
        tl.to(leaf, {
          rotate: (i - 2) * 0.8,
          y: i * -1.5,
          ease: 'power2.inOut'
        }, 0);
      });

      if (cover) {
        tl.fromTo(cover,
          { opacity: 0, yPercent: -8, rotate: -3 },
          { opacity: 1, yPercent: 0, rotate: 0, ease: 'power3.out' }, 0.5);
      }
    });
  }

  function init() {
    initLenis();
    initLines();
    initReveal();
    initWipe();
    initTracks();
    initTravel();
    initTilt();
    initCurtain();
    initProgress();
    /* Order matters here, and it is not cosmetic.

       A pinned section adds a pin-spacer to the document, which pushes
       everything below it down by the pin distance. Triggers created before
       that spacer exists cache scroll positions that do not include it.

       The bundle pins for 1.25 viewports. Because initFan() used to run after
       initPress(), both press triggers were cached 1,005px too high: the
       machine began its cycle while the bundle was still pinned and the press
       section was a full viewport below the fold. Creating triggers in
       document order, then sorting before the refresh, keeps every start
       honest. */
    initFan();       // section 3
    initPress();     // section 9
    initParallax();
    ST.sort();
    ST.refresh();

    /* Re-measure once the page has stopped moving underneath us.

       Every trigger's start and end is a scroll position cached at refresh
       time. init() runs on DOMContentLoaded, which is before images decode
       and before webfonts swap in. Both change layout: a heading re-wraps,
       an image without a reserved box takes up height, and every section
       below moves down. The cached positions do not move with them.

       Measured on the homepage, this put the press section's trigger 1,005px
       (1.25 viewports) above where the section actually was, so the machine
       was already part-way through its cycle by the time it came into view.
       Refreshing on load and after the fonts resolve fixes every trigger on
       the page, not just that one. */
    window.addEventListener('load', function () { ST.refresh(); });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ST.refresh(); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
