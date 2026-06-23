import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Feature.css";

import { brands } from "../data/logo"

const Feature = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the brands for infinite scrolling
  const infiniteBrands = [...brands, ...brands];

  const CARD_WIDTH = 210;

  return (
    <section className="img-slider">
      <div className="top">
        <div className="heading">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by Brands
          </motion.h1>
        </div>
      </div>

      <div className="slider">
        <motion.div
          className="slide-track"
          animate={isPaused ? "paused" : "animate"}
          variants={{
            animate: {
               x: [0, -(brands.length * CARD_WIDTH)],
              transition: {
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              },
            },
            paused: {},
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
         {infiniteBrands.map((brand, index) => (
  <motion.div
    key={index}
    className="feature-card"
     whileHover={{
                scale: 1.05,
                rotateY: 15,
                rotateX: 5,
              }}
  >
    <a
      href={brand.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={brand.image} alt={`Brand ${index + 1}`} />
    </a>
  </motion.div>
))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Feature);