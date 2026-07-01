import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import bgImg1 from "../../img/background.png";

import {steps} from "../../components/data/process";

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
   <div ref={containerRef} className="relative h-[500vh] md:h-[400vh] w-full border-t border-[#C9A84C]/10 bg-[#0A0A0A]">
      {/* Sticky viewport wrapper - stays fixed on screen during the scroll track */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">

       
           <div className="absolute inset-0 -z-10">
    <img
      src={bgImg1}
      alt="Background"
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-center opacity-10"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/95"></div>
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
      className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 text-center"
    >
      <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
        <div className="p-3 sm:p-4 md:p-5">
          <img
            src={step.image}
            alt={step.title}
            loading="lazy"
            decoding="async"
            className="
              w-16 h-16
              sm:w-20 sm:h-20
              md:w-24 md:h-24
              lg:w-28 lg:h-28
              xl:w-32 xl:h-32
              object-contain
              filter brightness-[0.9]
            "
          />
        </div>
      </div>

      <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-cinzel text-[#C9A84C] mb-4 sm:mb-6 tracking-wide">
        {step.title}
      </h3>

      <p className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl font-montserrat text-[#F5F0E8]/75 leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
})}
        </div>

        {/* Progress Bar */}
<div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 md:gap-4 z-50">
  {steps.map((_, i) => {
    const isActive = activeStep === i;

    return (
      <motion.div
        key={i}
        onClick={() => handleDotClick(i)}
        animate={{
          width: isActive ? 50 : 16,
          backgroundColor: isActive ? "#C9A84C" : "rgba(201,168,76,0.2)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className="
          h-2
          rounded-none
          cursor-pointer
        "
      />
    );
  })}
</div>
      </div>
    </div>
  );
};

export default Process;