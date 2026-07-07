import React from 'react'
import Hero from "../../components/ServicesComp/SocialMedia/SocialHome";
import Overview from "../../components/ServicesComp/Brand/Overview";
import Process from "../../components/Home/Process";
import Faq from "../../components/ServicesComp/Brand/Faq";
import Testimonials from "../../components/Home/Testimonials";
import Work from "../../components/Work/Work";

const Social = () => {
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

export default Social;
