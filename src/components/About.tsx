import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useNavigate } from "react-router-dom";

import myImage from "../img/logo.png";
import { ScrollReveal } from "./ScrollProgress";
import founderImage from "../img/role/rushi sir (1).png";
import ParticleBackground from "./ParticleBackground";

import {services} from "../components/data/about"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const circleRotate = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1.05, 0.93]);
  const floatY1 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="bg-[#050505] text-[#F5F0E8] overflow-hidden"
    >
      {/* HERO */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black" />
        <ParticleBackground color="#C9A84C" />

        <div className="relative z-10 text-center max-w-5xl">
          <ScrollReveal variant="fade-down" delay={0.1}>
            <span className="font-cinzel font-normal uppercase tracking-[0.3em] text-[#C9A84C] text-xl mb-10">
              About Purnova
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-down" delay={0.2}>
            <h1 className="mt-10 text-4xl sm:text-4xl md:text-8xl font-cormorant font-light leading-tight">
              Some Brands Are Seen
             
              <br />
              <span className="italic text-[#C9A84C] font-normal">
                 Great Brands Are Remembered
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.35}>
            <p className="max-w-3xl border-x-2 border-[#C9A84C]/60 px-5 mx-auto mt-10 text-[#F5F0E8]/70 leading-relaxed font-montserrat font-light text-base md:text-lg">
              We help businesses build brands people trust, remember, and choose. Through strategy, creativity, and marketing, we turn ambitious ideas into lasting growth
            </p>
          </ScrollReveal>

          <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(201, 168, 76, 0.4)",
              }}
              onClick={() => { navigate("/card");  // Navigate to Contact page
              }}
              className="mt-20 bg-[#C9A84C] hover:bg-[#F5F0E8] text-black px-6 py-3 sm:px-10 sm:py-4 font-montserrat font-semibold tracking-widest uppercase rounded-none transition-all duration-300 text-sm sm:text-base"
            >
              Explore Our Services
            </motion.button>
        </div>
      </div>

      {/* OUR STORY */}
     <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-32 border-t border-[#C9A84C]/10">
  <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
    <ScrollReveal variant="fade-right" delay={0.15}>
      <div>
        <h2 className="text-[#C9A84C] text-4xl sm:text-5xl md:text-7xl font-cormorant font-light leading-none">
          OUR
          <br />
          STORY
        </h2>
      </div>
    </ScrollReveal>

    <ScrollReveal variant="fade-left" delay={0.2}>
      <div className="space-y-8 text-[#F5F0E8]/75 text-lg leading-relaxed font-montserrat font-light">

        {/* Always Visible */}
       <p className="text-xl md:text-2xl font-light tracking-wide transition-all duration-500 hover:translate-x-2">
  <span className="text-[#C9A84C] font-semibold">Look up.</span>
</p>

<p className="leading-9 tracking-wide transition-all duration-500 hover:text-white">
  Every{" "}
  <span className="text-white font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full after:bg-[#C9A84C]">
    star
  </span>{" "}
  you see tonight was born long before you ever noticed it.
</p>

<p className="text-lg italic tracking-wide transition-all duration-500 hover:translate-x-2 border-x-4 border-[#C9A84C] px-4">
  <span className="text-[#C9A84C] ">
    Not in silence.
  </span>
</p>

<p className="text-lg leading-8 tracking-wide transition-all duration-500 hover:text-white">
  But in{" "}
  <span className="text-white font-semibold bg-gradient-to-r from-[#C9A84C] via-white to-[#C9A84C] bg-clip-text text-transparent">
    chaos.
  </span>
</p>


<div className="border-x-2 border-[#C9A84C]/60 px-6 space-y-2 transition-all duration-500 hover:border-[#C9A84C] hover:translate-x-2">
  <p className="text-[#F5F0E8]/75 hover:text-white transition-colors duration-300">
    In unimaginable pressure.
  </p>

  <p className="text-[#F5F0E8]/75 hover:text-white transition-colors duration-300">
    In violent collisions.
  </p>

  <p className="text-[#F5F0E8]/75 hover:text-white transition-colors duration-300">
   In the darkness where nothing seemed possible.
  </p>
</div>
        
          

           <p className="italic text-xl text-white/90 border-x-4 border-[#C9A84C] px-6">
  Only then...
  <br />
  did it become light.
</p>

           <p className="text-xl md:text-2xl text-white font-light tracking-wide transition-all duration-500 hover:text-[#C9A84C]">
  Brands are born the same way.
</p>

<div className="border-x-2 border-[#C9A84C]/60 px-6 space-y-2 transition-all duration-500 hover:border-[#C9A84C] hover:translate-x-2">
  <p className="text-[#F5F0E8]/75 hover:text-white transition-colors duration-300">
    Not from a <span className="text-[#C9A84C] font-medium">logo.</span>
  </p>

  <p className="text-[#F5F0E8]/75 hover:text-white transition-colors duration-300">
    Not from a <span className="text-[#C9A84C] font-medium">campaign.</span>
  </p>

  <p className="text-[#F5F0E8]/75 hover:text-white transition-colors duration-300">
    Not from a <span className="text-[#C9A84C] font-medium">viral post.</span>
  </p>
</div>

<p className="text-lg md:text-xl italic text-white/90 border-x-4 border-[#C9A84C] px-6 py-2 transition-all duration-500 hover:translate-x-2 hover:text-white">
  They are forged in difficult decisions.
</p>

{/* Hidden Until Read More */}
        {showMore && (
          <>

          <div className="space-y-6">

  <div className="border-x-2 border-[#C9A84C]/60 px-6 space-y-2 transition-all duration-500 hover:border-[#C9A84C] hover:translate-x-2">
    <p className="text-xl text-white font-light hover:text-[#C9A84C] transition-all duration-500">
      Late nights.
    </p>

    <p className="text-[#C9A84C] text-xl font-medium tracking-wide hover:translate-x-2 transition-all duration-500">
      Risk.
    </p>

    <p className="text-xl text-white font-light hover:text-[#C9A84C] transition-all duration-500">
      Reinvention.
    </p>
  </div>

  <p className="leading-9 tracking-wide hover:text-white transition-all duration-500">
    And the relentless belief that ordinary was never the destination.
  </p>

  <p className="text-xl text-white font-light hover:text-[#C9A84C] transition-all duration-500">
    The brands people remember aren't always the biggest.
  </p>

  <div className="border-x-2 border-[#C9A84C]/60 px-6 space-y-2 transition-all duration-500 hover:border-[#C9A84C] hover:translate-x-2">
    <p className="hover:text-white transition-all duration-300">
      They're the <span className="text-[#C9A84C] font-medium">clearest.</span>
    </p>

    <p className="hover:text-white transition-all duration-300">
      The <span className="text-[#C9A84C] font-medium">bravest.</span>
    </p>

    <p className="hover:text-white transition-all duration-300">
      The ones that know exactly who they are, even when the world doesn't.
    </p>
  </div>

  <div className="border-x-4 border-[#C9A84C] px-6 space-y-3">
    <p className="text-white">
      We find the <span className="text-[#C9A84C]">gravity</span> hidden inside ambitious businesses.
    </p>

    <p className="hover:text-white transition-all duration-300">
      We shape their identity.
    </p>

    <p className="hover:text-white transition-all duration-300">
      Give their story a voice.
    </p>

    <p className="hover:text-white transition-all duration-300">
      Build experiences that people don't just notice...
    </p>

    <p className="text-[#C9A84C] font-medium hover:translate-x-2 transition-all duration-300">
      They remember.
    </p>
  </div>

  <div className="space-y-2">
    <p className="hover:text-white transition-all duration-300">
      Because attention fades.
    </p>

    <p className="hover:text-white transition-all duration-300">
      Algorithms change.
    </p>

    <p className="leading-9 hover:text-white transition-all duration-300">
      But brands built on <span className="text-[#C9A84C]">clarity</span>, <span className="text-[#C9A84C]">purpose</span>, and <span className="text-[#C9A84C]">trust</span> become impossible to ignore.
    </p>
  </div>

  <p className="italic text-xl border-x-4 border-[#C9A84C] px-6 hover:translate-x-2 transition-all duration-500">
    Like the brightest stars,
  </p>

  <p className="text-2xl text-white font-light tracking-wide">
    They become impossible not to see.
  </p>

  <p className="bg-gradient-to-r from-[#C9A84C] via-[#F7E7A8] to-[#C9A84C] bg-clip-text text-transparent font-cinzel font-semibold tracking-[0.25em] uppercase text-lg pt-6">
    Some brands exist. The rare ones lead.
  </p>

</div>
          </>
        )}

        {/* Read More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-10 bg-[#C9A84C] text-black px-6 py-3 sm:px-10 sm:py-4 font-montserrat font-semibold tracking-widest uppercase rounded-none transition-all duration-300 text-sm sm:text-base"
        >
          {showMore ? "Read Less" : "Read More"}
        </button>

      </div>
    </ScrollReveal>
  </div>
</div>

      {/* FOUNDER SECTION */}
      <section className="relative py-16 md:py-32 bg-[#0A0A0A] overflow-hidden border-t border-[#C9A84C]/10">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A84C]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A84C]/5 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT CONTENT */}
            <ScrollReveal variant="fade-right" delay={0.15}>
              <div className="flex justify-center">
                <div className="relative">
                  {/* Gold Border */}
                  <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-[#C9A84C] via-transparent to-[#C9A84C] blur-xl opacity-40" />

                  <div className="relative border border-[#C9A84C]/30 p-3 rounded-[30px] bg-[#0A0A0A]">
                    <img
                      src={founderImage}
                      alt="Founder"
                      className="
                        w-full
                        max-w-[320px]
                        sm:max-w-[420px]
                        aspect-[4/5]
                        h-auto
                        object-cover
                        rounded-[24px]
                      "
                    />
                  </div>

                 
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT IMAGE */}
            <ScrollReveal variant="fade-left" delay={0.2}>
              <div>
  <span className="inline-block font-cinzel font-normal uppercase tracking-[0.35em] text-[#C9A84C] text-sm border border-[#C9A84C]/30 px-4 py-2 rounded-full">
    Founder & Visionary
  </span>

  <h2 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-cormorant font-light leading-tight text-[#F5F0E8]">
    Meet The
    <br />
    <span className="bg-gradient-to-r from-[#C9A84C] via-[#F7E7A8] to-[#C9A84C] bg-clip-text text-transparent">
      Founder
    </span>
  </h2>

  <div className="w-24 h-[2px] bg-gradient-to-r from-[#C9A84C] to-transparent my-8" />

  <h3 className="text-2xl sm:text-3xl font-cinzel font-semibold text-[#C9A84C] tracking-wide hover:tracking-[0.12em] transition-all duration-500">
    Rushikesh Hande
  </h3>

<div className="border-x-2 border-[#C9A84C]/60 px-5">
  <p className="mt-8 text-[#F5F0E8]/75 leading-9 tracking-wide font-montserrat font-light text-base sm:text-lg transition-all duration-500 hover:text-[#F5F0E8]">
  <span className="text-[#C9A84C] font-medium">Rushikesh</span> believes business growth is never accidental.
  Behind every enduring <span className="text-[#C9A84C] font-medium">brand</span> is a system of
  <span className="text-white font-medium"> deliberate decisions</span>,
  <span className="text-white font-medium"> disciplined execution</span>, and
  <span className="bg-gradient-to-r from-[#FFF4CC] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent font-semibold">
    {" "} unwavering consistency.
  </span>
</p>
</div>

 <p className="mt-6 text-[#F5F0E8]/75 leading-9 tracking-wide font-montserrat font-light transition-all duration-500 hover:text-[#F5F0E8]">
  <span className="text-[#C9A84C] font-medium">
    That philosophy
  </span>{" "}
  became{" "}
  <span className="bg-gradient-to-r from-[#FFF4CC] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent font-semibold">
    Purnova.
  </span>
</p>

<div className="border-x-2 border-[#C9A84C]/60 px-5">
  <p className="mt-6 text-[#F5F0E8]/75 leading-9 tracking-wide font-montserrat font-light transition-all duration-500 hover:text-[#F5F0E8]">
  Today, every
  <span className="text-[#C9A84C] font-medium"> strategy</span>,
  every
  <span className="text-[#C9A84C] font-medium"> campaign</span>, and every
  <span className="text-[#C9A84C] font-medium"> creative decision</span> is
  built with one purpose — to transform
  <span className="text-white font-medium"> ambitious businesses</span> into
  <span className="bg-gradient-to-r from-[#FFF4CC] via-[#C9A84C] to-[#A97C20] bg-clip-text text-transparent font-semibold">
    {" "}category-defining brands
  </span>{" "}
  that don't compete for attention —
  <span className="text-[#C9A84C] font-semibold">
    {" "}they command it.
  </span>
</p>
</div>

<div className="mt-12 relative">
  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-[#C9A84C] to-transparent"></div>

  <p className="pl-8 font-cormorant italic text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#F5F0E8]">
    <span className="text-[#C9A84C] text-4xl">“</span>

    Vision builds the future.

    <br />

    <span className="text-[#C9A84C]">
      Consistency makes people believe in it.
    </span>

    <span className="text-[#C9A84C] text-4xl">”</span>
  </p>
</div>

</div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* IMAGE + CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 border-t border-[#C9A84C]/10 font-montserrat">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal variant="fade-left" delay={0.2}>
           <div>
  {/* Section Title */}
  <h2 className="text-3xl sm:text-4xl md:text-6xl font-cormorant font-light leading-tight text-[#F5F0E8]">
    Where Ambitious Brands
    <br />
    <span className="bg-gradient-to-r from-[#C9A84C] via-[#F7E7A8] to-[#C9A84C] bg-clip-text text-transparent">
      Become Unforgettable
    </span>
  </h2>

  {/* Premium Divider */}
  <div className="w-24 h-[2px] bg-gradient-to-r from-[#C9A84C] to-transparent my-8" />

  {/* Story Paragraph */}
  <div className="border-x-2 border-[#C9A84C]/40 px-6">
    <p className="text-[#F5F0E8]/75 leading-9 tracking-wide font-montserrat font-light text-base md:text-lg transition-all duration-500 hover:text-[#F5F0E8]">
      <span className="text-[#C9A84C] font-medium">
        We believe
      </span>{" "}
      every ambitious business already has something worth remembering.
      Our job is to{" "}
      <span className="text-[#C9A84C]">uncover it</span>,{" "}
      <span className="text-[#C9A84C]">shape it</span>, and help the world
      see it.

      <br />
      <br />

      Through{" "}
      <span className="text-white font-medium">strategy</span>,{" "}
      <span className="text-white font-medium">branding</span>,{" "}
      <span className="text-white font-medium">marketing</span>, and{" "}
      <span className="text-white font-medium">digital experiences</span>,
      we turn bold ideas into brands people trust, remember, and choose.

      <br />
      <br />

      Because growth isn't about being louder.
      <br />
      It's about becoming{" "}
      <span className="bg-gradient-to-r from-[#C9A84C] via-[#F7E7A8] to-[#C9A84C] bg-clip-text text-transparent font-semibold">
        unforgettable.
      </span>
    </p>
  </div>
</div>
          </ScrollReveal>

          <ScrollReveal variant="fade-right" delay={0.2}>
            <motion.div
              // style={{ rotate: circleRotate, scale: circleScale }}
            >
              <div className="rounded-full p-2 sm:p-3 w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] mx-auto">
                <img
                  src={myImage}
                  alt=""
                  loading="lazy"
                  className="w-full h-full rounded-full object-contain bg-black"
                />
              </div>
            </motion.div>
          </ScrollReveal>

          
        </div>

      </div>

      {/* BIG STATEMENT */}
      <div className="py-20 md:py-40 px-4 sm:px-6 text-center border-t border-[#C9A84C]/10 bg-[#0A0A0A] relative">
        <ScrollReveal variant="fade-up" delay={0.15}>
          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-5xl lg:text-6xl max-w-6xl mx-auto leading-tight text-[#F5F0E8] font-light">
            CREATIVITY WITHOUT PURPOSE IS NOISE
            <br className="hidden sm:inline" />
            STRATEGY WITHOUT EXECUTION IS THEORY
          </h2>

          <p className="mt-8 text-[#F5F0E8]/70 text-sm sm:text-base md:text-lg font-montserrat font-light">
            Great brands are built where vision,
            creativity and performance meet
          </p>
        </ScrollReveal>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 border-t border-[#C9A84C]/10 overflow-hidden">
  <motion.div
    className="flex gap-5"
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      repeat: Infinity,
      repeatType: "loop",
      duration: 20,
      ease: "linear",
    }}
  >
    {[...services, ...services].map((service, idx) => (
      <div
        key={idx}
        className="min-w-[280px] border border-[#C9A84C]/20 p-6 sm:p-8 bg-[#101010]/30 hover:border-[#C9A84C] transition-all duration-300"
      >
        <span className="text-[#C9A84C] text-2xl font-cinzel font-semibold">
          {service.number}
        </span>

        <h3 className="mt-5 font-cinzel font-semibold text-lg text-[#F5F0E8]">
          {service.title}
        </h3>

        <p className="mt-4 text-sm text-[#F5F0E8]/60 leading-relaxed">
          {service.desc}
        </p>
      </div>
    ))}
  </motion.div>
</div>

      {/* CTA */}
      <div className="relative py-20 md:py-40 px-4 sm:px-6 text-center overflow-hidden border-t border-[#C9A84C]/10 bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#C9A84C_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 font-montserrat">
          <ScrollReveal variant="flip-up" delay={0.15}>
            <h2 className="font-cormorant text-2xl sm:text-4xl md:text-6xl font-light italic max-w-5xl mx-auto text-[#F5F0E8] leading-tight">
              "STOP CHASING THE MARKET.
              <br className="hidden sm:inline" />
              BECOME THE STANDARD"
            </h2>

            <p className="mt-8 text-[#F5F0E8]/70 max-w-2xl mx-auto font-montserrat font-light text-sm sm:text-base md:text-lg">
              The future belongs to brands brave enough
              to build something unforgettable
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(201, 168, 76, 0.4)",
              }}
              onClick={() => { navigate("/contact");  // Navigate to Contact page
              }}
              className="mt-10 bg-[#C9A84C] text-black px-6 py-3 sm:px-10 sm:py-4 font-montserrat font-semibold tracking-widest uppercase rounded-none transition-all duration-300 text-sm sm:text-base"
            >
              Start Your Brand Journey
            </motion.button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}