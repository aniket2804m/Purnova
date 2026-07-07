import React from 'react'
import Hero from "../../components/ServicesComp/Seo/SeoHome";
import Overview from "../../components/ServicesComp/Seo/SeoHome";
import Process from "../../components/Home/Process";
import Faq from "../../components/ServicesComp/Brand/Faq";
import Testimonials from "../../components/Home/Testimonials";
import Work from "../../components/Work/Work";

const Seo = () => {
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

export default Seo
