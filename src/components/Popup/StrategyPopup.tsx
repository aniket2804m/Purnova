import { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";

import img1 from "../../img/role/rushi sir (1).png";
import img2 from "../../img/role/manager.png";
import img3 from "../../img/role/saurabh sir.png";
import img4 from "../../img/role/avinash.png";

export default function StrategyPopup() {
  const [showPopup, setShowPopup] = useState(false);

  // Track popup already shown at each stage
  const [shown, setShown] = useState({
    start: false,
    middle: false,
    end: false,
  });

  // Website load popup
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setShown((prev) => ({ ...prev, start: true }));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll popup
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const scrollPercent =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      // Middle (around 50%)
      if (
        scrollPercent >= 50 &&
        !shown.middle &&
        !showPopup
      ) {
        setShowPopup(true);
        setShown((prev) => ({ ...prev, middle: true }));
      }

      // End (95%)
      if (
        scrollPercent >= 95 &&
        !shown.end &&
        !showPopup
      ) {
        setShowPopup(true);
        setShown((prev) => ({ ...prev, end: true }));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [shown, showPopup]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
      {/* Popup */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-black p-8 shadow-2xl border-4 border-black">

        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute right-5 top-5"
        >
          <X size={30} />
        </button>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center leading-tight">
          Talk to a Growth Expert at
          <br />
          <span className="text-yellow-300">Purnova</span>
        </h2>

        {/* Team Images */}
        <div className="flex justify-center mt-6 -space-x-3">
          <img
            src={img1}
            alt=""
            className="w-14 h-14 rounded-full border-2 border-white"
          />
          <img
            src={img2}
            alt=""
            className="w-14 h-14 rounded-full border-2 border-white"
          />
          <img
            src={img3}
            alt=""
            className="w-14 h-14 rounded-full border-2 border-white"
          />
          <img
            src={img4}
            alt=""
            className="w-14 h-14 rounded-full border-2 border-white"
          />
        </div>

        {/* Description */}
        <p className="text-center text-yellow-200 mt-6 text-lg">
          Book a 30-minute strategy call and get clarity on your
          marketing, branding & growth roadmap.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-lg font-medium">
          <div>✅ No spam</div>
          <div>✅ No sales pressure</div>
          <div>✅ Just actionable insights</div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <a
            href="https://calendly.com/your-link"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border-2 border-black px-8 py-3 text-xl font-semibold hover:bg-yellow-300 hover:text-black transition"
          >
            <Calendar size={22} />
            Book Strategy Call ↗
          </a>
        </div>
      </div>
    </div>
  );
}