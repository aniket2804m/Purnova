import React from 'react'
import CountUp from "react-countup";

const stats = [
  {
    number: 5000,
    suffix: "+",
    title: "Projects",
    subtitle: "Completed",
  },
  {
    number: 50,
    suffix: "+",
    title: "Happy",
    subtitle: "Clients",
  },
  {
    number: 300,
    suffix: "%",
    title: "Average ROI",
    subtitle: "Growth",
  },
  {
    number: 3,
    suffix: "+",
    title: "Years of",
    subtitle: "Experience",
  },
];

const Count = () => {
  return (
    <div id="count">
      <section
  className="relative py-12 bg-cover bg-center bg-no-repeat w-screen"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f')",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 w-full px-4 md:px-10">
    <h2 className="text-center text-white text-sm sm:text-3xl lg:text-3xl font-bold mb-5">
      Why Choose Us?
    </h2>

    <p className="mt-10 text-base sm:text-base md:text-sm lg:text-3xl text-gray-300 leading-2 max-w-6xl mx-auto mb-10">
    At Purnova, we believe marketing should create real business impact—not
    just social engagement. Our strategies are designed to generate qualified
    leads, increase conversions, and drive measurable revenue, ensuring every
    campaign contributes directly to your business growth.
  </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
      {stats.map((item, index) => (
        <div
          key={index}
          className="
            backdrop-blur-md
            bg-white/10
            border border-white/30
            rounded-3xl
            p-10
            text-center
            shadow-lg
            hover:scale-105
            transition-all
            duration-300
          "
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <CountUp
  end={item.number}
  duration={3}
  suffix={item.suffix}
  enableScrollSpy
  scrollSpyOnce
/>
          </h3>

          <p className="text-white text-xl">
            {item.title}
          </p>

          <p className="text-gray-300">
            {item.subtitle}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  )
}

export default Count
