import React, { useState } from "react";
import { motion } from "framer-motion";

// Background Image import
import bgImg2 from "../../img/bgImg1.png";

const caseStudies = [
  {
    id: 1,
    industry: "E-Commerce",
    title: "Fashion Brand Growth Campaign",
    challenge:
      "The client struggled with low website traffic, poor conversion rates, and rising ad costs.",
    solution:
      "Implemented SEO optimization, Meta Ads campaigns, conversion-focused landing pages, and email marketing automation.",
    results: [
      "+250% Organic Traffic",
      "+180% Qualified Leads",
      "5.2x ROAS",
      "+320% Revenue Growth",
    ],
  },
  {
    id: 2,
    industry: "Real Estate",
    title: "Lead Generation Strategy",
    challenge:
      "Generating high-quality property leads while maintaining a low cost per acquisition.",
    solution:
      "Executed Google Search Ads, local SEO, and optimized lead capture funnels.",
    results: [
      "+220% Lead Growth",
      "-35% Cost Per Lead",
      "+180% Website Traffic",
      "4.8x ROI",
    ],
  },
  {
    id: 3,
    industry: "Healthcare",
    title: "Clinic Appointment Boost",
    challenge:
      "The clinic wanted to increase appointment bookings and improve local visibility.",
    solution:
      "Developed a local SEO strategy, Google Ads campaigns, and reputation management.",
    results: [
      "+150% Appointments",
      "+300% Local Visibility",
      "+85% Website Engagement",
      "4.5x Return on Investment",
    ],
  },
];

const CaseStudy = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-white">
      {/* Background Image & Light Yellow Glow Blend */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImg2}
          alt="Background Image"
          className="w-full h-full object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Decorative Golden / Yellow Radial Glows for premium depth */}
      <div className="absolute top-10 right-1/4 h-80 w-80 rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 h-80 w-80 rounded-full bg-amber-500/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/40 bg-black text-white text-xs font-semibold tracking-widest uppercase shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
            Success Stories
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-black font-display tracking-tight">
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

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => {
            const isActive = activeId === study.id;
            return (
              <motion.div
                key={study.id}
                onMouseEnter={() => setActiveId(study.id)}
                onClick={() => setActiveId(study.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-500 cursor-pointer select-none flex flex-col justify-between ${
                  isActive
                    ? "bg-neutral-900/60 border-2 border-yellow-500 shadow-[0_20px_50px_rgba(234,179,8,0.25)] backdrop-blur-lg scale-[1.03] z-10"
                    : "bg-neutral-800/10 border border-neutral-400/20 backdrop-blur-md opacity-75 md:opacity-85 scale-100 hover:opacity-100 hover:bg-neutral-800/15"
                }`}
              >
                <div>
                  {/* Industry Badge */}
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6 border transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-400 text-black border-yellow-500/20 shadow-sm"
                      : "bg-black text-yellow-400 border-yellow-500/30"
                  }`}>
                    {study.industry}
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-extrabold mb-6 transition-colors duration-300 ${
                    isActive ? "text-amber-400" : "text-black"
                  }`}>
                    {study.title}
                  </h3>

                  {/* Challenge */}
                  <div className="mb-5">
                    <h4 className={`font-extrabold mb-1 text-xs uppercase tracking-wider ${
                      isActive ? "text-red-400" : "text-red-600"
                    }`}>
                      Challenge
                    </h4>
                    <p className={`transition-colors duration-300 leading-relaxed ${
                      isActive ? "text-white font-medium opacity-90" : "text-black font-semibold opacity-85"
                    }`}>
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <h4 className={`font-extrabold mb-1 text-xs uppercase tracking-wider ${
                      isActive ? "text-green-400" : "text-green-700"
                    }`}>
                      Solution
                    </h4>
                    <p className={`transition-colors duration-300 leading-relaxed ${
                      isActive ? "text-white font-medium opacity-90" : "text-black font-semibold opacity-85"
                    }`}>
                      {study.solution}
                    </p>
                  </div>
                </div>

                {/* Results Section */}
                <div>
                  <h4 className={`font-extrabold mb-3 text-xs uppercase tracking-wider ${
                    isActive ? "text-yellow-400" : "text-amber-800"
                  }`}>
                    Results
                  </h4>

                  <div className="flex flex-wrap gap-2.5">
                    {study.results.map((result, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                          isActive
                            ? "bg-yellow-400 text-black border-yellow-500/20"
                            : "bg-black text-white border-yellow-500/20"
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ambient glow inside active card */}
                {isActive && (
                  <div className="absolute inset-0 opacity-100 transition duration-500 pointer-events-none bg-gradient-to-br from-yellow-500/10 via-transparent to-amber-500/5" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-display">
              120+
            </h3>
            <p className="text-black font-bold mt-2">Projects Delivered</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-display">
              95%
            </h3>
            <p className="text-black font-bold mt-2">Client Retention</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-display">
              5M+
            </h3>
            <p className="text-black font-bold mt-2">Monthly Reach</p>
          </div>

          <div className="rounded-2xl border border-neutral-400/20 bg-neutral-800/10 backdrop-blur-md p-6 text-center shadow-sm">
            <h3 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent font-display">
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