/* ============================================================
   Influencer Carousel — scroll, progress bar, & arrow controls
   ============================================================ */
(function () {
  const scroll = document.getElementById('influencer-scroll');
  const thumb  = document.getElementById('influencer-thumb');
  const prev   = document.getElementById('influencer-prev');
  const next   = document.getElementById('influencer-next');

  if (!scroll || !thumb || !prev || !next) return;

  function update() {
    const { scrollLeft, scrollWidth, clientWidth } = scroll;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      thumb.style.width = '100%';
      thumb.style.left  = '0%';
      prev.disabled = true;
      next.disabled = true;
      return;
    }

    const progress   = scrollLeft / maxScroll;
    const thumbWidth = Math.max(10, Math.min(100, (clientWidth / scrollWidth) * 100));

    thumb.style.width = thumbWidth + '%';
    thumb.style.left  = (progress * (100 - thumbWidth)) + '%';

    prev.disabled = scrollLeft <= 1;
    next.disabled = progress >= 0.99;
  }

  function doScroll(direction) {
    const amount = scroll.clientWidth * 0.8;
    scroll.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }

  prev.addEventListener('click', function () { doScroll('left'); });
  next.addEventListener('click', function () { doScroll('right'); });
  scroll.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  // Initial state
  update();
})();
