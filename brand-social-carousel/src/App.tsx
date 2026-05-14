/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import InfluencerCarousel from './components/InfluencerCarousel';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Spacer to simulate scrolling down to the section */}
      <div className="h-screen flex items-center justify-center bg-stone-100 italic text-stone-400">
        <p>Scroll down to view the influencer section &darr;</p>
      </div>

      {/* The requested section */}
      <InfluencerCarousel />
      
      {/* Spacer below to demonstrate intersection observer leaving viewport */}
      <div className="h-[50vh] bg-stone-100 flex items-center justify-center text-stone-400">
        <p>End of page</p>
      </div>
    </div>
  );
}
