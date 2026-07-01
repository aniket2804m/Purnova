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
 * PuneVoicesCase.tsx
 * -----------------------------------------------------------------------
 * Case study page for "Pune Voices" — Podcast & Digital Media, Pune.
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

const META = [
  { label: "Industry", value: "Podcast & Digital Media" },
  { label: "Location", value: "Pune, Maharashtra" },
  { label: "Engagement", value: "2+ Years · Ongoing" },
  { label: "Services", value: "Brand, Content & Social" },
];

const CHALLENGES = [
  "No defined niche — topics shifted every week, leaving audiences with no reason to stay.",
  "Invisible in a crowded space — no distinct look, tone, or positioning to stand out.",
  "No social media system — posts went up when ready, not when they'd perform.",
  "Host had no personal brand — no second growth engine beyond the show itself.",
];

const PHASES = [
  {
    n: "01",
    title: "Find the Niche",
    detail:
      "Audited every episode, mapped competitor gaps, and locked Pune Voices into one clear space: the city's civic conversation.",
  },
  {
    n: "02",
    title: "Build the Brand",
    detail:
      "New visual identity — colour palette, thumbnails, reel covers, episode artwork — built to communicate credibility at a glance.",
  },
  {
    n: "03",
    title: "Grow the Audience",
    detail:
      "Full content system: long-form episodes, short clips, reels — each crafted for platform behaviour. Weekly review kept it improving.",
  },
  {
    n: "04",
    title: "Build the Host",
    detail:
      "Developed the host's personal brand in parallel — a second growth engine that fed listeners directly back to the show.",
  },
];

const OUTCOMES = [
  { value: "300%+", label: "Social Reach Growth", note: "Organic reach grew through reels and content repurposing — no paid promotion required." },
  { value: "2×/week", label: "Content Published", note: "Consistent cadence replaced irregular, reactive posting." },
  { value: "Defined", label: "Niche & Positioning", note: "Pune Voices is now recognisable — guests and audiences understand exactly what it stands for." },
  { value: "Active", label: "Host Personal Brand", note: "A second growth engine, feeding listeners back to the show every week." },
  { value: "Higher", label: "Audience Engagement", note: "Passive viewers became an active community — more comments, saves, and shares." },
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

    // Particle field — evokes soundwave dots
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
/*  OUTCOME CARD                                                         */
/* -------------------------------------------------------------------- */

const OutcomeCard: React.FC<{
  value: string;
  label: string;
  note: string;
  index: number;
}> = ({ value, label, note, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-none border border-[#C9A84C]/15 bg-[#101010]/80 p-6 hover:border-[#C9A84C] transition-all duration-300"
  >
    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-none bg-[#C9A84C]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
    <p className="text-3xl font-bold tracking-tight text-[#00A878] sm:text-4xl font-montserrat">
      {value}
    </p>
    <p className="mt-2 text-xs uppercase tracking-widest text-[#F5F0E8]/60 sm:text-sm font-montserrat font-medium">
      {label}
    </p>
    <p className="mt-3 text-sm leading-relaxed text-[#F5F0E8]/50 font-light font-montserrat">{note}</p>
  </motion.div>
);

/* -------------------------------------------------------------------- */
/*  MAIN COMPONENT                                                       */
/* -------------------------------------------------------------------- */

const PuneVoicesCase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [activePhase, setActivePhase] = useState(0);

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
      className="relative min-h-screen w-full overflow-x-hidden bg-[#0A0A0A] font-montserrat text-[#F5F0E8] selection:bg-[#C9A84C] selection:text-[#0A0A0A]"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-[#C9A84C] via-[#C9A84C]/80 to-[#C9A84C]"
        style={{ width: progressWidth }}
      />

      {/* ============================== HERO ============================== */}
      <section className="relative flex min-h-[80vh] mt-10 w-full flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-5">
        <ThreeHero />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]" />

        <h1
          ref={heroTitleRef}
          className="max-w-5xl text-balance font-cinzel text-5xl font-bold leading-[1.05] tracking-tight text-[#F5F0E8] [perspective:600px] sm:text-7xl md:text-8xl"
        >
          {splitChars("Pune Voices")}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 max-w-2xl text-balance text-base text-[#F5F0E8]/70 sm:text-lg md:text-xl font-light"
        >
          A city had{" "}
          <span className="text-[#C9A84C] font-semibold">
            stories
          </span>
          . It just needed someone to tell them the right way.
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 font-montserrat"
        >
          {META.map((m) => (
            <div
              key={m.label}
              className="rounded-none border border-[#C9A84C]/15 bg-[#101010]/50 px-3 py-4 backdrop-blur-sm"
            >
              <p className="text-[9px] uppercase tracking-widest text-[#C9A84C] font-semibold">
                {m.label}
              </p>
              <p className="mt-1 text-xs font-semibold text-[#F5F0E8]/90 sm:text-sm">
                {m.value}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ========================= 01 · CLIENT OVERVIEW ========================= */}
      <section className="gsap-fade-section text-center mx-auto max-w-5xl px-5 py-5 sm:px-8 sm:py-5 border-t border-[#C9A84C]/10">
        <span className="text-2xl uppercase tracking-[0.25em] text-[#C9A84C] font-cinzel font-semibold">
         Client Overview
        </span>
        <h2 className="mt-4 font-cinzel text-3xl font-bold leading-tight text-[#F5F0E8] sm:text-5xl">
          Pune Has a Problem. Now It Has a Podcast.
        </h2>
        <div className="gsap-line mt-6 h-[1px] w-full bg-gradient-to-r from-[#C9A84C]/30 to-transparent" />
        <p className="mt-6 text-pretty text-center text-base leading-relaxed text-[#F5F0E8]/70 sm:text-lg font-light">
          Pune Voices is a podcast built around one idea: Punekars deserve a serious platform for the issues that shape their city. Not lifestyle content, not national news — civic problems, urban identity, and real local conversation.
        </p>
        <p className="mt-4 text-pretty text-base leading-relaxed text-[#F5F0E8]/70 sm:text-lg font-light">
          Purnova has managed Pune Voices end-to-end for over two years — brand, content, social media, and the host's personal presence. This is how a promising idea became a recognised name.
        </p>
      </section>

      {/* ========================== 02 · THE CHALLENGE =========================== */}
      <section className="gsap-fade-section bg-[#101010] text-center px-5 py-20 text-[#F5F0E8] sm:px-8 sm:py-28 border-y border-[#C9A84C]/15">
        <div className="mx-auto text-center max-w-5xl">
          <span className="text-2xl uppercase tracking-[0.25em] text-[#C9A84C] font-cinzel font-semibold">
            The Challenge
          </span>
          <h2 className="mt-4 font-cinzel text-3xl text-center font-bold leading-tight sm:text-5xl text-[#F5F0E8]">
            Good Content. Wrong Direction.
          </h2>
          <div className="gsap-line mt-6 h-[1px] w-full bg-gradient-to-r from-[#C9A84C]/30 to-transparent" />

          <p className="mt-6 text-base text-center leading-relaxed text-[#F5F0E8]/70 sm:text-lg font-light">
            The passion was real. The effort was consistent. But without a clear identity, even good content stays invisible.
          </p>
          <p className="mt-4 font-cinzel text-lg italic leading-relaxed text-[#C9A84C]/80 sm:text-xl">
            The podcast had a voice. It just didn't know who it was speaking to.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CHALLENGES.map((c, i) => (
              <motion.li
                key={c}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-none border border-[#C9A84C]/15 bg-[#0A0A0A]/60 p-4"
              >
                <span className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-none bg-[#C9A84C]" />
                <span className="text-sm leading-relaxed text-[#F5F0E8]/80 sm:text-base font-light text-left">
                  {c}
                </span>
              </motion.li>
            ))}
          </ul>

          <p className="mt-10 text-base font-medium italic text-[#F5F0E8]/60 sm:text-lg">
            The show needed a strategy before it needed more content.
          </p>
        </div>
      </section>

      {/* ====================== 03 · STRATEGY & EXECUTION ======================= */}
      <section className="gsap-fade-section text-center bg-[#0A0A0A] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <span className="text-2xl uppercase tracking-[0.25em] text-[#C9A84C] font-cinzel font-semibold">
            Strategy &amp; Execution
          </span>
          <h2 className="mt-4 font-cinzel text-3xl font-bold leading-tight text-[#F5F0E8] sm:text-5xl">
            Three Phases. One Clear Build.
          </h2>
          <div className="gsap-line mt-6 h-[1px] w-full bg-gradient-to-r from-[#C9A84C]/30 to-transparent" />

          {/* Phases */}
          <div className="relative mt-14 space-y-6">
            <div className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-[#C9A84C] via-[#C9A84C]/30 to-transparent sm:block" />
            {PHASES.map((phase, i) => (
              <motion.button
                key={phase.n}
                type="button"
                onClick={() => setActivePhase(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex w-full items-start gap-4 rounded-none p-3 text-left transition-colors hover:bg-[#101010]/80 sm:gap-6 sm:p-4"
              >
                <span
                  className={`relative z-10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none border text-xs font-bold transition-colors ${
                    activePhase === i
                      ? "border-[#C9A84C] bg-[#C9A84C] text-[#0A0A0A]"
                      : "border-[#C9A84C]/20 bg-[#0A0A0A] text-[#F5F0E8]/50"
                  }`}
                >
                  {phase.n}
                </span>
                <div>
                  <p className="text-lg font-semibold text-[#F5F0E8] sm:text-xl font-cinzel">
                    {phase.title}
                  </p>
                  <AnimatePresence>
                    {activePhase === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 overflow-hidden text-sm text-[#F5F0E8]/70 sm:text-base font-light"
                      >
                        {phase.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== 04 · KEY OUTCOMES =========================== */}
      <section className="gsap-fade-section text-center relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#101010] px-5 py-20 sm:px-8 sm:py-28 border-t border-[#C9A84C]/10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-none bg-[#C9A84C]/3 blur-[120px]" />
        <div className="relative mx-auto max-w-5xl">
          <span className="text-2xl uppercase tracking-[0.25em] text-[#C9A84C] font-cinzel font-semibold">
            Key Outcomes
          </span>
          <h2 className="mt-4 font-cinzel text-3xl font-bold leading-tight text-[#F5F0E8] sm:text-5xl">
            What 24 Months of Consistent Work Looks Like.
          </h2>
          <div className="gsap-line mt-6 h-[1px] w-full bg-gradient-to-r from-[#C9A84C]/30 to-transparent" />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((o, i) => (
              <OutcomeCard
                key={o.label}
                value={o.value}
                label={o.label}
                note={o.note}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================= 05 · BUSINESS IMPACT ========================== */}
      <section className="gsap-fade-section bg-[#101010] px-5 py-20 text-[#F5F0E8] sm:px-8 sm:py-28 border-y border-[#C9A84C]/15">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-2xl uppercase tracking-[0.25em] text-[#C9A84C] font-cinzel font-semibold">
            Business Impact
          </span>
          <h2 className="mt-4 font-cinzel text-3xl font-bold leading-tight sm:text-5xl text-[#F5F0E8]">
            Beyond the Numbers.
          </h2>
          <p className="mt-6 text-balance text-base leading-relaxed text-[#F5F0E8]/70 sm:text-lg font-light">
            Pune Voices went from a creative experiment to a structured media property — defined identity, repeatable systems, two growth channels running in parallel.
          </p>
          <p className="mt-6 text-balance font-cinzel text-xl italic leading-relaxed text-[#C9A84C]/85 sm:text-2xl">
            A niche is not a limitation. It is a competitive advantage. Pune Voices owns a space no one else in the city occupies the same way.
          </p>
          <p className="mt-6 text-balance text-base leading-relaxed text-[#F5F0E8]/70 sm:text-lg font-light">
            The host's personal brand created audience loyalty that no single episode can build alone. People show up because they trust the person — not just the topic. That relationship compounds over time and is very hard to lose.
          </p>
        </div>
      </section>

      {/* ============================== QUOTE ============================== */}
      <section className="gsap-fade-section relative overflow-hidden bg-[#0A0A0A] px-5 py-24 text-center sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.06),transparent_60%)]" />
        <span className="relative text-2xl uppercase tracking-[0.25em] text-[#C9A84C] font-cinzel font-semibold">
         Client Testimonial
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mt-6 max-w-3xl animate-fade-in"
        >
          <span className="font-cinzel text-6xl leading-none text-[#C9A84C]/30 sm:text-8xl select-none">
            &ldquo;
          </span>
          <p className="-mt-6 text-balance font-cinzel text-xl italic leading-relaxed text-[#F5F0E8] sm:text-3xl">
            We had energy and ideas, but no real direction. Purnova helped us understand what Pune Voices actually was — and what it could be. Once that clarity landed, everything moved faster. Our reach grew, our audience engaged genuinely, and people in Pune started recognising us by name. The personal brand work surprised us the most — it turned out to be one of the most impactful parts of the whole process.
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.2em] text-[#C9A84C] font-cinzel font-semibold">
            — Host &amp; Founder, Pune Voices
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default PuneVoicesCase;