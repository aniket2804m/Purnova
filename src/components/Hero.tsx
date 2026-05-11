import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleBackground from "./ParticleBackground";

const roles = [
  "Javascript Developer",
  "AI Engineer",
  "Full Stack Developer",
  "AI Full Stack Developer",
];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-muted-foreground text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-display">
            AI & ML And Full Stack Developer
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display mb-6">
            <span className="gradient-text">Aniket</span>
            <br />
            <span className="text-foreground">Suryawanshi</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2 max-w-2xl mx-auto">
            Building intelligent AI systems and real-world machine learning solutions.
          </p>
          <div className="h-8 mb-8 flex items-center justify-center">
            <span className="text-primary font-display text-lg md:text-xl">
              {displayText}
            </span>
            <span className="ml-0.5 w-0.5 h-6 bg-primary inline-block" style={{ animation: "typing-cursor 1s infinite" }} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-display px-8 glow-border"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/50 hover:bg-primary/5 font-display px-8"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-accent/50 hover:bg-accent/5 font-display px-8 gap-2"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Download className="w-4 h-4" /> Resume
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/aniket2804m"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:bg-primary/10 transition-colors"
            >
              <Github className="w-5 h-5 text-foreground" />
            </a>
            <a
              href=" https://linkedin.com/in/aniket-suryawanshi-74a90a257"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass rounded-full hover:bg-primary/10 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-foreground" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;
