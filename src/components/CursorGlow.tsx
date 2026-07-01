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
              width: 5,
              height: 5,
              background: "#C9A84C",
              borderRadius: "0%",
              boxShadow: "0 0 8px #C9A84C, 0 0 15px #C9A84C",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CursorGlow;