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
  const isPast = index < activeStep;
  const isFuture = index > activeStep;

  let yVal = 0;
  if (isPast) yVal = -50;
  if (isFuture) yVal = 50;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.97,
        y: yVal,
        pointerEvents: isActive ? "auto" : "none"
      }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
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

      <motion.h3
  initial={{
    opacity: 0,
    y: 60,
    scale: 0.9,
    filter: "blur(10px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{
    duration: 1,
    ease: [0.16, 1, 0.3, 1],
  }}
  whileHover={{
    scale: 1.03,
    textShadow: "0 0 20px rgba(201,168,76,0.35)",
  }}
  className="
    relative
    inline-block
    text-3xl
    sm:text-5xl
    md:text-6xl
    lg:text-7xl
    xl:text-8xl
    font-bold
    font-cinzel
    tracking-wide
    mb-20
    bg-gradient-to-b
    from-[#FFF6D5]
    via-[#E6C86E]
    to-[#B88A1D]
    bg-clip-text
    text-transparent
  "
>
  {step.title}

  <motion.span
    initial={{ width: 0 }}
    whileInView={{ width: "100%" }}
    viewport={{ once: true }}
    transition={{ delay: 0.5, duration: 1 }}
    className="absolute -bottom-3 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
  />
</motion.h3>

<motion.p
  initial={{
    opacity: 0,
    y: 40,
    filter: "blur(6px)",
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{
    delay: 0.3,
    duration: 1,
    ease: [0.16, 1, 0.3, 1],
  }}
  whileHover={{
    y: -2,
  }}
  className="
    relative
    max-w-xs
    sm:max-w-xl
    md:max-w-2xl
    lg:max-w-3xl

    text-sm
    sm:text-base
    md:text-lg
    lg:text-xl

    font-montserrat
    font-light
    text-[#F5F0E8]/80

    leading-[2]
    tracking-[0.03em]

    border-l-2
    border-[#C9A84C]/50
    pl-6

    transition-all
    duration-500
    hover:text-[#F5F0E8]
    hover:border-[#C9A84C]
  "
>
  <span className="absolute -left-2 top-2 w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></span>

  {step.description}
</motion.p>
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