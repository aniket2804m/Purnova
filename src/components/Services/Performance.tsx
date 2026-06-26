import React from 'react'
import Hero from "../../components/Brand/BrandHome";
import Overview from "../../components/Brand/Overview";
import Process from "../../components/Home/Process";
import Faq from "../../components/Brand/Faq";
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
