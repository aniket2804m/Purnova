import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const NeuralShowcase = () => {
  const { ref, isVisible } = useScrollReveal();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 600;
    const h = 400;
    canvas.width = w;
    canvas.height = h;

    const layers = [3, 5, 6, 5, 3];
    const nodes: { x: number; y: number; layer: number }[] = [];
    const gapX = w / (layers.length + 1);

    layers.forEach((count, li) => {
      const gapY = h / (count + 1);
      for (let ni = 0; ni < count; ni++) {
        nodes.push({ x: gapX * (li + 1), y: gapY * (ni + 1), layer: li });
      }
    });

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[j].layer === nodes[i].layer + 1) {
            const pulse = Math.sin(frame * 0.03 + i * 0.5) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 + pulse * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Pulse dot along connection
            if (Math.sin(frame * 0.05 + i + j) > 0.7) {
              const t = (Math.sin(frame * 0.02 + i) * 0.5 + 0.5);
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * t;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * t;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(6, 182, 212, ${0.5 + pulse * 0.5})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(frame * 0.04 + i) * 0.3 + 0.7;
        
        // Use a simpler but still beautiful glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.15 * pulse})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${0.7 + pulse * 0.3})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [isVisible]);

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">AI Visualization</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Neural Network <span className="gradient-text">in Action</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl p-8 flex justify-center glow-border"
        >
          <canvas ref={canvasRef} className="w-full max-w-[600px] h-auto" style={{ aspectRatio: "3/2" }} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Input Layer", desc: "Raw data enters the network — images, numbers, and signals processed for pattern recognition." },
            { title: "Hidden Layers", desc: "Deep neural layers extract features, learn representations, and build understanding." },
            { title: "Output Layer", desc: "Intelligent predictions emerge — classifications, detections, and decisions." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              className="glass rounded-xl p-6 text-center"
            >
              <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeuralShowcase;
