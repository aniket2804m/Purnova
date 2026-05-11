import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, Cpu, HeartPulse, Rocket, GraduationCap, Award } from "lucide-react";

const milestones = [
  {
    icon: GraduationCap,
    year: "2022",
    title: "Started B.E Computer Engineering",
    description: "Began B.E in Computer Engineering at Pune University, Pune. Built foundational knowledge in Python, statistics, and machine learning algorithms.",
  },
  {
    icon: Cpu,
    year: "2023",
    title: "Frontend & Frameworks",
    description: "Developed responsive and interactive web applications using React.js, Tailwind CSS, and modern JavaScript frameworks. Built reusable UI components, optimized frontend performance, and implemented scalable application structures for seamless user experiences.",
  },
  {
    icon: HeartPulse,
    year: "2024",
    title: "Backend & API Development",
    description: "Built scalable backend systems and REST APIs using Node.js, Express.js, and MongoDB. Implemented authentication, database management, API integrations, and modular server architectures for full-stack web applications.",
  },
  {
    icon: Rocket,
    year: "2025",
    title: "AI & ML",
    description:  "Explored AI and Machine Learning concepts including model training, data preprocessing, and predictive analytics using Python, TensorFlow, and Scikit-learn. Built intelligent applications and experimented with deep learning models for real-world problem solving.",
  },
  {
    icon: Award,
    year: "2026",
    title: "Graduation & Beyond",
    description: "Expected B.E graduation with CGPA 8.01. Continuing to advance in Generative AI, Transformers, and pushing the boundaries of AI research and applications.",
  },
];

const Timeline = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="experience" className="py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Journey</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Learning <span className="gradient-text">Timeline</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className={`relative flex items-start mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-border z-10 mt-6" />

                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className="glass rounded-xl p-6 hover:bg-card/60 transition-all">
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                      <div className="p-2 rounded-lg bg-primary/10">
                        <m.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-display text-primary tracking-wider">{m.year}</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-foreground mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
