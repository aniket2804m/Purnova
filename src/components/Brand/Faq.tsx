import React, { useState } from "react";
import { faqData } from "../data/faqData";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden py-10 bg-white text-neutral-900">
      {/* Dotted pattern background overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60" />
      
      {/* Ambient luxury glows */}
      <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center mb-4">
          <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-600 font-display">
            COMMON QUESTIONS
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-extrabold uppercase leading-tight text-neutral-900 md:text-5xl font-cinzel tracking-wider text-center mb-16">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 bg-clip-text text-transparent font-black">
            Questions
          </span>
        </h2>

        {/* Accordion Wrapper */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleFAQ(index)}
              className={`group rounded-[1.5rem] cursor-pointer transition-all duration-500 overflow-hidden backdrop-blur-lg ${
                activeIndex === index
                  ? "bg-white/60 border border-amber-500/40 shadow-[0_10px_30px_rgba(245,158,11,0.04)]"
                  : "bg-white/30 border border-neutral-200/40 hover:bg-white/60 hover:border-amber-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
              }`}
            >
              {/* Question Header */}
              <div className="flex justify-between items-center p-6 gap-4">
                <h4 className="font-bold text-base md:text-lg text-neutral-800 font-outfit tracking-wide group-hover:text-amber-700 transition-colors duration-300">
                  {item.question}
                </h4>

                <span className={`text-xl text-amber-600 font-bold w-8 h-8 rounded-full border border-amber-500/20 bg-amber-500/10 flex items-center justify-center transition-all duration-300 ${activeIndex === index ? "rotate-180 border-amber-500/40 bg-amber-500/25" : ""}`}>
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              {/* Answer Box */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  activeIndex === index
                    ? "max-h-[300px] opacity-100 px-6 pb-6 pt-1"
                    : "max-h-0 opacity-0 pointer-events-none"
                } overflow-hidden`}
              >
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-medium">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default React.memo(FAQ);