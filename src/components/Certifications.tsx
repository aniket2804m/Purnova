import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Full Stack Developer",
    issuer: "Skillected",
    color: "from-primary to-secondary",
  },
  {
    title: "Ai Powered Application",
    issuer: "SimpleLearn",
    color: "from-secondary to-accent",
  },
  {
    title: "Data Science Professional",
    issuer: "Skillected",
    color: "from-accent to-primary",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services",
    color: "from-primary to-accent",
  },
];

const Certifications = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="certifications" className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Credentials</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="glass rounded-xl p-6 text-center gradient-border group hover:bg-card/60 transition-all"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${cert.color} p-[1px]`}>
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <Award className="w-7 h-7 text-primary" />
                </div>
              </div>
              <h3 className="font-display font-bold text-foreground text-sm mb-2 leading-tight">{cert.title}</h3>
              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
