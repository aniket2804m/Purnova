import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { gsap } from "gsap";
import { 
  Search, 
  Zap, 
  Youtube, 
  Layers, 
  ShoppingBag, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  GitMerge, 
  BarChart3,
  ArrowUpRight
} from "lucide-react";

// Service data structure
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gridLg: string;
  gridMd: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "Search Ads",
    description: "Be the answer when the question is asked.",
    icon: Search,
    gridLg: "lg:col-start-1 lg:row-start-1",
    gridMd: "md:col-start-1 md:row-start-1",
  },
  {
    id: "02",
    title: "Performance Max",
    description: "One campaign. Every channel. Zero wasted reach.",
    icon: Zap,
    gridLg: "lg:col-start-2 lg:row-start-1",
    gridMd: "md:col-start-2 md:row-start-1",
  },
  {
    id: "03",
    title: "YouTube Ads",
    description: "The brands people remember are the ones they've watched.",
    icon: Youtube,
    gridLg: "lg:col-start-3 lg:row-start-1",
    gridMd: "md:col-start-3 md:row-start-1",
  },
  {
    id: "04",
    title: "Display Network",
    description: "Stay visible long after the first impression.",
    icon: Layers,
    gridLg: "lg:col-start-4 lg:row-start-1",
    gridMd: "md:col-start-1 md:row-start-2",
  },
  {
    id: "05",
    title: "Shopping Ads",
    description: "Put your product in front of someone already looking to buy it.",
    icon: ShoppingBag,
    gridLg: "lg:col-start-5 lg:row-start-1",
    gridMd: "md:col-start-3 md:row-start-2",
  },
  {
    id: "06",
    title: "Retargeting",
    description: "Most buyers don't convert on the first visit. We bring them back.",
    icon: RefreshCw,
    gridLg: "lg:col-start-1 lg:row-start-3",
    gridMd: "md:col-start-1 md:row-start-3",
  },
  {
    id: "07",
    title: "Conversion Optimisation",
    description: "Traffic without conversion is just an expensive audience.",
    icon: TrendingUp,
    gridLg: "lg:col-start-2 lg:row-start-3",
    gridMd: "md:col-start-2 md:row-start-3",
  },
  {
    id: "08",
    title: "Audience Strategy",
    description: "Who you reach matters more than how many you reach.",
    icon: Users,
    gridLg: "lg:col-start-3 lg:row-start-3",
    gridMd: "md:col-start-3 md:row-start-3",
  },
  {
    id: "09",
    title: "Attribution Setup",
    description: "You can't optimise what you can't measure accurately.",
    icon: GitMerge,
    gridLg: "lg:col-start-4 lg:row-start-3",
    gridMd: "md:col-start-1 md:row-start-4",
  },
  {
    id: "10",
    title: "ROI Reporting",
    description: "Numbers without context are just noise.",
    icon: BarChart3,
    gridLg: "lg:col-start-5 lg:row-start-3",
    gridMd: "md:col-start-3 md:row-start-4",
  },
];

// Individual sub-card component with Framer Motion interactive shine and spring hover effects
const SubCard = ({
  service,
  isExpanded,
  cardRef,
}: {
  service: ServiceItem;
  isExpanded: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const IconComponent = service.icon;

  return (
    <div
      ref={cardRef}
      style={{ perspective: 1000 }}
      className={`relative w-full h-[180px] transition-all duration-300 ${
        isExpanded ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-0 pointer-events-none"
      }`}
    >
      {/* Golden Glow Behind on Hover */}
      <motion.div
        className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-amber-500/10 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl pointer-events-none"
      />

      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="group relative h-full w-full rounded-[2rem] p-[1.5px] bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-amber-500/35 hover:bg-neutral-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
      >
        {/* Mouse Tracking Metallic Shine overlay */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-300 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                120px circle at ${mouseX}px ${mouseY}px,
                rgba(245, 158, 11, 0.08),
                transparent 85%
              )
            `,
          }}
        />

        {/* Card Content */}
        <div className="relative z-20 p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center mb-4">
              {/* Gold Number */}
              <span className="text-xs font-mono font-bold text-amber-500/80 tracking-wider">
                {service.id}
              </span>
              {/* Premium Icon Container */}
              <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-neutral-950/60 border border-neutral-800 group-hover:border-amber-500/30 group-hover:bg-amber-500/5 text-amber-500 transition-all duration-300">
                <IconComponent className="h-4.5 w-4.5" />
              </div>
            </div>

            {/* Title */}
            <h4 className="text-base font-bold text-neutral-100 font-display group-hover:text-amber-400 transition-colors duration-300 mb-1.5">
              {service.title}
            </h4>

            {/* Description */}
            <p className="text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
              {service.description}
            </p>
          </div>

          {/* Action indicator */}
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold text-neutral-500 uppercase tracking-widest group-hover:text-amber-500 transition-colors duration-300 self-end">
            Explore <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main Center Card Component
const CenterCard = ({
  isExpanded,
  onClick,
  cardRef,
}: {
  isExpanded: boolean;
  onClick: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ perspective: 1000 }}
      animate={isExpanded ? { y: 0 } : { y: [-6, 6, -6] }}
      transition={isExpanded ? { duration: 0.3 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
      onClick={onClick}
      className="relative w-full h-[220px] md:h-[240px] z-30 cursor-pointer lg:col-start-3 lg:row-start-2 md:col-start-2 md:row-start-2 col-start-1 row-start-6"
    >
      {/* Luxury Golden Glow behind center card */}
      <div 
        className={`absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-amber-500 to-yellow-600 opacity-20 blur-2xl transition-all duration-1000 pointer-events-none ${
          isExpanded ? "scale-110 opacity-30 animate-pulse" : "scale-100 opacity-20"
        }`} 
      />

      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative h-full w-full rounded-[2.5rem] p-[1.5px] backdrop-blur-lg overflow-hidden flex flex-col justify-between transition-all duration-500 border ${
          isExpanded 
            ? "bg-neutral-900/90 border-amber-500 shadow-[0_0_50px_rgba(245,158,11,0.25)]" 
            : "bg-black/80 border-amber-500/40 hover:border-amber-500/80 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        }`}
      >
        {/* Dynamic metallic cursor tracking shine */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-300 z-10"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                180px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 215, 0, 0.12),
                transparent 80%
              )
            `,
          }}
        />

        {/* Ambient Pulsing Glow inside Card */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_60%)] pointer-events-none" />

        <div className="relative z-20 p-8 flex flex-col justify-between h-full items-center text-center">
          {/* Logo / Icon Area */}
          <div className="flex flex-col items-center">
            {/* Premium Gold Google Ads SVG Logo */}
            <svg 
              className={`w-12 h-12 mb-3 transition-transform duration-500 ${isExpanded ? "scale-105" : "group-hover:scale-105"}`} 
              viewBox="0 0 48 48" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gold-ads-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE259" />
                  <stop offset="100%" stopColor="#FFA751" />
                </linearGradient>
                <linearGradient id="gold-ads-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              {/* Blue diagonal bar equivalent in gold */}
              <rect x="6" y="24" width="36" height="12" rx="6" transform="rotate(-45 6 24)" fill="url(#gold-ads-grad1)" />
              {/* Yellow diagonal bar equivalent in bright white-gold */}
              <rect x="24" y="24" width="18" height="12" rx="6" transform="rotate(45 24 24)" fill="url(#gold-ads-grad2)" opacity="0.9" />
            </svg>
            
            {/* Subtitle */}
            <span className="text-[10px] font-extrabold tracking-[0.25em] text-amber-500 uppercase font-mono">
              Google Ads Core
            </span>
          </div>

          {/* Heading */}
          <div className="my-2">
            <h3 className="text-2xl font-black tracking-tight text-white font-display">
              Google Ads
            </h3>
            <p className="text-[11px] text-neutral-400 mt-1 max-w-[220px]">
              {isExpanded ? "Active ecosystem showcase" : "Supercharge your business reach"}
            </p>
          </div>

          {/* Expand/Collapse Interaction Pill */}
          <div className={`px-4 py-1.5 rounded-full border text-[9px] font-extrabold tracking-widest uppercase transition-all duration-300 ${
            isExpanded 
              ? "bg-amber-500 text-black border-amber-400 font-bold scale-95 shadow-md shadow-amber-500/20" 
              : "bg-neutral-900 text-amber-500 border-neutral-800 group-hover:border-amber-500/40 group-hover:bg-amber-500/5 shadow-inner"
          }`}>
            {isExpanded ? "Click to Collapse" : "Hover or Click to Expand"}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Section Component
export default function AdsCard() {
  const [isRendered, setIsRendered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // Keeps expanded state locked when clicked
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Reset lock if click away
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsLocked(false);
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleGlobalClick);
    return () => document.removeEventListener("mousedown", handleGlobalClick);
  }, []);

  // Compute translation coordinates from center card to sub-cards
  const getTranslation = (cardId: string) => {
    const centerEl = cardRefs.current["center"];
    const cardEl = cardRefs.current[cardId];
    if (!centerEl || !cardEl) return { x: 0, y: 0 };

    const centerX = centerEl.offsetLeft + centerEl.offsetWidth / 2;
    const centerY = centerEl.offsetTop + centerEl.offsetHeight / 2;

    const cardX = cardEl.offsetLeft + cardEl.offsetWidth / 2;
    const cardY = cardEl.offsetTop + cardEl.offsetHeight / 2;

    return {
      x: centerX - cardX,
      y: centerY - cardY,
    };
  };

  // GSAP animation orchestration
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = servicesData.map(s => cardRefs.current[s.id]).filter(Boolean);
      
      if (isExpanded) {
        // Wait a tiny frame (30ms) for DOM mount and clientRects to calculate
        const timer = setTimeout(() => {
          cards.forEach((cardEl, i) => {
            if (!cardEl) return;
            const serviceId = servicesData[i].id;
            const offset = getTranslation(serviceId);

            // Initial position (overlapping center card, scaled to 0)
            gsap.set(cardEl, {
              x: offset.x,
              y: offset.y,
              scale: 0,
              opacity: 0,
              rotate: (Math.random() - 0.5) * 35, // slight rotation for dynamic sweep effect
            });

            // Animate outwards to grid cell (0, 0)
            gsap.to(cardEl, {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.85,
              ease: "back.out(1.15)", // elastic spring recoil
              delay: i * 0.045, // staggering
              force3D: true
            });
          });
        }, 30);
        return () => clearTimeout(timer);
      } else {
        if (cards.length === 0) return;

        // Collapse animation (in reverse order to center card)
        const tl = gsap.timeline({
          onComplete: () => {
            // Unmount from grid and return to flex-centered state once complete
            setIsRendered(false);
          }
        });

        [...cards].reverse().forEach((cardEl, i) => {
          if (!cardEl) return;
          const originalIndex = cards.length - 1 - i;
          const serviceId = servicesData[originalIndex].id;
          const offset = getTranslation(serviceId);

          tl.to(cardEl, {
            x: offset.x,
            y: offset.y,
            scale: 0,
            opacity: 0,
            rotate: (Math.random() - 0.5) * 20,
            duration: 0.65,
            ease: "power3.inOut",
            delay: i * 0.025,
            force3D: true
          }, 0);
        });
      }
    });

    return () => ctx.revert();
  }, [isExpanded]);

  // Handle interaction triggers
  const handleMouseEnter = () => {
    if (!isLocked) {
      setIsRendered(true);
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      setIsExpanded(false);
    }
  };

  const handleCenterClick = () => {
    const nextLocked = !isLocked;
    setIsLocked(nextLocked);
    
    if (nextLocked) {
      setIsRendered(true);
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#050505] text-neutral-100 py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center min-h-[820px] lg:min-h-[920px] select-none"
    >
      {/* Luxury Background Overlay: Dotted Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none z-0" />

      {/* Luxury Soft Golden Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none z-0" />
      <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Floating Micro Gold Particles (Micro-animations) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-500/20 blur-[0.5px] pointer-events-none hidden lg:block"
          style={{
            top: `${15 + i * 14}%`,
            left: `${8 + (i % 2 === 0 ? Math.random() * 5 : 78 + Math.random() * 5)}%`,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0.15, 0.45, 0.15],
            scale: [0.85, 1.25, 0.85],
          }}
          transition={{
            duration: 7 + i * 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header Section */}

        {/* Dynamic Cards Container */}
        <div className={`relative w-full flex items-center justify-center transition-all duration-700 ${
          isRendered ? "min-h-[580px] lg:min-h-[660px]" : "min-h-[250px]"
        }`}>
          {isRendered ? (
            /* Expanded Layout: Symmetrical Grid */
            <div 
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 w-full max-w-6xl items-center justify-items-center relative z-10 transition-all duration-700"
            >
              {/* Row 1 - Cards 01 to 05 */}
              {servicesData.slice(0, 5).map((service) => (
                <div 
                  key={service.id} 
                  className={`w-full ${service.gridLg} ${service.gridMd}`}
                >
                  <SubCard 
                    service={service} 
                    isExpanded={isExpanded} 
                    cardRef={(el) => (cardRefs.current[service.id] = el)}
                  />
                </div>
              ))}

              {/* Center Card - Always remains in the middle */}
              <CenterCard 
                isExpanded={isExpanded} 
                onClick={handleCenterClick} 
                cardRef={(el) => (cardRefs.current["center"] = el)}
              />

              {/* Row 2 - Cards 06 to 10 */}
              {servicesData.slice(5).map((service) => (
                <div 
                  key={service.id} 
                  className={`w-full ${service.gridLg} ${service.gridMd}`}
                >
                  <SubCard 
                    service={service} 
                    isExpanded={isExpanded} 
                    cardRef={(el) => (cardRefs.current[service.id] = el)}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Collapsed Layout: Single Center Card */
            <div className="w-full max-w-[280px] md:max-w-xs flex justify-center items-center relative z-10 transition-all duration-300">
              <CenterCard 
                isExpanded={false} 
                onClick={handleCenterClick} 
                cardRef={(el) => (cardRefs.current["center"] = el)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
