
import Home from "./Home/Home";
import Count from "./Count";
import Feature from "./Feature/Feature";
import Card from "./Card/Card";
import Process from "../components/Home/Process";
import CaseStudy from "../components/Home/CaseStudy";
import Happy from "./Happy/Happy";
import Testimonials from "../components/Home/Testimonials";

const Hero = () => {

  return (
    <>
            <Home />
            <Count />
            <Feature />
            <Process />
            <Card />
            <CaseStudy />
            <Testimonials />
            <Happy />
    </>
  );
};

export default Hero;
