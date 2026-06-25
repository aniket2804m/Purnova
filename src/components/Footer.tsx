import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logo from "../img/logo.png";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import bgImg2 from "../img/bgImg1.png";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  
  // CTA Hover Mouse Coordinates
  const ctaMouseX = useMotionValue(0);
  const ctaMouseY = useMotionValue(0);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    ctaMouseX.set(e.clientX - rect.left);
    ctaMouseY.set(e.clientY - rect.top);
  };

  // GSAP scroll trigger staggered animation for footer columns
  useEffect(() => {
    const cols = footerRef.current?.querySelectorAll(".footer-col");
    if (!cols || cols.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cols,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-neutral-300/40 bg-white py-20 px-5 md:px-10 lg:px-20">
      {/* Background Image & Light Yellow Glow Blend */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bgImg2}
          alt="Background Image"
          className="w-full h-full object-cover object-center opacity-95"
        />
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Decorative Golden / Yellow Radial Glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-500/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          {/* Company */}
          <div className="footer-col">
            <h2 className="text-3xl font-extrabold mb-4">
              <img
          src={logo}
          alt="logo"
          className="w-60 h-50 object-cover object-center opacity-95 rounded-md mb-4"
        />
              <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
                Purnova Digital
              </span>
            </h2>

            <p className="text-black font-semibold opacity-85 leading-relaxed">
              Helping businesses grow through SEO, Social Media Marketing,
              Performance Ads, Branding and Website Development.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-3 rounded-xl bg-neutral-800/10 border border-neutral-400/20 text-black hover:bg-black hover:text-yellow-400 hover:scale-110 transition flex items-center justify-center shadow-sm"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl bg-neutral-800/10 border border-neutral-400/20 text-black hover:bg-black hover:text-yellow-400 hover:scale-110 transition flex items-center justify-center shadow-sm"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="p-3 rounded-xl bg-neutral-800/10 border border-neutral-400/20 text-black hover:bg-black hover:text-yellow-400 hover:scale-110 transition flex items-center justify-center shadow-sm"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="font-extrabold text-lg text-black mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                "Home",
                "About",
                "Services",
                "Portfolio",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="flex items-center gap-2 text-black/80 font-bold hover:text-amber-700 transition"
                  >
                    <ArrowUpRight size={14} className="text-amber-600" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="font-extrabold text-lg text-black mb-5">
              Our Services
            </h3>

            <ul className="space-y-3 text-black/80 font-bold">
              <li className="hover:text-amber-700 transition cursor-pointer">SEO Optimization</li>
              <li className="hover:text-amber-700 transition cursor-pointer">Social Media Marketing</li>
              <li className="hover:text-amber-700 transition cursor-pointer">Google Ads</li>
              <li className="hover:text-amber-700 transition cursor-pointer">Meta Ads</li>
              <li className="hover:text-amber-700 transition cursor-pointer">Website Development</li>
              <li className="hover:text-amber-700 transition cursor-pointer">Brand Strategy</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="font-extrabold text-lg text-black mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-black/80 font-bold">
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-amber-600" />
                <span>info@purnovadigital.com</span>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-amber-600" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3 items-center">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section (Transparent Grey Card with reflective hover shine) */}
        <div 
          onMouseMove={handleCtaMouseMove}
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
          className={`group relative mt-16 rounded-3xl p-10 text-center overflow-hidden transition-all duration-500 border ${
            isCtaHovered
              ? "bg-neutral-900/60 border-yellow-500 shadow-[0_20px_50px_rgba(234,179,8,0.2)] backdrop-blur-lg scale-[1.01]"
              : "bg-neutral-800/10 border-neutral-400/20 backdrop-blur-md hover:bg-neutral-800/15"
          }`}
        >
          {/* Reflective hover glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  350px circle at ${ctaMouseX}px ${ctaMouseY}px,
                  rgba(234, 179, 8, 0.15),
                  transparent 80%
                )
              `,
            }}
          />

          <h3 className={`text-3xl font-extrabold mb-3 transition-colors duration-300 ${
            isCtaHovered
              ? "bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent"
          }`}>
            Ready To Grow Your Business?
          </h3>

          <p className={`mb-6 transition-colors duration-300 ${
            isCtaHovered ? "text-neutral-200" : "text-black font-semibold opacity-85"
          }`}>
            Let’s create data-driven marketing campaigns that deliver real results.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-bold shadow-md transition-all duration-300 ${
              isCtaHovered
                ? "bg-yellow-400 text-black hover:bg-white border border-yellow-500/20"
                : "bg-black text-white hover:bg-yellow-400 hover:text-black"
            }`}
          >
            Get Free Consultation
          </motion.button>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-300/40 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/70 font-semibold">
            © {new Date().getFullYear()} Purnova Digital. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-black/70 font-semibold">
            <a href="#" className="hover:text-amber-700 transition">Privacy Policy</a>
            <a href="#" className="hover:text-amber-700 transition">Terms & Conditions</a>
            <a href="#" className="hover:text-amber-700 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;