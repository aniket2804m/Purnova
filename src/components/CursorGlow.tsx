import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorGlow = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const newStar = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setStars((prev) => [...prev, newStar]);

      // remove star after animation
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, 2000);
    };

    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{
            x: star.x,
            y: star.y,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            y: star.y + 120,     // falling effect
            x: star.x + 40,      // slight diagonal drift
            opacity: 0,
            scale: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="absolute"
          style={{
            left: 0,
            top: 0,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              background: "#FFD700",
              borderRadius: "50%",
              boxShadow: "0 0 10px #FFD700, 0 0 20px #FFC107",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CursorGlow;