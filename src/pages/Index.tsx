import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
// import Skills from "@/components/Skills";
// import Projects from "@/components/Projects";
import NeuralShowcase from "@/components/NeuralShowcase";
// import Publications from "@/components/Publications";
// import Timeline from "@/components/Timeline";
// import Certifications from "@/components/Certifications";
// import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CursorGlow />
      <ScrollProgress />
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <About />
        {/* <Skills /> */}
        {/* <Projects /> */}
        <NeuralShowcase />
        {/* <Publications /> */}
        {/* <Timeline /> */}
        {/* <Certifications /> */}
        {/* <GitHubStats /> */}
        <Contact />
        <Footer />
      </div>
      <BackToTop />
    </>
  );
};

export default Index;
