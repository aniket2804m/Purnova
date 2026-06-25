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
          background: "radial-gradient(circle, rgba(255,215,0,0.9) 0%, rgba(255,193,7,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Main Cursor Circle */}
      <motion.div
  className="absolute flex items-center justify-center"
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
  <motion.div
    animate={{
      scale: isHovered ? 1.3 : 1,
      rotate: isHovered ? 180 : 0,
    }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
    }}
    style={{
      fontSize: isHovered ? "40px" : "24px",
      color: "#FFD700",
      filter: "drop-shadow(0 0 12px #FFD700) drop-shadow(0 0 25px #FFC107)",
    }}
  >
    ✦
  </motion.div>
</motion.div>
    </div>
  );
};

export default CursorGlow;
