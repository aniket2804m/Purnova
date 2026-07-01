import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  Award,
  Globe,
  BarChart3,
} from "lucide-react";
import { Tiles } from "./Tiles";

import myImage from "../img/logo.png";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: TrendingUp, value: "10M+", label: "Leads Generated" },
  { icon: Award, value: "7+", label: "Years Experience" },
  { icon: Globe, value: "50+", label: "Brands Scaled" },
];

const features = [
  {
    icon: Target,
    title: "Performance Marketing",
    desc: "ROI-focused campaigns that drive measurable growth.",
  },
  {
    icon: BarChart3,
    title: "SEO Optimization",
    desc: "Increase visibility and dominate search rankings.",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation",
    desc: "Convert visitors into qualified customers.",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden bg-[#0A0A0A] text-[#F5F0E8] font-montserrat border-t border-[#C9A84C]/10"
    >
      {/* Background Effects (Royal Gold Glows) */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C9A84C]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#C9A84C]/3 blur-[120px] pointer-events-none" />

      {/* Interactive Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 overflow-hidden flex justify-center items-center">
        <Tiles rows={50} cols={40} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pointer-events-none">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20 pointer-events-auto"
        >
          <span className="text-[#C9A84C] uppercase tracking-[0.25em] text-sm font-semibold font-montserrat">
            About Purnova Digital
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-[#F5F0E8] font-cinzel tracking-wide leading-tight">
            Transforming Brands Into
            <span className="block mt-2 text-[#C9A84C]">
              Digital Success Stories
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-base md:text-lg text-[#F5F0E8]/70 leading-relaxed font-light">
            At Purnova Digital, we help businesses grow through strategic digital marketing, SEO, social media management, performance advertising, and branding solutions that deliver measurable results.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="pointer-events-auto"
          >
            <div className="relative">

              {/* 3D Golden Circle */}
              <div className="w-[320px] h-[320px] mx-auto rounded-full bg-gradient-to-br from-[#C9A84C] via-[#C9A84C]/50 to-[#C9A84C] p-1 shadow-lg shadow-[#C9A84C]/10">
                <div className="w-full h-full rounded-full bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
                  <img
                    src={myImage}
                    alt="Purnova Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>

              {/* Floating Golden Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute top-10 -left-8 bg-[#101010]/95 border border-[#C9A84C]/30 backdrop-blur-xl p-4 rounded-none text-[#F5F0E8] font-medium shadow-[0_10px_25px_rgba(201,168,76,0.15)] font-cinzel text-xs tracking-widest uppercase"
              >
                🚀 Growth Marketing
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-10 -right-8 bg-[#101010]/95 border border-[#C9A84C]/30 backdrop-blur-xl p-4 rounded-none text-[#F5F0E8] font-medium shadow-[0_10px_25px_rgba(201,168,76,0.15)] font-cinzel text-xs tracking-widest uppercase"
              >
                📈 ROI Focused
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="pointer-events-auto"
          >
            <h3 className="text-3xl font-bold mb-6 text-[#F5F0E8] font-cinzel tracking-wide">
              Driving Growth Through Innovation
            </h3>

            <p className="text-[#F5F0E8]/70 mb-6 leading-relaxed font-light">
              We combine creativity, technology, and data-driven strategies to help businesses establish a powerful digital presence. Our team specializes in SEO, Social Media Marketing, Performance Ads, Website Development, and Brand Building.
            </p>

            <p className="text-[#F5F0E8]/70 leading-relaxed font-light">
              Every campaign is designed to maximize engagement, generate quality leads, and deliver sustainable business growth.
            </p>

            {/* Features list in dark/yellow/golden theme */}
            <div className="mt-10 space-y-4 font-montserrat">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  className="bg-[#101010]/60 border border-[#C9A84C]/10 hover:border-[#C9A84C] rounded-none p-5 flex gap-4 transition-all duration-300 shadow-md backdrop-blur-md hover:shadow-[0_10px_30px_rgba(201,168,76,0.08)]"
                >
                  <feature.icon className="w-8 h-8 text-[#C9A84C] flex-shrink-0" />

                  <div>
                    <h4 className="font-semibold text-lg text-[#F5F0E8] font-cinzel tracking-wide">
                      {feature.title}
                    </h4>

                    <p className="text-[#F5F0E8]/60 mt-1 text-sm font-light">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section with yellow/gold highlights and hover glow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 pointer-events-auto font-montserrat">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.03,
                y: -6,
              }}
              className="
                backdrop-blur-xl
                bg-[#101010]/60
                border border-[#C9A84C]/10 hover:border-[#C9A84C]
                rounded-none
                p-8
                text-center
                shadow-lg
                transition-all
                duration-300
                hover:shadow-[0_15px_35px_rgba(201,168,76,0.1)]
              "
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-[#C9A84C]" />

              <h3 className="text-4xl font-bold text-[#00A878]">
                {stat.value}
              </h3>

              <p className="text-[#F5F0E8]/70 mt-2 text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;