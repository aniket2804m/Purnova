import React from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="text-center mb-16">
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold font-cinzel text-[#F5F0E8] tracking-wide">
            Case Studies That <span className="text-[#C9A84C]">Drive Results</span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto font-montserrat text-sm sm:text-base text-[#F5F0E8]/70 leading-relaxed">
            Discover how our digital marketing strategies helped businesses
            increase traffic, generate leads, and achieve measurable growth.
          </p>
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

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="rounded-none border border-[#C9A84C]/15 bg-[#101010] p-6 text-center shadow-sm hover:border-[#C9A84C]/50 transition-colors duration-300">
            <h3 className="text-3xl font-extrabold text-[#00A878] font-cinzel">
              120+
            </h3>
            <p className="text-[#F5F0E8]/70 font-montserrat text-xs tracking-wider uppercase mt-2">Projects Delivered</p>
          </div>

          <div className="rounded-none border border-[#C9A84C]/15 bg-[#101010] p-6 text-center shadow-sm hover:border-[#C9A84C]/50 transition-colors duration-300">
            <h3 className="text-3xl font-extrabold text-[#00A878] font-cinzel">
              95%
            </h3>
            <p className="text-[#F5F0E8]/70 font-montserrat text-xs tracking-wider uppercase mt-2">Client Retention</p>
          </div>

          <div className="rounded-none border border-[#C9A84C]/15 bg-[#101010] p-6 text-center shadow-sm hover:border-[#C9A84C]/50 transition-colors duration-300">
            <h3 className="text-3xl font-extrabold text-[#00A878] font-cinzel">
              5M+
            </h3>
            <p className="text-[#F5F0E8]/70 font-montserrat text-xs tracking-wider uppercase mt-2">Monthly Reach</p>
          </div>

          <div className="rounded-none border border-[#C9A84C]/15 bg-[#101010] p-6 text-center shadow-sm hover:border-[#C9A84C]/50 transition-colors duration-300">
            <h3 className="text-3xl font-extrabold text-[#00A878] font-cinzel">
              ₹10Cr+
            </h3>
            <p className="text-[#F5F0E8]/70 font-montserrat text-xs tracking-wider uppercase mt-2">Revenue Generated</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;