"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Brand Positioning",
    desc: "Define what makes your brand unique and unforgettable.",
    icon: "🎯",
  },
  {
    title: "Audience Research",
    desc: "Understand your ideal customers and market behavior.",
    icon: "👥",
  },
  {
    title: "Competitor Analysis",
    desc: "Identify opportunities and outperform competitors.",
    icon: "📊",
  },
  {
    title: "Brand Messaging",
    desc: "Create powerful messaging that connects and converts.",
    icon: "💬",
  },
  {
    title: "Voice & Tone",
    desc: "Build a consistent and recognizable brand personality.",
    icon: "🗣️",
  },
  {
    title: "Identity Direction",
    desc: "Strategic guidance for visual branding and design.",
    icon: "🎨",
  },
  {
    title: "Customer Experience",
    desc: "Craft meaningful experiences across every touchpoint.",
    icon: "✨",
  },
  {
    title: "Growth Strategy",
    desc: "Build a roadmap for long-term brand growth.",
    icon: "🚀",
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

  // const cardVariants = {
  //   hidden: { opacity: 0, y: 45 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: [0.16, 1, 0.3, 1], // premium easeOut
  //     },
  //   },
  // };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 text-neutral-900"
    >
      {/* Premium Background Dotted Overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60" />
      
      {/* Luxury Soft Golden Ambient Glows */}
      <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />

      {/* Floating Gold Particles (Micro-animations) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-500/20 blur-[0.5px] pointer-events-none hidden lg:block"
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
            className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-600 font-display"
          >
            OUR SERVICES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="overview-title mt-6 text-4xl font-extrabold uppercase leading-tight text-neutral-900 md:text-6xl font-cinzel tracking-wider"
          >
            Strategic Brand
            <span className="block mt-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent font-black">
              Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overview-subtitle mt-6 text-base text-neutral-600 md:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            We help businesses build memorable brands through
            positioning, messaging, customer insights, and
            long-term growth strategies.
          </motion.p>
        </div>

        {/* Services Grid with Framer Motion viewport stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              // variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.015,
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="service-card group relative overflow-hidden rounded-[2rem] border border-neutral-200/40 bg-white/30 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.03)] backdrop-blur-lg transition-all duration-500 hover:border-amber-500/30 hover:bg-white/60 hover:shadow-[0_20px_40px_rgba(245,158,11,0.06)]"
            >
              {/* Golden Hover Aura */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none">
                <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-amber-500/5 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-yellow-400/5 blur-3xl" />
              </div>

              <div className="relative z-10">
                {/* Golden Icon Container */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-2xl shadow-[0_8px_20px_rgba(245,158,11,0.03)] transition-all duration-500 group-hover:border-amber-500/40 group-hover:bg-gradient-to-br group-hover:from-amber-500/10 group-hover:to-yellow-500/10 group-hover:scale-105">
                  {service.icon}
                </div>

                <h3 className="mb-3 text-lg font-bold text-neutral-800 font-outfit tracking-wide group-hover:text-amber-600 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-neutral-600 font-medium">
                  {service.desc}
                </p>

                {/* Golden Bottom Border Line */}
                <div className="mt-6 h-[1.5px] w-0 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-500 group-hover:w-full" />
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
          <button className="rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-8 py-4 font-bold text-black shadow-[0_10px_30px_rgba(245,158,11,0.15)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(245,158,11,0.25)]">
            Start Your Brand Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}