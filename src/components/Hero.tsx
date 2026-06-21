import { useState, useRef, useEffect } from "react";
import Home from "./Home/Home";
import VideoSection from "@/components/VideoSection/VideoSection";
import Count from "./Count";
import Feature from "./Feature/Feature";
import Card from "./Card/Card";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [videoEnded, setVideoEnded] = useState(() => {
    // Remember if the user has already watched the intro video in this session
    return sessionStorage.getItem("intro_video_watched") === "true";
  });
  const countSectionRef = useRef<HTMLDivElement>(null);

  const handleVideoEnded = () => {
    setVideoEnded(true);
    sessionStorage.setItem("intro_video_watched", "true");
  };

  useEffect(() => {
    if (videoEnded) {
      // If we just watched the video, scroll smoothly to the newly revealed content
      const hasScrolled = sessionStorage.getItem("intro_scrolled") === "true";
      if (!hasScrolled) {
        const timer = setTimeout(() => {
          countSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          sessionStorage.setItem("intro_scrolled", "true");
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [videoEnded]);

  return (
    <>
            <Home />
            {/* <VideoSection /> */}
            <Count />
            <Feature />
            <Card />
          
    </>
  );
};

export default Hero;
