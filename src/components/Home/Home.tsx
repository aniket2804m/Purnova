import { useState, useEffect } from "react";
// import { Github, Linkedin, ArrowDown, Download, Bold } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleBackground from "../ParticleBackground";
import { motion, AnimatePresence } from "framer-motion";

import video from "../../img/video.mp4";

import { roles } from "../data/Home"

const Home = () => {

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const [fullscreen, setFullscreen] = useState(false);

  const [hovered, setHovered] = useState(false);

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
    <div>

      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/80
        backdrop-blur-md
        pointer-events-none
      "
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
  className="
    w-[95vw]
    h-[60vh]

    md:w-[85vw]
    md:h-[80vh]

    lg:w-[90vw]
    lg:h-[85vh]

    xl:w-[92vw]
    xl:h-[88vh]

    object-cover
    rounded-3xl
    shadow-2xl
    pointer-events-none
  "
>
  <source src={video} type="video/mp4" />
</motion.video>
          </motion.div>
        )}
      </AnimatePresence>

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
        {/* Glowing Border Container - Full Screen on Desktop, Responsive Card on Mobile */}
        <div 
          className="relative w-[95vw] aspect-[2/1] h-auto md:fixed md:inset-0 md:w-screen md:h-screen md:aspect-auto md:max-w-none md:max-h-none p-[3px] md:p-0 overflow-hidden rounded-2xl md:rounded-none shadow-2xl flex items-center justify-center border border-white/5 md:border-none"
        >
          {/* Rotating Light Border Layer */}
          <div 
            className="absolute inset-[-200%] animate-[spin_6s_linear_infinite] md:hidden"
            style={{
              background: "conic-gradient(from 0deg, transparent 30%, #3b82f6 45%, #8b5cf6 55%, #ec4899 65%, transparent 80%)",
            }}
          />
          
          {/* Inner Container holding the Image */}
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
              className="
w-[90vw] h-[80vh]
sm:w-[500px] sm:h-[700px]
md:w-[700px] md:h-[800px]
lg:w-[900px] lg:h-[550px]
xl:w-[1200px] xl:h-[700px]
object-contain
"
            />
          </div>
        </div>
      </motion.div>
   )}
</AnimatePresence>

      <section
        id="home"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden mt-10 `}
      >
        <ParticleBackground />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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

      // 5 seconds nantar auto hide
      setTimeout(() => {
        setShowVideo(false);
      }, 15000);
    }
  }}
  whileHover={{
    scale: 1.08,
    textShadow: "0 0 30px rgba(59,130,246,0.8)",
  }}
  className="
    text-5xl
    md:text-7xl
    lg:text-8xl
    font-extrabold
    mb-15
    mt-4
    leading-tight
    cursor-pointer
  "
>
  PURNOVA
</motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="max-w-[700px] text-white text-base sm:text-lg md:text-xl lg:text-base tracking-[0.4em] uppercase mt-5 font-semibold"
            >
               Where brands become Legends
             
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-lg md:text-2xl text-gray-300 mb-15 mt-5 max-w-2xl mx-auto"
            >
              We do not decorate brands. We architect transformations reaching into the space between what you are today and everything you are destined to become
            </motion.p>


            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="flex items-center justify-center gap-5 mt-10 "
            >

              <span
                className="
      text-2xl
      md:text-3xl
      font-bold
      bg-gradient-to-r
      from-cyan-400
      via-blue-500
      to-purple-500
      bg-clip-text
      text-transparent
      drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]
    "
              >
                {displayText}
                <span className="animate-pulse">|</span>
              </span>

{/* Cirlce in img */}
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
                  whileHover={{ scale: 1.2 }}
                 className="
  w-[200px]
  h-[200px]
  md:w-[200px]
  md:h-[200px]
  lg:w-[200px]
  lg:h-[200px]
  object-contain
  cursor-pointer
  rounded-full
  border-2
  border-cyan-400
  shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee]
"
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

            </motion.div>


           

          </motion.div>
        </div>


      </section>
    </div>
  )
}

export default Home
