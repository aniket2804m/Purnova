import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// Founder
import img from "../../img/role/rushi sir (1).png"
import imgh1 from "../../img/role/anu.png"
import clickimg1 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Digital Growth
import img2 from "../../img/role/saurabh sir.png"
import imgh2 from "../../img/Imgh/Saurabh sir.jpg.jpeg"
import clickimg2 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Brand Architect
import img3 from "../../img/role/manager.png"
import imgh3 from "../../img/Imgh/Pallavi.jpg.jpeg"
import clickimg3 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Web Developer
import img4 from "../../img/role/avinash.png"
import imgh4 from "../../img/Imgh/Avinash.jpg.jpeg"
import clickimg4 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Visual Storyteller
import img5 from "../../img/role/tejaa.png"
import imgh5 from "../../img/Imgh/Tejas.jpg.jpeg"
import clickimg5 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Video Editor
import img6 from "../../img/role/ritesh.png"
import imgh6 from "../../img/Imgh/Ritesh.jpg.jpeg"
import clickimg6 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Graphics designer
import img7 from "../../img/role/rutu.png"
import imgh7 from "../../img/Imgh/Rutu.jpg.jpeg"
import clickimg7 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Content Architect
import img8 from "../../img/role/anu.png"
import imgh8 from "../../img/Imgh/Anushka.jpg.jpeg"
import clickimg8 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Web developer
import img9 from "../../img/role/aniket (1).png"
import imgh9 from "../../img/Imgh/Aniket.jpg.jpeg"
import clickimg9 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// video editor
import img10 from "../../img/role/pratap.png"
import imgh10 from "../../img/Imgh/Pratap.jpg.jpeg"
import clickimg10 from "../../img/Imgh/Rushi sir.jpg.jpeg"

import img1 from "../../img/team/ai.png"

// import video from "../../img/video.mp4";

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [showPurnovaImg, setShowPurnovaImg] = useState(false);

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const shootersRef = useRef(null);



  useEffect(() => {
    gsap.from(".team-card", {
      y: 80,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Rushikesh Hande",
      role: "Founder & Performance Strategist",
      image: img,
      hoverImage: imgh1,
      clickimg: clickimg1,
      shortDesc:
        "Show me the story. Then show me the spreadsheet...",
      fullDesc:
        "Old Bollywood Songs, Cycling and Talking. Weapons: Phone, Client Emails, Sense of Humour, Killer Beard, Bollywood Movie Situations etc.",
    },
    {
      id: 2,
      name: "Pallavi Vishwas",
      role: "Brand Architect",
      image: img3,
      hoverImage: imgh3,
      clickimg: clickimg1,
      shortDesc:
        "My mind multitasks so your brand doesn't have to...",
      fullDesc:
        "From strategy to ideas to animal conversations and puns (really bad puns).",
    },
    {
      id: 3,
      name: "Saurabh Borawakey",
      role: "Digital Growth Manager",
      image: img2,
      hoverImage: imgh2,
      clickimg: clickimg1,
      shortDesc:
        "I don't talk strategy. I deliver it...",
      fullDesc:
        "Meeting friends in his 30 days and meeting his friends. Wikipedia of Bollywood Movies. People used to call him Napster.",
    },
     {
      id: 4,
      name: "Rutuja Pawar",
      role: "Graphic Designer",
      image: img7,
      hoverImage: imgh7,
      clickimg: clickimg1,
      shortDesc:
        "I design for the years, not the algorithm...",
      fullDesc:
        "From strategy to ideas to animal conversations and puns (really bad puns).",
    },
    {
      id: 5,
      name: "Aniket Suryawanshi",
      role: "Web Developer",
      image: img9,
      hoverImage: imgh9,
      clickimg: clickimg1,
      shortDesc:
        "Tell me the task. I'll skip the drama...",
      fullDesc:
        "From strategy to ideas to animal conversations and puns (really bad puns).",
    },
    {
      id: 6,
      name: "Anushka Shirole",
      role: "Content Architect ",
      image: img8,
      hoverImage: imgh8,
      clickimg: clickimg1,
      shortDesc:
        "Every brand has a story. I just go looking for it...",
      fullDesc:
        "From strategy to ideas to animal conversations and puns (really bad puns).",
    },
    {
      id: 7,
      name: "Tejas Kumbhar",
      role: "Visual Storyteller",
      image: img5,
      hoverImage: imgh5,
      clickimg: clickimg1,
      shortDesc:
        "I don't find the moment. The moment finds me...",
      fullDesc:
        "Meeting friends in his 30 days and meeting his friends. Wikipedia of Bollywood Movies. People used to call him Napster.",
    },
    {
      id: 8,
      name: "Pratap Pawar",
      role: "Video Editor",
      image: img10,
      hoverImage: imgh10,
      clickimg: clickimg1,
      shortDesc:
        "Keep it real, or don't keep it at all...",
      fullDesc:
        "From strategy to ideas to animal conversations and puns (really bad puns).",
    },
    {
      id: 9,
      name: "Ritesh Dharane",
      role: "Video Editor",
      image: img6,
      hoverImage: imgh6,
      clickimg: clickimg1,
      shortDesc:
        "I don't edit videos. I edit feelings into them...",
      fullDesc:
        "From strategy to ideas to animal conversations and puns (really bad puns).",
    },
    {
      id: 10,
      name: "Avinash Barodiya",
      role: "Web Developer",
      image: img4,
      hoverImage: imgh4,
      clickimg: clickimg1,
      shortDesc:
        "Difficult is just a feature I haven't built yet...",
      fullDesc:
        "Old Bollywood Songs, Cycling and Talking. Weapons: Phone, Client Emails, Sense of Humour, Killer Beard, Bollywood Movie Situations etc.",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="py-20 bg-[#f5f5f5]"
    >
      <div className="max-w-7xl mx-auto px-5">
       <motion.h2
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
  className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-black mt-6 md:mt-8 lg:mt-10 mb-4 md:mb-5"
>
  Meet The Purnovians
</motion.h2>


<div
  ref={shootersRef}
  className="mb-10 py-6 px-5 sm:px-6 md:px-8 lg:px-0"
>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">

    {/* LEFT */}

    <motion.div
      className="shooters-left text-center lg:text-left lg:pl-16 md:pl-8"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.h3
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 5,
          type: "spring",
        }}
        className="text-[#f5c400] text-3xl sm:text-4xl font-black leading-none"
      >
        😎
      </motion.h3>

      <motion.h2
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 4 }}
        className="mt-3 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight lg:leading-[0.95]"
      >
        Faces Behind
        <br />

        <span className="relative inline-block">
          Your Success

          <motion.span
            animate={{
              width: ["0%", "100%", "0%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="absolute -bottom-2 md:-bottom-3 left-0 h-2 bg-[#f5c400]"
          />
        </span>
      </motion.h2>
    </motion.div>

    {/* RIGHT */}

    <motion.div
      className="shooters-right relative z-30 lg:ml-[-105px]"
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.p
        initial={{ y: 40 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
        className="
          text-base
          sm:text-lg
          md:text-xl
          lg:text-2xl
          text-black
          leading-relaxed
          font-medium
          ml-0
          md:ml-0
          lg:-ml-24
          text-center
          lg:text-left
        "
      >
        Meet the{" "}

        <span
          className="relative inline-block font-bold text-[#f5c400] cursor-pointer"
          onMouseEnter={() => setShowPurnovaImg(true)}
          onMouseLeave={() => setShowPurnovaImg(false)}
        >
          Purnovians

          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute inset-0 blur-xl rounded-full -z-10"
          />
        </span>

        {" "}
        the strategists, designers, and brand architects who made it happen.
        The people your customers will never know by name, but whose thinking
        shapes every perception they hold of you.
      </motion.p>
    </motion.div>

  </div>
</div>

   

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
          {teamMembers.map((member) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              setFullscreenImage={setFullscreenImage} 
            />
          ))}
        </div>
      </div>

{/* Purnova Team Img */}
     <AnimatePresence>
  {showPurnovaImg && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 pointer-events-none"
    >
      {/* Glowing Border Container */}
      <div
        className="
          relative
          w-full
          h-full
          max-w-[2000px]
          max-h-[1000px]
          p-[3px]
          overflow-hidden
          rounded-xl
          md:rounded-2xl
          shadow-2xl
          border
          border-white/5
          flex
          items-center
          justify-center
        "
      >
        {/* Rotating Light Border */}
        <div
          className="absolute inset-[-200%] animate-[spin_6s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 30%, #3b82f6 45%, #8b5cf6 55%, #ec4899 65%, transparent 80%)",
          }}
        />

        {/* Team Image */}
        <div className="relative z-10 w-full h-full bg-[#0a0a0a] rounded-[10px] md:rounded-[13px] overflow-hidden flex items-center justify-center">
          <motion.img
            src={img1}
            alt="Purnova Team"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="
              w-full
              h-full
              object-contain
              select-none
            "
          />
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

{/* Click img Fullscreen Img */}
      <AnimatePresence>
  {fullscreenImage && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setFullscreenImage(null)}
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-3 sm:p-5 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[1400px]
          h-[90vh]
          rounded-xl
          overflow-hidden
          p-[3px]
        "
      >
        {/* Animated Border */}
        <div
          className="absolute inset-[-200%] animate-[spin_6s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 30%, #3b82f6 45%, #8b5cf6 55%, #ec4899 65%, transparent 80%)",
          }}
        />

        <div className="relative w-full h-full rounded-xl bg-black flex items-center justify-center overflow-hidden">
          <img
            src={fullscreenImage}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <button
          onClick={() => setFullscreenImage(null)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white text-3xl leading-none"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  hoverImage: string;
  clickimg: string; 
  shortDesc: string;
  fullDesc: string;
}

interface TeamCardProps {
  member: TeamMember;
  setFullscreenImage: (img: string | null) => void;
}

const TeamCard = ({ member, setFullscreenImage }: TeamCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [showMore, setShowMore] = useState(false);;

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () =>
    window.removeEventListener("resize", checkMobile);
}, []);

  return (
   <motion.div
  className="team-card bg-white overflow-hidden"
  whileHover={{ y: -8 }}
  onClick={() => {
    if (window.innerWidth < 768) {
      setHovered(!hovered);
    }
  }}
>
      {/* Image Section */}

      <div
        className="relative bg-black h-[320px] flex justify-center items-center overflow-hidden"
       onMouseEnter={() => {
  setHovered(true);
}}

onMouseLeave={() => {
  setHovered(false);
}}
      >
        {/* Yellow Circle */}

        <div className="absolute w-[250px] h-[250px] rounded-full bg-yellow-400 top-5" />

        {/* Image */}

        <AnimatePresence mode="wait">
          <motion.img
  key={hovered ? member.hoverImage : member.image}
  src={hovered ? member.hoverImage : member.image}
  alt={member.name}
  className="
    absolute
    bottom-0
    h-[240px]
    sm:h-[250px]
    md:h-[260px]
    lg:h-[280px]
    xl:h-[300px]
    object-contain
    z-10
    cursor-pointer
    select-none
  "
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.35 }}
  onClick={(e) => {
    e.stopPropagation();
    setFullscreenImage(member.clickimg);
  }}
/>
        </AnimatePresence>
      </div>

      {/* Content */}

      <div className="p-6">
        <h3 className="text-3xl font-extrabold text-black tracking-tight">
  {member.name}
</h3>

        <p className="text-gray-500 text-sm mb-4 font-bold">
          {member.role}
        </p>

        <p className="text-gray-700">
          {member.shortDesc}
        </p>

        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-gray-600">
                {member.fullDesc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() =>
            setShowMore(!showMore)
          }
          className="mt-8 w-full border-2 border-black rounded-xl py-3 text-blue-600 font-bold hover:bg-black hover:text-white transition-all duration-300"
        >
          {showMore ? "Close" : "Next"}
        </button>
      </div>
    </motion.div>
  );
};

export default Team;