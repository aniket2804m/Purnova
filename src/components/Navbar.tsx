import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home, Info, Users, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "../img/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full px-4 sm:px-6 md:px-8 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full pointer-events-auto transition-all duration-500 ease-in-out relative ${
          scrolled
            ? "mt-4 max-w-5xl rounded-full bg-background/80 border border-white/10 backdrop-blur-xl py-3 px-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)] shadow-primary/5"
            : "max-w-7xl py-6 px-4 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link
            to="/"
            className="group flex items-center gap-3 relative transition-transform hover:scale-105 active:scale-95"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={logo}
              alt="PURNOVA Logo"
              className="w-24 h-9 object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]"
            />
            <div className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-10" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 rounded-full flex items-center ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                  }`}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                >
                  {/* Sliding Backdrop Pill */}
                  {hoveredPath === link.href && (
                    <motion.span
                      layoutId="hovered-pill"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  <span>{link.label}</span>

                  {/* Active Underline Dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,1)]"
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
                className="rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold px-6 border-none hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300 group/btn"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Book a Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-white/5 transition-colors relative flex items-center justify-center w-10 h-10 border border-white/5 bg-black/20"
            aria-label="Toggle Menu"
          >
            <svg width="18" height="18" viewBox="0 0 23 23" className="text-white">
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
            className="absolute top-[calc(100%+12px)] left-4 right-4 bg-background/95 border border-white/10 backdrop-blur-2xl p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] lg:hidden flex flex-col gap-4 pointer-events-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;

                // Pick corresponding icon
                const Icon = link.href === "/" ? Home :
                             link.href === "/about" ? Info :
                             link.href === "/team" ? Users : PhoneCall;

                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold text-base">{link.label}</span>
                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,1)]" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div variants={itemVariants} className="pt-3 border-t border-white/5">
              <Button
                asChild
                className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold py-6 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300"
              >
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2">
                  Get Started
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

