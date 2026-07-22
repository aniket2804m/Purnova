import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { X } from "lucide-react";

// Founder
import img from "../../img/role/rushi sir (1).png"
import imgh1 from "../../img/role1/rushi sir.png"
import clickimg1 from "../../img/Imgh/Rushi sir.jpg.jpeg"

// Digital Growth
import img2 from "../../img/role/saurabh sir.png"
import imgh2 from "../../img/role1/saurabh sir (2).png"
import clickimg2 from "../../img/Imgh/Saurabh sir.jpg.jpeg"

// Brand Architect
import img3 from "../../img/role/manager.png"
import imgh3 from "../../img/role1/pallavi.png"
import clickimg3 from "../../img/Imgh/Pallavi.jpg.jpeg"

// Web Developer
import img4 from "../../img/role/avinash.png"
import imgh4 from "../../img/role1/avinash (3).png"
import clickimg4 from "../../img/Imgh/Avinash.jpg.jpeg"

// Visual Storyteller
import img5 from "../../img/role/tejaa.png"
import imgh5 from "../../img/role1/tejas (3).png"
import clickimg5 from "../../img/Imgh/Tejas.jpg.jpeg"

// Video Editor
import img6 from "../../img/role/ritesh.png"
import imgh6 from "../../img/role1/ritesh (3).png"
import clickimg6 from "../../img/Imgh/Ritesh.jpg.jpeg"

// Graphics designer
import img7 from "../../img/role/rutu.png"
import imgh7 from "../../img/role1/rutu (2).png"
import clickimg7 from "../../img/Imgh/Rutu.jpg.jpeg"

// Content Architect
import img8 from "../../img/role/anu.png"
import imgh8 from "../../img/role1/anushka (2).png"
import clickimg8 from "../../img/Imgh/Anushka.jpg.jpeg"

// Web developer
import img9 from "../../img/role/aniket (1).png"
import imgh9 from "../../img/role1/aniket (2).png"
import clickimg9 from "../../img/Imgh/Aniket.jpg.jpeg"

// video editor
import img10 from "../../img/role/pratap.png"
import imgh10 from "../../img/role1/pratap (1).png"
import clickimg10 from "../../img/Imgh/Pratap.jpg.jpeg"

import img1 from "../../img/team/ai.png"

// import video from "../../img/video.mp4";

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [showPurnovaImg, setShowPurnovaImg] = useState(false);

  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const shootersRef = useRef(null);





  const teamMembers = [
    {
      id: 1,
      name: "Rushikesh Hande",
      role: "Founder & Performance Strategist",
      image: img,
      hoverImage: imgh1,
      clickimg: clickimg1,
      shortDesc:
        "Attention gets you noticed. Strategy keeps you remembered",
      fullDesc:
        "Rushikesh believes every successful brand is built twice, first as a strategy, then as a business. Long before campaigns launch or content goes live, he's already asking the difficult questions that shape lasting growth. He founded Purnova on the belief that creativity earns attention, but strategy earns trust. Everything else is just noise.",
    },
    {
      id: 2,
      name: "Pallavi Vishwas",
      role: "Brand Architect",
      image: img3,
      hoverImage: imgh3,
      clickimg: clickimg3,
      shortDesc:
        "My mind multitasks so your brand doesn't have to.",
      fullDesc:
        "Pallavi somehow manages five conversations, three deadlines, and one brand crisis all at once and still remembers your dog's name. She calls her mind wonderfully scattered but in her hands, chaos becomes clarity and moving pieces become a plan. Clients don't just trust her with their brand; they trust her with the version they know exists but haven't yet found the words to express.",
    },
    {
      id: 3,
      name: "Saurabh Borawakey",
      role: "Digital Growth Manager",
      image: img2,
      hoverImage: imgh2,
      clickimg: clickimg2,
      shortDesc:
        "I don't talk strategy. I deliver it...",
      fullDesc:
        "Saurabh has probably said eight sentences all week, and every one of them moved a number. He's not cold; he's intentional. The kind of person who believes most meetings could've been emails, and most emails could've been silence. While others are busy explaining their wins, he's already building the next campaign, quietly letting the dashboard say everything he doesn't.",
    },
     {
      id: 4,
      name: "Rutuja Pawar",
      role: "Graphic Designer",
      image: img7,
      hoverImage: imgh7,
      clickimg: clickimg7,
      shortDesc:
        "I design for the years, not the algorithm...",
      fullDesc:
        "Rutuja designs as though every brand lends her its voice before she opens the first artboard. She doesn't decorate identities, she uncovers them. Every layout, every colour, every line exists for a reason, until the work feels less like design and more like something that always belonged. Her art isn't made for today. It's made to outlive it.",
    },
    {
      id: 5,
      name: "Aniket Suryawanshi",
      role: "Web Developer",
      image: img9,
      hoverImage: imgh9,
      clickimg: clickimg9,
      shortDesc:
        "Tell me the task. I'll skip the drama...",
      fullDesc:
        "Aniket believes reliability is a skill, not a personality trait. He delivers exactly what's needed no shortcuts, no overcomplication, no missed deadlines. Ask him for ten things, and you'll get ten things back, finished when promised. He jokes that he only follows instructions, but what he really follows is discipline. Excuses simply don't fit into his workflow.",
    },
    {
      id: 6,
      name: "Anushka Shirole",
      role: "Content Architect ",
      image: img8,
      hoverImage: imgh8,
      clickimg: clickimg8,
      shortDesc:
        "Every brand has a story. I just go looking for it...",
      fullDesc:
        "Anushka sees stories long before she writes them. In half-finished ideas, overlooked details, and brands still searching for their identity, she finds the narrative waiting to be uncovered. She blends curiosity with strategy, turning ordinary briefs into stories people don't just read they remember. For her, content isn't decoration. It's the voice that gives a brand its place in the world.",
    },
    {
      id: 7,
      name: "Tejas Kumbhar",
      role: "Visual Storyteller",
      image: img5,
      hoverImage: imgh5,
      clickimg: clickimg5,
      shortDesc:
        "I don't find the moment. The moment finds me...",
      fullDesc:
        "Tejas doesn't chase the perfect shot he simply happens to be there when it arrives. He's the kind of observer who notices the half-second between moments, the one everyone else blinks through. Where others see a meeting, a street, or a product on a table, he sees the beginning of a story waiting to be told and instinctively knows when to press record.",
    },
    {
      id: 8,
      name: "Pratap Pawar",
      role: "Video Editor",
      image: img10,
      hoverImage: imgh10,
      clickimg: clickimg10,
      shortDesc:
        "Keep it real, or don't keep it at all...",
      fullDesc:
        "Pratap edits the way he speaks straightforward, a little loud, and completely uninterested in polish for the sake of polish. He's not trying to make things look expensive; he's trying to make them feel real. There's a rawness to his cuts that no amount of big-budget gloss can fake, the kind that comes from someone who grew up watching stories, not stock footage.",
    },
    {
      id: 9,
      name: "Ritesh Dharne",
      role: "Video Editor",
      image: img6,
      hoverImage: imgh6,
      clickimg: clickimg6,
      shortDesc:
        "I don't edit videos. I edit feelings into them...",
      fullDesc:
        "Ritesh treats every timeline like it owes someone an emotion. He'll spend an hour refining a cut most people would never notice simply because he knows they'll feel it. For him, editing isn't assembly; it's the difference between a video that's watched and one that's remembered. He doesn't finish projects so much as pour himself into them, frame by frame, until every second earns its place.",
    },
    {
      id: 10,
      name: "Avinash Barodiya",
      role: "Web Developer",
      image: img4,
      hoverImage: imgh4,
      clickimg: clickimg4,
      shortDesc:
        "Difficult is just a feature I haven't built yet...",
      fullDesc:
        "Avinash hears, That's not technically possible,the way most people hear a dare. He doesn't look for easy builds; he looks for the ones with a catch, the kind that make other developers wince. Somewhere between the bug nobody could trace and the deadline nobody believed in, he finds the only satisfaction that matters to him: proving that impossible was just an opinion.",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="py-20 bg-[#0A0A0A] border-t border-[#C9A84C]/10 text-[#F5F0E8] relative overflow-hidden"
    >
      {/* Subtle Gold Radial Glows for premium depth */}
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-[#C9A84C]/3 rounded-none blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-[#C9A84C]/2 rounded-none blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 z-10">
  {/* Section Heading */}
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#C9A84C] font-cinzel mt-8 mb-12 tracking-wide"
  >
    Meet The Purnovians
  </motion.h2>

  {/* Intro Section */}
  <div className="py-6 px-5">
    <div className="flex flex-col items-center text-center gap-8 font-montserrat">

      {/* Emoji */}
      <motion.h3
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-[#C9A84C] text-5xl"
      >
        😎
      </motion.h3>

      {/* Title */}
      <motion.h2
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel text-[#F5F0E8] leading-tight"
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
            className="absolute -bottom-2 left-0 h-1 bg-[#C9A84C] block"
          />
        </span>
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="max-w-4xl text-base sm:text-lg md:text-xl lg:text-2xl mt-10 text-[#F5F0E8]/75 leading-relaxed font-light"
      >
        Meet the{" "}

        <span
          className="relative inline-block text-[#C9A84C] font-bold cursor-pointer"
          onMouseEnter={() => setShowPurnovaImg(true)}
          onMouseLeave={() => setShowPurnovaImg(false)}
        >
          Purnovians

          <motion.span
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="absolute inset-0 bg-[#C9A84C]/20 blur-xl rounded-full -z-10"
          />
        </span>{" "}

        the strategists, designers, and brand architects who made it happen.
        The people your customers will never know by name, but whose thinking
        shapes every perception they hold of you
      </motion.p>
    </div>
  </div>

  {/* Team Cards */}
  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {teamMembers.map((member, index) => (
      <TeamCard
        key={member.id}
        member={member}
        index={index}
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
          rounded-none
          shadow-2xl
          border
          border-[#C9A84C]/20
          flex
          items-center
          justify-center
        "
      >
        {/* Rotating Light Border */}
        <div
  className="absolute inset-[-200%] animate-[spin_6s_linear_infinite] pointer-events-none z-0"
  style={{
    background:
      "conic-gradient(from 0deg, transparent 30%, #C9A84C 55%, transparent 80%)",
  }}
/>

        {/* Team Image */}
        <div className="relative z-10 w-full h-full bg-[#0a0a0a] rounded-none overflow-hidden flex items-center justify-center">
          <motion.img
            src={img1}
            alt="Purnova Team"
            loading="lazy"
            decoding="async"
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
          rounded-none
          overflow-hidden
          p-[3px]
        "
      >
        {/* Animated Border */}
        <div
          className="absolute inset-[-200%] animate-[spin_6s_linear_infinite] pointer-events-none z-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 30%, #C9A84C 55%, transparent 80%)",
          }}
        />

        <div className="relative z-10 w-full h-full rounded-none bg-black flex items-center justify-center overflow-hidden">
          <div className="relative max-w-full max-h-full">
            <img
              src={fullscreenImage}
              alt=""
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-[85vh] block object-contain"
            />
          </div>
        </div>

        {/* Close Button inside the modal container (top-right corner) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFullscreenImage(null);
          }}
          className="close-btn absolute top-4 right-4 sm:top-5 sm:right-5 z-[1000] text-[#F5F0E8] hover:text-[#C9A84C] transition-all duration-500 ease-in-out hover:rotate-[360deg] hover:scale-110 cursor-pointer"
        >
          <X className="w-6 h-6 sm:w-8 sm:h-8" />
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
  index: number;
  setFullscreenImage: (img: string | null) => void;
}

const TeamCard = ({ member, index, setFullscreenImage }: TeamCardProps) => {
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
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: (index % 3) * 0.15, ease: "easeOut" }}
  className="team-card bg-[#101010] border border-[#C9A84C]/15 rounded-none overflow-hidden transition-all duration-300 hover:border-[#C9A84C]/60"
  whileHover={{ y: -8 }}
  onClick={() => {
    if (window.innerWidth < 768) {
      setHovered(!hovered);
    }
  }}
>
      {/* Image Section */}

      <div
        className="relative bg-[#0A0A0A] h-[320px] flex justify-center items-center overflow-hidden"
       onMouseEnter={() => {
  setHovered(true);
}}

onMouseLeave={() => {
  setHovered(false);
}}
      >
        {/* Gold Frame Backdrop */}

        <div className="absolute w-[230px] h-[230px] rounded-non top-8" />

        {/* Image */}

        <AnimatePresence mode="wait">
          <motion.img
  key={hovered ? member.hoverImage : member.image}
  src={hovered ? member.hoverImage : member.image}
  alt={member.name}
  loading="lazy"
  decoding="async"
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
       <div className="mb-5">
  {/* Name */}
  <h3 className="relative inline-block text-2xl sm:text-3xl font-cinzel font-semibold text-[#F5F0E8] tracking-wide transition-all duration-500 hover:text-[#C9A84C]">
    {member.name}

    <span className="block mt-2 h-[2px] w-14 bg-gradient-to-r from-[#C9A84C] to-transparent"></span>
  </h3>

  {/* Role */}
  <div className="mt-4 flex text-center items-center justify-center sm:justify-start gap-3">
  {/* <span className="w-8 h-[1px] bg-[#C9A84C]"></span> */}

  <p className="text-[#C9A84C] uppercase tracking-[0.35em] text-center text-xs sm:text-sm font-cinzel">
    {member.role}
  </p>

  {/* <span className="w-8 h-[1px] bg-[#C9A84C]"></span> */}
</div>
</div>

 <div className="mt-3 pl-0">
  <div className="border-l-2 border-[#C9A84C] pl-5">
    <p className="relative mt-3 pl-0 text-[#F5F0E8]/85 font-cormorant italic text-lg sm:text-xl leading-8 tracking-wide min-h-[70px]">
      <span className="bg-[#C9A84C]/10 px-2 py-1 rounded-sm inline">
        <span className="text-[#C9A84C] text-2xl">“</span>

        {member.shortDesc.replace(/^"|"$/g, "")}

        <span className="text-[#C9A84C] text-2xl">”</span>
      </span>
    </p>
  </div>
</div>

<AnimatePresence mode="wait">
  {showMore && (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
        y: -10,
      }}
      animate={{
        height: "auto",
        opacity: 1,
        y: 0,
      }}
      exit={{
        height: 0,
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="overflow-hidden"
    >
     <div className="mt-6 border-x-2 border-[#C9A84C]/60 px-5">
  <p className="text-[#F5F0E8]/70 font-montserrat font-light text-[14px] sm:text-[15px] leading-8 tracking-wide italic">
    {member.fullDesc}
  </p>
</div>
    </motion.div>
  )}
</AnimatePresence>

        <button
          onClick={() =>
            setShowMore(!showMore)
          }
          className="mt-8 w-full border border-[#C9A84C]/45 rounded-none py-3 text-[#F5F0E8] hover:bg-[#C9A84C] hover:text-[#0A0A0A] font-montserrat font-semibold transition-all duration-300 uppercase tracking-widest text-xs"
        >
          {showMore ? "Close" : "Next"}
        </button>
      </div>
    </motion.div>
  );
};

export default Team;