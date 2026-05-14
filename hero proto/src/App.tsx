/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar if scrolling down and past the top 50px
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        // Show navbar if scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="bg-white min-h-[200vh] font-sans antialiased text-[#111]">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out pt-8 px-6 md:px-12 pointer-events-none ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center text-white pointer-events-auto">
          {/* Left Links */}
          <div className="hidden md:flex space-x-8 text-[13px] font-bold tracking-[0.1em] uppercase">
            <a href="#" className="hover:opacity-70 transition-opacity">Shop</a>
            <a href="#" className="hover:opacity-70 transition-opacity">About</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Futures</a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>

          {/* Logo */}
          <div className="text-4xl md:text-[2.75rem] font-extrabold tracking-tighter absolute left-1/2 -translate-x-1/2 leading-none">
            Alfaaz
          </div>

          {/* Right Links */}
          <div className="flex space-x-6 md:space-x-8 text-[13px] font-bold tracking-[0.1em] uppercase items-center">
            <a href="#" className="hidden md:block hover:opacity-70 transition-opacity">Search</a>
            <a href="#" className="hidden md:block hover:opacity-70 transition-opacity">Account</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Cart (0)</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-2 px-2 md:pt-4 md:px-4">
        <div className="relative w-full h-[95vh] rounded-[2rem] overflow-hidden bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=2940&auto=format&fit=crop"
            alt="Alfaaz Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlays to ensure text legibility while keeping the cinematic feel */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

          {/* Hero Content */}
          <div className="absolute bottom-10 left-6 md:bottom-16 md:left-14 text-white">
            <p className="text-[11px] md:text-[13px] font-extrabold tracking-[0.15em] uppercase mb-3">
              Limited Edition
            </p>
            <h1 className="text-4xl md:text-[4rem] leading-none font-medium tracking-tight mb-8">
              Elegance Redefined.
            </h1>
            <button className="border border-white rounded-full px-8 py-3.5 text-[11px] md:text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-colors duration-300">
              Shop the Collection
            </button>
          </div>
        </div>
      </main>

      {/* Spacer for scroll testing */}
      <section className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-3xl font-medium tracking-tight mb-4">Discover More</h2>
        <p className="text-gray-500 max-w-md">
          Scroll up to see the top bar magically reappear, and scroll down to watch it vanish into thin air.
        </p>
      </section>
    </div>
  );
}
