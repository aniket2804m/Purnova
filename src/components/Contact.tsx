import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send, Phone, MapPin, MessageCircle, FileText } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgImg2 from "../img/bgImg1.png";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    { icon: Mail, label: "Email", href: "mailto:suryawanshianiket7576@gmail.com", text: "suryawanshianiket7576@gmail.com" },
    { icon: Phone, label: "Phone", href: "tel:+919307736352", text: "+91 9307736352" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/919307736352", text: "Chat on WhatsApp" },
    { icon: MapPin, label: "Location", href: "#", text: "Pune, India" },
  ];

  // GSAP animations for Header, Left links, and Right Form
  useEffect(() => {
    const leftItems = sectionRef.current?.querySelectorAll(".contact-link-item");
    const rightForm = sectionRef.current?.querySelector(".form-container-card");
    const header = sectionRef.current?.querySelector(".contact-header");

    const ctx = gsap.context(() => {
      // Header animation
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Left links stagger animation
      if (leftItems && leftItems.length > 0) {
        gsap.fromTo(
          leftItems,
          { opacity: 0, x: -40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%"
            }
          }
        );
      }

      // Right form slide in
      if (rightForm) {
        gsap.fromTo(
          rightForm,
          { opacity: 0, x: 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-white" ref={sectionRef}>
      {/* Background Image & Light Yellow Glow Blend */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImg2}
          alt="Background Image"
          className="w-full h-full object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Decorative Golden / Yellow Radial Glows for premium depth */}
      <div className="absolute top-10 left-1/4 h-80 w-80 rounded-full bg-yellow-400/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-500/20 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
        <div className="contact-header text-center mb-16 opacity-0">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/40 bg-black text-white text-xs font-semibold tracking-widest uppercase shadow-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
            Get in Touch
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black font-display tracking-tight">
            Let's{" "}
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Info & Links */}
          <div className="space-y-4">
            <p className="contact-link-item text-black font-bold text-lg opacity-90 mb-4 opacity-0">
              Interested in collaborating on AI projects, have a question, or just want to say hello? I'd love to hear from you.
            </p>

            {/* Resume helper box */}
            <div className="contact-link-item flex items-center gap-3 mb-6 p-4 rounded-xl bg-neutral-800/10 border border-neutral-400/20 backdrop-blur-md opacity-0">
              <FileText className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm text-black font-semibold">
                Looking for my resume? <span className="text-amber-700 underline cursor-pointer">Drop a message</span> and I'll share it with you!
              </p>
            </div>

            {contactLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="contact-link-item flex items-center gap-4 bg-neutral-800/10 border border-neutral-400/20 backdrop-blur-md rounded-2xl p-4 hover:bg-neutral-900/60 hover:border-yellow-500 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] transition-all duration-300 group opacity-0"
              >
                <div className="p-3 rounded-xl bg-black text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300 shadow-md">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-black/60 font-bold group-hover:text-yellow-400/80 transition-colors duration-300">{item.label}</p>
                  <p className="text-sm text-black font-extrabold group-hover:text-white transition-colors duration-300">{item.text}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="form-container-card bg-neutral-800/10 border border-neutral-400/20 backdrop-blur-md rounded-3xl p-8 space-y-6 hover:bg-neutral-800/15 hover:shadow-lg transition-all duration-500 opacity-0"
          >
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/50 border-neutral-400/30 text-black placeholder:text-black/45 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 rounded-2xl py-6 font-bold shadow-sm"
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-white/50 border-neutral-400/30 text-black placeholder:text-black/45 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 rounded-2xl py-6 font-bold shadow-sm"
              maxLength={255}
            />
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-white/50 border-neutral-400/30 text-black placeholder:text-black/45 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 rounded-2xl font-bold min-h-[140px] shadow-sm"
              maxLength={1000}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sending}
              className="w-full bg-black text-white hover:bg-yellow-400 hover:text-black py-4 rounded-2xl font-bold text-base flex gap-2 items-center justify-center transition-all duration-300 border border-yellow-500/20 shadow-md disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              {sending ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
