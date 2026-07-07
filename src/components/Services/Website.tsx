import React from 'react'
import Hero from "../../components/Website/WebHome";
import Overview from "../../components/Website/WebOverview";
import Process from "../../components/Home/Process";
import Faq from "../../components/Website/Webfaq";
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
