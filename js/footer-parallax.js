/**
 * Footer Parallax — scroll-driven logo animation
 *   scale:   1.3  → 0.8   as footer scrolls into view
 *   y:       25%  → 0%    vertical parallax drift
 *   opacity: always 1 (no fade)
 */
(function () {
  var footer = document.getElementById('site-footer');
  var logo   = document.getElementById('footer-logo');
  if (!footer || !logo) return;

  function lerp(a, b, t) {
    return a + (b - a) * Math.min(1, Math.max(0, t));
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    var t = (value - inMin) / (inMax - inMin);
    return lerp(outMin, outMax, t);
  }

  var ticking = false;

  function updateLogo() {
    var rect     = footer.getBoundingClientRect();
    var winH     = window.innerHeight;
    var footerH  = rect.height;

    // scrollYProgress: 0 when footer top hits viewport bottom,
    //                  1 when footer bottom hits viewport bottom
    var rawProgress = (winH - rect.top) / (winH + footerH);
    var progress    = Math.min(1, Math.max(0, rawProgress));

    // Scale: 1.3 → 0.8
    var scale = mapRange(progress, 0, 1, 1.3, 0.8);

    // Y translate: 25% → 0%
    var yPct = mapRange(progress, 0, 1, 25, 0);

    logo.style.transform = 'scale(' + scale + ') translateY(' + yPct + '%)';

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateLogo);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  updateLogo();
})();
