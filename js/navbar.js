/**
 * navbar.js
 * Smart hide/show navbar on scroll with transparent/cream state.
 *
 * Behaviour:
 *  - At the top (within hero)  → transparent bg, white text, always visible
 *  - Scrolling DOWN past hero  → hide navbar (fade out)
 *  - Scrolling UP (below hero) → show navbar with cream bg, dark text
 *  - Back at top               → transparent again
 */

(function () {
  'use strict';

  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  var lastScrollY = 0;
  var ticking = false;

  // Get the hero section height to know when we've scrolled past it
  var heroEl = document.querySelector('.hero');

  function getHeroBottom() {
    if (!heroEl) return 400; // fallback
    return heroEl.offsetTop + heroEl.offsetHeight;
  }

  function updateNavbar() {
    var currentScrollY = window.scrollY;
    var heroBottom = getHeroBottom();
    var isAtTop = currentScrollY < 50; // only transparent at the very top

    // Toggle cream/transparent state
    if (isAtTop) {
      // At the very top → transparent
      navbar.classList.remove('navbar--scrolled');
    } else {
      // Anywhere below → cream background
      navbar.classList.add('navbar--scrolled');
    }

    // Toggle hide/show
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down past threshold — hide
      navbar.classList.add('navbar--hidden');
    } else {
      // Scrolling up — reveal
      navbar.classList.remove('navbar--hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initial state
  updateNavbar();
})();
