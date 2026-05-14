/**
 * carousel.js
 * Product carousel — ported from product curosel/src/App.tsx
 *
 * Uses native scrollBy with smooth behavior, exactly like the source:
 *   scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
 * Also toggles left and right arrow visibility based on scroll position.
 */

(function () {
  'use strict';

  var scrollContainer = document.getElementById('products-scroll');
  var prevBtn = document.getElementById('products-prev');
  var nextBtn = document.getElementById('products-next');

  if (!scrollContainer || !nextBtn || !prevBtn) return;

  function updateArrows() {
    // Show left arrow if we have scrolled right at all
    if (scrollContainer.scrollLeft > 10) {
      prevBtn.classList.add('is-visible');
      prevBtn.classList.remove('is-hidden');
    } else {
      prevBtn.classList.add('is-hidden');
      prevBtn.classList.remove('is-visible');
    }

    // Hide right arrow if we are at the end
    var maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    if (scrollContainer.scrollLeft >= maxScroll - 10) {
      nextBtn.classList.add('is-hidden');
      nextBtn.classList.remove('is-visible');
    } else {
      nextBtn.classList.add('is-visible');
      nextBtn.classList.remove('is-hidden');
    }
  }

  function getScrollDistance() {
    var card = document.querySelector('.product-card');
    if (!card) return 360;
    
    // get gap (30px)
    var gap = 30; 
    return card.offsetWidth + gap;
  }

  nextBtn.addEventListener('click', function () {
    scrollContainer.scrollBy({ left: getScrollDistance(), behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', function () {
    scrollContainer.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' });
  });

  scrollContainer.addEventListener('scroll', function () {
    // Debounce slightly or just requestAnimationFrame for performance
    window.requestAnimationFrame(updateArrows);
  });

  // Initial check
  updateArrows();
})();
