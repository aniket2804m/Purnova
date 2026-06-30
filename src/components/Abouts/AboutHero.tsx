"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50 via-white to-white" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700"
          >
            About Purnova
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 text-5xl font-bold leading-tight text-gray-900 md:text-7xl"
          >
            We Don't Just
            <span className="block text-violet-600">
              Market Brands.
            </span>
            We Build Their Future.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-gray-600"
          >
            At Purnova, we help businesses grow through strategic digital
            marketing, creative branding, high-performing websites, and
            data-driven campaigns. Our mission is to turn ideas into impactful
            digital success stories.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button className="rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700">
              Explore Our Work
            </button>

            <button className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
              Learn More
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4"
          >
            {[
              { value: "120+", label: "Projects" },
              { value: "50+", label: "Brands" },
              { value: "95%", label: "Client Retention" },
              { value: "10M+", label: "Reach Generated" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-3xl font-bold text-gray-900">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}