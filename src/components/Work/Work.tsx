"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, MousePointer } from "lucide-react";

// Image Imports
import img1 from "../../img/bgImg.png";
import img2 from "../../img/bgImg1.png";
import img3 from "../../img/img6.png";
import img4 from "../../img/bgImg.png";
import img5 from "../../img/bgImg1.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Real Estate Platform",
    image: img1,
  },
  {
    title: "Architecture Agency",
    image: img2,
  },
  {
    title: "Sports Brand",
    image: img3,
  },
  {
    title: "E-Commerce Store",
    image: img4,
  },
  {
    title: "Real Estate Platform",
    image: img5,
  },
  {
    title: "Real Estate Platform",
    image: img5,
  },
  {
    title: "Real Estate Platform",
    image: img5,
  },
];

// Reusable 3D Laptop Mockup
function LaptopMockup({ project, index, onClick }: { project: typeof projects[0]; index: number; onClick: () => void }) {
  return (
    <div 
      className="work-card absolute flex flex-col items-center select-none cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
      onClick={onClick}
    >
      {/* Screen Lid */}
      <div 
        className="laptop-screen-lid relative w-full aspect-[16/10] bg-[#1d1e22] rounded-t-[18px] p-2 border-2 border-[#2b2c30] shadow-2xl laptop-screen-border z-10 flex flex-col justify-between"
        style={{ transformStyle: "preserve-3d", transformOrigin: "bottom center" }}
      >
        {/* Bezel */}
        <div className="w-full h-full bg-black rounded-[8px] p-[6px] relative overflow-hidden flex flex-col justify-between">
          {/* Inner Display Area (Contains Website Screenshot Image) */}
          <div className="w-full h-full bg-[#0c0c0e] overflow-visible rounded-[3px] relative">
            <img 
              src={project.image} 
              alt={project.title} 
              loading="lazy"
              decoding="async"
              className="laptop-screen-image w-full h-full object-contain object-top select-none pointer-events-none" 
            />
            {/* Screen Glass Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/3 to-white/8 pointer-events-none z-25" />
          </div>
          {/* Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[8px] bg-black rounded-b-[4px] z-30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#141416] rounded-full border border-[#2c2c2f]" />
          </div>
        </div>
      </div>

      {/* Screen Hinge */}
      <div className="w-[96%] h-[7px] bg-[#0c0d0f] border-b border-[#1c1d20] z-10" />

      {/* Keyboard Base */}
      <div 
        className="relative w-[105%] h-[55px] bg-gradient-to-b from-[#2a2b2e] via-[#1a1b1d] to-[#0e0f11] rounded-b-[14px] border-t border-[#46474a] shadow-[0_12px_28px_rgba(0,0,0,0.85)] z-0 flex flex-col items-center justify-start pt-[3px] px-8 overflow-hidden"
        style={{
          transform: "rotateX(55deg) translateZ(-6px)",
          transformOrigin: "top center",
        }}
      >
        {/* Keyboard area recess */}
        <div className="w-[92%] h-[20px] bg-[#111214] rounded-[4px] border border-[#232427] flex flex-col justify-between p-[1.5px]">
          {/* Key Rows simulation */}
          {Array.from({ length: 4 }).map((_, rIndex) => (
            <div key={rIndex} className="flex gap-[2px] h-[2.5px]">
              {Array.from({ length: 15 }).map((_, kIndex) => (
                <div 
                  key={kIndex} 
                  className={`flex-grow bg-[#1d1e21] rounded-[0.5px] border-b border-black/50 ${
                    rIndex === 3 && kIndex === 7 ? "flex-[4]" : ""
                  }`} 
                />
              ))}
            </div>
          ))}
        </div>
        {/* Trackpad area */}
        <div className="w-[26%] h-[16px] bg-gradient-to-b from-[#18191b] to-[#0d0e10] rounded-[3px] border border-[#2b2c30] mt-1 shadow-inner" />
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const animProgress = useRef({ val: 0 });
  const lastScrollTime = useRef(0);
  const touchStart = useRef({ x: 0, y: 0 });

  const updateCardPositions = (progress: number) => {
    const cards = gsap.utils.toArray(".work-card");
    if (cards.length === 0) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const sectionHeight = vh - 220;
    
    const cardWidth = Math.max(280, Math.min(vw * 0.75, (sectionHeight * 0.52 - 30) * 1.6, 850));
    const spacing = cardWidth * 0.42;
    const centerOffset = cardWidth * 0.48 + (vw < 768 ? 20 : 60);

    cards.forEach((card: any, index) => {
      const diff = index - progress;
      const absDiff = Math.abs(diff);

      let x = 0;
      let scale = 1;
      let rotateY = 0;
      let rotateX = 0;
      let rotateZ = 0;
      let opacity = 1;
      let zIndex = 40 - Math.round(absDiff * 10);
      let borderGlow = 0;

      if (diff === 0) {
        x = 0;
        scale = 1.02;
        rotateY = 0;
        rotateX = 0;
        rotateZ = 0;
        opacity = 1;
        borderGlow = 1;
      } else if (diff > 0) {
        x = centerOffset + (diff - 1) * spacing;
        scale = Math.max(0.55, 0.8 - (diff - 1) * 0.08);
        rotateY = vw < 768 ? -20 : -35;
        rotateX = 4;
        rotateZ = 1.5 + (diff - 1) * 0.5;
        opacity = Math.max(0.15, 0.75 - (diff - 1) * 0.25);
        borderGlow = 0;
      } else {
        x = -centerOffset + (diff + 1) * spacing;
        scale = Math.max(0.55, 0.8 - (Math.abs(diff) - 1) * 0.08);
        rotateY = vw < 768 ? 20 : 35;
        rotateX = 4;
        rotateZ = -1.5 - (Math.abs(diff) - 1) * 0.5;
        opacity = Math.max(0.15, 0.75 - (Math.abs(diff) - 1) * 0.25);
        borderGlow = 0;
      }

      // Interpolation transition region
      if (absDiff < 1) {
        borderGlow = 1 - absDiff;
        scale = scale + (1.02 - scale) * (1 - absDiff);
        x = x * absDiff;
        rotateY = rotateY * absDiff;
        rotateX = rotateX * absDiff;
        rotateZ = rotateZ * absDiff;
      }

      gsap.set(card, {
        width: cardWidth,
        x: x,
        scale: scale,
        rotationY: rotateY,
        rotationX: rotateX,
        rotationZ: rotateZ,
        zIndex: zIndex,
        opacity: opacity,
        transformPerspective: 1500,
      });

      // 3D Screen Lid Hinge open/close and Parallax shifts
      const lidEl = card.querySelector(".laptop-screen-lid");
      if (lidEl) {
        const lidRotX = Math.min(65, absDiff * 65);
        gsap.set(lidEl, {
          rotationX: -lidRotX,
          transformPerspective: 1000,
          transformOrigin: "bottom center",
        });
      }

      const imgEl = card.querySelector(".laptop-screen-image");
      if (imgEl) {
        gsap.set(imgEl, {
          xPercent: diff * -12,
        });
      }

      const borderEl = card.querySelector(".laptop-screen-border");
      if (borderEl) {
        gsap.set(borderEl, {
          borderColor: `rgba(201, 168, 76, ${borderGlow})`,
          boxShadow: `0 0 ${20 * borderGlow}px rgba(201, 168, 76, ${0.35 * borderGlow})`,
        });
      }
    });
  };

  useEffect(() => {
    updateCardPositions(animProgress.current.val);

    const handleResize = () => {
      updateCardPositions(animProgress.current.val);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    gsap.to(animProgress.current, {
      val: activeIndex,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: () => {
        updateCardPositions(animProgress.current.val);
      }
    });
  }, [activeIndex]);

  const navigateToCard = (index: number) => {
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < projects.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 800) {
      return; // Throttle scroll
    }

    const threshold = 15; // scroll sensitivity threshold
    if (Math.abs(e.deltaY) > threshold || Math.abs(e.deltaX) > threshold) {
      if (e.deltaY > 0 || e.deltaX > 0) {
        // Scroll down or right -> Next
        if (activeIndex < projects.length - 1) {
          setActiveIndex(prev => prev + 1);
          lastScrollTime.current = now;
        }
      } else {
        // Scroll up or left -> Prev
        if (activeIndex > 0) {
          setActiveIndex(prev => prev - 1);
          lastScrollTime.current = now;
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 800) return;

    const deltaX = e.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStart.current.y;
    
    const threshold = 50; // swipe sensitivity threshold
    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX < 0) {
          if (activeIndex < projects.length - 1) {
            setActiveIndex(prev => prev + 1);
            lastScrollTime.current = now;
          }
        } else {
          if (activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
            lastScrollTime.current = now;
          }
        }
      } else {
        // Vertical swipe
        if (deltaY < 0) {
          if (activeIndex < projects.length - 1) {
            setActiveIndex(prev => prev + 1);
            lastScrollTime.current = now;
          }
        } else {
          if (activeIndex > 0) {
            setActiveIndex(prev => prev - 1);
            lastScrollTime.current = now;
          }
        }
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0A] font-montserrat"
    >
      <div
        ref={pinContainerRef}
        className="relative w-full h-full flex flex-col justify-between md:py-6 px-4 md:px-8 bg-[#0A0A0A]"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header Info - Added padding-top pt-24 to push it down below fixed Navbar */}
        <div className="relative z-[45] text-center select-none">
          <p className="uppercase tracking-[6px] text-[#C9A84C] font-cinzel font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 mb-1">
            Featured Work
          </p>
          <h2 className="text-2xl md:text-3xl font-bold font-cinzel text-[#F5F0E8] mt-1 md:mt-3 mb-2 md:mb-4">
            {projects[activeIndex].title}
          </h2>
        </div>

        {/* Radial Background Light Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.04),transparent_65%)] pointer-events-none mt-10" />

        {/* Coverflow Carousel Wrapper */}
        <div className="relative w-full flex-grow flex items-center justify-center perspective-[2000px] transform-style-[preserve-3d] mt-2 mb-2">
          {projects.map((project, index) => (
            <LaptopMockup
              key={index}
              project={project}
              index={index}
              onClick={() => navigateToCard(index)}
            />
          ))}
        </div>

        {/* Bottom Controls / Indicator bar */}
        <div className="relative z-40 flex flex-col items-center gap-4 px-20 mt-2 pb-6 sm:pb-8 font-montserrat">
          {/* Navigation Arrows & Index details */}
          <div className="flex items-center gap-6 bg-[#101010]/85 border border-[#C9A84C]/25 px-5 py-2.5 rounded-none backdrop-blur-md shadow-lg select-none">
            <button 
              onClick={handlePrev} 
              disabled={activeIndex === 0}
              className="w-8 h-8 rounded-none border border-[#C9A84C]/20 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-[#C9A84C]/20 transition-all duration-300 text-[#F5F0E8]"
            >
              <ChevronLeft className="w-4 h-4 text-[#F5F0E8]" />
            </button>
            
            <div className="text-[10px] md:text-xs text-[#F5F0E8]/80 font-mono tracking-widest uppercase font-semibold">
              Project <span className="text-[#C9A84C] font-bold">{activeIndex + 1}</span> of {projects.length}
            </div>

            <button 
              onClick={handleNext} 
              disabled={activeIndex === projects.length - 1}
              className="w-8 h-8 rounded-none border border-[#C9A84C]/20 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 flex items-center justify-center disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-[#C9A84C]/20 transition-all duration-300 text-[#F5F0E8]"
            >
              <ChevronRight className="w-4 h-4 text-[#F5F0E8]" />
            </button>
          </div>

          {/* Scroll helper tag */}
          <div className="flex items-center gap-1.5 text-[#F5F0E8]/50 text-[9px] uppercase tracking-[2px] animate-pulse">
            <MousePointer className="w-3 h-3 text-[#C9A84C]" />
            <span>Scroll to cycle projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}
