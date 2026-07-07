import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Phone, MapPin, MessageCircle, FileText, ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgImg2 from "../img/bgImg1.png";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Select Component
interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
}

const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`w-full form-field flex flex-col gap-2 relative ${isOpen ? "z-40" : "z-10"}`}>
      <label className="text-xs font-semibold text-[#F5F0E8]/70 tracking-wider uppercase">
        {label}
      </label>
      <div className="relative group">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-[#0A0A0A]/80 border ${
            error ? "border-red-500/50" : "border-[#C9A84C]/20"
          } text-[#F5F0E8] px-4 py-4 text-sm font-light focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all duration-300 group`}
        >
          <span className={`truncate ${!value ? "text-[#F5F0E8]/40" : "text-[#F5F0E8]"}`}>
            {value || placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#C9A84C] transition-transform duration-300 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          {/* Bottom expanding gold line highlight */}
          <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A84C] scale-x-0 group-focus:scale-x-100 transition-transform duration-300 origin-center" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 left-0 w-full mt-1 bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#C9A84C]/20 shadow-[0_10px_35px_rgba(0,0,0,0.9)] max-h-60 overflow-y-auto scrollbar-none"
            >
              {options.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between text-left px-4 py-3 text-sm text-[#F5F0E8] hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-colors duration-200"
                  >
                    <span>{option}</span>
                    {value === option && (
                      <Check className="w-4 h-4 text-[#C9A84C] shrink-0" />
                    )}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && <span className="text-xs text-red-500/80 font-light mt-0.5">{error}</span>}
    </div>
  );
};

// Custom Input Component
interface CustomInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const CustomInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error
}: CustomInputProps) => {
  return (
    <div className="w-full form-field flex flex-col gap-2 relative">
      <label className="text-xs font-semibold text-[#F5F0E8]/70 tracking-wider uppercase">
        {label}
      </label>
      <div className="relative group">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-[#0A0A0A]/80 border ${
            error ? "border-red-500/50" : "border-[#C9A84C]/20"
          } text-[#F5F0E8] placeholder:text-[#F5F0E8]/35 px-4 py-4 text-sm font-light focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all duration-300`}
        />
        {/* Bottom expanding gold line highlight */}
        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A84C] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
      </div>
      {error && <span className="text-xs text-red-500/80 font-light mt-0.5">{error}</span>}
    </div>
  );
};

// Custom Textarea Component
interface CustomTextareaProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const CustomTextarea = ({
  label,
  placeholder,
  value,
  onChange,
  error
}: CustomTextareaProps) => {
  return (
    <div className="w-full form-field flex flex-col gap-2 relative col-span-full">
      <label className="text-xs font-semibold text-[#F5F0E8]/70 tracking-wider uppercase">
        {label}
      </label>
      <div className="relative group">
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-[#0A0A0A]/80 border ${
            error ? "border-red-500/50" : "border-[#C9A84C]/20"
          } text-[#F5F0E8] placeholder:text-[#F5F0E8]/35 px-4 py-4 text-sm font-light min-h-[140px] focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C] transition-all duration-300 resize-none`}
        />
        {/* Bottom expanding gold line highlight */}
        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C9A84C] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
      </div>
      {error && <span className="text-xs text-red-500/80 font-light mt-0.5">{error}</span>}
    </div>
  );
};

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
    message: "",
    source: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleFieldChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else {
      const digitsOnly = form.phone.replace(/\D/g, "");
      if (digitsOnly.length < 10 || digitsOnly.length > 15) {
        newErrors.phone = "Phone number must contain between 10 and 15 digits";
      }
    }

    if (!form.requirement) {
      newErrors.requirement = "Requirement selection is required";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        "service_t3wcu24",
        "template_mu6yc7y",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company || "N/A",
          requirement: form.requirement,
          message: form.message,
          source: form.source || "N/A",
          time: new Date().toLocaleString(),
          title: form.name
        },
        "ZRduGiNvLC4tdj7Gg"
      );
      toast.success("Message sent! We'll get back to you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        requirement: "",
        message: "",
        source: ""
      });
      setErrors({});
    } catch {
      toast.error("Failed to send message. Please try again or reach out directly.");
    } finally {
      setSending(false);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "Email", href: "mailto:Purnovaaa@gmail.com", text: "Purnovaaa@gmail.com" },
    { icon: Phone, label: "Phone", href: "tel:+918390025023", text: "+91 83900 25023" },
    { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918390025023", text: "Chat on WhatsApp" },
    { icon: MapPin, label: "Location", href: "https://maps.app.goo.gl/ni1Votk8grV3SUHg8", text: "Address: 602, D Wing, Swami Chaya Apartments, Lane, DP Rd, opp. Sainath Khanawal, Sridhar Colony, Karvenagar, Pune," },
  ];

  // GSAP scroll animations
  useEffect(() => {
    const leftColumn = sectionRef.current?.querySelector(".left-column");
    const rightForm = sectionRef.current?.querySelector(".form-container-card");
    const header = sectionRef.current?.querySelector(".contact-header");

    const ctx = gsap.context(() => {
      // Header reveal
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%"
            }
          }
        );
      }

      // Left column slide from left
      if (leftColumn) {
        const leftItems = leftColumn.querySelectorAll(".contact-link-item");
        gsap.fromTo(
          leftColumn,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%"
            }
          }
        );

        if (leftItems && leftItems.length > 0) {
          gsap.fromTo(
            leftItems,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
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
      }

      // Right form slide in from right
      if (rightForm) {
        gsap.fromTo(
          rightForm,
          { opacity: 0, x: 50, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%"
            }
          }
        );

        // Inputs fade up one by one inside form
        const inputFields = rightForm.querySelectorAll(".form-field");
        if (inputFields && inputFields.length > 0) {
          gsap.fromTo(
            inputFields,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: rightForm,
                start: "top 75%"
              }
            }
          );
        }
      }
    });

    return () => ctx.revert();
  }, []);

  const requirements = [
    "Website Development",
    "Landing Page",
    "Portfolio Website",
    "E-Commerce Website",
    "UI/UX Design",
    "Branding",
    "SEO",
    "Web Application",
    "Maintenance",
    "Other"
  ];

  const sources = [
    "Google Search",
    "LinkedIn",
    "Instagram",
    "Facebook",
    "Referral",
    "Friend",
    "Existing Client",
    "Other"
  ];

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
          <div className="left-column space-y-4 opacity-0">
            <p className="contact-link-item text-[#F5F0E8]/85 font-light text-base leading-relaxed mb-4">
              Interested in collaborating, have a question, or want to schedule a strategy session? We'd love to hear from you.
            </p>

            {/* Resume helper box */}
            <div className="contact-link-item flex items-center gap-3 mb-6 p-4 rounded-none bg-[#101010]/60 border border-[#C9A84C]/15 backdrop-blur-md">
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
                className="contact-link-item flex items-center gap-4 bg-[#101010]/40 border border-[#C9A84C]/10 backdrop-blur-md rounded-none p-4 hover:bg-[#101010]/90 hover:border-[#C9A84C] hover:shadow-[0_10px_30px_rgba(201,168,76,0.1)] transition-all duration-300 group"
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

          {/* Right Column: Contact Form with Sweep Border */}
          <div className="form-container-card gold-sweep-border p-[1.5px] relative opacity-0">
            <form
              onSubmit={handleSubmit}
              className="bg-[#0A0A0A]/95 p-8 grid grid-cols-1 md:grid-cols-2 gap-6 hover:bg-[#101010]/95 transition-all duration-500"
            >
              {/* Row 1 */}
              <CustomInput
                label="Full Name"
                placeholder="E.g. Alexander Mercer"
                value={form.name}
                onChange={(val) => handleFieldChange("name", val)}
                error={errors.name}
              />
              <CustomInput
                label="Email Address"
                type="email"
                placeholder="E.g. alexander@agency.com"
                value={form.email}
                onChange={(val) => handleFieldChange("email", val)}
                error={errors.email}
              />

              {/* Row 2 */}
              <CustomInput
                label="Phone Number"
                placeholder="E.g. +91 83900 25023"
                value={form.phone}
                onChange={(val) => handleFieldChange("phone", val)}
                error={errors.phone}
              />
              <CustomInput
                label="Company Name"
                placeholder="E.g. Luxury Brands Ltd (Optional)"
                value={form.company}
                onChange={(val) => handleFieldChange("company", val)}
                error={errors.company}
              />

              {/* Row 3 */}
              <div className="col-span-full">
                <CustomSelect
                  label="Project Requirement"
                  placeholder="Select your requirement"
                  value={form.requirement}
                  onChange={(val) => handleFieldChange("requirement", val)}
                  options={requirements}
                  error={errors.requirement}
                />
              </div>

              {/* Row 4 */}
              <div className="col-span-full">
                <CustomTextarea
                  label="Tell us about your project"
                  placeholder="E.g. Details about your brand, timeline, and goals..."
                  value={form.message}
                  onChange={(val) => handleFieldChange("message", val)}
                  error={errors.message}
                />
              </div>

              {/* Row 5 */}
              <div className="col-span-full">
                <CustomSelect
                  label="How did you hear about us?"
                  placeholder="Select source"
                  value={form.source}
                  onChange={(val) => handleFieldChange("source", val)}
                  options={sources}
                  error={errors.source}
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-full form-field pt-2">
                <motion.button
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 0 25px rgba(201, 168, 76, 0.5)",
                    backgroundColor: "#F5F0E8"
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={sending}
                  className="w-full bg-[#C9A84C] text-[#0A0A0A] py-4 rounded-none font-semibold font-montserrat tracking-widest uppercase text-sm flex gap-2 items-center justify-center transition-all duration-300 border border-[#C9A84C] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {sending ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
