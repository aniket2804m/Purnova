import React, { useState, useRef, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Video import
import brandVideo from "../../img/video.mp4";

// Poster images imports
import punevoice from "../../img/logo/Copy of Logo Pune voice 5.png";
import cosmicGanges from "../../img/logo/COSMICGANGES Logo.png";
import wada from "../../img/logo/vada.png";
import mitraPoster from "../../img/role/rutu.png";
import unimaxPoster from "../../img/role/pratap.png";
import btrackPoster from "../../img/role/ritesh.png";

const brands = [
  {
    name: "Pune Voice",
    poster: punevoice,
    video: brandVideo,
  },
  {
    name: "Cosmic Ganges",
    poster: cosmicGanges,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    name: "Hotel Wada",
    poster: wada,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    name: "Delight Events",
    poster: mitraPoster,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    name: "Dr Auto",
    poster: unimaxPoster,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  
];

const Happy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % brands.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % brands.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + brands.length) % brands.length);
  };

  // If active brand changes, reset the video player state
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeIndex]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Video play failed:", err);
      });
    }
  }, [isPlaying]);

  return (
    <section className="bg-[#0A0A0A] py-20 px-5 md:px-10 lg:px-20 text-[#F5F0E8] text-center border-t border-[#C9A84C]/10">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel text-[#F5F0E8] tracking-wide">
        Happy <span className="text-[#C9A84C]">Customers</span>
      </h2>

      {/* Brand Pills */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10 mb-14 max-w-5xl mx-auto font-montserrat">
        {brands.map((brand, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`px-5 py-3 rounded-none font-bold text-xs tracking-widest uppercase transition-all duration-300 transform active:scale-95 border ${
                isActive
                  ? "bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C] shadow-[0_4px_15px_rgba(201,168,76,0.25)]"
                  : "bg-[#101010] text-[#F5F0E8] border-[#C9A84C]/15 hover:border-[#C9A84C] hover:text-[#C9A84C]"
              }`}
            >
              {brand.name}
            </button>
          );
        })}
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto rounded-none overflow-hidden bg-[#101010] border border-[#C9A84C]/15 shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-stretch min-h-[350px] md:min-h-[480px]">
        {/* Left Column Accent (Deep Charcoal Panel) */}
        <div className="w-full md:w-[35%] bg-[#1A1A1A] border-r border-[#C9A84C]/15 p-8 md:p-12 flex items-center justify-center text-left">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C9A84C] font-cinzel leading-tight uppercase tracking-wider select-none">
            Our Customers Love Us Because...
          </h3>
        </div>

        {/* Right Column Video Player Container */}
        <div className="w-full md:w-[65%] relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-full">
          {!isPlaying ? (
            /* Video Poster/Thumbnail Overlay */
            <div 
              onClick={handlePlayClick}
              className="absolute inset-0 w-full h-full cursor-pointer group overflow-hidden"
            >
              {/* Client Poster Image */}
              <img
                src={brands[activeIndex].poster}
                alt={`${brands[activeIndex].name} poster`}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark Overlay Mask */}
              <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/35" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 font-montserrat">
                <div className="w-20 h-20 rounded-none border-2 border-[#C9A84C]/45 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:scale-105 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/10 transition-all duration-300 shadow-lg">
                  <Play className="fill-[#C9A84C] text-[#C9A84C] ml-1" size={28} />
                </div>
                
                <span className="text-lg sm:text-xl font-bold text-[#C9A84C] tracking-widest uppercase select-none mt-2 group-hover:text-[#F5F0E8] transition-colors duration-300">
                  FIND OUT WHY
                </span>
              </div>
            </div>
          ) : (
            /* Playing Video Element */
            <video
              ref={videoRef}
              src={brands[activeIndex].video}
              controls
              autoPlay
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
        </div>

       
      </div>

      <div>
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            className="p-3 rounded-none bg-[#0A0A0A] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300 border border-[#C9A84C]/40 shadow-md active:scale-95 flex items-center justify-center"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* Progress Indicators */}
          <div className="flex items-center gap-2.5">
            {brands.map((_, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={i}
                  animate={{
                    width: isActive ? 28 : 10,
                    backgroundColor: isActive ? "#C9A84C" : "#1A1A1A"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-2 rounded-none cursor-pointer border border-[#C9A84C]/20"
                  onClick={() => {
                    setActiveIndex(i);
                    setIsAutoPlaying(false);
                  }}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-none bg-[#0A0A0A] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300 border border-[#C9A84C]/40 shadow-md active:scale-95 flex items-center justify-center"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        </div>
        
    </section>
  );
};

export default Happy;
