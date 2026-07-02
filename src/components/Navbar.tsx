import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Home,
  Info,
  Users,
  PhoneCall,
  FolderOpen,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "../img/logo.png";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/card" },
  { label: "CaseStudy", href: "/case" },
  { label: " Purnovians", href: "/team" },
  { label: "Client", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

const servicesDropdown = [
  { label: "Brand Strategy", href: "/brand" },
  { label: "Performance Marketing", href: "/perform" },
  { label: "Website Development", href: "/web" },
  { label: "Google Ads", href: "/google" },
  { label: "Video Creation", href: "/facebook" },
  { label: "Content Creation", href: "/linkdin" },
  { label: "SEO Optimization", href: "/seo" },
  { label: "Social Media Marketing", href: "/social" },
];

const casestudyDropdown = [
  { label: "Bushare CaseStudy", href: "/bushare" },
  { label: "PuneVoice", href: "/pune" },

];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  const [servicesOpen, setServicesOpen] = useState(false);
  const [casestudyOpen, setCasestudyOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
  setServicesOpen(false);
}, [location.pathname]);

  // Menu Animation Variants
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        staggerChildren: 0.05,
        delayChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -15,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none font-montserrat">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full pointer-events-auto transition-all duration-300 ease-in-out border-b bg-[#0A0A0A]/95 border-[#C9A84C]/15 ${
          scrolled
            ? "py-3 shadow-md"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            className="group flex items-center gap-3 relative transition-transform hover:scale-105 active:scale-95"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={logo}
              alt="PURNOVA Logo"
              className="w-35 h-12 object-contain transition-all duration-300 group-hover:scale-105 px-3 py-1.5 rounded-none bg-transparent"
            />
            <div className="absolute -inset-2 bg-[#C9A84C]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-none -z-10" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {

              if (link.label === "Services") {

              const isActive = location.pathname === link.href;
  return (
    <div
  key={link.href}
  className="relative"
  onMouseEnter={() => setServicesOpen(true)}
  onMouseLeave={() => setServicesOpen(false)}
>
      <Link
        to={link.href}
       className={`relative px-4 py-2 text-base font-semibold transition-colors duration-300 rounded-none flex items-center ${
                    isActive ? "text-[#C9A84C]" : "text-[#F5F0E8]/85 hover:text-[#C9A84C]"
                  }`}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
      >
        Services {servicesOpen ? "▼" : "▲"}

        {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-none bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
      </Link>

      <div
  className={`absolute top-full left-0 mt-2
    w-72 bg-[#1A1A1A] rounded-none shadow-xl
    border border-[#C9A84C]/15
    transition-all duration-300 z-50 ${
      servicesOpen
        ? "opacity-100 visible"
        : "opacity-0 invisible"
    }`}
>
        {servicesDropdown.map((service) => (
          <Link
  key={service.href}
  to={service.href}
  onClick={() => setServicesOpen(false)}
  className="
    block px-5 py-3
    text-[#F5F0E8]
    hover:bg-[#C9A84C]/10
    hover:text-[#C9A84C]
    transition
  "
>
            {service.label}

            {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-none bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
          </Link>
        ))}
      </div>
    </div>
  );
}

// casestudy
 if (link.label === "CaseStudy") {

              const isActive = location.pathname === link.href;
  return (
    <div
  key={link.href}
  className="relative"
  onMouseEnter={() => setCasestudyOpen(true)}
  onMouseLeave={() => setCasestudyOpen(false)}
>
      <Link
        to={link.href}
       className={`relative px-4 py-2 text-base font-semibold transition-colors duration-300 rounded-none flex items-center ${
                    isActive ? "text-[#C9A84C]" : "text-[#F5F0E8]/85 hover:text-[#C9A84C]"
                  }`}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
      >
        CaseStudy {casestudyOpen ? "▼" : "▲"}

        {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-none bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
      </Link>

      <div
  className={`absolute top-full left-0 mt-2
    w-72 bg-[#1A1A1A] rounded-none shadow-xl
    border border-[#C9A84C]/15
    transition-all duration-300 z-50 ${
      casestudyOpen
        ? "opacity-100 visible"
        : "opacity-0 invisible"
    }`}
>
        {casestudyDropdown.map((service) => (
          <Link
  key={service.href}
  to={service.href}
  onClick={() => setCasestudyOpen(false)}
  className="
    block px-5 py-3
    text-[#F5F0E8]
    hover:bg-[#C9A84C]/10
    hover:text-[#C9A84C]
    transition
  "
>
            {service.label}

            {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-none bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Nav Link
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-base font-semibold transition-colors duration-300 rounded-none flex items-center ${
                    isActive ? "text-[#C9A84C]" : "text-[#F5F0E8]/85 hover:text-[#C9A84C]"
                  }`}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  {/* Sliding Backdrop Pill */}
                  {hoveredPath === link.href && (
                    <motion.span
                      layoutId="hovered-pill"
                      className="absolute inset-0 bg-[#C9A84C]/10 rounded-none -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  <span>{link.label}</span>

                  {/* Active Underline Dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-none bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden lg:block">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                className="rounded-none bg-[#C9A84C] text-[#0A0A0A] hover:bg-[#F5F0E8] font-montserrat font-semibold px-6 border-none transition-all duration-300"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-none hover:bg-[#1A1A1A] transition-colors relative flex items-center justify-center w-10 h-10 border border-[#C9A84C]/25 bg-[#0A0A0A]"
            aria-label="Toggle Menu"
          >
            <svg width="18" height="18" viewBox="0 0 23 23" className="text-[#F5F0E8]">
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" }
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                d="M 2 9.423 L 20 9.423"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.2 }}
              />
              <motion.path
                fill="transparent"
                strokeWidth="2.5"
                stroke="currentColor"
                strokeLinecap="round"
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.5" }
                }}
                animate={mobileOpen ? "open" : "closed"}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            // variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-[calc(100%+8px)] left-4 right-4 bg-[#0A0A0A]/95 border border-[#C9A84C]/15 backdrop-blur-2xl p-5 rounded-none shadow-lg lg:hidden flex flex-col gap-4 pointer-events-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {


if (link.label === "Services") {

  const isActive = location.pathname === link.href;

  return (
    <div key={link.href}>
     <button
  onClick={() => setServicesOpen(!servicesOpen)}
  className="
    w-full flex items-center justify-between
    px-4 py-3 rounded-none hover:bg-[#1A1A1A] border border-[#C9A84C]/15 text-[#F5F0E8]
  "
>
  <div className="flex items-center gap-4">
    <Briefcase className="w-5 h-5 text-[#C9A84C]" />
    <span className="font-semibold text-[#F5F0E8]">
      Services 
    </span>
  </div>

  <span className="text-[#F5F0E8]">{servicesOpen ? "▼" : "▲"}</span>
</button>

      {servicesOpen && (
        <div className="ml-4 mt-2 flex flex-col">
          {servicesDropdown.map((service) => (
            <Link
              key={service.href}
              to={service.href}
              onClick={() => {
                setMobileOpen(false);
                setServicesOpen(false);
              }}
             className={`flex items-center gap-4 px-4 py-3.5 rounded-none transition-all duration-300 ${
                        isActive
                          ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20"
                          : "text-[#F5F0E8] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 border border-transparent"
                      }`}
            >
              {service.label}
              {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-none bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,1)]" />
                      )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


if (link.label === "CaseStudy") {

  const isActive = location.pathname === link.href;

  return (
    <div key={link.href}>
     <button
  onClick={() => setCasestudyOpen(!casestudyOpen)}
  className="
    w-full flex items-center justify-between
    px-4 py-3 rounded-none hover:bg-[#1A1A1A] border border-[#C9A84C]/15 text-[#F5F0E8]
  "
>
  <div className="flex items-center gap-4">
    <Briefcase className="w-5 h-5 text-[#C9A84C]" />
    <span className="font-semibold text-[#F5F0E8]">
      CaseStudy
    </span>
  </div>

  <span className="text-[#F5F0E8]">{casestudyOpen ? "▼" : "▲"}</span>
</button>

      {casestudyOpen && (
        <div className="ml-4 mt-2 flex flex-col">
          {casestudyDropdown.map((service) => (
            <Link
              key={service.href}
              to={service.href}
              onClick={() => {
                setMobileOpen(false);
                setCasestudyOpen(false);
              }}
             className={`flex items-center gap-4 px-4 py-3.5 rounded-none transition-all duration-300 ${
                        isActive
                          ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20"
                          : "text-[#F5F0E8] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 border border-transparent"
                      }`}
            >
              {service.label}
              {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-none bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,1)]" />
                      )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Nav Link
                const isActive = location.pathname === link.href;

                // Pick corresponding icon
                const Icon =
  link.label === "About" ? Info :
  link.label === "Services" ? Briefcase :
  link.label === "Client" ? FolderOpen :
  link.label === " Purnovians" ? Users :
  PhoneCall;

                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-none transition-all duration-300 ${
                        isActive
                          ? "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20"
                          : "text-[#F5F0E8] hover:text-[#C9A84C] hover:bg-[#1A1A1A] border border-transparent"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#C9A84C]" />
                      <span className="font-semibold text-base">{link.label}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-none bg-[#C9A84C] shadow-[0_0_8px_rgba(201,168,76,1)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="pt-3 border-t border-[#C9A84C]/10">
              <Button
                asChild
                className="w-full rounded-none bg-[#C9A84C] text-[#0A0A0A] font-montserrat font-semibold py-6 hover:bg-[#F5F0E8] hover:text-[#0A0A0A]"
              >
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2">
                  Book a Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

