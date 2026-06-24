import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import video from "../../img/video.mp4";
import bgImg from "../../img/bgImg1.png"
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
          setTimeout(() => setIsDeleting(true), 3000);
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
        <div className="relative z-10 text-center text-black px-4 max-w-4xl mx-auto flex flex-col justify-center items-center h-full">
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
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-10 mt-6 leading-tight cursor-pointer"
            >
              PURNOVA
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-black text-lg sm:text-base md:text-xl lg:text-xl tracking-[0.4em] text-center uppercase mt-2 font-semibold"
            >
              Where brands become Legends
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-base sm:text-lg md:text-2xl lg:text-3xl text-black mt-6 max-w-3xl mx-auto font-medium mb-6 px-2 sm:px-6 leading-relaxed"
            >
              We do not decorate brands. We architect transformations reaching into
              the space between what you are today and everything you are destined to
              become
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: White Background, Natural content-based height, Scroll-triggered */}
      <section className="relative bg-white py-16 md:py-24 px-4 w-full flex items-center justify-center overflow-hidden border-t border-slate-100">
        
        {/* Subtle grid background lines for premium feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 -z-10 pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          
          {/* Animated Human Character SVG ("Animated Manav") - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0 relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center p-3 shadow-inner group"
          >
            {/* Ambient pulse circle around character */}
            <div className="absolute inset-2 bg-indigo-500/5 rounded-2xl animate-pulse -z-10" />

            {/* Premium Custom Vector SVG human workspace */}
            <svg viewBox="0 0 200 200" className="w-full h-full select-none">
              {/* Floating tech background shapes */}
              <circle cx="100" cy="90" r="60" className="fill-indigo-500/5 stroke-indigo-500/10 stroke-[1.5]" />
              
              {/* Small floating idea gear/stars */}
              <motion.circle cx="160" cy="50" r="6" className="fill-yellow-400" animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 2.5 }} />
              <motion.circle cx="40" cy="70" r="4" className="fill-purple-400" animate={{ y: [3, -3, 3] }} transition={{ repeat: Infinity, duration: 2.2 }} />
              <motion.polygon points="100,20 103,26 110,27 105,32 106,38 100,35 94,38 95,32 90,27 97,26" className="fill-blue-400" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} style={{ transformOrigin: "100px 29px" }} />

              {/* Creator Chair */}
              <rect x="80" y="95" width="40" height="45" rx="8" fill="#1e293b" />
              <line x1="100" y1="140" x2="100" y2="165" stroke="#0f172a" strokeWidth="4" />
              <line x1="85" y1="165" x2="115" y2="165" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />

              {/* Creator Human Torso */}
              <path d="M 75 160 L 125 160 L 115 110 L 85 110 Z" fill="#6366f1" />
              {/* Neck */}
              <rect x="94" y="98" width="12" height="15" rx="2" fill="#fed7aa" />
              {/* Head */}
              <circle cx="100" cy="85" r="18" fill="#fed7aa" />
              {/* Hair */}
              <path d="M 85 80 Q 100 60, 115 80 Q 107 72, 100 72 Q 93 72, 85 80" fill="#1e293b" />
              <rect x="85" y="74" width="30" height="9" rx="4.5" fill="#1e293b" />
              {/* Face Details */}
              <circle cx="94" cy="84" r="1.5" fill="#0f172a" />
              <circle cx="106" cy="84" r="1.5" fill="#0f172a" />
              <path d="M 97 90 Q 100 94, 103 90" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />

              {/* Creative workspace desk surface */}
              <rect x="40" y="150" width="120" height="6" rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
              {/* Laptop screen */}
              <polygon points="75,150 82,125 105,125 98,150" fill="#475569" />
              {/* Glowing laptop light projection */}
              <polygon points="82,125 105,125 125,90 62,90" className="fill-indigo-400/10" />

              {/* Arms Typing */}
              <path d="M 80 115 Q 70 128, 83 144" fill="none" stroke="#6366f1" strokeWidth="7" strokeLinecap="round" />
              <path d="M 120 115 Q 130 128, 117 144" fill="none" stroke="#6366f1" strokeWidth="7" strokeLinecap="round" />
              <circle cx="83" cy="144" r="3.5" fill="#fed7aa" />
              <circle cx="117" cy="144" r="3.5" fill="#fed7aa" />
            </svg>
          </motion.div>

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
