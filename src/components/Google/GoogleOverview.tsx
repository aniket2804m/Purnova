"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Search Ads",
    desc: "We build Search campaigns that intercept buyers at peak intent. The right keyword, the right message, the right bid structured so every click has a reason to convert and every rupee spent has a measurable destination.",
    icon: "🔍︎",
  },
  {
    title: "Performance Max",
    desc: "We configure and manage Performance Max campaigns with the asset quality, audience signals, and conversion data that actually make the algorithm work in your favour. Most brands run PMax. Few run it right.",
    icon: "📈",
  },
  {
    title: "YouTube Ads",
    desc: "We create and place YouTube campaigns that build brand recall and drive measurable action. From skippable pre-rolls to non-skippable brand films structured around where your buyer is in the decision, not just where they're scrolling.",
    icon: "▶️",
  },
  {
    title: "Display Network",
    desc: "We run Display campaigns that keep your brand in the peripheral vision of the right audience. Precise placements, strong creative, and frequency logic that builds familiarity without burning budget on people who will never buy.",
    icon: "🌐",
  },
  {
    title: "Shopping Ads",
    desc: "We structure Shopping campaigns that win on visibility, relevance, and margin. Feed optimisation, bidding architecture, and product segmentation that drives qualified traffic not just high click volume that looks good in a report.",
    icon: "🛍️",
  },
  {
    title: "Retargeting",
    desc: "We build retargeting systems that re-engage warm audiences with the right message at the right stage of their decision. Sequential logic, creative variation, and frequency caps that recover lost revenue without damaging brand perception.",
    icon: "🎯",
  },
  {
    title: "Conversion Optimisation",
    desc: "We audit and rebuild the conversion layer landing pages, form logic, load speed, trust signals so the traffic you're already paying for starts performing. More conversions from the same budget is the fastest growth lever most businesses ignore.",
    icon: "📲",
  },
  {
    title: "ROI Reporting",
    desc: "We build reporting frameworks that translate campaign data into business decisions. Not vanity metrics. Not agency scorecards. Clear visibility into cost per acquisition, revenue attribution, and where the next rupee should go.. First-party data, Customer Match",
    icon: "📊",
  },
];

export default function Overview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Stagger variants for grid item container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] py-10 text-[#F5F0E8] border-t border-[#C9A84C]/10 font-montserrat"
    >
      {/* Premium Background Dotted Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#C9A84C_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-10" />
      
      {/* Luxury Soft Golden Ambient Glows */}
      <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-none bg-[#C9A84C]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-none bg-[#C9A84C]/1 blur-[100px] pointer-events-none" />

      {/* Floating Gold Particles (Micro-animations) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-none bg-[#C9A84C]/20 blur-[0.5px] pointer-events-none hidden lg:block"
          style={{
            top: `${20 + i * 15}%`,
            left: `${6 + (i % 2 === 0 ? Math.random() * 4 : 82 + Math.random() * 4)}%`,
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-12, 12, -12],
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex rounded-none border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#C9A84C] font-montserrat"
          >
            OUR SERVICES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="overview-title mt-6 text-4xl font-bold uppercase leading-tight text-[#F5F0E8] md:text-5xl font-cinzel tracking-wider"
          >
            Strategic Google
            <span className="block mt-2 text-[#C9A84C]">
              Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overview-subtitle mt-6 text-base text-[#F5F0E8]/70 md:text-lg max-w-2xl mx-auto leading-relaxed font-light font-montserrat"
          >
            We run high-impact search, shopping, retargeting, and performance ads that drive customer action and boost bottom-line ROI.
          </motion.p>
        </div>

        {/* Services Grid with Framer Motion viewport stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 font-montserrat"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.015,
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="service-card group relative overflow-hidden rounded-none border border-[#C9A84C]/15 bg-[#101010]/60 p-8 shadow-lg backdrop-blur-lg transition-all duration-500 hover:border-[#C9A84C] hover:bg-[#101010]/95 hover:shadow-[0_20px_40px_rgba(201,168,76,0.1)] select-none"
            >
              {/* Golden Hover Aura */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none">
                <div className="absolute -top-16 -right-16 h-36 w-36 rounded-none bg-[#C9A84C]/3 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-36 w-36 rounded-none bg-[#C9A84C]/1 blur-3xl" />
              </div>

              <div className="relative z-10">
                {/* Golden Icon Container */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none transition-all duration-300 backdrop-blur-md bg-[#0A0A0A] text-[#C9A84C] border border-[#C9A84C]/30 shadow-md group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] group-hover:border-[#C9A84C]/20 group-hover:shadow-lg group-hover:shadow-[#C9A84C]/20">
                  {service.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#F5F0E8] font-cinzel tracking-wide group-hover:text-[#C9A84C] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-[#F5F0E8]/70 font-light font-montserrat">
                  {service.desc}
                </p>

                {/* Golden Bottom Border Line */}
                <div className="mt-6 h-[1.5px] w-0 bg-gradient-to-r from-[#C9A84C] to-[#C9A84C] transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <button className="rounded-none bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#F5F0E8] hover:text-[#0A0A0A] px-8 py-4 font-semibold uppercase tracking-widest text-sm transition-all duration-300 border border-[#C9A84C]/20 shadow-[0_10px_30px_rgba(201,168,76,0.15)]">
            Start Your Brand Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}