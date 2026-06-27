import React from 'react'
import Hero from "../../components/Brand/BrandHome";
import Process from "../../components/Home/Process";
import Faq from "../../components/Brand/Faq";
import Testimonials from "../../components/Home/Testimonials";
import Work from "../../components/Work/Work";
import GoogleOverview from "../../components/Google/GoogleOverview";

const Google = () => {
  return (
    <div>
      
      <Hero />
      <GoogleOverview />
      <Work />
      <Process />
      <Testimonials />
      <Faq />
    </div>
  )
}

export default Google;