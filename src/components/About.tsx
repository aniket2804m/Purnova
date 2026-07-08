import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Target,
  TrendingUp,
  BarChart3,
  Globe,
  Users,
  Award,
} from "lucide-react";

import myImage from "../img/logo.png";
import { ScrollReveal } from "./ScrollProgress";
import founderImage from "../img/role/rushi sir (1).png";
import ParticleBackground from "./ParticleBackground";

const services = [
  {
    number: "01",
    title: "Performance Marketing",
    desc: "ROI-focused campaigns that drive measurable growth.",
  },
  {
    number: "02",
    title: "SEO Optimization",
    desc: "Increase visibility and dominate search rankings.",
  },
  {
    number: "03",
    title: "Lead Generation",
    desc: "Convert visitors into qualified customers.",
  },
  {
    number: "04",
    title: "Website Development",
    desc: "Websites that turn visitors into customers.",
  },
  {
    number: "05",
    title: "Brand Strategy",
    desc: "Build memorable brands that stand apart.",
  },
];

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Happy Clients",
  },
  {
    icon: TrendingUp,
    value: "10M+",
    label: "Leads Generated",
  },
  {
    icon: Award,
    value: "3+",
    label: "Years Experience",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Brands Scaled",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black" />
        <ParticleBackground color="#C9A84C" />

        <div className="relative z-10 text-center max-w-5xl">
          <ScrollReveal variant="fade-down" delay={0.1}>
            <span className="font-cinzel font-normal uppercase tracking-[0.3em] text-[#C9A84C] text-sm">
              About Purnova
            </span>
          </ScrollReveal>

          <ScrollReveal variant="fade-down" delay={0.2}>
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-7xl font-cormorant font-light leading-tight">
              Transforming Brands.
              <br />
              Creating Digital
              <br />
              <span className="italic text-[#C9A84C] font-normal">
                Success Stories.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.35}>
            <p className="max-w-2xl mx-auto mt-8 text-[#F5F0E8]/70 leading-relaxed font-montserrat font-light text-base md:text-lg">
              We help businesses grow through strategic marketing,
              SEO, branding, performance advertising and digital
              experiences designed for measurable results.
            </p>
          </ScrollReveal>
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
              <p>
                Look closely at the night sky.
              </p>

              <p>
                The brightest stars are not born from stillness. They are born from collision, pressure, transformation, and the courage to shine despite the darkness around them.
              </p>

              <p>
                PURNOVA was born the same way.
              </p>

              <p>
                What appeared to be an ending became the beginning of something stronger — a clearer vision, a sharper purpose, and a relentless commitment to creating work that leaves a mark.
              </p>

              <p>We believe that every remarkable brand begins with a moment of change. A moment when ordinary is no longer enough. A moment when growth demands reinvention. A moment when ambition refuses to stay hidden.</p>

              <p>That belief became PURNOVA.</p>

              <p>Today, we help businesses transform their potential into presence, their ideas into identity, and their vision into impact.</p>

              <p>We combine strategy, design, storytelling, technology, and performance to create brands that don't simply exist—they endure.</p>

              <p>Because in a world crowded with noise, visibility is no longer enough.</p>
              <p className="text-[#C9A84C] font-cinzel font-semibold tracking-wider uppercase text-base">
                Some brands exist. The rare ones lead.
              </p>
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
                <span className="font-cinzel font-normal uppercase tracking-[0.3em] text-[#C9A84C] text-sm">
                  Founder & Visionary
                </span>

                <h2 className="mt-5 text-4xl sm:text-5xl md:text-7xl font-cormorant font-light leading-tight text-[#F5F0E8]">
                  Meet The
                  <br />
                  Founder
                </h2>

                <div className="w-20 h-[2px] bg-[#C9A84C] my-8" />

                <h3 className="text-2xl sm:text-3xl font-cinzel font-semibold text-[#C9A84C]">
                  Rushikesh Hande
                </h3>

                <p className="mt-6 text-[#F5F0E8]/70 leading-relaxed font-montserrat font-light text-base sm:text-lg">
                  At Purnova Digital, our vision has always been simple:
                  help ambitious businesses build a brand that people
                  remember.
                </p>

                <p className="mt-5 text-[#F5F0E8]/70 leading-relaxed font-montserrat font-light">
                  Founded with a passion for strategy, creativity and
                  measurable growth, Purnova has evolved into a digital
                  growth partner for businesses looking to dominate
                  their market.
                </p>

                <p className="mt-5 text-[#F5F0E8]/70 leading-relaxed font-montserrat font-light">
                  Every campaign, every design, and every strategy is
                  built around one goal — creating meaningful business
                  growth while building a powerful brand presence.
                </p>

                {/* Signature Quote */}
                <div className="mt-10 border-l-2 border-[#C9A84C] pl-6 font-cormorant">
                  <p className="font-light italic text-lg sm:text-xl md:text-2xl text-[#F5F0E8]">
                    "Great brands aren't built by chance.
                    They're built by vision, execution,
                    and relentless consistency."
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
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-cormorant font-light leading-tight text-[#F5F0E8]">
                Where Ambitious Brands
                <br />
                Become Unforgettable
              </h2>

              <div className="w-20 h-[2px] bg-[#C9A84C] my-8" />

              <p className="text-[#F5F0E8]/70 leading-relaxed font-montserrat font-light text-base md:text-lg">
                Every strategy we develop, every identity we design,
                and every experience we create is built to move your
                brand from recognition to remembrance.
              </p>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-24">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} variant="scale-up" delay={0.08 * i}>
              <motion.div
                whileHover={{ y: -5 }}
                className="border border-[#C9A84C]/20 p-4 sm:p-6 rounded-none bg-[#101010]/30 hover:border-[#C9A84C] transition-all duration-300 shadow-md"
              >
                <stat.icon className="text-[#C9A84C] mb-4 w-6 h-6 sm:w-8 sm:h-8" />

                <h3 className="text-2xl sm:text-3xl font-cinzel font-semibold text-[#00A878]">
                  {stat.value}
                </h3>

                <p className="text-xs sm:text-sm text-[#F5F0E8]/60 mt-1 font-montserrat font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* BIG STATEMENT */}
      <div className="py-20 md:py-40 px-4 sm:px-6 text-center border-t border-[#C9A84C]/10 bg-[#0A0A0A] relative">
        <ScrollReveal variant="fade-up" delay={0.15}>
          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-5xl lg:text-6xl max-w-6xl mx-auto leading-tight text-[#F5F0E8] font-light">
            CREATIVITY WITHOUT PURPOSE IS NOISE.
            <br className="hidden sm:inline" />
            STRATEGY WITHOUT EXECUTION IS THEORY.
          </h2>

          <p className="mt-8 text-[#F5F0E8]/70 text-sm sm:text-base md:text-lg font-montserrat font-light">
            Great brands are built where vision,
            creativity and performance meet.
          </p>
        </ScrollReveal>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 border-t border-[#C9A84C]/10 font-montserrat">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          {services.map((service, idx) => (
            <ScrollReveal key={service.number} variant="fade-up" delay={0.08 * idx}>
              <motion.div
                whileHover={{
                  y: -8,
                  borderColor: "#C9A84C",
                }}
                className="border border-[#C9A84C]/20 p-6 sm:p-8 min-h-[220px] bg-[#101010]/30 transition-all duration-300 rounded-none hover:shadow-[0_10px_30px_rgba(201,168,76,0.08)]"
              >
                <span className="text-[#C9A84C] text-2xl font-cinzel font-semibold">
                  {service.number}
                </span>

                <h3 className="mt-5 font-cinzel font-semibold text-lg text-[#F5F0E8]">
                  {service.title}
                </h3>

                <p className="mt-4 text-sm text-[#F5F0E8]/60 font-montserrat font-light leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative py-20 md:py-40 px-4 sm:px-6 text-center overflow-hidden border-t border-[#C9A84C]/10 bg-[#0A0A0A]">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#C9A84C_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 font-montserrat">
          <ScrollReveal variant="flip-up" delay={0.15}>
            <h2 className="font-cormorant text-2xl sm:text-4xl md:text-6xl font-light italic max-w-5xl mx-auto text-[#F5F0E8] leading-tight">
              "STOP CHASING THE MARKET.
              <br className="hidden sm:inline" />
              BECOME THE STANDARD."
            </h2>

            <p className="mt-8 text-[#F5F0E8]/70 max-w-2xl mx-auto font-montserrat font-light text-sm sm:text-base md:text-lg">
              The future belongs to brands brave enough
              to build something unforgettable.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(201, 168, 76, 0.4)",
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