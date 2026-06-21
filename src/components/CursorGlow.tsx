import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CursorGlow = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth movement springs
  const springConfig = { stiffness: 400, damping: 30, mass: 0.5 };
  const displayX = useSpring(mouseX, springConfig);
  const displayY = useSpring(mouseY, springConfig);

  // Dynamic sizing/opacity based on hover
  const cursorSize = useSpring(isHovered ? 80 : 20, { stiffness: 300, damping: 25 });
  const glowSize = useSpring(isHovered ? 300 : 180, { stiffness: 200, damping: 20 });
  const opacity = useSpring(isHovered ? 0.8 : 0.4, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Center the glow on the mouse
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check for interactive elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Outer Glow Layer */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          x: displayX,
          y: displayY,
          width: glowSize,
          height: glowSize,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--secondary) / 0.5) 50%, transparent 100%)",
        }}
      />

      {/* Main Cursor Circle */}
      <motion.div
        className="absolute border border-primary/30 rounded-full flex items-center justify-center backdrop-blur-[1px]"
        style={{
          x: displayX,
          y: displayY,
          width: cursorSize,
          height: cursorSize,
          translateX: "-50%",
          translateY: "-50%",
          opacity,
        }}
      >
        {/* Core Dot */}
        <motion.div 
          className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]"
          animate={{ scale: isHovered ? 1.5 : 1 }}
        />
      </motion.div>
    </div>
  );
};

export default CursorGlow;
