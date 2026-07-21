import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

import { CLIENTS, type Client, type Category } from "../components/data/client";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES: (Category | "All")[] = [
  "All",
  "Media",
  "Products",
  "Education",
  "Healthcare",
  "Personal Branding",
  "Hotels & Restaurants",
  "Events",
  "Fashion",
  "Automotive",
  "Real Estate",
  "Interior Design",
  "Spiritual & Wellness",
  "Import & Export Business",
  "Travel & Tourism",
  "Fitness",
  "Beauty",
];

const STATS = [
  { label: "Brands Grown", value: 150, suffix: "+" },
  { label: "Industries", value: 25, suffix: "" },
  { label: "Campaigns Run", value: 400, suffix: "+" },
];

/* ------------------------------------------------------------------ */
/*  UTIL: category -> accent glow color (subtle, on-brand)             */
/* ------------------------------------------------------------------ */

const CATEGORY_GLOW: Record<string, string> = {
  Media: "rgba(212,175,55,0.18)",
  "Food & Beverage": "rgba(212,175,55,0.14)",
  Education: "rgba(212,175,55,0.16)",
  Technology: "rgba(212,175,55,0.20)",
  "Personal Brands": "rgba(212,175,55,0.14)",
  "Hotels & Restaurants": "rgba(212,175,55,0.14)",
  Events: "rgba(212,175,55,0.14)",
  Fashion: "rgba(212,175,55,0.18)",
  Automotive: "rgba(212,175,55,0.16)",
  "Real Estate": "rgba(212,175,55,0.14)",
  "Interior Design": "rgba(212,175,55,0.16)",
  "Spiritual & Wellness": "rgba(212,175,55,0.16)",
  "Import & Export Business": "rgba(212,175,55,0.16)",
  "Travel & Tourism": "rgba(212,175,55,0.16)",
  "Fitness": "rgba(212,175,55,0.16)",
  "Beauty": "rgba(212,175,55,0.16)"
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
      <div className={`relative w-full ${client.featured ? "h-64" : "h-44"} bg-[#181818] flex items-center justify-center overflow-hidden`}>
        
        {/* Cover image background context */}
        {client.cover ? (
          <img
            src={client.cover}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-all duration-500 group-hover:scale-105 group-hover:opacity-30"
          />
        ) : client.logo ? (
          <img
            src={client.logo}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-[2px] transition-all duration-500 group-hover:scale-105"
          />
        ) : null}

        {/* Dark overlay to ensure logo visibility */}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />

        {/* The logo/avatar container that moves on hover */}
        <div className={`relative z-10 w-full h-full flex items-center justify-center p-6 transition-all duration-300 ${hovered ? "scale-75 -translate-y-4 opacity-50" : "scale-100 translate-y-0"}`}>
          {client.logo && !imgError ? (
            <motion.img
              layoutId={`logo-${client.id}`}
              src={client.logo}
              alt={`${client.name} logo`}
              loading="lazy"
              onError={() => setImgError(true)}
              className={`${client.featured ? "max-h-28" : "max-h-20"} max-w-full object-contain opacity-95 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}
            />
          ) : (
            <div className={`${client.featured ? "w-20 h-20 text-3xl" : "w-16 h-16 text-2xl"} rounded-full border border-[#f2c94c]/40 flex items-center justify-center text-[#f2c94c] font-serif`}>
              {initials}
            </div>
          )}
        </div>

        {/* result badge, top right     */}
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
    "Products": [
      { label: "Sales Growth", value: "+180%" },
      { label: "D2C Orders", value: "+65%" },
      { label: "Repeat Buyers", value: "+120%" }
    ],
    "Education": [
      { label: "Enrollments", value: "+310" },
      { label: "Course Reach", value: "+150%" },
      { label: "Completion Rate", value: "92%" }
    ],
    
    "Healthcare": [
      { label: "Bookings", value: "+55%" },
      { label: "Patient Reach", value: "+2.4x" },
      { label: "Inquiries", value: "+80%" }
    ],
    "Personal Branding": [
      { label: "Followers", value: "+2.4x" },
      { label: "Engagement", value: "+3.1x" },
      { label: "Monthly Views", value: "+500K" }
    ],
    "Hotels & Restaurants": [
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
    ],
    
    "Interior Design": [
  { label: "Projects", value: "+50" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Lead Growth", value: "+2.5x" }
],
     "Spiritual & Wellness": [
  { label: "Projects", value: "+50" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Lead Growth", value: "+2.5x" }
],

   "Import & Export Business": [
  { label: "Projects", value: "+50" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Lead Growth", value: "+2.5x" }
],

"Travel & Tourism": [
  { label: "Journeys Curated", value: "500+" },
  { label: "Traveler Community", value: "6K+" },
  { label: "Repeat Travelers", value: "85%" }
],

"Fitness": [
  { label: "Fitness Brands", value: "+45" },
  { label: "Client Satisfaction", value: "99%" },
  { label: "Membership Growth", value: "+2.8x" }
],

"Beauty": [
  { label: "Beauty Brands", value: "+40" },
  { label: "Client Satisfaction", value: "99%" },
  { label: "Appointment Growth", value: "+3.1x" }
],
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
        className="relative w-[80%] md:w-[60%] max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#111111]"
      >
        {/* Corner Accent Marks ("L" shaped borders for premium certificate/badge feel) */}
        {/* <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#f2c94c]/60 pointer-events-none rounded-tl-md z-20" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#f2c94c]/60 pointer-events-none rounded-tr-md z-20" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#f2c94c]/60 pointer-events-none rounded-bl-md z-20" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#f2c94c]/60 pointer-events-none rounded-br-md z-20" /> */}

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
                loading="lazy"
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

  const navigate = useNavigate();

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
        c.handle.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase()) ||
        c.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));
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
     <section
  ref={heroRef}
  className="relative overflow-hidden pt-32 pb-24 px-6 text-center"
>
  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C9A84C]/10 blur-[180px] rounded-full"></div>
  </div>

  <div className="relative z-10">

    {/* Small Label */}
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-6 uppercase tracking-[0.45em] text-[#C9A84C] text-xs sm:text-sm font-montserrat"
    >
      Our Clients
    </motion.p>

    {/* Heading */}
    <motion.h1
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="font-cinzel font-bold leading-[0.95]"
    >
      <span className="block text-[#F5F0E8] text-5xl md:text-7xl xl:text-8xl">
        The Brands Behind
      </span>

      <span className="relative inline-block mt-4 text-5xl md:text-7xl xl:text-8xl bg-gradient-to-r from-[#FFF5D6] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent">
        The Growth

        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute -bottom-4 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
        />
      </span>
    </motion.h1>

    {/* Tagline */}
    <motion.p
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 1 }}
      className="mt-10 max-w-3xl mx-auto text-[#F5F0E8]/75 font-montserrat text-base md:text-lg leading-9 tracking-wide"
    >
      <span className="text-[#C9A84C] italic font-cormorant text-xl">
        “
      </span>

      Every logo represents a
      <span className="text-[#C9A84C] font-medium">
        {" "}story
      </span>.
      Every story represents
      <span className="text-white font-medium">
        {" "}trust
      </span>

      <span className="text-[#C9A84C] italic font-cormorant text-xl">
        ”
      </span>
    </motion.p>

  </div>
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
      {/* <section className="px-6 pt-10 pb-6 flex flex-col items-center gap-5">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (activeCategory !== "All") {
              setActiveCategory("All");
            }
          }}
          placeholder="Search brands or industries..."
          className="w-full max-w-sm bg-[#111111] border border-white/15 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#f2c94c]/60 transition-colors"
        />

        <div className="flex flex-wrap justify-center gap-2 max-w-7xl">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSearch("");
              }}
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
      </section> */}

      {/* ---------------- GRID ---------------- */}
      <section className="px-6 pb-20 mt-20 max-w-7xl mx-auto">
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
              className="marquee-btn mx-6 text-black font-serif text-lg tracking-wide hover:text-white transition-colors"
            >
              {c.name.toUpperCase()} 
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-28 px-6 text-center">

  {/* Background Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#C9A84C]/10 blur-[180px] rounded-full"></div>
  </div>

  <div className="relative z-10">

    {/* Small Label */}
    <p className="uppercase tracking-[0.45em] text-[#C9A84C] text-xs sm:text-sm font-montserrat mb-6">
      Let's Build Something Exceptional
    </p>

    {/* Heading */}
    <h2 className="font-cinzel font-bold leading-[1.05] text-5xl md:text-6xl lg:text-7xl">
      <span className="text-[#F5F0E8]">
        Your Brand Could
      </span>

      <br />

      <span className="bg-gradient-to-r from-[#FFF5D6] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent">
        Be Next
      </span>
    </h2>

    {/* Divider */}
    <div className="w-24 h-[2px] mx-auto my-8 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"></div>

    {/* Description */}
    <p className="max-w-3xl mx-auto text-[#F5F0E8]/75 font-montserrat text-base md:text-lg leading-9 tracking-wide">
      The strongest brands don't happen by chance,
      <span className="text-[#C9A84C] font-medium">
        {" "}They grow together
      </span>
    </p>

    {/* Button */}
    <button
      onClick={() => navigate("/contact")}
      className="
        group
        mt-12
        inline-flex
        items-center
        gap-4
        border
        border-[#C9A84C]
        px-8
        py-4
        uppercase
        tracking-[0.28em]
        text-xs
        font-semibold
        text-[#C9A84C]
        transition-all
        duration-500
        hover:bg-[#C9A84C]
        hover:text-[#0A0A0A]
        hover:shadow-[0_0_35px_rgba(201,168,76,0.35)]
      "
    >
      Start The Conversation

      <span className="transition-transform duration-500 group-hover:translate-x-1">
        ↗
      </span>
    </button>

  </div>
</section>
    </div>
  );
}