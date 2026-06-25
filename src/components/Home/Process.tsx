import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import Search from "../../img/process/reasearch.png";
import Strategy from "../../img/process/straetegy (1).png";
import Execution from "../../img/process/execution.png";
import Optimization from "../../img/process/optimization.png";
import Growth from "../../img/process/growth.png";

import bgImg1 from "../../img/background.png";

const steps = [
  {
    title: "Research",
    image: Search,
    description:
      "We analyze your business, target audience, competitors, and market trends to identify opportunities and challenges.",
  },
  {
    title: "Strategy",
    image: Strategy,
    description:
      "Based on research, we create a customized strategy that aligns with your business goals and growth objectives.",
  },
  {
    title: "Execution",
    image: Execution,
    description:
      "Our team implements the strategy across design, development, marketing, and other required channels.",
  },
  {
    title: "Optimization",
    image: Optimization,
    description:
      "We continuously monitor performance, analyze data, and make improvements to maximize results.",
  },
  {
    title: "Growth",
    image: Growth,
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
   <div ref={containerRef} className="relative h-[500vh] md:h-[400vh] w-full">
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
      className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 text-center"
    >
      <div className="mb-4 sm:mb-6 md:mb-8 flex justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-5">
          <img
            src={step.image}
            alt={step.title}
            className="
              w-16 h-16
              sm:w-20 sm:h-20
              md:w-24 md:h-24
              lg:w-28 lg:h-28
              xl:w-32 xl:h-32
              object-contain
            "
          />
        </div>
      </div>

      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-neutral-900 mb-4 sm:mb-6">
        {step.title}
      </h2>

      <p className="max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
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
          backgroundColor: isActive ? "#f59e0b" : "#d1d5db",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className="
          h-2
          rounded-full
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