import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send, Phone, MapPin, MessageCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        "service_t3wcu24",
        "template_mu6yc7y",
        { name: form.name, email: form.email, title: form.name, message: form.message, time: new Date().toLocaleString() },
        "ZRduGiNvLC4tdj7Gg"
      );
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again or reach out directly via email.");
    } finally {
      setSending(false);
    }
  };

  const contactLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/aniket2804m", text: "aniket2804m" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/aniket-suryawanshi-74a90a257", text: "Aniket Suryawanshi" },
    { icon: Mail, label: "Email", href: "mailto:suryawanshianiket7576@gmail.com", text: "suryawanshianiket7576@gmail.com" },
    { icon: Phone, label: "Phone", href: "tel:+919307736352", text: "+91 9307736352" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/919307736352", text: "Chat on WhatsApp" },
    { icon: MapPin, label: "Location", href: "#", text: "Pune, India" },
  ];

  return (
    <section id="contact" className="py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-display text-sm tracking-[0.3em] uppercase mb-3">Get in Touch</p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Let's <span className="gradient-text">Connect</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground mb-4">
              Interested in collaborating on AI projects, have a question, or just want to say hello? I'd love to hear from you.
            </p>
            <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <FileText className="w-4 h-4 text-primary shrink-0" />
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Looking for my resume?</span> Drop a message and I'll share it with you!
              </p>
            </div>
            {contactLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-xl p-4 hover:bg-card/60 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm text-foreground font-medium">{item.text}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass rounded-xl p-6 space-y-4"
          >
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-background/50 border-border/50 focus:border-primary/50"
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-background/50 border-border/50 focus:border-primary/50"
              maxLength={255}
            />
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-background/50 border-border/50 focus:border-primary/50 min-h-[120px]"
              maxLength={1000}
            />
            <Button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display gap-2"
            >
              <Send className="w-4 h-4" />
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
