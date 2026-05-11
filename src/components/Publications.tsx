import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BookOpen, ExternalLink } from "lucide-react";

const Publications = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="publications" className="py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Research</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Published <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 glow-border relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-xs font-display text-accent tracking-wider uppercase">Scopus Indexed · ICAISI-2025</span>
                <h3 className="text-xl font-bold font-display text-foreground mt-1 leading-tight">
                  A Robust Deep Learning Approach for Detecting COVID-19 and Pneumonia in Chest X-ray Scans
                </h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 ml-16">
              Published in CRC Press, Taylor & Francis Group. Presents a CNN-based system achieving high accuracy 
              in detecting COVID-19 and Pneumonia from chest X-ray images using transfer learning and Grad-CAM 
              visualization techniques.
            </p>
            <div className="ml-16 flex flex-wrap gap-2">
              {["Deep Learning", "CNN", "Medical AI", "Transfer Learning", "Grad-CAM", "Scopus"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
