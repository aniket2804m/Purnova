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
      className="relative py-28 overflow-hidden bg-black text-white"
    >
      {/* Background Effects (Yellow & Amber Warm Glows) */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/10 blur-[120px] pointer-events-none" />

      {/* Interactive Background Grid */}
      <div className="absolute inset-0 z-0 opacity-40 overflow-hidden flex justify-center items-center">
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
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-semibold">
            About Purnova Digital
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-4 text-white">
            Transforming Brands Into
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
              {" "}
              Digital Success Stories
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-zinc-400">
            At Purnova Digital, we help businesses grow through strategic
            digital marketing, SEO, social media management, performance
            advertising, and branding solutions that deliver measurable
            results.
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
              <div className="w-[320px] h-[320px] mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-1">
  <div className="w-full h-full rounded-full bg-yellow overflow-hidden">
    <img
      src={myImage} // kiwa tumcha image path
      alt="Service"
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
                className="absolute top-10 -left-8 bg-black/60 border border-yellow-500/30 backdrop-blur-xl p-4 rounded-xl text-white font-medium shadow-[0_0_15px_rgba(245,196,0,0.15)]"
              >
                🚀 Growth Marketing
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-10 -right-8 bg-black/60 border border-yellow-500/30 backdrop-blur-xl p-4 rounded-xl text-white font-medium shadow-[0_0_15px_rgba(245,196,0,0.15)]"
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
            <h3 className="text-3xl font-bold mb-6 text-white">
              Driving Growth Through Innovation
            </h3>

            <p className="text-zinc-400 mb-6 leading-relaxed">
              We combine creativity, technology, and data-driven strategies
              to help businesses establish a powerful digital presence.
              Our team specializes in SEO, Social Media Marketing,
              Performance Ads, Website Development, and Brand Building.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              Every campaign is designed to maximize engagement, generate
              quality leads, and deliver sustainable business growth.
            </p>

            {/* Features list in dark/yellow/golden theme */}
            <div className="mt-10 space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.03,
                    rotateX: 3,
                  }}
                  className="bg-black/40 border border-white/5 hover:border-yellow-500/40 rounded-2xl p-5 flex gap-4 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md hover:shadow-[0_0_20px_rgba(245,196,0,0.1)]"
                >
                  <feature.icon className="w-10 h-10 text-yellow-500" />

                  <div>
                    <h4 className="font-bold text-lg text-white">
                      {feature.title}
                    </h4>

                    <p className="text-zinc-400 mt-1 text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section with yellow/gold highlights and hover glow */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 pointer-events-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              className="
                backdrop-blur-xl
                bg-black/40
                border border-white/10 hover:border-yellow-500/50
                rounded-3xl
                p-8
                text-center
                shadow-xl
                transition-all
                duration-300
                hover:shadow-[0_0_30px_-5px_rgba(245,196,0,0.2)]
              "
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-yellow-500" />

              <h3 className="text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                {stat.value}
              </h3>

              <p className="text-zinc-400 mt-2 font-medium">
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