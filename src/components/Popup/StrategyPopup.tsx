import { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../../img/role/rushi sir (1).png";
import img2 from "../../img/role/manager.png";
import img3 from "../../img/role/saurabh sir.png";

export default function StrategyPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const [shown, setShown] = useState({
    start: false,
    middle: false,
    end: false,
  });

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setShown((prev) => ({ ...prev, start: true }));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercent =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercent >= 50 && !shown.middle && !showPopup) {
        setShowPopup(true);
        setShown((prev) => ({ ...prev, middle: true }));
      }

      if (scrollPercent >= 95 && !shown.end && !showPopup) {
        setShowPopup(true);
        setShown((prev) => ({ ...prev, end: true }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [shown, showPopup]);

  return (
    <>
      {/* CSS Stylesheet wrapper to safely override global border-radius resets */}
      <style>{`
        .strategy-popup-card {
          border-radius: 24px !important;
        }
        .strategy-popup-photo {
          border-radius: 50% !important;
        }
        .strategy-popup-btn {
          border-radius: 12px !important;
        }
      `}</style>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setShowPopup(false)} />

            {/* Popup Card */}
            <motion.div
              initial={{
                scale: 0.75,
                opacity: 0,
                y: 20,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.75,
                opacity: 0,
                y: 20,
              }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1], // Smooth premium ease-out expo curve
              }}
              className="strategy-popup-card relative w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl bg-[#0A0A0A] border-[0.5px] border-[#b1974f] shadow-2xl px-5 py-2 sm:px-8 sm:py-3 z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20
                           text-[#F5F0E8] hover:text-[#C9A84C]
                           transition-all duration-500 ease-in-out
                           hover:rotate-[360deg] hover:scale-110"
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Heading */}
              <h2 className="text-center font-cormorant font-light leading-tight text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E8]">
                Talk to a Growth Expert at
                <br />
                <span className="text-[#C9A84C] font-normal">Purnova</span>
              </h2>

              {/* Team Images */}
              <div className="flex justify-center mt-6 md:mt-8 -space-x-3 sm:-space-x-4 md:-space-x-5">
                {[img1, img2, img3].map((img, index) => {
                  // Custom floating animations per image to make them wave organically
                  const floatY = [0, index === 1 ? -6 : index === 2 ? -4 : -5, 0];
                  const delay = index * 0.15;
                  const duration = 3 + index * 0.25;

                  return (
                    <motion.img
                      key={index}
                      src={img}
                      alt={`User ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      initial={{ scale: 0, opacity: 0 }}
                      
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        y: floatY 
                      }}
                      whileHover={{ 
                        scale: 1, 
                        zIndex: 10, 
                        borderColor: "#F5F0E8" 
                      }}
                      transition={{
                        scale: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 + delay },
                        y: { repeat: Infinity, duration, ease: "easeInOut", delay }
                      }}
                      className="strategy-popup-photo
w-64 h-64 
sm:w-16 sm:h-16
md:w-20 md:h-20
lg:w-24 lg:h-24
rounded-full
border-2 border-[#a08846]
bg-[#0A0A0A]
object-contain
object-center
cursor-pointer
shadow-lg
select-none"
                    />
                  );
                })}
              </div>

              {/* Description */}
              <p className="text-center font-montserrat font-light text-[#F5F0E8]/85 mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg leading-relaxed">
                Book strategy call and get clarity on your
                <br className="hidden sm:inline" />
                marketing, branding & growth roadmap.
              </p>

              {/* Features */}
              <div className="flex flex-col md:flex-row md:flex-nowrap justify-center items-center gap-3 md:gap-5 lg:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm lg:text-base font-montserrat font-semibold text-center text-[#F5F0E8]/90">
  <div className="px-3 py-1 bg-[#101010]/60 border border-[#C9A84C]/15 rounded-md whitespace-nowrap">
    ✅ No spam
  </div>

  <div className="px-3 py-1 bg-[#101010]/60 border border-[#C9A84C]/15 rounded-md whitespace-nowrap">
    ✅ No sales pressure
  </div>

  <div className="px-3 py-1 bg-[#101010]/60 border border-[#C9A84C]/15 rounded-md whitespace-nowrap">
    ✅ Just actionable insights
  </div>
</div>

              {/* Button */}
              <div className="flex justify-center mt-8 sm:mt-10">
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(201, 168, 76, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  href="https://calendly.com/your-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="strategy-popup-btn flex items-center gap-2 border border-[#0A0A0A]/10 bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#F5F0E8] hover:text-[#0A0A0A] transition px-6 py-3.5 sm:px-8 sm:py-4 sm:text-base lg:text-lg font-montserrat font-semibold uppercase tracking-wider text-xs shadow-md"
                >
                  <Calendar className="w-5 h-5" />
                  Book Strategy Call ↗
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}