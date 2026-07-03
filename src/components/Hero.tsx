import Home from "./Home/Home";
import Count from "./Count";
import Feature from "./Feature/Feature";
import Card from "./Card/Card";
import Process from "../components/Home/Process";
import CaseStudy from "../components/Home/CaseStudy";
import Happy from "./Happy/Happy";
import Testimonials from "../components/Home/Testimonials";
import { ScrollReveal } from "./ScrollProgress";

const Hero = () => {

  return (
    <>
      <Home />
      
      <ScrollReveal variant="fade-up" delay={0.1}>
        <Count />
      </ScrollReveal>
      
      <ScrollReveal variant="fade-left" delay={0.15}>
        <Feature />
      </ScrollReveal>
      
      <ScrollReveal variant="fade-right" delay={0.15}>
        <Process />
      </ScrollReveal>
      
      <ScrollReveal variant="scale-up" delay={0.2}>
        <Card />
      </ScrollReveal>
      
      <ScrollReveal variant="zoom-out" delay={0.2}>
        <CaseStudy />
      </ScrollReveal>
      
      <ScrollReveal variant="flip-up" delay={0.25}>
        <Testimonials />
      </ScrollReveal>
      
      <ScrollReveal variant="zoom-out" delay={0.25}>
        <Happy />
      </ScrollReveal>
    </>
  );
};

export default Hero;
