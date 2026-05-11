import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Brain, GraduationCap, FolderGit2, Award, BookOpen } from "lucide-react";

const About = () => {
  const { ref, isVisible } = useScrollReveal();

  const stats = [
    { icon: FolderGit2, label: "GitHub Repos", value: "28+" },
    { icon: Award, label: "Certifications", value: "4+" },
    { icon: BookOpen, label: "Publication", value: "1" },
    { icon: Brain, label: "AI Projects", value: "10+" },
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Passionate About <span className="gradient-text">Ai Full Stack Developer</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <Brain className="w-20 h-20 text-primary" />
              </div>
            </div>
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass rounded-xl p-5 mt-8 text-center"
            >
              <GraduationCap className="w-6 h-6 text-accent mx-auto mb-2" />
              <h4 className="font-display font-bold text-foreground text-sm">B.E — Computer Engineering</h4>
              <p className="text-xs text-muted-foreground mt-1">Savitribai Phule Pune University, Pune</p>
              <p className="text-xs text-primary font-display mt-1">CGPA: 8.2 · SGPA: 10</p>
              <p className="text-xs text-muted-foreground">2022 — 2026 (Expected)</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground leading-relaxed text-lg">
              I'm <span className="text-foreground font-semibold">Aniket Tanaji Suryawanshi</span>, a final-year B.E 
              student in Computer Engineering at Savitribai Phule Pune University, Pune, with a strong passion 
              for building intelligent systems that solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From enterprise-grade RAG systems like <span className="text-foreground">MetIQ</span> 
              I have Built Ai powered Application for detecting Fake Institution and Fake Cerificate
              detection models achieving 94% accuracy, I specialize in deep learning, computer vision, and NLP. I have exprence in developing and deploying Ai Full Stack applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Certified in Data Science, and AWS Cloud — I combine cutting-edge 
              AI/ML expertise with production-ready engineering skills to deliver impactful solutions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold font-display text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
