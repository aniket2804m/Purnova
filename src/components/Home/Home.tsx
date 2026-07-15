import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

import video from "../../img/video.mp4";
import bgImg from "../../img/background 2.png";
import { roles } from "../data/Home"
import ParticleBackground from "@/components/ParticleBackground";

const Home = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], ["0%", "20%"]);

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Unified typing effect logic for both Role Title and Name
  useEffect(() => {
    if (isHovered) return;

    const role = roles[currentRole].title;
    const name = roles[currentRole].name;

    let delay = isDeleting ? 40 : 80;
    const isFullyTyped = displayText.length === role.length && displayName.length === name.length;
    if (!isDeleting && isFullyTyped) {
      delay = 2000;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (!isFullyTyped) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          }
          if (displayName.length < name.length) {
            setDisplayName(name.slice(0, displayName.length + 1));
          }
        } else {
          setIsDeleting(true);
        }
      } else {
        const hasText = displayText.length > 0;
        const hasName = displayName.length > 0;

        if (hasText || hasName) {
          if (hasText) {
            setDisplayText(displayText.slice(0, -1));
          }
          if (hasName) {
            setDisplayName(displayName.slice(0, -1));
          }
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayText, displayName, isDeleting, currentRole, isHovered]);

  return (
    <div className="w-full overflow-x-hidden">

      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md pointer-events-none"
          >
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-[95vw] h-[60vh] md:w-[85vw] md:h-[80vh] lg:w-[90vw] lg:h-[85vh] xl:w-[92vw] xl:h-[88vh] object-cover rounded-3xl shadow-2xl pointer-events-none"
            >
              <source src={video} type="video/mp4" />
            </motion.video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Zoom Overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center cursor-zoom-out"
            onClick={() => {
              setFullscreen(false);
              setIsHovered(false);
              setHovered(false);
            }}
            onMouseLeave={() => {
              if (window.innerWidth >= 1024) {
                setFullscreen(false);
                setIsHovered(false);
                setHovered(false);
              }
            }}
          >
            <div className="relative w-[90vw] h-[80vh] sm:w-[500px] sm:h-[700px] md:w-[700px] md:h-[800px] lg:w-[900px] lg:h-[550px] xl:w-[1200px] xl:h-[700px] p-[3px] overflow-hidden rounded-none shadow-2xl flex items-center justify-center border border-[#C9A84C]/20">
              <div className="absolute inset-[-200%] animate-[spin_6s_linear_infinite]"
                style={{
                  background: "conic-gradient(from 0deg, transparent 30%, #C9A84C 55%, transparent 80%)",
                }}
              />
              <div className="relative w-full h-full bg-[#0a0a0a] rounded-none overflow-hidden flex items-center justify-center z-10">
                <motion.img
                  src={roles[currentRole].hoverImage || roles[currentRole].image}
                  loading="lazy"
                  decoding="async"
                  alt={roles[currentRole].title}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    filter: [
                      "drop-shadow(0 0 15px rgba(201, 168, 76, 0.4))",
                      "drop-shadow(0 0 35px rgba(201, 168, 76, 0.7))",
                      "drop-shadow(0 0 20px rgba(201, 168, 76, 0.5))",
                      "drop-shadow(0 0 15px rgba(201, 168, 76, 0.4))"
                    ]
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ 
                    scale: { duration: 0.4 },
                    opacity: { duration: 0.4 },
                    filter: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: Locked to exactly 1 viewport screen on all sizes */}
      <section
        id="home"
        className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden"
      >
        <ParticleBackground color="#C9A84C" />

        {/* Cinematic light streaks / floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-none bg-[#C9A84C]/5 blur-[100px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-none bg-[#C9A84C]/3 blur-[120px]"
          />
          {/* Subtle floating particles (small light circles) */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#C9A84C]/30 rounded-none blur-[0.5px]"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}
              initial={{ y: 50, opacity: 0, scale: 0 }}
              animate={{
                y: [-20, -120],
                opacity: [0, 0.7, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Content */}
       <div className="relative z-10 text-center text-[#F5F0E8] w-full px-4 sm:px-6 lg:px-10 mx-auto flex flex-col justify-center items-center h-full pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                  delayChildren: 0.4, // Stagger text after background zoom-out starts
                },
              },
            }}
            className="flex flex-col items-center justify-center font-montserrat"
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
                }
              }}
              onHoverStart={() => {
                if (window.innerWidth >= 768) {
                  setShowVideo(true);
                }
              }}
              onHoverEnd={() => {
                if (window.innerWidth >= 768) {
                  setShowVideo(false);
                }
              }}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setShowVideo(true);
                  setTimeout(() => {
                    setShowVideo(false);
                  }, 12000);
                }
              }}
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 30px rgba(201,168,76,0.6)",
              }}
              className="
    font-cinzel
    text-[#C9A84C]
    leading-none
    tracking-[0.1em]

    text-5xl
    sm:text-6xl
    md:text-7xl
    lg:text-8xl
    xl:text-[7rem]
    2xl:text-[9rem]
  "
            >
              PURNOVA
            </motion.h1>

          <motion.p
  variants={{
    hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
  }}
  className="
    text-[#F5F0E8]
    uppercase
    font-cormorant
    tracking-[0.25em]
    mt-6
    text-sm
    sm:text-base
    md:text-xl
    lg:text-2xl
    xl:text-3xl
    2xl:text-4xl
  "
>
  We Help Businesses Become Impossible To Ignore. 
</motion.p>

<motion.p
  variants={{
    hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
  }}
  className="
    text-[#F5F0E8]/75
    font-montserrat
    font-light
    leading-[1.7]
    text-center
    mx-auto
    mt-8

    w-full
    max-w-[350px]
    sm:max-w-[600px]
    md:max-w-[850px]
    lg:max-w-[1100px]
    xl:max-w-[1250px]
    2xl:max-w-[1450px]

    text-base
    sm:text-lg
    md:text-xl
    lg:text-2xl
    xl:text-3xl
    2xl:text-4xl

    px-4
    sm:px-6
    md:px-8
    lg:px-0
  "
>
  From branding and websites to social media and performance marketing, we help ambitious businesses attract attention, build trust, and generate measurable growth. 
</motion.p>

          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Deep Charcoal Background, Natural content-based height, Scroll-triggered */}
      <section className="relative bg-[#1A1A1A] py-16 md:py-24 px-4 w-full flex items-center justify-center overflow-hidden border-t border-[#C9A84C]/10 text-[#F5F0E8]">
        
        {/* Subtle grid background lines for premium feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,168,76,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,168,76,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-80 -z-10 pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

          {/* Original Circular Image and Typing Text Layout */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 font-montserrat"
          >
            {/* Typing text displaying roles & names */}
            <div className="flex flex-col text-center sm:text-left min-w-[280px]">
              <span className="text-2xl md:text-3xl font-cinzel font-bold text-[#C9A84C] drop-shadow-[0_0_15px_rgba(201,168,76,0.2)]">
                {displayText}
                <span className="animate-pulse text-[#C9A84C]">|</span>
              </span>
              <span className="text-lg md:text-xl text-center sm:text-left font-medium text-[#F5F0E8]/70 mt-2 font-montserrat">
                {displayName}
              </span>
            </div>

            {/* Circular Team Avatar Image */}
            <div className="relative flex-shrink-0 group">
              
              {/* Glowing animated background boundary ring around circular image */}
              <div className="absolute -inset-1 bg-[#C9A84C] opacity-30 group-hover:opacity-100 transition-opacity animate-pulse blur-[2px]" />
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={hovered ? "hover" : "normal"}
                  src={
                    hovered
                      ? roles[currentRole].hoverImage
                      : roles[currentRole].image
                  }
                  alt={roles[currentRole].title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  loading="lazy"
                  decoding="async"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ scale: 1.15 }}
                  className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] object-contain cursor-pointer border-4 border-[#C9A84C] bg-[#0A0A0A] relative z-10 shadow-lg"
                  onMouseEnter={() => {
                    if (window.innerWidth >= 1024) {
                      setHovered(true);
                      setFullscreen(true);
                      setIsHovered(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (window.innerWidth >= 1024) {
                      setHovered(false);
                    }
                  }}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setHovered(true);
                      setFullscreen(true);
                      setIsHovered(true);
                    }
                  }}
                />
              </AnimatePresence>
            </div>

          </motion.div>

        </div>
      </section>

    </div>
  )
}

export default Home
