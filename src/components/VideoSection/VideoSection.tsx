import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import videoSrc from "../../img/video.mp4";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2500",
        scrub: true,
        pin: true,
      },
    });

    // Small -> Large
    tl.fromTo(
      videoRef.current,
      {
        width: "30%",
        borderRadius: "30px",
      },
      {
        width: "100%",
        borderRadius: "0px",
        duration: 1,
      }
    );

    // Progress Bar
    tl.to(
      progressRef.current,
      {
        width: "100%",
        duration: 1,
        ease: "none",
      },
      0
    );
  }, []);

  return (
    <section
      id="video-section"
      ref={sectionRef}
      className="relative h-screen bg-black overflow-hidden"
    >
      <div className="h-screen flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="object-cover shadow-2xl"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full w-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
        />
      </div>
    </section>
  );
};

export default VideoSection;