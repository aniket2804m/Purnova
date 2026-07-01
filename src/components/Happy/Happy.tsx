import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

// Video import
import brandVideo from "../../img/video.mp4";

// Poster images imports
import punevoice from "../../img/logo/Copy of Logo Pune voice 5.png";
import bushare from "../../img/logo/FINAL final.png";
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
    name: "Bushare",
    poster: bushare,
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
  {
    name: "Btrack India",
    poster: btrackPoster,
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
];

const Happy = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section className="bg-black py-20 px-5 md:px-10 lg:px-20 text-white text-center">
      {/* Title */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
        Happy Customers
      </h2>

      {/* Brand Pills */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10 mb-14 max-w-5xl mx-auto">
        {brands.map((brand, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`px-5 py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 transform active:scale-95 border ${
                isActive
                  ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                  : "bg-[#111] text-white border-yellow-500/30 hover:border-yellow-400 hover:text-yellow-400"
              }`}
            >
              {brand.name}
            </button>
          );
        })}
      </div>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto rounded-[32px] overflow-hidden bg-[#151515] border border-yellow-500/20 shadow-[0_0_50px_rgba(234,179,8,0.05)] flex flex-col md:flex-row items-stretch min-h-[350px] md:min-h-[480px]">
        {/* Left Column Accent (Golden Text Panel) */}
        <div className="w-full md:w-[35%] bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 p-8 md:p-12 flex items-center justify-center text-left">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black leading-tight uppercase font-display select-none">
            Our Customers Love Us Because.....
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
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-black/35 backdrop-blur-sm group-hover:scale-110 group-hover:border-yellow-400 group-hover:bg-yellow-500/10 transition-all duration-300 shadow-lg">
                  <Play className="fill-white text-white group-hover:text-yellow-400 group-hover:fill-yellow-400 ml-1 transition-colors duration-300" size={32} />
                </div>
                
                <span className="text-xl sm:text-2xl font-extrabold text-yellow-400 tracking-wider drop-shadow-md select-none mt-2 group-hover:text-yellow-300 transition-colors duration-300">
                  CLICK HERE TO FIND OUT
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
    </section>
  );
};

export default Happy;
