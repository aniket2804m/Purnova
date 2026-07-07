import React from 'react'
import Hero from "../../components/ServicesComp/Perform/PerformHome";
import Overview from "../../components/ServicesComp/Perform/PerformOverview";
import Process from "../../components/Home/Process";
import Faq from "../../components/ServicesComp/Perform/Performfaq";
import Testimonials from "../../components/Home/Testimonials";
import Work from "../../components/Work/Work";

const Performance = () => {
  return (
    <div>
      
      <Hero />
      <Overview />
      <Work />
      <Process />
      <Testimonials />
      <Faq />
    </div>
  )
}

export default Performance
