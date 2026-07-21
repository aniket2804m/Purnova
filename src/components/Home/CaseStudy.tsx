import React from "react";
import { useNavigate } from "react-router-dom";
import { motion} from "framer-motion";

// Background Image
import bgImg2 from "../../img/bgImg1.png";

// Case Study Images
import puneImg from "../../img/logo/Copy of Logo Pune voice 5.png";
import bushareImg from "../../img/logo/FINAL final.png";
import clinicImg from "../../img/background 2.png";

const caseStudies = [
  {
    id: 1,
    title: "Pune Voices",
    image: puneImg,
    route: "/pune",
  },
  {
    id: 2,
    title: "Bushare",
    image: bushareImg,
    route: "/bushare",
  },
  {
    id: 3,
    title: "Clinic Growth",
    image: clinicImg,
    route: "/clinic-growth",
  },
];

const CaseStudy = () => {
  const navigate = useNavigate();

  return (
    <section id="results" className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-[#0A0A0A] border-t border-[#C9A84C]/10">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImg2}
          alt="Background"
          className="w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      {/* Decorative Glow Effects */}
      <div className="absolute top-10 right-1/4 h-80 w-80 rounded-none bg-[#C9A84C]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-80 w-80 rounded-none bg-[#C9A84C]/2 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <div className="text-center mb-20">

  {/* Heading */}
  <motion.h2
    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="mt-6 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-cinzel tracking-wide"
  >
    <span className="text-[#F5F0E8]">
      Case Studies That
    </span>{" "}

    <span className="relative inline-block bg-gradient-to-r from-[#FFF4CC] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent">
      Drive Results

      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute -bottom-3 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
      />
    </span>
  </motion.h2>

  {/* Tagline */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="mt-8 text-[#C9A84C] font-cormorant italic text-xl sm:text-2xl"
  >
    “Real strategies. Real growth. Real impact.”
  </motion.p>

  {/* Description */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.5, duration: 1 }}
    className="mt-8 max-w-4xl mx-auto"
  >
    <p className="relative border-l-2 border-[#C9A84C]/40 pl-6 text-left text-[#F5F0E8]/80 font-montserrat font-light text-sm sm:text-base lg:text-lg leading-9 tracking-wide">

      <span className="absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse"></span>

      Discover how our
      <span className="text-[#C9A84C] font-medium">
        {" "}digital marketing strategies{" "}
      </span>
      helped businesses
      <span className="text-white font-medium">
        {" "}increase traffic
      </span>
      ,
      <span className="text-white font-medium">
        {" "}generate leads
      </span>
      , and achieve
      <span className="bg-gradient-to-r from-[#FFF4CC] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent font-semibold">
        {" "}measurable growth.
      </span>
    </p>
  </motion.div>

</div>

        {/* Portfolio Style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => navigate(study.route)}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-none border border-[#C9A84C]/15 bg-[#101010] shadow-lg transition-all duration-300 hover:border-[#C9A84C]/60 hover:-translate-y-2">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-[280px] object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 text-[#F5F0E8] text-xl font-cinzel font-semibold group-hover:text-[#C9A84C] transition-colors duration-300">
                {study.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CaseStudy;