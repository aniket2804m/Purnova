import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import bgImg1 from "../../img/bgImg1.png";
const steps = [
  {
    title: "Research",
    description:
      "We analyze your business, target audience, competitors, and market trends to identify opportunities and challenges.",
  },
  {
    title: "Strategy",
    description:
      "Based on research, we create a customized strategy that aligns with your business goals and growth objectives.",
  },
  {
    title: "Execution",
    description:
      "Our team implements the strategy across design, development, marketing, and other required channels.",
  },
  {
    title: "Optimization",
    description:
      "We continuously monitor performance, analyze data, and make improvements to maximize results.",
  },
  {
    title: "Growth",
    description:
      "With optimized systems and proven strategies, we scale your business for long-term sustainable growth.",
  },
];

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Track the vertical scroll progress of the Process section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active step index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const step = Math.min(Math.floor(latest * steps.length), steps.length - 1);
    setActiveStep(step);
  });

  // Smooth scroll to a specific step when clicking progress dots
  const handleDotClick = (i: number) => {
    if (containerRef.current) {
      const offsetTop = containerRef.current.offsetTop;
      const stepScrollDistance = window.innerHeight;
      window.scrollTo({
        top: offsetTop + i * stepScrollDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      {/* Sticky viewport wrapper - stays fixed on screen during the scroll track */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">

       
           <div className="absolute inset-0 -z-10">
    <img
      src={bgImg1}
      alt="Background"
      className="w-full h-full object-cover object-center"
    />

    {/* Optional Overlay */}
    <div className="absolute inset-0 bg-white/5"></div>
  </div>
      
        
        {/* Step details stacked absolutely with animations */}
        <div className="relative w-full h-full">

          
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={
                  isActive
                    ? { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" }
                    : { opacity: 0, scale: 0.95, y: -40, pointerEvents: "none" }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-20 text-center pt-24"
              >

                {/* Step Number */}
                <div className="text-sm sm:text-base uppercase tracking-[4px] text-gray-400 mb-4 font-bold">
                  Step {index + 1}
                </div>

                {/* Title */}
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6 font-display">
                  {step.title}
                </h2>

                {/* Description */}
                <p className="max-w-2xl text-center text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Floating progress indicator bar at the bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {steps.map((_, i) => {
            const isActive = activeStep === i;
            return (
              <motion.div
                key={i}
                animate={{
                  width: isActive ? 48 : 16,
                  backgroundColor: isActive ? "#000000" : "#d1d5db",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-2 rounded-full cursor-pointer"
                onClick={() => handleDotClick(i)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Process;