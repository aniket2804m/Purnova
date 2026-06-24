import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import video from "../../img/video.mp4";
import bgImg from "../../img/bgImg.png";
import { roles } from "../data/Home"

const Home = () => {

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Typing effect logic (identical to original)
  useEffect(() => {
    if (isHovered) return;

    const role = roles[currentRole].title;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, isHovered]);

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
            <div className="relative w-[95vw] aspect-[2/1] h-auto md:fixed md:inset-0 md:w-screen md:h-screen md:aspect-auto md:max-w-none md:max-h-none p-[3px] md:p-0 overflow-hidden rounded-2xl md:rounded-none shadow-2xl flex items-center justify-center border border-white/5 md:border-none">
              <div className="absolute inset-[-200%] animate-[spin_6s_linear_infinite] md:hidden"
                style={{
                  background: "conic-gradient(from 0deg, transparent 30%, #3b82f6 45%, #8b5cf6 55%, #ec4899 65%, transparent 80%)",
                }}
              />
              <div className="relative w-full h-full bg-[#0a0a0a] md:rounded-none rounded-[13px] overflow-hidden flex items-center justify-center z-10">
                <motion.img
                  src={roles[currentRole].hoverImage || roles[currentRole].image}
                  alt={roles[currentRole].title}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1,
                    filter: window.innerWidth >= 1024 ? [
                      "drop-shadow(0 0 15px rgba(34,211,238,0.5))",
                      "drop-shadow(0 0 35px rgba(139,92,246,0.7))",
                      "drop-shadow(0 0 15px rgba(34,211,238,0.5))"
                    ] : "none"
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ 
                    scale: { duration: 0.4 },
                    opacity: { duration: 0.4 },
                    filter: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                  }}
                  className="w-[90vw] h-[80vh] sm:w-[500px] sm:h-[700px] md:w-[700px] md:h-[800px] lg:w-[900px] lg:h-[550px] xl:w-[1200px] xl:h-[700px] object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: Locked to exactly 1 viewport screen on all sizes */}
      <section
        id="home"
        className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={bgImg}
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/5"></div>
        </div>

        {/* Content */}
       <div className="relative z-10 text-center text-black w-full px-4 sm:px-6 lg:px-10 mx-auto flex flex-col justify-center items-center h-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="flex flex-col items-center justify-center"
          >
            <motion.h1
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
                scale: 1.08,
                textShadow: "0 0 30px rgba(59,130,246,0.8)",
              }}
              className="
    font-extrabold
    text-black
    leading-none

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }}
  className="
    text-black
    uppercase
    font-normal
    tracking-[0.30em]
    mt-6
    text-sm
    sm:text-base
    md:text-xl
    lg:text-2xl
    xl:text-3xl
    2xl:text-4xl
  "
>
  Where Brands Become <span className="font-extrabold">Legends</span>
</motion.p>

<motion.p
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }}
  className="
    text-black
    font-display
    leading-[1.5]
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

    text-lg
    sm:text-xl
    md:text-2xl
    lg:text-3xl
    xl:text-4xl
    2xl:text-5xl

    px-4
    sm:px-6
    md:px-8
    lg:px-0
  "
>
  We do not decorate brands. We architect transformations reaching into
  the space between what you are today and everything you are destined to
  become.
</motion.p>

          </motion.div>
        </div>
      </section>

      {/* SECTION 2: White Background, Natural content-based height, Scroll-triggered */}
      <section className="relative bg-white py-16 md:py-24 px-4 w-full flex items-center justify-center overflow-hidden border-t border-slate-100">
        
        {/* Subtle grid background lines for premium feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 -z-10 pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

          {/* Original Circular Image and Typing Text Layout */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10"
          >
            {/* Typing text displaying roles */}
            <span
              className="text-2xl md:text-3xl font-extrabold bg-neutral-900 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(234,179,8,0.2)] text-center sm:text-left min-w-[280px]"
            >
              {displayText}
              <span className="animate-pulse text-yellow-500">|</span>
            </span>

            {/* Circular Team Avatar Image */}
            <div className="relative flex-shrink-0 group">
              
              {/* Glowing animated background boundary ring around circular image */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-500 via-indigo-500 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity animate-pulse blur-[2px]" />
              
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
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ scale: 1.15 }}
                  className="w-[180px] h-[180px] md:w-[200px] md:h-[200px] object-contain cursor-pointer rounded-full border-4 border-white bg-white relative z-10 shadow-lg"
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
