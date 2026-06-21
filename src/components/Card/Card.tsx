import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

import { services } from "../data/Card";

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
        <div style={{ perspective: 1000 }} className="relative z-10 w-full h-[450px]">
            {/* Ambient Neon Purple Glow Behind Card */}
            <motion.div
                className="absolute -inset-5 rounded-3xl opacity-0 group-hover:opacity-75 blur-3xl transition duration-500 pointer-events-none z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            280px circle at ${mouseX}px ${mouseY}px,
                            rgba(139, 92, 246, 0.35),
                            rgba(34, 211, 238, 0.15) 60%,
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                animate={isHovered ? { y: -8 } : { y: [0, -8, 0] }}
                transition={
                    isHovered 
                        ? { type: "spring", stiffness: 300, damping: 20 }
                        : { y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 } }
                }
                className="group relative h-full w-full rounded-3xl bg-white/5 border border-white/10 p-[1.5px] shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_50px_rgba(139,92,246,0.25)] transition-shadow duration-500"
            >
                <div
                    style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
                    className="relative h-full w-full rounded-[22px] bg-neutral-950/60 backdrop-blur-xl overflow-hidden"
                >
                    {/* Background Image with Parallax-ish Effect */}
                    <motion.img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover opacity-15 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-25"
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/5 pointer-events-none" />

                    {/* Moving Metallic Shine Effect */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[22px] opacity-0 group-hover:opacity-100 transition duration-300 z-10"
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
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-2xl shadow-lg shadow-purple-500/10 backdrop-blur-md border border-purple-500/20">
                                {service.icon}
                            </div>
                            
                            <h3 className="mb-3 text-3xl font-black tracking-tight text-white font-display drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                {service.title}
                            </h3>
                            
                            <p className="mb-6 text-base leading-relaxed text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 drop-shadow-lg">
                                {service.description}
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-fit rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-bold text-white shadow-xl shadow-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150"
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
                                rgba(168, 85, 247, 0.45),
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
    return (
        <section className="relative overflow-hidden bg-background py-5 px-4 lg:px-8">
            {/* Ambient Background Lights */}
            <div className="pointer-events-none absolute top-0 -left-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 -right-20 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary"
                    >
                        Success Solutions
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mb-6 text-4xl font-extrabold tracking-tight gradient-text md:text-3xl font-display"
                    >
                        Where Strategy Meets Performance
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto max-w-2xl text-lg text-gray-400"
                    >
                       We don't just offer digital marketing services—we build growth strategies that help businesses attract the right audience, generate qualified leads, increase conversions, and achieve long-term success.
                    </motion.p>
                </div>

                {/* Responsive Grid */}
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <TiltCard key={index} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Card;
