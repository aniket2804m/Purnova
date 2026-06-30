import React, { useState } from "react";
import { motion } from "framer-motion";

import { brands } from "../data/logo";

const Feature = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the brands for infinite scrolling
  const infiniteBrands = [...brands, ...brands];

  const CARD_WIDTH = 210;

  return (
    <section className="bg-white py-[50px] overflow-hidden relative">
      <div className=" text-center">
        <div className="w-full">
          <h1
            className="text-yellow-500 text-[2rem] font-extrabold font-display tracking-[-0.02em] mb-5"
          >
            Trusted by Brands
          </h1>
        </div>
      </div>

      <div className="w-full py-[20px] [perspective:1700px]">
        <motion.div
          className="flex gap-[30px] p-[10px]"
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
              className="group flex-shrink-0
w-[120px] h-[120px]
md:w-[140px] md:h-[140px]
lg:w-[160px] lg:h-[160px]
rounded-full
border-[1.5px] border-primary/10
flex items-center justify-center
bg-yellow-400
overflow-hidden"
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
                className="w-full h-full flex items-center justify-center overflow-hidden"
              >
                <div className="w-[120px] h-[120px] flex items-center justify-center">
  <img
    src={brand.image}
    loading="lazy"
    decoding="async"
    alt={`Brand ${index + 1}`}
    className="
      max-w-full
      max-h-full
      object-contain
      transition-all
      duration-500
      ease-out
      group-hover:scale-105
    "
  />
</div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Feature);