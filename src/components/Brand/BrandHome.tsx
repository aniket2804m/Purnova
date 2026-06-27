import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Image from "../../img/card/brand strategy 1.jpg.jpeg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function BrandHome() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!section || !imageWrapper) return;

    const ctx = gsap.context(() => {
      // 1. Scroll-triggered parallax for background shapes
      gsap.fromTo(
        ".parallax-shape",
        { y: 0 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 2. Scroll-triggered scale & subtle rotation for the main image wrapper
      gsap.fromTo(
        imageWrapper,
        { scale: 0.92, rotate: -3 },
        {
          scale: 1.05,
          rotate: 3,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 25%",
            scrub: true,
          },
        }
      );

      // 3. Smooth continuous floating animation for the image wrapper
      gsap.to(imageWrapper, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion variants for staggered page load animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const labelVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 14 },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 110, damping: 10 },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white text-black py-32 sm:py-32 lg:py-32 flex items-center min-h-[90dvh]"
    >
      {/* Background Subtle Gradients & Blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
      <div className="absolute top-10 right-1/4 h-80 w-80 rounded-full bg-yellow-200/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-[450px] w-[450px] rounded-full bg-amber-100/30 blur-[150px] pointer-events-none" />

      {/* Parallax Background Shapes (Controlled by GSAP ScrollTrigger) */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none -z-10">
        <div className="parallax-shape absolute top-24 left-12 w-8 h-8 rounded-lg bg-yellow-400/25 rotate-12 blur-[1px]" />
        <div className="parallax-shape absolute bottom-32 right-16 w-12 h-12 rounded-full border border-yellow-300/30" />
        <div className="parallax-shape absolute top-1/2 left-[45%] w-6 h-6 rounded-md bg-amber-500/10 -rotate-45" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: ANIMATED IMAGE & SHAPES (Stays on top on mobile) */}
          <div className="relative flex justify-center order-first lg:order-none w-full">
            
            {/* Main Floating Wrapper */}
            <motion.div
              ref={imageWrapperRef}
              // variants={imageContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full max-w-[290px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] aspect-square group"
            >
              {/* Premium Animated Gradient Border & Glow Container */}
              <div className="absolute -inset-1 rounded-[40%_60%_50%_50%/50%_40%_65%_45%] bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 opacity-80 blur-[2px] transition duration-1000 group-hover:opacity-100" />
              
              {/* Image Inner Holder with Glassmorphism shadow */}
              <div className="relative h-full w-full overflow-hidden rounded-[40%_60%_50%_50%/50%_40%_65%_45%] border- border-white/20 p-2 shadow-2xl transition-all duration-700">
                <div className="relative h-full w-full overflow-hidden rounded-[40%_60%_50%_50%/50%_40%_65%_45%]">
                  <img
                    src={Image}
                    alt="Brand Strategy Illustration"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 via-transparent to-transparent opacity-80" />
                </div>
              </div>

              {/* Floating Glassmorphic Indicator 1 (Top-Right) */}
              <motion.div
                animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-3.5 bg-white/75 backdrop-blur-md border border-neutral-200/50 rounded-2xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Positioning</span>
                  <span className="block text-xs font-black text-black">Brand Authority</span>
                </div>
              </motion.div>

              {/* Floating Glassmorphic Indicator 2 (Bottom-Left) */}
              <motion.div
                animate={{ y: [0, 15, 0], x: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-6 p-3.5 bg-white/75 backdrop-blur-md border border-neutral-200/50 rounded-2xl shadow-xl z-20 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white text-xs font-black">
                  5X
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Average ROI</span>
                  <span className="block text-xs font-black text-black">Market Presence</span>
                </div>
              </motion.div>

              {/* Continuous Floating Dots/Particles around Image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-500/80 blur-[0.5px] pointer-events-none"
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    y: [-15, 15, -15],
                    x: [-10, 10, -10],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.7, 1.3, 0.7]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 1.5
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: TEXT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left w-full"
          >
            {/* Small Label */}
            <motion.div
              // variants={labelVariants}
              className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-yellow-600 uppercase tracking-wider"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
              Brand Strategy Services
            </motion.div>

            {/* Heading */}
            <motion.h1
              // variants={headingVariants}
              className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-[1.1] font-display"
            >
              Build a Brand That{" "}
              <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent font-black">
                People Remember
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              // variants={paragraphVariants}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-neutral-600 font-medium"
            >
              Your brand is more than a logo—it's the perception, emotion, and experience people associate with your business. We help businesses create a clear, compelling, and consistent brand strategy that drives growth and builds customer trust.
            </motion.p>

            {/* Buttons */}
            <motion.div
              // variants={paragraphVariants}
              className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              {/* Primary Button */}
              {/* <motion.button
                // variants={buttonVariants}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto rounded-full bg-black text-white hover:bg-yellow-500 hover:text-black font-bold px-8 py-4 shadow-lg shadow-black/10 hover:shadow-yellow-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button> */}

              {/* Secondary Button */}
              <motion.button
                // variants={buttonVariants}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto rounded-full border border-neutral-300 text-black hover:border-black font-bold px-8 py-4 transition-all duration-300 flex items-center justify-center"
                onClick={() => navigate("/contact")}
              >
                Book a Consultation
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}