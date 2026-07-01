import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router-dom";

import logo from "../img/logo.png";

import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import bgImg2 from "../img/background.png";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  
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
    <footer ref={footerRef} className="relative overflow-hidden border-t border-[#C9A84C]/15 bg-[#1A1A1A] py-20 px-5 md:px-10 lg:px-20 text-[#F5F0E8]">
      {/* Background radial glows */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C9A84C]/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#C9A84C]/2 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          
          {/* Company */}
          <div className="footer-col space-y-6">
            <h2 className="text-3xl font-semibold font-cinzel text-[#C9A84C] tracking-[0.15em]">
              PURNOVA
            </h2>

            <p className="font-montserrat font-light text-sm text-[#F5F0E8]/70 leading-relaxed">
              Helping businesses grow through SEO, Social Media Marketing,
              Performance Ads, Branding and Website Development.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 border border-[#C9A84C]/20 bg-[#0A0A0A] text-[#F5F0E8] hover:text-[#C9A84C] hover:border-[#C9A84C] hover:scale-105 transition flex items-center justify-center rounded-none shadow-sm"
              >
                <Facebook size={16} />
              </a>

              <a
                href="#"
                className="w-10 h-10 border border-[#C9A84C]/20 bg-[#0A0A0A] text-[#F5F0E8] hover:text-[#C9A84C] hover:border-[#C9A84C] hover:scale-105 transition flex items-center justify-center rounded-none shadow-sm"
              >
                <Instagram size={16} />
              </a>

              <a
                href="#"
                className="w-10 h-10 border border-[#C9A84C]/20 bg-[#0A0A0A] text-[#F5F0E8] hover:text-[#C9A84C] hover:border-[#C9A84C] hover:scale-105 transition flex items-center justify-center rounded-none shadow-sm"
              >
                <Youtube size={16} />
              </a>

              {/* LinkedIn - Highlighted in Emerald Green as key channel */}
              <a
                href="#"
                className="w-10 h-10 border border-[#00A878]/30 bg-[#0A0A0A] text-[#00A878] hover:text-[#C9A84C] hover:border-[#C9A84C] hover:scale-105 transition flex items-center justify-center rounded-none shadow-sm"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="font-semibold font-cinzel text-base tracking-wider text-[#C9A84C] mb-6 uppercase">
              Quick Links
            </h3>

            <ul className="space-y-3 font-montserrat font-light text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/card" },
                { name: "Purnovians", path: "/team" },
                { name: "Work", path: "/work" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 text-[#F5F0E8]/85 hover:text-[#C9A84C] transition"
                  >
                    <ArrowUpRight size={12} className="text-[#C9A84C]/50" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="font-semibold font-cinzel text-base tracking-wider text-[#C9A84C] mb-6 uppercase">
              Our Services
            </h3>

            <ul className="space-y-3 font-montserrat font-light text-sm">
              {[
                { name: "Brand Strategy", path: "/brand" },
                { name: "Performance Marketing", path: "/perform" },
                { name: "Website Development", path: "/web" },
                { name: "Google Ads", path: "/google" },
                { name: "Video Creation", path: "/facebook" },
                { name: "Content Creation", path: "/linkdin" },
                { name: "SEO Optimization", path: "/seo" },
                { name: "Social Media Marketing", path: "/social" },
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="flex items-center gap-2 text-[#F5F0E8]/85 hover:text-[#C9A84C] transition"
                  >
                    <ArrowUpRight size={12} className="text-[#C9A84C]/50" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="font-semibold font-cinzel text-base tracking-wider text-[#C9A84C] mb-6 uppercase">
              Contact Us
            </h3>

            <div className="space-y-4 font-montserrat font-light text-sm text-[#F5F0E8]/85">
              <div className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[#C9A84C]" />
                <span>Purnovaaa@gmail.com</span>
              </div>

              <div className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[#C9A84C]" />
                <span>+91 83900 25023</span>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#F5F0E8]/60 text-xs">
                  602, D Wing, Swami Chaya Apartments, Lane, DP Rd, Sridhar Colony, Karvenagar, Pune
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section (Transparent Grey Card with reflective hover shine) */}
        <div 
          onMouseMove={handleCtaMouseMove}
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
          className={`group relative mt-16 rounded-none p-10 text-center overflow-hidden transition-all duration-500 border ${
            isCtaHovered
              ? "bg-[#101010] border-[#C9A84C] shadow-[0_20px_50px_rgba(201,168,76,0.1)] backdrop-blur-lg scale-[1.01]"
              : "bg-[#101010]/30 border-[#C9A84C]/15 backdrop-blur-md"
          }`}
        >
          {/* Reflective hover glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  350px circle at ${ctaMouseX}px ${ctaMouseY}px,
                  rgba(201, 168, 76, 0.08),
                  transparent 80%
                )
              `,
            }}
          />

          <h3 className="font-cinzel text-2xl font-bold mb-3 text-[#C9A84C] tracking-wide">
            Ready To Grow Your Business?
          </h3>

          <p className={`mb-6 font-montserrat font-light text-sm transition-colors duration-300 ${
            isCtaHovered ? "text-[#F5F0E8]" : "text-[#F5F0E8]/70"
          }`}>
            Let’s create data-driven marketing campaigns that deliver real results.
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`px-8 py-3.5 rounded-none font-montserrat font-semibold text-xs tracking-widest uppercase shadow-md transition-all duration-300 ${
              isCtaHovered
                ? "bg-[#F5F0E8] text-[#0A0A0A] hover:bg-[#C9A84C] border border-[#C9A84C]/20"
                : "bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#F5F0E8]"
            }`}
            onClick={() => navigate("/contact")}
          >
            Get Free Consultation
          </motion.button>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#C9A84C]/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-montserrat font-light text-[#F5F0E8]/70">
            © {new Date().getFullYear()} Purnova. All Rights Reserved. Where Brands Become Legends.
          </p>

          <div className="flex gap-6 text-xs font-montserrat font-light text-[#F5F0E8]/70">
            <Link to="/privacy" className="hover:text-[#C9A84C] transition">
              Privacy Policy
            </Link>

            <Link to="/terms" className="hover:text-[#C9A84C] transition">
              Terms & Conditions
            </Link>

            <Link to="/cookie" className="hover:text-[#C9A84C] transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;