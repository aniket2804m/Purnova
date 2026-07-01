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
    <section className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImg2}
          alt="Background"
          className="w-full h-full object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 bg-white/30" />
      </div>

      {/* Decorative Glow Effects */}
      <div className="absolute top-10 right-1/4 h-80 w-80 rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-80 w-80 rounded-full bg-amber-500/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight">
            Case Studies That{" "}
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
              Drive Results
            </span>
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-black font-bold text-base md:text-lg opacity-90">
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
              <div className="overflow-hidden rounded-3xl border border-neutral-300 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 text-black text-2xl font-semibold">
                {study.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              120+
            </h3>
            <p className="text-black font-bold mt-2">Projects Delivered</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              95%
            </h3>
            <p className="text-black font-bold mt-2">Client Retention</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              5M+
            </h3>
            <p className="text-black font-bold mt-2">Monthly Reach</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
              ₹10Cr+
            </h3>
            <p className="text-black font-bold mt-2">Revenue Generated</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;