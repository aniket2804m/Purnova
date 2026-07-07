import React from 'react'
import Hero from "../../components/ServicesComp/Website/WebHome";
import Overview from "../../components/ServicesComp/Website/WebOverview";
import Process from "../../components/Home/Process";
import Faq from "../../components/ServicesComp/Website/Webfaq";
import Testimonials from "../../components/Home/Testimonials";
import Work from "../../components/Work/Work";

const Website = () => {
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

export default Website
