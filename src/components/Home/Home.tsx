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
              <defs>
                {/* Gradients */}
                <linearGradient id="avatarTorsoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="avatarHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffedd5" />
                  <stop offset="100%" stopColor="#fed7aa" />
                </linearGradient>
                <linearGradient id="avatarHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="laptopScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="lampBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(253, 224, 71, 0.4)" />
                  <stop offset="100%" stopColor="rgba(253, 224, 71, 0.0)" />
                </linearGradient>
                
                {/* Soft shadow filter */}
                <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                </filter>
              </defs>

              {/* Ambient Circular Dashboard in background */}
              <circle cx="100" cy="90" r="65" className="fill-indigo-500/5 stroke-indigo-500/10 stroke-[1.5]" />
              <circle cx="100" cy="90" r="55" className="fill-none stroke-purple-500/5 stroke-[1] stroke-dasharray-[4,4]" />
              
              {/* Floating Idea Lightbulb - Upper Right */}
              <motion.g
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                filter="url(#softShadow)"
              >
                <circle cx="155" cy="45" r="15" fill="rgba(234,179,8,0.1)" />
                <path d="M 155 35 A 6 6 0 0 1 161 41 Q 161 45 158 47 L 158 50 L 152 50 L 152 47 Q 149 45 149 41 A 6 6 0 0 1 155 35 Z" fill="#eab308" />
                <rect x="153" y="50" width="4" height="2" fill="#94a3b8" />
                <path d="M 151 30 L 153 32 M 159 30 L 157 32 M 164 38 L 161 39 M 146 38 L 149 39" stroke="#eab308" strokeWidth="1" strokeLinecap="round" />
              </motion.g>

              {/* Floating Code Tag - Upper Left */}
              <motion.g
                animate={{ y: [4, -4, 4] }}
                transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut" }}
                filter="url(#softShadow)"
              >
                <circle cx="45" cy="55" r="14" fill="rgba(16,185,129,0.1)" />
                <path d="M 41 51 L 37 55 L 41 59 M 49 51 L 53 55 L 49 59 M 47 49 L 43 61" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
              </motion.g>

              {/* Workspace Chair */}
              <rect x="80" y="95" width="40" height="42" rx="8" fill="#1e293b" />
              <line x1="100" y1="135" x2="100" y2="160" stroke="#0f172a" strokeWidth="4" />
              <line x1="82" y1="160" x2="118" y2="160" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />

              {/* Creator Human Torso */}
              <path d="M 75 156 L 125 156 L 115 110 L 85 110 Z" fill="url(#avatarTorsoGrad)" />
              {/* Neck */}
              <rect x="94" y="98" width="12" height="15" rx="2" fill="url(#avatarHeadGrad)" />
              {/* Head */}
              <circle cx="100" cy="85" r="18" fill="url(#avatarHeadGrad)" />
              
              {/* Hair */}
              <path d="M 85 80 Q 100 60, 115 80 Q 107 72, 100 72 Q 93 72, 85 80" fill="url(#avatarHairGrad)" />
              <rect x="85" y="74" width="30" height="9" rx="4.5" fill="url(#avatarHairGrad)" />
              
              {/* Face Details */}
              <circle cx="94" cy="84" r="1.5" fill="#0f172a" />
              <circle cx="106" cy="84" r="1.5" fill="#0f172a" />
              <path d="M 96 90 Q 100 93, 104 90" fill="none" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />

              {/* Headphones */}
              <path d="M 84 84 C 84 68, 116 68, 116 84" fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <rect x="81" y="81" width="5" height="10" rx="2" fill="#ef4444" />
              <rect x="114" y="81" width="5" height="10" rx="2" fill="#ef4444" />

              {/* Desk Surface */}
              <rect x="35" y="150" width="130" height="7" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" filter="url(#softShadow)" />

              {/* Desk Plant (Terracotta pot and green leaves) - Left Side */}
              <polygon points="45,150 53,150 51,139 47,139" fill="#f97316" />
              {/* Leaves */}
              <path d="M 49 139 C 45 130, 42 128, 45 122 C 49 122, 48 130, 49 139 Z" fill="#22c55e" />
              <path d="M 49 139 C 53 130, 56 128, 53 122 C 49 122, 50 130, 49 139 Z" fill="#15803d" />
              <path d="M 49 139 Q 49 123, 49 116 Q 47 122, 49 139" fill="none" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" />

              {/* Laptop screen */}
              <polygon points="76,150 83,124 107,124 100,150" fill="url(#laptopScreenGrad)" stroke="#475569" strokeWidth="1" />
              {/* Glowing laptop light projection */}
              <polygon points="83,124 107,124 125,95 65,95" className="fill-indigo-400/10 pointer-events-none" />

              {/* Cute Coffee Mug - Left of laptop */}
              <rect x="62" y="141" width="8" height="9" rx="1.5" fill="#ef4444" />
              <path d="M 70 143 C 72 143, 72 148, 70 148" fill="none" stroke="#ef4444" strokeWidth="1" />
              {/* Steam waves */}
              <path d="M 64 137 Q 66 134, 64 131" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" className="animate-pulse" />
              <path d="M 68 137 Q 70 134, 68 131" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeLinecap="round" className="animate-pulse" />

              {/* Desk Lamp - Right of Laptop */}
              <rect x="135" y="150" width="10" height="2" fill="#475569" />
              <path d="M 140 150 L 140 130 L 132 122" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="128,125 136,118 130,111 122,118" fill="#f59e0b" />
              {/* Glowing lamp light beam projection */}
              <polygon points="122,118 130,111 95,150 75,150" fill="url(#lampBeamGrad)" className="pointer-events-none" />

              {/* Arms Typing */}
              <path d="M 80 115 Q 70 128, 83 144" fill="none" stroke="url(#avatarTorsoGrad)" strokeWidth="6" strokeLinecap="round" />
              <path d="M 120 115 Q 130 128, 117 144" fill="none" stroke="url(#avatarTorsoGrad)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="83" cy="144" r="3.5" fill="url(#avatarHeadGrad)" />
              <circle cx="117" cy="144" r="3.5" fill="url(#avatarHeadGrad)" />
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
