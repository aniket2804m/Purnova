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
    { icon: Mail, label: "Email", href: "mailto:Purnovaaa@gmail.com", text: "Purnovaaa@gmail.com" },
    { icon: Phone, label: "Phone", href: "tel:+918390025023", text: "+91 83900 25023" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/91839025023", text: "Chat on WhatsApp" },
    { icon: MapPin, label: "Location", href: "https://maps.app.goo.gl/ni1Votk8grV3SUHg8", text: "Address: 602, D Wing, Swami Chaya Apartments, Lane, DP Rd, opp. Sainath Khanawal, Sridhar Colony, Karvenagar, Pune," },
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
    <section id="contact" className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-[#0A0A0A] border-t border-[#C9A84C]/10 font-montserrat" ref={sectionRef}>
      {/* Background Image & Dark Glow Blend */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImg2}
          alt="Background Image"
          className="w-full h-full object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-sm"></div>
      </div>

      {/* Decorative Golden / Yellow Radial Glows for premium depth */}
      <div className="absolute top-10 left-1/4 h-80 w-80 rounded-none bg-[#C9A84C]/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-none bg-[#C9A84C]/2 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Heading Section */}
        <div className="contact-header text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F0E8] font-cinzel tracking-wide leading-tight">
            Let's{" "}
            <span className="text-[#C9A84C]">
              Connect
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start font-montserrat">
          {/* Left Column: Info & Links */}
          <div className="space-y-4">
            <p className="contact-link-item text-[#F5F0E8]/85 font-light text-base leading-relaxed mb-4">
              Interested in collaborating, have a question, or want to schedule a strategy session? We'd love to hear from you.
            </p>

            {/* Resume helper box */}
            <div className="contact-link-item flex items-center gap-3 mb-6 p-4 rounded-none bg-[#101010]/60 border border-[#C9A84C]/15 backdrop-blur-md opacity-0">
              <FileText className="w-5 h-5 text-[#C9A84C] shrink-0" />
              <p className="text-sm text-[#F5F0E8]/90 font-light">
                Looking for details? <span className="text-[#C9A84C] underline cursor-pointer">Drop a message</span> and we'll share it with you!
              </p>
            </div>

            {contactLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="contact-link-item flex items-center gap-4 bg-[#101010]/40 border border-[#C9A84C]/10 backdrop-blur-md rounded-none p-4 hover:bg-[#101010]/90 hover:border-[#C9A84C] hover:shadow-[0_10px_30px_rgba(201,168,76,0.1)] transition-all duration-300 group opacity-0"
              >
                <div className="p-3 rounded-none bg-[#0A0A0A] text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0A0A0A] transition-all duration-300 shadow-md border border-[#C9A84C]/10">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#F5F0E8]/50 font-medium group-hover:text-[#C9A84C] transition-colors duration-300">{item.label}</p>
                  <p className="text-sm text-[#F5F0E8] font-semibold group-hover:text-white transition-colors duration-300">{item.text}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="form-container-card bg-[#101010]/60 border border-[#C9A84C]/15 backdrop-blur-md rounded-none p-8 space-y-6 hover:bg-[#101010]/80 transition-all duration-500 opacity-0"
          >
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#0A0A0A]/80 border-[#C9A84C]/20 text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 focus-visible:border-[#C9A84C] focus-visible:ring-1 focus-visible:ring-[#C9A84C] rounded-none py-6 font-light shadow-sm"
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-[#0A0A0A]/80 border-[#C9A84C]/20 text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 focus-visible:border-[#C9A84C] focus-visible:ring-1 focus-visible:ring-[#C9A84C] rounded-none py-6 font-light shadow-sm"
              maxLength={255}
            />
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-[#0A0A0A]/80 border-[#C9A84C]/20 text-[#F5F0E8] placeholder:text-[#F5F0E8]/40 focus-visible:border-[#C9A84C] focus-visible:ring-1 focus-visible:ring-[#C9A84C] rounded-none font-light min-h-[140px] shadow-sm"
              maxLength={1000}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sending}
              className="w-full bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#F5F0E8] hover:text-[#0A0A0A] py-4 rounded-none font-semibold font-montserrat tracking-widest uppercase text-sm flex gap-2 items-center justify-center transition-all duration-300 border border-[#C9A84C]/20 shadow-md disabled:opacity-50"
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
