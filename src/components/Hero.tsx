
import Home from "./Home/Home";
import Count from "./Count";
import Feature from "./Feature/Feature";
import Card from "./Card/Card";
import Process from "../components/Home/Process";
import CaseStudy from "../components/Home/CaseStudy";
import Testimonials from "../components/Home/Testimonials";
// import AdsCard from "../components/Card/AdsCard";

const Hero = () => {

  return (
    <>
            <Home />
            {/* <VideoSection /> */}
            <Count />
            <Feature />
            <Card />
    
            <Process />
            <CaseStudy />
            <Testimonials />
    </>
  );
};

export default Hero;
