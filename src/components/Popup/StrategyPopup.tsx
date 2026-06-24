import { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";

export default function StrategyPopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Popup website open zalyavar 1 second nantar show hoil
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <>
      {/* Background Overlay */}
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
              src="/team1.jpg"
              className="w-14 h-14 rounded-full border-2 border-white"
            />
            <img
              src="/team2.jpg"
              className="w-14 h-14 rounded-full border-2 border-white"
            />
            <img
              src="/team3.jpg"
              className="w-14 h-14 rounded-full border-2 border-white"
            />
            <img
              src="/team4.jpg"
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
              className="flex items-center gap-2 rounded-full border-2 border-black px-8 py-3 text-xl font-semibold hover:bg-black hover:text-white transition"
            >
              <Calendar size={22} />
              Book Strategy Call ↗
            </a>
          </div>

        </div>
      </div>
    </>
  );
}