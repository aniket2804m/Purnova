import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { services } from "../data/Card";
import bgImg2 from "../../img/bgImg1.png";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const TiltCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Normalized values (-0.5 to 0.5) for 3D tilt rotation
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Pixel values for shine and border cursor tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 120, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 120, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mX = e.clientX - rect.left;
        const mY = e.clientY - rect.top;
        
        mouseX.set(mX);
        mouseY.set(mY);

        const xPct = mX / width - 0.5;
        const yPct = mY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: 1000 }} className="relative z-10 w-full h-full">
            {/* Ambient Glowing Light behind Card */}
            <motion.div
                className="absolute -inset-5 rounded-3xl opacity-0 group-hover:opacity-20 transition duration-500 pointer-events-none z-0"
                style={{
                   background: useMotionTemplate`
  radial-gradient(
    280px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 215, 0, 0.45),
    rgba(255, 193, 7, 0.25) 60%,
    transparent 80%
  )
`,
                }}
            />

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`group relative h-full w-full rounded-3xl p-[1.5px] transition-all duration-500 ${
                    isHovered
                        ? "bg-neutral-900/60 border-2 border-yellow-500 shadow-[0_20px_50px_rgba(234,179,8,0.25)] backdrop-blur-lg scale-[1.03] z-10"
                        : "bg-neutral-800/10 border border-neutral-400/20 backdrop-blur-md opacity-100 scale-100 hover:opacity-100 hover:bg-neutral-800/15"
                }`}
            >
                <div
                    style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
                    className="relative h-full w-full rounded-[22px] overflow-hidden"
                >
                    {/* Background Image with Parallax Effect */}
                    <motion.img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                            isHovered ? "scale-105 opacity-100" : "scale-100 opacity-100"
                        }`}
                    />

                    {/* Overlays */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                        isHovered
                            ? "bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-100"
                            : "bg-gradient-to-t from-white via-white/50 to-transparent opacity-80"
                    }`} />

                    {/* Moving Metallic Shine Effect */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[22px] opacity-100 group-hover:opacity-100 transition duration-300 z-10"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    250px circle at ${mouseX}px ${mouseY}px,
                                    rgba(255, 255, 255, 0.12),
                                    transparent 80%
                                )
                            `,
                        }}
                    />

                    {/* Content */}
                    <div 
                        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
                        className="absolute inset-0 z-20 flex flex-col justify-end p-8"
                    >
                        <div className="transform translate-y-24 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end h-full">
                            {/* Service Icon with dynamic border/colors */}
                            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 backdrop-blur-md ${
                                isHovered 
                                    ? "bg-yellow-400 text-black border border-yellow-500/20 shadow-lg shadow-yellow-400/20" 
                                    : "bg-black text-yellow-400 border border-yellow-500/30 shadow-md"
                            }`}>
                                <span className="text-xl">{service.icon}</span>
                            </div>
                            
                            {/* Service Title */}
                            <h3 className={`mb-3 text-3xl font-black tracking-tight font-display transition-colors duration-300 ${
                                isHovered ? "text-amber-400" : "text-black"
                            }`}>
                                {service.title}
                            </h3>
                            
                            {/* Service Description */}
                            <p className={`mb-6 text-base leading-relaxed transition-all duration-500 delay-75 ${
                                isHovered ? "text-white opacity-95" : "text-black font-semibold opacity-85"
                            }`}>
                                {service.description}
                            </p>

                            {/* Explore Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`w-fit rounded-full px-6 py-2.5 text-sm font-bold shadow-md transition-all duration-300 delay-150 ${
                                    isHovered
                                        ? "bg-yellow-400 text-black hover:bg-white hover:text-black border border-yellow-500/20 shadow-yellow-400/20"
                                        : "bg-black text-white hover:bg-yellow-400 hover:text-black"
                                }`}
                            >
                                Explore Service
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Premium Mouse-Tracking Glowing Border */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 z-20"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                180px circle at ${mouseX}px ${mouseY}px,
                                rgba(234, 179, 8, 0.45),
                                transparent 80%
                            )
                        `,
                        padding: "1.5px",
                        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        maskComposite: "exclude",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                    }}
                >
                    <div className="w-full h-full rounded-[22px] bg-transparent" />
                </motion.div>
            </motion.div>
        </div>
    );
};

const Card = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = containerRef.current?.querySelectorAll(".service-card-item");
        if (!cards || cards.length === 0) return;

        // GSAP ScrollTrigger staggering entrance animation with 3D tilt
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 90, scale: 0.9, rotateX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative overflow-hidden py-24 px-5 md:px-10 lg:px-20 bg-white">
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

            <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/40 bg-black text-white text-xs font-semibold tracking-widest uppercase shadow-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
                        Success Solutions
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold text-black font-display tracking-tight">
                        Where Strategy Meets{" "}
                        <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent">
                            Performance
                        </span>
                    </h2>

                    <p className="mt-6 max-w-3xl mx-auto text-black font-bold text-base md:text-lg opacity-90">
                        We don't just offer digital marketing services—we build growth strategies that help businesses attract the right audience, generate qualified leads, increase conversions, and achieve long-term success.
                    </p>
                </div>

                {/* Responsive Grid */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 place-items-center">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="service-card-item relative z-10 w-full h-[420px] md:h-[450px] lg:h-[500px]"
                        >
                            <TiltCard service={service} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Card;
