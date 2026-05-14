import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'video' | 'image';
  src: string;
  alt: string;
}

const ITEMS: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1526413232644-8a4bf57b8db4?q=80&w=600&auto=format&fit=crop',
    alt: 'Influencer Photo 1',
  },
  {
    id: '2',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop',
    alt: 'Influencer Photo 2',
  },
  {
    id: '3',
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    alt: 'Influencer Video 1',
  },
  {
    id: '4',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1512413913411-ae3a137bcbd7?q=80&w=600&auto=format&fit=crop',
    alt: 'Influencer Photo 3',
  },
  {
    id: '5',
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    alt: 'Influencer Video 2',
  },
  {
    id: '6',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop',
    alt: 'Influencer Photo 4',
  },
  {
    id: '7',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1596704017254-9b121068fb21?q=80&w=600&auto=format&fit=crop',
    alt: 'Influencer Photo 5',
  },
];

const MediaCard: React.FC<{ item: MediaItem }> = ({ item }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {
              // Ignore play errors (e.g. autoplay prevention)
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.5, // Play when 50% visible
      }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [item.type]);

  return (
    <div className="shrink-0 snap-center rounded-[1.5rem] md:rounded-[2rem] overflow-hidden h-full aspect-[4/5] bg-stone-200">
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          src={item.src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover pointer-events-none"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default function InfluencerCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollMetrics, setScrollMetrics] = useState({ progress: 0, thumbWidth: 20 });
  const [activeArrow, setActiveArrow] = useState<'left' | 'right'>('right');

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Prevent divide by zero if not scrollable
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    
    // Thumb width as a percentage of the total container
    const thumbWidth = Math.max(10, Math.min(100, (clientWidth / scrollWidth) * 100));

    setScrollMetrics({ progress, thumbWidth });
  };

  const scroll = (direction: 'left' | 'right') => {
    setActiveArrow(direction);
    if (!scrollContainerRef.current) return;
    const { clientWidth } = scrollContainerRef.current;
    const scrollAmount = clientWidth * 0.8; // Scroll almost a full view

    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <section className="py-4 px-4 md:py-6 md:px-6 w-full">
      <div className="bg-[#f5f4f0] rounded-3xl md:rounded-[2.5rem] h-[95svh] w-full max-w-[1600px] mx-auto flex flex-col pt-8 md:pt-14 pb-6 md:pb-10 px-6 md:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between mb-8 gap-4 px-2 shrink-0">
          <h2 className="text-3xl md:text-[2.75rem] font-medium text-[#7a7872] tracking-tight">
            rhode + you
          </h2>
          <button className="rounded-full border border-[#d2d2d2] px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium text-[#7a7872] hover:bg-stone-200 transition-colors duration-300">
            FIND US ON SOCIAL
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative group flex-1 min-h-0">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory flex-nowrap hide-scrollbar h-full px-2"
          >
            {ITEMS.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Controls Section (Progress Bar + Arrows) */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-6 px-2 shrink-0">
          {/* Progress Bar */}
          <div className="w-full md:flex-1 h-[1px] bg-stone-300 relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 h-full bg-[#7a7872] rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${scrollMetrics.thumbWidth}%`,
                left: `${scrollMetrics.progress * (100 - scrollMetrics.thumbWidth)}%`,
              }}
            />
          </div>
          
          {/* Arrows */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <button
              onClick={() => scroll('left')}
              className={`p-3 rounded-full border border-[#d2d2d2] text-[#7a7872] transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                activeArrow === 'left' ? 'bg-white hover:bg-stone-50' : 'bg-transparent hover:bg-white/50'
              }`}
              disabled={scrollMetrics.progress === 0}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-3 rounded-full border border-[#d2d2d2] text-[#7a7872] transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                activeArrow === 'right' ? 'bg-white hover:bg-stone-50' : 'bg-transparent hover:bg-white/50'
              }`}
              disabled={scrollMetrics.progress >= 0.99} // Approximate for float precision
              aria-label="Scroll right"
            >
              <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
