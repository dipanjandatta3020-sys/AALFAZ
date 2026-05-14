import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";

const products = [
  {
    id: 1,
    type: "spot",
    title: "SPOTWEAR",
    subtitle: "Designed with Justin Bieber",
    price: "16.00",
    reviews: "41",
    badge: "new",
    // We use unsplash placeholders that resemble the vibe, since exact product images aren't available.
    mainImg: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    hoverImg: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
    ctaText: "BUY SPOTWEAR - $16.00"
  },
  {
    id: 2,
    type: "spots",
    title: "THE SPOTWEAR TRIO",
    subtitle: "Designed with Justin Bieber",
    price: "45.00",
    reviews: "41",
    badge: "new",
    mainImg: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
    hoverImg: "https://images.unsplash.com/photo-1506956191951-7a88da4435e5?auto=format&fit=crop&w=800&q=80",
    ctaText: "BUY THE TRIO - $45.00"
  },
  {
    id: 3,
    type: "tint",
    title: "PEPTIDE LIP TINT",
    subtitle: "Limited edition shade",
    price: "20.00",
    reviews: "16,277",
    badge: "limited edition",
    mainImg: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
    hoverImg: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    ctaText: "BUY LIP TINT - $20.00"
  },
  // Added a 4th item to make scrolling visible.
  {
    id: 4,
    type: "glaze",
    title: "PEPTIDE GLAZING FLUID",
    subtitle: "Dewy hydration layer",
    price: "29.00",
    reviews: "21,432",
    badge: "",
    mainImg: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
    hoverImg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    ctaText: "BUY GLAZING FLUID - $29.00"
  }
];

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans py-12">
      <div className="relative w-full max-w-[1400px]">
        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-12 pb-8 scrollbar-hide"
        >
          {products.map((product) => (
            <div 
              key={product.id}
              className="relative shrink-0 w-[340px] md:w-[380px] h-[520px] bg-[#f7f7f7] rounded-[24px] overflow-hidden group cursor-pointer snap-center"
            >
              {/* === Base Layer: Default Image === */}
              {/* We want the main image to fade out or get covered when hovering */}
              <div className="absolute inset-0 pt-[80px] pb-[120px] px-8 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 z-0 pointer-events-none">
                {/* Instead of using standard Unsplash photos which don't fit the pure transparent-background vibe requested, we use mix-blend-multiply to remove white backgrounds if any, or just display it cleanly. */}
                <img 
                  src={product.mainImg} 
                  alt={product.title}
                  className="w-full h-full object-contain mix-blend-multiply opacity-90"
                />
              </div>

              {/* === Hover Layer: Lifestyle Image === */}
              <div className="absolute inset-x-0 top-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                <img 
                  src={product.hoverImg} 
                  alt={`${product.title} lifestyle`}
                  className="w-full h-full object-cover"
                />
                {/* subtle gradient overlay to ensure the CTA pops */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* === Top Bar: Title & Badge (Always on top) === */}
              <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-30 pointer-events-none">
                <h2 className="font-display font-black text-5xl tracking-tighter text-[#737373] group-hover:text-[#404040] transition-colors leading-none mt-1">
                  {product.type}
                </h2>
                {product.badge && (
                  <span className="bg-[#5f5f5f] group-hover:bg-[#404040]/80 text-[#f7f7f7] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest whitespace-nowrap transition-colors">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* === Default Bottom Info === */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                <div className="flex items-center gap-0.5 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-[14px] h-[14px] fill-[#4a4a4a] text-[#4a4a4a]" 
                    />
                  ))}
                  <span className="text-[#5f5f5f] text-xs font-medium ml-1">
                    ({product.reviews})
                  </span>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="uppercase text-[15px] font-semibold tracking-wider text-[#333333]">
                      {product.title}
                    </h3>
                    <p className="text-[#5f5f5f] text-[13.5px] mt-0.5">
                      {product.subtitle}
                    </p>
                  </div>
                  <span className="text-[15px] font-medium text-[#333333]">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* === Hover CTA Button === */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <button className="w-full bg-white text-[#222222] py-4 rounded-full font-semibold tracking-[0.05em] uppercase text-[13px] shadow-lg hover:scale-[1.02] transition-transform">
                  {product.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrow */}
        <button 
          onClick={scrollRight}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-[52px] h-[52px] bg-white/95 backdrop-blur-sm rounded-full hidden md:flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:scale-105 hover:shadow-[0_4px_25px_rgba(0,0,0,0.15)] transition-all z-40 border border-gray-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-[#333333] ml-0.5" />
        </button>
      </div>
    </div>
  );
}
