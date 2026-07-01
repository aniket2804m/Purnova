"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Cookie } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CookiePolicy = () => {
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

  const cookieSections = [
    {
      title: "What Are Cookies?",
      content:
        "Cookies are small text files stored on your device when you visit a website. They help improve user experience, remember preferences, and analyze website performance.",
    },
    {
      title: "How We Use Cookies",
      content:
        "Purnova Digital Marketing uses cookies to enhance website functionality, improve navigation, analyze traffic, and provide a better browsing experience.",
    },
    {
      title: "Performance & Analytics Cookies",
      content:
        "These cookies help us understand how visitors interact with our website by collecting anonymous information such as page visits, traffic sources, and user behavior.",
    },
    {
      title: "Marketing Cookies",
      content:
        "Marketing cookies may be used to deliver relevant advertisements and measure the effectiveness of advertising campaigns across digital platforms.",
    },
    {
      title: "Third-Party Cookies",
      content:
        "We may allow trusted third-party services such as Google Analytics, Meta, and advertising partners to place cookies on our website for analytics and marketing purposes.",
    },
    {
      title: "Managing Cookies",
      content:
        "You can control, disable, or delete cookies through your browser settings. However, some website features may not function properly if cookies are disabled.",
    },
    {
      title: "Changes to This Cookie Policy",
      content:
        "Purnova Digital Marketing reserves the right to update this Cookie Policy at any time. Updates will be posted on this page with the revised effective date.",
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
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] font-montserrat pb-24">
      {/* Decorative top accent line */}
      <div className="h-[2px] w-full bg-[#C9A84C]"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F0E8]/50 hover:text-[#C9A84C] mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] font-bold text-xs uppercase tracking-wider mb-6">
            <Cookie className="w-3.5 h-3.5" />
            Privacy Documents
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold font-cinzel text-[#F5F0E8] tracking-wide leading-tight"
          >
            Cookie <span className="text-[#C9A84C]">Policy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-6xl text-base sm:text-lg md:text-xl text-center text-[#F5F0E8]/70 font-light leading-relaxed"
          >
            This Cookie Policy explains how{" "}
            <span className="font-semibold text-[#C9A84C]">
              Purnova Digital Marketing
            </span>{" "}
            uses cookies and similar technologies to improve your browsing
            experience and analyze our website performance.
          </motion.p>
        </div>
      </section>

      {/* Layout Grid with Table of Contents */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Table of Contents - Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 p-6 bg-[#101010] rounded-none border border-[#C9A84C]/15 shadow-sm space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#F5F0E8]/40">
                Table of Contents
              </h3>
              <nav className="flex flex-col gap-1">
                {cookieSections.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleScrollToSection(index)}
                    className={`text-left text-sm font-semibold py-2 px-3 rounded-none transition-all duration-300 ${
                      activeSection === index
                        ? "text-[#C9A84C] bg-[#C9A84C]/10 font-bold border-l-4 border-[#C9A84C] pl-3"
                        : "text-[#F5F0E8]/50 hover:text-[#F5F0E8] hover:bg-[#101010]/80 border-l border-[#C9A84C]/20 pl-3"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Table of Contents - Mobile Horizontal Scroll Bar (Sticky) */}
          <div className="lg:hidden sticky top-20 z-30 bg-[#0A0A0A]/90 backdrop-blur-md py-4 border-b border-[#C9A84C]/10 flex gap-2 overflow-x-auto scrollbar-none px-4 -mx-4 mb-8">
            {cookieSections.map((item, index) => (
              <button
                key={index}
                onClick={() => handleScrollToSection(index)}
                className={`flex-shrink-0 text-xs font-bold px-4 py-2.5 rounded-none border transition-all duration-300 ${
                  activeSection === index
                    ? "bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C] shadow-md scale-105"
                    : "bg-[#101010] text-[#F5F0E8]/70 border-[#C9A84C]/15 hover:border-[#C9A84C]/30"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Policy Sections (Content Area) */}
          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            {cookieSections.map((item, index) => (
              <div
                key={index}
                data-index={index}
                ref={(el) => {
                  sectionsRef.current[index] = el;
                }}
                className="group rounded-none border border-[#C9A84C]/15 bg-[#101010]/60 p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-500 hover:border-[#C9A84C]/45 hover:shadow-2xl"
              >
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-none bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] font-bold text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#C9A84C] mb-4 tracking-tight">
                      {item.title}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-[#F5F0E8]/75 font-light">
                      {item.content}
                    </p>
                  </div>
                </div>

                <div className="mt-8 h-[1px] w-0 bg-gradient-to-r from-[#C9A84C] to-[#C9A84C] transition-all duration-700 group-hover:w-full"></div>
              </div>
            ))}

            {/* Consent Section (Embedded cleanly in Content Area) */}
            <div className="rounded-none bg-[#101010]/80 border border-[#C9A84C]/15 p-6 sm:p-8 md:p-10 shadow-lg text-center mt-12">
              <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#C9A84C] mb-4">
                Your Consent
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-[#F5F0E8]/75 font-light max-w-2xl mx-auto">
                By continuing to use our website, you consent to the use of cookies
                in accordance with this Cookie Policy. You may withdraw your consent
                at any time by adjusting your browser settings.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;