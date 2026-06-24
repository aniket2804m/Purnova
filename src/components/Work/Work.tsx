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
      <div className="relative w-full aspect-[16/10] bg-[#1d1e22] rounded-t-[18px] p-2 border-2 border-[#2b2c30] shadow-2xl laptop-screen-border z-10 flex flex-col justify-between">
        {/* Bezel */}
        <div className="w-full h-full bg-black rounded-[8px] p-[6px] relative overflow-hidden flex flex-col justify-between">
          {/* Inner Display Area (Contains Website Screenshot Image) */}
          <div className="w-full h-full bg-[#0c0c0e] overflow-visible rounded-[3px] relative">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-contain object-top select-none pointer-events-none" 
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
  const scrollTriggerRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let handleResizeListener: () => void;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".work-card");

      let cardWidth = 0;
      let spacing = 0;
      let centerOffset = 0;

      const calculateDimensions = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        // Calculate sectionHeight (subtracting 80px navbar height)
        const sectionHeight = vh - 80;
        
        // Dynamic card width calculation based on both screen width and height
        cardWidth = Math.max(280, Math.min(vw * 0.75, (sectionHeight * 0.52 - 30) * 1.6, 850));
        spacing = cardWidth * 0.42;
        centerOffset = cardWidth * 0.48 + (vw < 768 ? 20 : 60);

        // Explicitly set the width of all cards in GSAP to ensure responsive scaling
        cards.forEach((card: any) => {
          gsap.set(card, { width: cardWidth });
        });
      };

      calculateDimensions();

      // Set initial layouts
      cards.forEach((card: any, index) => {
        if (index === 0) {
          gsap.set(card, {
            x: 0,
            scale: 1.02,
            rotationY: 0,
            rotationX: 0,
            rotationZ: 0,
            zIndex: 100,
            opacity: 1,
            transformPerspective: 1500,
          });
        } else {
          const diff = index;
          const xVal = centerOffset + (diff - 1) * spacing;
          const rotY = window.innerWidth < 768 ? -20 : -35;
          gsap.set(card, {
            x: xVal,
            scale: Math.max(0.55, 0.8 - (diff - 1) * 0.08),
            rotationY: rotY,
            rotationX: 4,
            rotationZ: 1.5 + (diff - 1) * 0.5,
            zIndex: 100 - index,
            opacity: Math.max(0.15, 0.75 - (diff - 1) * 0.25),
            transformPerspective: 1500,
          });
        }

        // Initial active glow border
        const borderEl = card.querySelector(".laptop-screen-border");
        if (borderEl) {
          gsap.set(borderEl, {
            borderColor: index === 0 ? "rgba(251, 191, 36, 1)" : "rgba(63, 63, 70, 0.4)",
            boxShadow: index === 0 ? "0 0 20px rgba(251, 191, 36, 0.35)" : "none",
          });
        }
      });

      // Create the GSAP ScrollTrigger timeline to interpolate progress
      const scrollState = { progress: 0 };
      
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${(projects.length - 1) * 750}`,
        scrub: 0.5,
        pin: pinContainerRef.current,
        snap: {
          snapTo: 1 / (projects.length - 1),
          duration: { min: 0.2, max: 0.4 },
          delay: 0.05,
          ease: "power2.out",
        },
        onUpdate: (self) => {
          const progress = self.progress * (projects.length - 1);
          scrollState.progress = progress;
          
          // Find nearest active index
          const nearestIndex = Math.round(progress);
          setActiveIndex(nearestIndex);

          // Update layouts for all cards based on float progress
          cards.forEach((card: any, index) => {
            const diff = index - progress;
            const absDiff = Math.abs(diff);

            let x = 0;
            let scale = 1;
            let rotateY = 0;
            let rotateX = 0;
            let rotateZ = 0;
            let opacity = 1;
            let zIndex = 100 - Math.round(absDiff * 10);
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
              rotateY = window.innerWidth < 768 ? -20 : -35;
              rotateX = 4;
              rotateZ = 1.5 + (diff - 1) * 0.5;
              opacity = Math.max(0.15, 0.75 - (diff - 1) * 0.25);
              borderGlow = 0;
            } else {
              x = -centerOffset + (diff + 1) * spacing;
              scale = Math.max(0.55, 0.8 - (Math.abs(diff) - 1) * 0.08);
              rotateY = window.innerWidth < 768 ? 20 : 35;
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
              x: x,
              scale: scale,
              rotationY: rotateY,
              rotationX: rotateX,
              rotationZ: rotateZ,
              zIndex: zIndex,
              opacity: opacity,
              transformPerspective: 1500,
            });

            const borderEl = card.querySelector(".laptop-screen-border");
            if (borderEl) {
              gsap.set(borderEl, {
                borderColor: `rgba(251, 191, 36, ${borderGlow})`,
                boxShadow: `0 0 ${20 * borderGlow}px rgba(251, 191, 36, ${0.35 * borderGlow})`,
              });
            }
          });
        }
      });

      scrollTriggerRef.current = trigger;

      // Handle resizing
      handleResizeListener = () => {
        calculateDimensions();
        if (trigger) trigger.update();
      };
      window.addEventListener("resize", handleResizeListener);

    }, sectionRef);

    return () => {
      if (handleResizeListener) {
        window.removeEventListener("resize", handleResizeListener);
      }
      ctx.revert();
      
      // Force scroll to top after unpinning ScrollTrigger to prevent page blanking on route changes
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    };
  }, []);

  // Click-to-navigate function
  const navigateToCard = (index: number) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    const progress = index / (projects.length - 1);
    const scrollPosition = st.start + progress * (st.end - st.start);
    
    window.scrollTo({
      top: scrollPosition + 1, // small offset to trigger update accurately
      behavior: "smooth"
    });
  };

  const handlePrev = () => {
    const target = Math.max(0, activeIndex - 1);
    navigateToCard(target);
  };

  const handleNext = () => {
    const target = Math.min(projects.length - 1, activeIndex + 1);
    navigateToCard(target);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black mt-10"
    >
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-4 md:py-6 px-4 md:px-8 bg-black"
      >
      {/* Header Info */}
      <div className="relative z-50 text-center select-none px-4">
        <p className="uppercase tracking-[4px] text-zinc-400 text-[50px] md:text-xs mt-10 mb-10">
          Featured Work
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white mt-5 mb-5 bg-gradient-to-r from-zinc-300 via-white to-zinc-400 bg-clip-text text-transparent">
          {projects[activeIndex].title}
        </h2>
      </div>

      {/* Radial Background Light Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06),transparent_65%)] pointer-events-none mt-10" />

      {/* Coverflow Carousel Wrapper */}
      <div className="relative w-full flex-grow flex items-center justify-center perspective-[2000px] transform-style-[preserve-3d] mt-10 mb-10">
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
      <div className="relative z-50 flex flex-col items-center gap-4 px-20 mt-2">
        {/* Navigation Arrows & Index details */}
        <div className="flex items-center gap-6 bg-zinc-900/60 border border-zinc-800/80 px-4 py-2 rounded-full backdrop-blur-md shadow-lg select-none">
          <button 
            onClick={handlePrev} 
            disabled={activeIndex === 0}
            className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-500 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-zinc-700 transition-colors text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="text-[10px] md:text-xs text-zinc-300 font-mono tracking-widest uppercase">
            Project <span className="text-[#fbbf24] font-bold">{activeIndex + 1}</span> of {projects.length}
          </div>

          <button 
            onClick={handleNext} 
            disabled={activeIndex === projects.length - 1}
            className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-500 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-zinc-700 transition-colors text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scroll helper tag */}
        <div className="flex items-center gap-1.5 text-zinc-500 text-[9px] uppercase tracking-[2px] animate-pulse">
          <MousePointer className="w-3 h-3 text-[#fbbf24]" />
          <span>Scroll to cycle projects</span>
        </div>
      </div>
    </div>
    </section>
  );
}
