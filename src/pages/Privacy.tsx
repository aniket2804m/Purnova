"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Mail, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Privacy = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // GSAP scroll trigger for sections
    sectionsRef.current.forEach((section) => {
      if (!section) return;

      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Intersection Observer for Active Section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveSection(index);
          }
        });
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      title: "Information We Collect",
      content:
        "We collect personal information such as your name, email address, phone number, and business details when you contact us or use our digital marketing services.",
    },
    {
      title: "How We Use Your Information",
      content:
        "Your information is used to provide marketing services, improve customer experience, communicate updates, generate reports, and optimize campaign performance.",
    },
    {
      title: "Data Protection",
      content:
        "Purnova Digital Marketing follows industry-standard security measures to protect your personal information from unauthorized access, misuse, or disclosure.",
    },
    {
      title: "Cookies & Tracking",
      content:
        "Our website may use cookies and analytics tools to understand user behavior and improve website performance and marketing effectiveness.",
    },
    {
      title: "Third-Party Services",
      content:
        "We may work with trusted third-party platforms such as Google, Meta, and analytics providers to deliver our services effectively.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, modify, or request deletion of your personal information at any time by contacting our team.",
    },
  ];

  const handleScrollToSection = (index: number) => {
    const target = sectionsRef.current[index];
    if (target) {
      const offset = 100; // Offset to account for sticky headers
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24">
      {/* Decorative top accent gradient */}
      <div className="h-2 w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-yellow-600 mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 font-bold text-xs uppercase tracking-wider mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacy Documents
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-extrabold tracking-tight leading-tight"
          >
            Privacy <span className="text-yellow-500">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-6xl text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            At{" "}
            <span className="font-bold text-yellow-600">
              Purnova Digital Marketing
            </span>
            , we respect your privacy and are committed to protecting your personal information.
          </motion.p>
        </div>
      </section>

      {/* Layout Grid with Table of Contents */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Table of Contents - Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 shadow-sm space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-1">
                {sections.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleScrollToSection(index)}
                    className={`text-left text-sm font-semibold py-2 px-3 rounded-lg transition-all duration-300 ${
                      activeSection === index
                        ? "text-yellow-600 bg-yellow-500/10 font-bold border-l-4 border-yellow-500 pl-3"
                        : "text-neutral-500 hover:text-black hover:bg-neutral-100/70 border-l border-neutral-200 pl-3"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Table of Contents - Mobile Horizontal Scroll Bar (Sticky) */}
          <div className="lg:hidden sticky top-20 z-30 bg-white/90 backdrop-blur-md py-4 border-b border-neutral-100 flex gap-2 overflow-x-auto scrollbar-none px-4 -mx-4 mb-8">
            {sections.map((item, index) => (
              <button
                key={index}
                onClick={() => handleScrollToSection(index)}
                className={`flex-shrink-0 text-xs font-bold px-4 py-2.5 rounded-full border transition-all duration-300 ${
                  activeSection === index
                    ? "bg-black text-yellow-400 border-black shadow-md scale-105"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Policy Sections (Content Area) */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {sections.map((item, index) => (
              <div
                key={index}
                data-index={index}
                ref={(el) => {
                  sectionsRef.current[index] = el;
                }}
                className="group rounded-3xl border border-neutral-200 bg-black p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-500 hover:border-yellow-500/50 hover:shadow-2xl"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 mb-4 tracking-tight">
                      {item.title}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-neutral-300 font-medium">
                      {item.content}
                    </p>
                  </div>
                </div>

                <div className="mt-8 h-1 w-0 bg-gradient-to-r from-yellow-400 to-amber-600 transition-all duration-700 group-hover:w-full"></div>
              </div>
            ))}

            {/* Contact Section (Embedded cleanly in Content Area) */}
            <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 md:p-10 shadow-lg mt-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 mb-4">
                Contact Us
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-neutral-300 max-w-xl mx-auto mb-8">
                If you have any questions regarding this Privacy Policy, please contact Purnova Digital Marketing.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <a
                  href="mailto:info@purnovadigital.com"
                  className="flex items-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-bold shadow-md hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <Mail className="w-5 h-5 text-yellow-600" />
                  info@purnovadigital.com
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 bg-yellow-500 text-black px-6 py-4 rounded-xl font-bold shadow-md hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <Phone className="w-5 h-5" />
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Privacy;