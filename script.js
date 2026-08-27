/* =========================================================
   740 Junk Removal LLC — interactions
   ========================================================= */
(function () {
  'use strict';

  var PHONE = '7402482127';

  /* ---------- current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky header shadow ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || burger.contains(e.target)) return;
      closeNav();
    });
  }

  /* ---------- FAQ accordion ---------- */
  var accs = Array.prototype.slice.call(document.querySelectorAll('.acc'));
  accs.forEach(function (acc) {
    var q = acc.querySelector('.acc__q');
    var a = acc.querySelector('.acc__a');
    if (!q || !a) return;

    q.addEventListener('click', function () {
      var isOpen = acc.classList.contains('is-open');

      accs.forEach(function (other) {
        if (other === acc) return;
        other.classList.remove('is-open');
        var oq = other.querySelector('.acc__q');
        var oa = other.querySelector('.acc__a');
        if (oq) oq.setAttribute('aria-expanded', 'false');
        if (oa) oa.style.maxHeight = null;
      });

      if (isOpen) {
        acc.classList.remove('is-open');
        q.setAttribute('aria-expanded', 'false');
        a.style.maxHeight = null;
      } else {
        acc.classList.add('is-open');
        q.setAttribute('aria-expanded', 'true');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  window.addEventListener('resize', function () {
    accs.forEach(function (acc) {
      if (!acc.classList.contains('is-open')) return;
      var a = acc.querySelector('.acc__a');
      if (a) a.style.maxHeight = a.scrollHeight + 'px';
    });
  });

  /* ---------- gallery lightbox ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var index = 0;
  var lastFocus = null;

  function render(i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    var img = items[index].querySelector('img');
    if (!img) return;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = items[index].getAttribute('data-caption') || img.alt || '';
  }

  function openLb(i) {
    if (!lb) return;
    lastFocus = document.activeElement;
    render(i);
    lb.hidden = false;
    document.body.classList.add('no-scroll');
    if (lbClose) lbClose.focus();
  }

  function closeLb() {
    if (!lb) return;
    lb.hidden = true;
    document.body.classList.remove('no-scroll');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { openLb(i); });
  });

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lbPrev) lbPrev.addEventListener('click', function () { render(index - 1); });
  if (lbNext) lbNext.addEventListener('click', function () { render(index + 1); });
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (!lb || lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') render(index - 1);
    else if (e.key === 'ArrowRight') render(index + 1);
  });

  /* ---------- scroll reveal ---------- */
  var targets = document.querySelectorAll(
    '.section__head, .card, .step, .proof, .why__item, .gallery__item, .areas__hub, .areas__list li, .acc, .split__copy, .split__media, .contact__info, .contact__form-wrap, .cta__inner, .hero__stats'
  );

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 5) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- quote form ---------- */
  var form = document.getElementById('quoteForm');
  var status = document.getElementById('formStatus');

  function setError(field, msg) {
    var wrap = field.closest('.field');
    if (!wrap) return;
    var err = wrap.querySelector('.field__err');
    if (msg) {
      wrap.classList.add('has-error');
      if (err) err.textContent = msg;
      field.setAttribute('aria-invalid', 'true');
    } else {
      wrap.classList.remove('has-error');
      if (err) err.textContent = '';
      field.removeAttribute('aria-invalid');
    }
  }

  function looksLikeContact(value) {
    var email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var digits = value.replace(/\D/g, '');
    return email.test(value.trim()) || digits.length >= 10;
  }

  if (form) {
    ['name', 'contactInfo', 'message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function () { setError(el, ''); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name');
      var contact = document.getElementById('contactInfo');
      var service = document.getElementById('service');
      var message = document.getElementById('message');
      var ok = true;

      if (!name.value.trim()) { setError(name, 'Please tell us your name.'); ok = false; }
      if (!contact.value.trim()) {
        setError(contact, 'Add an email or phone so we can contact you.');
        ok = false;
      } else if (!looksLikeContact(contact.value)) {
        setError(contact, 'That does not look like a valid email or phone number.');
        ok = false;
      }
      if (!message.value.trim()) { setError(message, 'A quick description helps us quote it.'); ok = false; }

      if (!ok) {
        if (status) {
          status.textContent = 'Please fix the highlighted fields.';
          status.classList.add('is-error');
        }
        var firstBad = form.querySelector('.has-error input, .has-error textarea');
        if (firstBad) firstBad.focus();
        return;
      }

      if (status) status.classList.remove('is-error');

      var body =
        'Junk removal request from ' + name.value.trim() +
        '. Service: ' + (service ? service.value : 'Junk removal') +
        '. Details: ' + message.value.trim() +
        '. Reach me at: ' + contact.value.trim();

      if (status) {
        status.textContent = 'Thanks, ' + name.value.trim().split(' ')[0] +
          '! Opening a text to (740) 248-2127 so we can quote you fast — or call us directly.';
      }

      window.location.href = 'sms:' + PHONE + '?&body=' + encodeURIComponent(body);
      form.reset();
    });
  }
})();
