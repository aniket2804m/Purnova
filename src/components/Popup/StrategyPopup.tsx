import { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";

import img1 from "../../img/role/rushi sir (1).png";
import img2 from "../../img/role/manager.png";
import img3 from "../../img/role/saurabh sir.png";

export default function StrategyPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const [shown, setShown] = useState({
    start: false,
    middle: false,
    end: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setShown((prev) => ({ ...prev, start: true }));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercent =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercent >= 50 && !shown.middle && !showPopup) {
        setShowPopup(true);
        setShown((prev) => ({ ...prev, middle: true }));
      }

      if (scrollPercent >= 95 && !shown.end && !showPopup) {
        setShowPopup(true);
        setShown((prev) => ({ ...prev, end: true }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [shown, showPopup]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-6">
      {/* Popup */}
      <div className="relative w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl rounded-2xl lg:rounded-3xl bg-black border-4 border-black shadow-2xl px-5 py-8 sm:px-8 sm:py-10">

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white hover:text-yellow-300 transition"
        >
          <X className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Heading */}
        <h2 className="text-center font-bold leading-tight text-2xl sm:text-3xl lg:text-4xl">
          Talk to a Growth Expert at
          <br />
          <span className="text-yellow-300">Purnova</span>
        </h2>

        {/* Team Images */}
        <div className="flex justify-center mt-4 md:mt-6 -space-x-2 sm:-space-x-3 md:-space-x-4">
  {[img1, img2, img3].map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`User ${index + 1}`}
      loading="lazy"
      decoding="async"
      className="
        w-10 h-10
        sm:w-12 sm:h-12
        md:w-14 md:h-14
        lg:w-16 lg:h-16
        xl:w-20 xl:h-20
        rounded-full
        border-2 border-yellow-300
        bg-white
        object-contain
      "
    />
  ))}
</div>

        {/* Description */}
        <p className="text-center text-yellow-200 mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed">
          Book strategy call and get clarity on your
          marketing, branding & growth roadmap.
        </p>

        {/* Features */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 sm:gap-5 lg:gap-6 mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg font-medium text-center">
          <div>✅ No spam</div>
          <div>✅ No sales pressure</div>
          <div>✅ Just actionable insights</div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-7 sm:mt-8">
          <a
            href="https://calendly.com/your-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border-2 border-black bg-yellow-300 text-black hover:bg-yellow-400 transition px-5 py-3 sm:px-7 lg:px-8 text-sm sm:text-base lg:text-xl font-semibold"
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            Book Strategy Call ↗
          </a>
        </div>
      </div>
    </div>
  );
}