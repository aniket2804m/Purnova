import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const skillCategories = [
  {
    name: "Programming",
    skills: [
      { name: "Javascript", level: 95 },
      { name: "Python", level: 80 },
      { name: "SQL", level: 82 },
      { name: "Node.js", level: 70 },
      { name: "JavaScript", level: 75 },
    ],
  },
  {
    name: "AI & Machine Learning",
    skills: [
      { name: "Deep Learning", level: 90 },
      { name: "Machine Learning", level: 92 },
      { name: "Computer Vision", level: 88 },
      { name: "NLP", level: 82 },
      { name: "Generative AI", level: 80 },
    ],
  },
  {
    name: "Frameworks & Tools",
    skills: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "Keras", level: 88 },
      { name: "OpenCV", level: 85 },
      { name: "Node.js", level: 78 },
    ],
  },
  {
    name: "Data & Analytics",
    skills: [
      { name: "NumPy/Pandas", level: 92 },
      { name: "Scikit-Learn", level: 88 },
      { name: "Power BI", level: 75 },
      { name: "Tableau", level: 72 },
      { name: "Elasticsearch", level: 76 },
    ],
  },
];

const techBadges = [
  "Python", "C", "C++", "SQL", "R", "HTML", "CSS", "JavaScript",
  "Node.js", "PyTorch", "OpenCV", "Streamlit",
  "NumPy", "Pandas", "Scikit-Learn", "Matplotlib",
  "CNN", "RNN", "LSTM", "Transformers", "Transfer Learning", "YOLOv8",
  "NLP", "Generative AI", "RAG", "Grad-CAM",
  "Git", "GitHub", "Docker", "Jupyter", "MySQL", "Elasticsearch",
  "Power BI", "Tableau", "Power Apps", "n8n", "REST API", "WebSocket",
];

const RadialProgress = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const { ref, isVisible } = useScrollReveal(0.3);
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
          <motion.circle
            cx="50" cy="50" r="45" fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isVisible ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold font-display text-foreground">{level}%</span>
        </div>
      </div>
      <p className="mt-2 text-xs font-medium text-muted-foreground text-center">{name}</p>
    </motion.div>
  );
};

const Skills = () => {
  const { ref, isVisible } = useScrollReveal();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-display font-medium transition-all ${
                activeTab === i
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground glow-border"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Radial Skills for active category */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-5 gap-6 mb-16 justify-items-center"
        >
          {skillCategories[activeTab].skills.map((skill, i) => (
            <RadialProgress key={skill.name} name={skill.name} level={skill.level} delay={i * 0.08} />
          ))}
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {techBadges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.02 }}
              className="px-3.5 py-1.5 glass rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-default"
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
