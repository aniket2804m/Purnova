"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * BushareCase.tsx
 * -----------------------------------------------------------------------
 * Case study page for "Bushare" — Korean fashion brand, India.
 * Palette: White / Black / Yellow / Golden
 * Stack: TailwindCSS + Framer Motion + GSAP (ScrollTrigger) + Three.js
 *
 * Install:
 *   npm i framer-motion gsap three
 *
 * Tailwind config — extend with these custom colors if you want named
 * utility classes (optional, raw hex is used inline below too):
 *   colors: {
 *     ink: "#0A0A0A",
 *     paper: "#FAFAF7",
 *     gold: "#D4AF37",
 *     amber: "#F5C518",
 *   }
 * -----------------------------------------------------------------------
 */

/* -------------------------------------------------------------------- */
/*  DATA                                                                 */
/* -------------------------------------------------------------------- */

const STATS = [
  { value: "3.4×", label: "Revenue Growth" },
  { value: "+218%", label: "Organic Traffic" },
  { value: "3.8×", label: "Paid ROAS" },
  { value: "11.4K", label: "New Followers" },
  { value: "6,200+", label: "Email Subscribers" },
  { value: "2.9%", label: "Conversion Rate" },
  { value: "22%", label: "Cart Recovery" },
  { value: "38", label: "Page-1 Keywords" },
];

const PROBLEMS = [
  "No brand identity — inconsistent visuals, no clear positioning",
  "Website converting at 0.6% with 6-second mobile load times",
  "Instagram posts irregular, under 2,800 reach per post",
  "Paid ads had failed — no tracking, no audience strategy, poor creatives",
  "No email list. No retargeting. No way to bring customers back.",
];

const TIMELINE = [
  {
    range: "Months 1–2",
    title: "Foundation",
    detail: "Audience research, brand positioning, visual identity overhaul.",
  },
  {
    range: "Months 3–5",
    title: "Rebuild",
    detail: "Shopify rebuild, SEO setup, mobile speed from 6.2s → 2.1s.",
  },
  {
    range: "Months 4–8",
    title: "Content Engine",
    detail: "8–10 Reels/month across 3 content pillars.",
  },
  {
    range: "Months 6–14",
    title: "Scale",
    detail: "Meta campaigns launched, scaled to 3.8× blended ROAS.",
  },
  {
    range: "Throughout",
    title: "Retention",
    detail: "Email capture, WhatsApp broadcast, abandoned cart recovery.",
  },
];

/* -------------------------------------------------------------------- */
/*  THREE.JS HERO BACKGROUND — drifting golden particle field            */
/* -------------------------------------------------------------------- */

const ThreeHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Particle field
    const COUNT = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colorChoices = [
      new THREE.Color("#D4AF37"), // gold
      new THREE.Color("#F5C518"), // yellow
      new THREE.Color("#FFFFFF"), // white
    ];
    const colors = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frame = 0;
    let raf: number;
    const animate = () => {
      frame += 0.0025;
      points.rotation.y = frame;
      points.rotation.x = Math.sin(frame * 0.6) * 0.15;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 -z-10 opacity-70"
      aria-hidden="true"
    />
  );
};

/* -------------------------------------------------------------------- */
/*  STAT CARD                                                            */
/* -------------------------------------------------------------------- */

const StatCard: React.FC<{ value: string; label: string; index: number }> = ({
  value,
  label,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-black p-5 sm:p-6"
  >
    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#F5C518] to-[#D4AF37] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
    <p className="bg-gradient-to-r from-[#F5C518] to-[#D4AF37] bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
      {value}
    </p>
    <p className="mt-2 text-xs uppercase tracking-widest text-white/60 sm:text-sm">
      {label}
    </p>
  </motion.div>
);

/* -------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                       */
/* -------------------------------------------------------------------- */

const BushareCase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* GSAP — hero title letter reveal + section fades */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTitleRef.current) {
        const chars = heroTitleRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { y: 60, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.035,
            ease: "power4.out",
            delay: 0.2,
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".gsap-fade-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".gsap-line").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        className="char inline-block"
        key={`${char}-${i}`}
        style={{ display: char === " " ? "inline" : "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-x-hidden bg-[#0A0A0A] font-sans text-white selection:bg-[#F5C518] selection:text-black"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#F5C518] via-[#D4AF37] to-[#F5C518]"
        style={{ width: progressWidth }}
      />

      {/* ============================== HERO ============================== */}
      <section className="relative flex min-h-[70svh] w-full flex-col items-center justify-center overflow-hidden text-center sm:px-8">
        <ThreeHero />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/80 to-black" />

        <h1
          ref={heroTitleRef}
          className="max-w-5xl text-balance font-serif text-5xl font-bold leading-[1.05] tracking-tight text-white [perspective:600px] sm:text-7xl md:text-8xl"
        >
          {splitChars("Bushare")}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 max-w-2xl text-balance text-base text-white/70 sm:text-lg md:text-xl"
        >
          How a zero-visibility clothing brand became a{" "}
          <span className="bg-gradient-to-r from-[#F5C518] to-[#D4AF37] bg-clip-text font-semibold text-transparent">
            recognised Korean fashion label
          </span>{" "}
          with a full digital growth engine in 14 months.
        </motion.p>

       
      </section>

      {/* ============================ THE BRAND ============================ */}
      <section className="gsap-fade-section mx-auto text-center max-w-5xl px-5 py-5 sm:px-8 sm:py-5">
        <span className="text-3xl text-center uppercase tracking-[0.3em] text-[#F5C518]">
          The Brand
        </span>
        <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
          A niche product. No audience. No system.
        </h2>
        <div className="gsap-line mt-6 h-px w-full bg-gradient-to-r from-[#D4AF37] to-transparent" />
        <p className="mt-6 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
          Bushare sells Korean-inspired clothing to young, urban Indians aged
          18–32. The aesthetic was strong. The product was real. But when
          they came to us, almost nobody knew they existed.
        </p>
      </section>

      {/* =========================== THE PROBLEM ============================ */}
      <section className="gsap-fade-section text-center bg-white px-5 py-20 text-black sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <span className="text-3xl uppercase tracking-[0.3em] text-[#B8860B]">
            The Problem
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">
            Good product. Zero infrastructure.
          </h2>
          <div className="gsap-line mt-6 h-px w-full bg-gradient-to-r from-black to-transparent" />

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PROBLEMS.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-xl border border-black/10 bg-black/[0.02] p-4"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br from-[#F5C518] to-[#D4AF37]" />
                <span className="text-sm leading-relaxed text-black/80 sm:text-base">
                  {p}
                </span>
              </motion.li>
            ))}
          </ul>

          <p className="mt-10 text-base text-center font-medium italic text-black/60 sm:text-lg">
            Every rupee spent on marketing was a shot in the dark.
          </p>
        </div>
      </section>

      {/* ============================ WHAT WE DID ============================ */}
      <section className="gsap-fade-section text-center bg-black px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <span className="text-3xl uppercase tracking-[0.3em] text-[#F5C518]">
            What We Did
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
            Brand first. Scale second.
          </h2>
          <div className="gsap-line mt-6 h-px w-full bg-gradient-to-r from-[#D4AF37] to-transparent" />
          <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
            Most agencies would have turned on ads immediately. We didn't. We
            fixed the foundation brand, website, content system then
            activated paid media.
          </p>

          {/* Timeline */}
          <div className="relative text-center mt-14 space-y-6">
            <div className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[#F5C518] via-[#D4AF37]/50 to-transparent sm:block" />
            {TIMELINE.map((step, i) => (
              <motion.button
                key={step.title}
                type="button"
                onClick={() => setActiveStep(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex w-full items-start gap-4 rounded-xl p-3 text-left transition-colors hover:bg-white/[0.03] sm:gap-6 sm:p-4"
              >
                <span
                  className={`relative z-10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                    activeStep === i
                      ? "border-[#F5C518] bg-gradient-to-br from-[#F5C518] to-[#D4AF37] text-black"
                      : "border-white/20 bg-black text-white/50"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#F5C518]">
                    {step.range}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white sm:text-xl">
                    {step.title}
                  </p>
                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 overflow-hidden text-sm text-white/60 sm:text-base"
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ THE RESULTS ============================ */}
      <section className="gsap-fade-section relative overflow-hidden bg-gradient-to-b from-black to-[#0A0A0A] px-5 py-20 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F5C518]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <span className="text-3xl uppercase tracking-[0.3em] text-[#F5C518]">
            The Results
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">
            14 months. One brand. Measurable growth.
          </h2>
          <div className="gsap-line mt-6 h-px w-full bg-gradient-to-r from-[#D4AF37] to-transparent" />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {STATS.map((s, i) => (
              <StatCard key={s.label} value={s.value} label={s.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================== THE SHIFT ============================== */}
      <section className="gsap-fade-section bg-white px-5 py-20 text-black sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-3xl uppercase tracking-[0.3em] text-[#B8860B]">
            The Shift
          </span>
          <p className="mt-6 text-balance font-serif text-2xl font-medium leading-relaxed sm:text-3xl">
            Bushare went from unpredictable revenue to a self-running growth
            system. Organic search, social content, paid ads, and email
            automation now work together each layer feeding the next.
          </p>
          <p className="mt-6 text-base text-black/60 sm:text-lg">
            The brand has an identity. Customers come back without being
            chased.
          </p>
        </div>
      </section>

      {/* ============================== QUOTE ============================== */}
      <section className="gsap-fade-section relative overflow-hidden bg-black px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.12),transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl"
        >
          <span className="font-serif text-6xl leading-none text-[#D4AF37]/60 sm:text-8xl">
            &ldquo;
          </span>
          <p className="-mt-6 text-balance font-serif text-xl italic leading-relaxed text-white sm:text-3xl">
            I thought good clothes would sell themselves. They don&apos;t 
            not without the right brand and systems. Fourteen months later, I
            have a business that runs with structure and a brand people
            actually recognise.
          </p>
          <p className="mt-8 text-3xl uppercase tracking-[0.3em] text-[#F5C518]">
             Founder, Bushare
          </p>
        </motion.div>
      </section>

     
    </div>
  );
};

export default BushareCase;