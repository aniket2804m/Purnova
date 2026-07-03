import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/*  Swap logo: null -> render initials avatar. Swap logo: "/path.png"  */
/*  -> render actual image.                                            */
/* ------------------------------------------------------------------ */

import img1 from "../img/logo/Copy of Upscale logo.png";
import img2 from "../img/logo/Copy of Logo Pune voice 5.png";
import img3 from "../img/logo/Vaichal vastu.png";
import img6 from "../img/logo/Copy of TheWordSmiths_Logo_final_v1-01.png";
import img7 from "../img/logo/freepik__background__73525 (1).png";
import img8 from "../img/logo/tyb logo Updated (1).png";
import img9 from "../img/logo/IMPORT EXPORT FEDERATION LOGO - PNG WITH BG (1).png";
import img10 from "../img/logo/Saffron.png";
import img11 from "../img/logo/vada.png";
import img12 from "../img/logo/Green.png";
import img13 from "../img/logo/Asset 2.png";
import img14 from "../img/logo/3.png";
import img15 from "../img/logo/Copy of Untitled-1.png";
import img16 from "../img/logo/Jivastro 22-01 copy LOGO.png";
import img18 from "../img/logo/Gentle hair wig logo 4.png";
import img19 from "../img/logo/FINAL final.png"
import img20 from "../img/logo/Dr Auto Logo.png"
import img21 from "../img/logo/COSMICGANGES Logo.png"
import img22 from "../img/logo/Eat Right Up Logo (1).png"
import img23 from "../img/logo/delight.png"
import img24 from "../img/logo/Ashi.png"
import img25 from "../img/logo/siraa.jpeg"
import img26 from "../img/logo/LOGO (1).png"

type Category =
  | "Media"
  | "Food & Beverage"
  | "Education"
  | "Technology"
  | "Healthcare"
  | "Personal Brands"
  | "Hospitality"
  | "Events"
  | "Fashion"
  | "Automotive"
  | "Real Estate";

interface Client {
  id: string;
  name: string;
  handle: string;
  category: Category;
  logo?: string | null; // e.g. "/logos/bushare.png" - shown on the card
  cover?: string | null; // e.g. "/covers/bushare.jpg" - bigger image shown in modal, falls back to logo
  services: string[];
  result?: string; // e.g. "+150% Reach"
  testimonial?: string;
  description?: string; // short paragraph shown inside the modal
  caseStudy?: boolean;
  featured?: boolean;
}

const CLIENTS: Client[] = [
  { id: "hotelwada", 
    name: "Hotel Wada", 
    handle: "@hotelwada", 
    category: "Hospitality", 
    services: ["Booking Site", "Local SEO"] },
  { id: "drauto", 
    name: "DR Auto", handle: "@_the_dr_auto_", category: "Automotive", services: ["Reels", "Content Calendar"], result: "+90K Views" },
  { id: "punevoices", 
    name: "Pune Voices", 
    handle: "@punevoices", 
    category: "Media", 
    services: ["Podcast Branding", "Reels", "Editing"], 
    result: "+220% Reach", 
    testimonial: "Every episode now looks and feels premium.", 
    caseStudy: true, featured: true },
  {
    id: "bushare",
    name: "Bushare",
    handle: "@buybushare",
    category: "Fashion",
    logo: img19,
    cover: "/covers/bushare-cover.jpg",
    services: ["Web Design", "E-commerce", "Reels"],
    result: "+180% Sales",
    testimonial: "Purnova rebuilt our store and sales doubled in 8 weeks.",
    description:
      "Bushare, a Korean fashion label entering the Indian market, needed a storefront that felt as premium as the product. We rebuilt their site from scratch with a fast checkout flow and a matching reel strategy that carried the same visual language across Instagram.",
    caseStudy: true,
    featured: true,
  },
   { id: "importexport",
     name: "Import Export", 
     handle: "@import.export.federation", 
     category: "Technology", 
     services: ["Full Website"] },

    { id: "savaniee", name: "Savaniee", handle: "@savanieeravindrra", category: "Personal Brands", services: ["Personal Branding", "Reels"], result: "+3.1x Engagement" },
  {
    id: "upscale",
    name: "Upscale",
    handle: "@salmanshaikh_upscale",
    category: "Personal Brands",
    logo: img1,
    cover: null,
    services: ["Branding", "Social Media"],
    result: "+2.4x Followers",
    testimonial: "They understood the brand voice instantly.",
    description:
      "A personal styling brand looking to grow a consistent, recognisable presence. We built out a content system and visual identity that made every post feel like part of one story.",
  },
  { id: "shrisamarth", name: "Shri Samarth", handle: "@shrisamarthakrupa", category: "Real Estate", services: ["Brochure Site"] },
  
  { id: "cosmicganges", name: "Cosmic Ganges", handle: "@cosmicganges", category: "Technology", services: ["Full Website", "SEO"], result: "+3x Organic Traffic" },
  { id: "eatrightup", name: "Eat Right Up", handle: "@eatrightup", category: "Food & Beverage", services: ["Menu Design", "Reels"], result: "+65% Orders" },
  { id: "delightevents", name: "Delight Events", handle: "@delight_event_decor", category: "Events", services: ["Portfolio Site", "Photography"] },
  { id: "sadgeemasale", name: "Sadgee Masale", handle: "@sadgee_masale", category: "Food & Beverage", services: ["Packaging", "D2C Site"], result: "+120% Repeat Buyers" },
  { id: "vaichalgroup", name: "Vaichal Group", handle: "@vaichalgroup", category: "Real Estate", services: ["Landing Page", "Lead Funnel"], result: "+40 Qualified Leads/mo" },
  { id: "importexport", name: "Import Export", handle: "@import.export.federation", category: "Technology", services: ["Full Website"] },
  { id: "varadvinayak", name: "Varad Vinayak", handle: "@varadvinayak", category: "Real Estate", services: ["Landing Page"] },
  { id: "siraa", name: "Siraa", handle: "@houseofsiraa", category: "Fashion", services: ["Lookbook Site", "Reels"] },
  { id: "urbaned", name: "Urban Ed", handle: "@urban_education_official", category: "Education", services: ["Course Platform", "SEO"], result: "+310 Enrollments" },
  { id: "aashiskool", name: "Aashi Skool", handle: "@aashiforestskool", category: "Education", services: ["Website", "Admissions Funnel"] },
  { id: "glamowell", name: "Glamowell", handle: "@glamowellofficial", category: "Personal Brands", services: ["Social Media", "Reels"] },
  { id: "sonaleek", name: "Sonalee K", handle: "@sonalee16988", category: "Personal Brands", services: ["Personal Branding"] },
  { id: "smilesworld", name: "SmilesWorld", handle: "@smilesworld10", category: "Healthcare", services: ["Clinic Website", "Local SEO"], result: "+55% Bookings" },
  { id: "akshaycatering", name: "Akshay Catering", handle: "@caterersakshay", category: "Food & Beverage", services: ["Menu Site", "Reels"] },
  { id: "zistral", name: "Zistral", handle: "@zistral_oral_care", category: "Healthcare", services: ["D2C Site", "Packaging"], result: "+2x Repeat Orders" },
];

const CATEGORIES: (Category | "All")[] = [
  "All",
  "Media",
  "Food & Beverage",
  "Education",
  "Technology",
  "Healthcare",
  "Personal Brands",
  "Hospitality",
  "Events",
  "Fashion",
  "Automotive",
  "Real Estate",
];

const STATS = [
  { label: "Brands Grown", value: 50, suffix: "+" },
  { label: "Industries", value: 12, suffix: "" },
  { label: "Avg. Growth", value: 3, suffix: "x" },
  { label: "Reels Produced", value: 400, suffix: "+" },
];

/* ------------------------------------------------------------------ */
/*  UTIL: category -> accent glow color (subtle, on-brand)             */
/* ------------------------------------------------------------------ */

const CATEGORY_GLOW: Record<string, string> = {
  Media: "rgba(212,175,55,0.18)",
  "Food & Beverage": "rgba(212,175,55,0.14)",
  Education: "rgba(212,175,55,0.16)",
  Technology: "rgba(212,175,55,0.20)",
  Healthcare: "rgba(212,175,55,0.16)",
  "Personal Brands": "rgba(212,175,55,0.14)",
  Hospitality: "rgba(212,175,55,0.14)",
  Events: "rgba(212,175,55,0.14)",
  Fashion: "rgba(212,175,55,0.18)",
  Automotive: "rgba(212,175,55,0.16)",
  "Real Estate": "rgba(212,175,55,0.14)",
};

/* ------------------------------------------------------------------ */
/*  STAT COUNTER                                                       */
/* ------------------------------------------------------------------ */

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6">
      <span className="font-serif text-4xl md:text-5xl text-[#f2c94c] tabular-nums">
        {display}
        {suffix}
      </span>
      <span className="mt-2 text-[11px] tracking-[0.2em] uppercase text-white/50">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CLIENT CARD                                                        */
/* ------------------------------------------------------------------ */

function ClientCard({
  client,
  index,
  onOpen,
}: {
  client: Client;
  index: number;
  onOpen: (client: Client) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const initials = client.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.div
      layoutId={`card-${client.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(client)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(client)}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] cursor-pointer group"
      style={{
        boxShadow: hovered ? `0 0 40px -8px ${CATEGORY_GLOW[client.category] || "rgba(212,175,55,0.15)"}` : "none",
        transition: "box-shadow 0.4s ease, border-color 0.3s ease",
        borderColor: hovered ? "rgba(242,201,76,0.3)" : "rgba(255,255,255,0.1)"
      }}
    >
      {/* top media area */}
      <div className={`relative w-full ${client.featured ? "h-56" : "h-36"} bg-[#181818] flex items-center justify-center overflow-hidden`}>
        
        {/* The logo/avatar container that moves on hover */}
        <div className={`transition-all duration-300 flex items-center justify-center ${hovered ? "scale-75 -translate-y-6 opacity-40 blur-[0.5px]" : "scale-100 translate-y-0"}`}>
          {client.logo && !imgError ? (
            <motion.img
              layoutId={`logo-${client.id}`}
              src={client.logo}
              alt={`${client.name} logo`}
              onError={() => setImgError(true)}
              className="max-h-16 max-w-[80%] object-contain opacity-90"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border border-[#f2c94c]/40 flex items-center justify-center text-[#f2c94c] font-serif text-lg">
              {initials}
            </div>
          )}
        </div>

        {/* result badge, top right */}
        {client.result && !hovered && (
          <span className="absolute top-3 right-3 text-[10px] tracking-wide uppercase bg-black/60 border border-[#f2c94c]/30 text-[#f2c94c] rounded-full px-2.5 py-1">
            {client.result}
          </span>
        )}

        {/* hover overlay: services + CTA */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end pb-4 gap-2.5 px-4 text-center pointer-events-none"
            >
              <div className="flex flex-wrap justify-center gap-1.5">
                {client.services.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="text-[9px] uppercase tracking-wider border border-[#f2c94c]/40 bg-black/80 text-[#f2c94c] rounded-full px-2.5 py-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {client.testimonial && (
                <p className="text-[10px] italic text-white/70 max-w-[90%] line-clamp-1">"{client.testimonial}"</p>
              )}

              <span className="text-[10px] uppercase tracking-wider text-[#f2c94c] border-b border-[#f2c94c]/60 pb-0.5">
                {client.caseStudy ? "View Case Study →" : "Click to View →"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer info */}
      <div className="p-4 border-t border-white/5">
        <h3 className="font-serif text-lg text-white group-hover:text-[#f2c94c] transition-colors duration-300">{client.name}</h3>
        <p className="text-xs text-white/40 mt-0.5">{client.handle}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CLIENT STATS HELPERS & DATA                                       */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: string;
}

function getClientStats(client: Client): StatCard[] {
  const statsMap: Record<Category, StatCard[]> = {
    "Media": [
      { label: "Reach Growth", value: "+220%" },
      { label: "Video Views", value: "+1.2M" },
      { label: "Engagement", value: "+4.5%" }
    ],
    "Food & Beverage": [
      { label: "Sales Growth", value: "+180%" },
      { label: "D2C Orders", value: "+65%" },
      { label: "Repeat Buyers", value: "+120%" }
    ],
    "Education": [
      { label: "Enrollments", value: "+310" },
      { label: "Course Reach", value: "+150%" },
      { label: "Completion Rate", value: "92%" }
    ],
    "Technology": [
      { label: "Organic Traffic", value: "+3x" },
      { label: "Leads Generated", value: "+150%" },
      { label: "Load Speed", value: "-60%" }
    ],
    "Healthcare": [
      { label: "Bookings", value: "+55%" },
      { label: "Patient Reach", value: "+2.4x" },
      { label: "Inquiries", value: "+80%" }
    ],
    "Personal Brands": [
      { label: "Followers", value: "+2.4x" },
      { label: "Engagement", value: "+3.1x" },
      { label: "Monthly Views", value: "+500K" }
    ],
    "Hospitality": [
      { label: "Direct Bookings", value: "+45%" },
      { label: "Local SEO Click", value: "+150%" },
      { label: "Avg Reviews", value: "4.8★" }
    ],
    "Events": [
      { label: "Inquiries", value: "+75%" },
      { label: "Attendance", value: "+40%" },
      { label: "Social Buzz", value: "+3x" }
    ],
    "Fashion": [
      { label: "Store Sales", value: "+180%" },
      { label: "Conversion Rate", value: "+2.4x" },
      { label: "Return Customer", value: "35%" }
    ],
    "Automotive": [
      { label: "Video Views", value: "+90K" },
      { label: "Sales Leads", value: "+80%" },
      { label: "Ad Click Rate", value: "4.2%" }
    ],
    "Real Estate": [
      { label: "Qualified Leads", value: "+40/mo" },
      { label: "Conversion", value: "+2.8x" },
      { label: "Site Visits", value: "+110%" }
    ]
  };

  const defaultStats = statsMap[client.category] || [
    { label: "Growth", value: "+45%" },
    { label: "Engagement", value: "+2.5x" },
    { label: "Brand Value", value: "Premium" }
  ];

  if (client.result) {
    const parts = client.result.split(" ");
    if (parts.length >= 2) {
      const val = parts[0];
      const lbl = parts.slice(1).join(" ");
      return [
        { label: lbl, value: val },
        defaultStats[1],
        defaultStats[2]
      ];
    } else {
      return [
        { label: "Total Growth", value: client.result },
        defaultStats[1],
        defaultStats[2]
      ];
    }
  }
  
  return defaultStats;
}

/* ------------------------------------------------------------------ */
/*  CLIENT MODAL — opens on card click, shows image + full content     */
/* ------------------------------------------------------------------ */

function ClientModal({ client, onClose }: { client: Client; onClose: () => void }) {
  const [coverError, setCoverError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const coverSrc = client.cover || client.logo;
  const initials = client.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  // Framer Motion 3D Parallax Tilt variables
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const springRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoBoxRef.current) return;
    const rect = logoBoxRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Framer Motion Staggered Children Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 220,
      },
    },
  };

  const stats = getClientStats(client);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${client.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#111111]"
      >
        {/* Corner Accent Marks ("L" shaped borders for premium certificate/badge feel) */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#f2c94c]/60 pointer-events-none rounded-tl-md z-20" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#f2c94c]/60 pointer-events-none rounded-tr-md z-20" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#f2c94c]/60 pointer-events-none rounded-bl-md z-20" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#f2c94c]/60 pointer-events-none rounded-br-md z-20" />

        {/* close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white/70 hover:text-[#f2c94c] hover:border-[#f2c94c]/50 transition-colors flex items-center justify-center"
        >
          ✕
        </button>

        {/* Ambient Glowing Header & Interactive Logo Box */}
        <div className="relative w-full h-64 bg-[#111111] bg-[radial-gradient(circle_at_center,rgba(242,201,76,0.18)_0%,rgba(17,17,17,0)_70%)] flex items-center justify-center overflow-hidden border-b border-white/5">
          
          {/* Blurred cover photo background context */}
          {coverSrc && !coverError && (
            <div className="absolute inset-0 opacity-[0.08] filter blur-md overflow-hidden pointer-events-none">
              <img
                src={coverSrc}
                alt=""
                onError={() => setCoverError(true)}
                className="w-full h-full object-cover scale-110"
              />
            </div>
          )}

          {/* Glowing particle background behind logo box */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#f2c94c]/40 rounded-full"
                style={{
                  left: `${15 + (i * 12 + Math.random() * 8)}%`,
                  top: `${20 + (i * 8 + Math.random() * 12)}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, Math.random() * 16 - 8, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          {/* Interactive Logo Box with 3D Parallax Tilt and Rotating Border */}
          <div className="relative z-10 flex items-center justify-center">
            <motion.div
              ref={logoBoxRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              className="relative w-36 h-36 rounded-3xl bg-black/70 border border-white/10 backdrop-blur-md flex items-center justify-center p-5 shadow-2xl cursor-grab active:cursor-grabbing"
            >
              {/* Rotating Gold Border Ring */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div 
                  className="absolute -inset-[50%] bg-[conic-gradient(from_0deg,#f2c94c_0%,transparent_30%,#f2c94c_50%,transparent_80%,#f2c94c_100%)] opacity-70 animate-spin"
                  style={{ animationDuration: '8s' }}
                />
                {/* Inner mask to keep border thin and clean */}
                <div className="absolute inset-[2.5px] bg-[#111111] rounded-[21.5px]" />
              </div>

              {/* Logo inside */}
              <div 
                className="relative z-10 flex items-center justify-center w-full h-full"
                style={{ transform: "translateZ(20px)" }}
              >
                {client.logo && !logoError ? (
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    onError={() => setLogoError(true)}
                    className="max-h-20 max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(242,201,76,0.25)]"
                  />
                ) : (
                  <div className="font-serif text-4xl text-[#f2c94c] tracking-wider select-none font-bold">
                    {initials}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-8"
        >
          {/* category badge */}
          <motion.div variants={itemVariants}>
            <span className="text-[11px] uppercase tracking-widest text-[#f2c94c] font-semibold bg-[#f2c94c]/10 rounded-full px-3 py-1">
              {client.category}
            </span>
          </motion.div>

          {/* title and handle */}
          <motion.div variants={itemVariants} className="mt-4">
            <h2 className="font-serif text-3xl text-white font-bold">{client.name}</h2>
            <p className="text-sm text-white/40 mt-1">{client.handle}</p>
          </motion.div>

          {/* services chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-5">
            {client.services.map((s) => (
              <span
                key={s}
                className="text-[10px] uppercase tracking-wide border border-[#f2c94c]/30 bg-[#f2c94c]/5 text-[#f2c94c] rounded-full px-3 py-1 hover:border-[#f2c94c]/60 transition-colors duration-300"
              >
                {s}
              </span>
            ))}
          </motion.div>

          {/* Multiple Result Stat Cards Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 my-6">
            {stats.map((stat, sIdx) => (
              <div 
                key={sIdx} 
                className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center relative overflow-hidden group/stat hover:border-[#f2c94c]/30 hover:bg-[#f2c94c]/[0.01] transition-all duration-300"
              >
                <div className="text-xl md:text-2xl font-serif text-[#f2c94c] font-bold">
                  {stat.value}
                </div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-white/50 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gold Gradient Divider Line */}
          <motion.div variants={itemVariants} className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#f2c94c]/25 to-transparent my-6" />

          {/* description / content */}
          {client.description && (
            <motion.p variants={itemVariants} className="text-sm leading-relaxed text-white/70">
              {client.description}
            </motion.p>
          )}

          {/* testimonial */}
          {client.testimonial && (
            <motion.blockquote variants={itemVariants} className="mt-6 border-l-2 border-[#f2c94c]/50 pl-4 text-sm italic text-white/60 bg-white/[0.01] py-2 pr-2 rounded-r-md">
              "{client.testimonial}"
            </motion.blockquote>
          )}

          {/* actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8">
            <a
              href={`https://instagram.com/${client.handle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest border border-[#f2c94c] text-[#f2c94c] rounded-full px-6 py-2.5 hover:bg-[#f2c94c] hover:text-black transition-all duration-300 font-semibold"
            >
              Visit Instagram
            </a>
            {client.caseStudy && (
              <button
                onClick={() => console.log(`navigate to /case-studies/${client.id}`)}
                className="text-xs uppercase tracking-widest border border-white/20 text-white/70 rounded-full px-6 py-2.5 hover:border-white hover:text-white transition-all duration-300 font-semibold"
              >
                Full Case Study
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: CLIENTS.length };
    CLIENTS.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    return CLIENTS.filter((c) => {
      const matchesCategory = activeCategory === "All" || c.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  // Hero entrance animation
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Marquee infinite scroll via GSAP
  useEffect(() => {
    if (!marqueeRef.current) return;
    const el = marqueeRef.current;
    const tween = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "linear",
    });
    return () => {
      tween.kill();
    };
  }, []);

  const scrollToCard = (id: string) => {
    const target = document.getElementById(`client-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      gsap.fromTo(
        target,
        { boxShadow: "0 0 0px rgba(242,201,76,0)" },
        { boxShadow: "0 0 50px rgba(242,201,76,0.5)", duration: 0.6, yoyo: true, repeat: 1 }
      );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ---------------- HERO ---------------- */}
      <section ref={heroRef} className="pt-28 pb-16 px-6 text-center relative overflow-hidden">
        <h1 className="font-serif text-5xl md:text-7xl leading-tight">
          <span className="hero-line block">The Brands Behind</span>
          <span className="hero-line block">The Growth.</span>
        </h1>
        <p className="hero-sub mt-6 text-white/50 italic text-sm md:text-base">
          Every logo represents a story. Every story represents trust.
        </p>
      </section>

      {/* ---------------- STATS BAR ---------------- */}
      <section className="border-y border-white/10 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-y-8">
          {STATS.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ---------------- FILTER + SEARCH ---------------- */}
      <section className="px-6 pt-10 pb-6 flex flex-col items-center gap-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search brands or industries..."
          className="w-full max-w-sm bg-[#111111] border border-white/15 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#f2c94c]/60 transition-colors"
        />

        <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-[#f2c94c] text-black border-[#f2c94c]"
                  : "border-white/15 text-white/60 hover:border-[#f2c94c]/50 hover:text-[#f2c94c]"
              }`}
            >
              {cat}
              <span className="ml-1 opacity-60">({categoryCounts[cat] || 0})</span>
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- GRID ---------------- */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-min"
        >
          <AnimatePresence>
            {filtered.map((client, i) => (
              <div key={client.id} id={`client-${client.id}`}>
                <ClientCard client={client} index={i} onOpen={setSelectedClient} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-white/40 mt-16 text-sm">
            No brands match "{search}". Try a different search or category.
          </p>
        )}
      </section>

      {/* ---------------- CLIENT MODAL ---------------- */}
      <AnimatePresence>
        {selectedClient && (
          <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </AnimatePresence>

      {/* ---------------- MARQUEE (clickable) ---------------- */}
      <section className="bg-[#f2c94c] py-4 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <button
              key={`${c.id}-${i}`}
              onClick={() => scrollToCard(c.id)}
              className="mx-6 text-black font-serif text-lg tracking-wide hover:text-white transition-colors"
            >
              {c.name.toUpperCase()} •
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-24 px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl">
          Your Brand Could
          <br />
          Be Next.
        </h2>
        <p className="mt-4 text-white/50 text-sm">The strongest brands grow together.</p>
        <button className="mt-8 border border-[#f2c94c] text-[#f2c94c] rounded-full px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#f2c94c] hover:text-black transition-colors">
          Start The Conversation
        </button>
      </section>
    </div>
  );
}