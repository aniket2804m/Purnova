import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaDiscord,
  FaWhatsapp,
  FaTelegram,
  FaReddit,
  FaTiktok,
  FaTwitch,
  FaFacebook,
  FaSnapchat,
  FaPinterest,
} from "react-icons/fa6";

interface SocialIconConfig {
  id: number;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  name: string;
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  animateX: number[];
  animateY: number[];
  duration: number;
  delay: number;
}

const SOCIAL_ICONS_TEMPLATES = [
  { Icon: FaGithub, name: "Github", color: "#64748B" }, // Slate gray
  { Icon: FaLinkedin, name: "Linkedin", color: "#0A66C2" },
  { Icon: FaInstagram, name: "Instagram", color: "#E4405F" },
  { Icon: FaXTwitter, name: "Twitter", color: "#0F1419" },
  { Icon: FaYoutube, name: "Youtube", color: "#FF0000" },
  { Icon: FaDiscord, name: "Discord", color: "#5865F2" },
  { Icon: FaWhatsapp, name: "Whatsapp", color: "#25D366" },
  { Icon: FaTelegram, name: "Telegram", color: "#24A1DE" },
  { Icon: FaReddit, name: "Reddit", color: "#FF4500" },
  { Icon: FaTiktok, name: "Tiktok", color: "#FE2C55" },
  { Icon: FaTwitch, name: "Twitch", color: "#9146FF" },
  { Icon: FaFacebook, name: "Facebook", color: "#1877F2" },
  { Icon: FaSnapchat, name: "Snapchat", color: "#FFFC00" },
  { Icon: FaPinterest, name: "Pinterest", color: "#BD081C" },
];

const FloatingIcon = ({ icon, isMobile }: { icon: SocialIconConfig; isMobile: boolean }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Dynamic 3D tilt calculation based on cursor relative position
    // Max tilt is set to 30 degrees for a noticeable 3D perspective shift
    const rX = -(y / (rect.height / 2)) * 30;
    const rY = (x / (rect.width / 2)) * 30;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const size = isMobile ? icon.size * 0.7 : icon.size;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${icon.initialX}%`,
        top: `${icon.initialY}%`,
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative flex items-center justify-center p-3 rounded-2xl cursor-pointer select-none will-change-transform"
        animate={{
          x: icon.animateX,
          y: icon.animateY,
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.4 : 1,
          z: isHovered ? 60 : 0,
        }}
        transition={{
          // Continuous floating loops independently
          x: { duration: icon.duration, repeat: Infinity, ease: "easeInOut", delay: icon.delay },
          y: { duration: icon.duration, repeat: Infinity, ease: "easeInOut", delay: icon.delay },
          // Spring transitions for 3D interactions
          rotateX: { type: "spring", stiffness: 300, damping: 20 },
          rotateY: { type: "spring", stiffness: 300, damping: 20 },
          scale: { type: "spring", stiffness: 300, damping: 20 },
          z: { type: "spring", stiffness: 300, damping: 20 },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.95 }}
        style={{
          width: size,
          height: size,
          color: icon.color,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft Radial Neon Glow Effect (Layer 1 - deep background) */}
        <div
          className="absolute inset-0 rounded-full blur-2xl scale-75 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, ${icon.color} 0%, transparent 70%)`,
            transform: "translateZ(-10px)",
            opacity: isHovered ? 0.8 : 0,
            willChange: "opacity, transform",
          }}
        />

        {/* 3D Glassmorphism Panel (Layer 2 - middle card border & fill) */}
        <div
          className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-300"
          style={{
            transform: "translateZ(15px)",
            backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "transparent",
            borderColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
            boxShadow: isHovered 
              ? `0 20px 40px rgba(0, 0, 0, 0.35), 0 0 30px ${icon.color}25`
              : "none",
          }}
        />

        {/* SVG Icon popping out in 3D parallax space (Layer 3 - frontmost element) */}
        <icon.Icon
          className="w-full h-full object-contain filter transition-all duration-300"
          style={{
            transform: isHovered ? "translateZ(50px)" : "translateZ(0px)",
            filter: isHovered 
              ? `drop-shadow(0 10px 15px ${icon.color}50) drop-shadow(0 15px 30px rgba(0,0,0,0.4))`
              : "drop-shadow(0 4px 6px rgba(0,0,0,0.15))",
            willChange: "transform, filter",
          }}
        />
      </motion.div>
    </div>
  );
};

const ParticleBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate stable icon configurations with random parameters
  const icons: SocialIconConfig[] = useMemo(() => {
    const list: SocialIconConfig[] = [];
    const count = 22; // total icons on desktop

    for (let i = 0; i < count; i++) {
      const template = SOCIAL_ICONS_TEMPLATES[i % SOCIAL_ICONS_TEMPLATES.length];
      
      // Distribute position: heavy on Left/Right sides, light in the center
      let initialX = 0;
      const distribution = i % 10;
      if (distribution < 4) {
        // Left zone: 4% to 28%
        initialX = Math.random() * 24 + 4;
      } else if (distribution < 8) {
        // Right zone: 72% to 96%
        initialX = Math.random() * 24 + 72;
      } else {
        // Center zone: 32% to 68%
        initialX = Math.random() * 36 + 32;
      }

      // Avoid rendering particles too close to vertical screen limits
      const initialY = Math.random() * 80 + 10; // 10% to 90%

      // Random movement offsets for floating
      // Keyframes start and end at 0 to loop smoothly
      const range = 65; // Max pixels to float from start position
      const animateX = [
        0,
        (Math.random() - 0.5) * range * 2,
        (Math.random() - 0.5) * range * 2,
        (Math.random() - 0.5) * range * 2,
        0,
      ];
      const animateY = [
        0,
        (Math.random() - 0.5) * range * 2,
        (Math.random() - 0.5) * range * 2,
        (Math.random() - 0.5) * range * 2,
        0,
      ];

      // Increased size range (between 48px and 78px)
      const size = Math.floor(Math.random() * 30) + 35;

      // Animation duration (slow: 20s to 45s)
      const duration = Math.random() * 25 + 20;

      // Negative delay so they start at different phases immediately
      const delay = Math.random() * -20;

      list.push({
        id: i,
        Icon: template.Icon,
        name: template.name,
        color: template.color,
        size,
        initialX,
        initialY,
        animateX,
        animateY,
        duration,
        delay,
      });
    }
    return list;
  }, []);

  // Show fewer icons on mobile for optimization (half size, half count)
  const displayedIcons = isMobile ? icons.slice(0, 10) : icons;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {displayedIcons.map((icon) => (
        <FloatingIcon key={icon.id} icon={icon} isMobile={isMobile} />
      ))}
    </div>
  );
};

export default ParticleBackground;
