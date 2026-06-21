import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  Award,
  Globe,
  BarChart3,
} from "lucide-react";

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
      className="relative py-28 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm">
            About Purnova Digital
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Transforming Brands Into
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}
              Digital Success Stories
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-muted-foreground">
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
          >
            <div className="relative">

              {/* 3D Circle */}
              <div className="w-[320px] h-[320px] mx-auto rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center backdrop-blur-xl">
                  <TrendingUp className="w-24 h-24 text-white" />
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute top-10 -left-8 glass p-4 rounded-xl"
              >
                🚀 Growth Marketing
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-10 -right-8 glass p-4 rounded-xl"
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
          >
            <h3 className="text-3xl font-bold mb-6">
              Driving Growth Through Innovation
            </h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              We combine creativity, technology, and data-driven strategies
              to help businesses establish a powerful digital presence.
              Our team specializes in SEO, Social Media Marketing,
              Performance Ads, Website Development, and Brand Building.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Every campaign is designed to maximize engagement, generate
              quality leads, and deliver sustainable business growth.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.03,
                    rotateX: 3,
                  }}
                  className="glass rounded-2xl p-5 flex gap-4"
                >
                  <feature.icon className="w-10 h-10 text-primary" />

                  <div>
                    <h4 className="font-bold text-lg">
                      {feature.title}
                    </h4>

                    <p className="text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              className="
                backdrop-blur-xl
                bg-white/10
                border border-white/20
                rounded-3xl
                p-8
                text-center
                shadow-xl
              "
            >
              <stat.icon className="w-10 h-10 mx-auto mb-4 text-primary" />

              <h3 className="text-4xl font-bold">
                {stat.value}
              </h3>

              <p className="text-muted-foreground mt-2">
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