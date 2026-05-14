/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Dummy content to allow scrolling */}
      <div className="h-[150vh] flex flex-col items-center justify-center bg-stone-50 text-stone-400 p-8 text-center">
        <h2 className="text-2xl font-serif text-stone-600 mb-4">Alfaaz Jewelry</h2>
        <p>Scroll down to view the footer</p>
        <div className="mt-12 h-32 w-[1px] bg-stone-300 animate-pulse" />
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Scale down from 1.3x to 0.8x as the user scrolls through the footer
  const logoScale = useTransform(scrollYProgress, [0, 1], [1.3, 0.8]);
  // Slight vertical parallax effect
  const logoY = useTransform(scrollYProgress, [0, 1], ['25%', '0%']);
  const logoOpacity = useTransform(scrollYProgress, [0.1, 0.6, 1], [0, 1, 1]);

  return (
    <footer
      ref={containerRef}
      className="bg-[#F9F7F2] text-[#1A1A1A] pt-24 pb-8 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Oversized Animated Logo Section */}
      <div className="flex justify-center items-center h-[25vh] sm:h-[35vh] mb-12 md:mb-20 pointer-events-none">
        <motion.h1
          style={{ scale: logoScale, y: logoY, opacity: logoOpacity }}
          className="text-[25vw] md:text-[22vw] font-[Times_New_Roman,Times,serif] uppercase tracking-[-0.04em] text-[#1A1A1A] opacity-90 leading-none whitespace-nowrap"
        >
          Alfaaz
        </motion.h1>
      </div>

      {/* Thin divider */}
      <hr className="border-black/10 mb-12" />

      {/* Link grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-20">
        <div className="flex flex-col space-y-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] opacity-40 mb-2">Collections</h3>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Rings</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Necklaces</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Earrings</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Bracelets</a>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] opacity-40 mb-2">Brand</h3>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">About Alfaaz</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Our Story</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Craftsmanship</a>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] opacity-40 mb-2">Support</h3>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Contact</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">FAQ</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Shipping & Returns</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Care Guide</a>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] opacity-40 mb-2">Legal</h3>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Privacy Policy</a>
          <a href="#" className="text-[13px] font-medium hover:opacity-50 transition-opacity">Terms</a>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center pt-8 border-t border-black/5 text-[11px] uppercase tracking-widest opacity-60 gap-6 md:gap-0">
        <p>&copy; {new Date().getFullYear()} Alfaaz. All rights reserved.</p>
        
        <div className="relative group flex items-center space-x-2 border border-black/10 px-4 py-2 rounded-full cursor-pointer hover:bg-black/5 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-800 shrink-0"></span>
          <label htmlFor="country-selector" className="sr-only">Country / Region</label>
          <span className="opacity-80">Region /</span>
          <div className="relative">
            <select 
              id="country-selector"
              className="appearance-none bg-transparent border-none pl-1 pr-6 py-0 focus:outline-none focus:ring-0 uppercase cursor-pointer tracking-widest text-[11px]"
              defaultValue="US"
            >
              <option value="US">United States (USD)</option>
              <option value="UK">United Kingdom (GBP)</option>
              <option value="EU">Europe (EUR)</option>
              <option value="CA">Canada (CAD)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </footer>
  );
}
