import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

// logos
import img1 from "../img/logo/Copy of Upscale logo.png";
import img2 from "../img/logo/Copy of Logo Pune voice 5.png";
import img3 from "../img/logo/Vaichal vastu.png";
import img6 from "../img/logo/Copy of TheWordSmiths_Logo_final_v1-01.png";
import img7 from "../img/logo/freepik__background__73525 (1).png";
import img8 from "../img/logo/tyb logo Updated (1).png";
import img9 from "../img/logo/IMPORT EXPORT FEDERATION LOGO - PNG WITH BG (1).png";
import img10 from "../img/logo/Saffron.png";
import img11 from "../img/logo/vada.png";
import img12 from "../img/logo/Green.png";
import img13 from "../img/logo/Asset 2.png";
import img14 from "../img/logo/3.png";
import img15 from "../img/logo/Copy of Untitled-1.png";
import img16 from "../img/logo/Jivastro 22-01 copy LOGO.png";
import img18 from "../img/logo/Gentle hair wig logo 4.png";
import img19 from "../img/logo/FINAL final.png"
import img20 from "../img/logo/Dr Auto Logo.png"
import img21 from "../img/logo/COSMICGANGES Logo.png"
import img22 from "../img/logo/Eat Right Up Logo (1).png"
import img23 from "../img/logo/delight.png"
import img24 from "../img/logo/Ashi.png"
import img25 from "../img/logo/siraa.jpeg"
import img26 from "../img/logo/LOGO (1).png"
import img27 from "../img/logo/sanvee.png"
import img28 from "../img/logo/Sonalee Kulkarni.png"
import img29 from "../img/logo/Vard Vinayak.png"
import img30 from "../img/logo/urban logo-01.png"
import img31 from "../img/logo/zistral.png"
import img32 from "../img/logo/ssk.png"
import img33 from "../img/logo/logo.png"
import img34 from "../img/logo/travchal.png"
import img35 from "../img/logo/ketring.png"
import img36 from "../img/logo/abhijeet.png"

type Category =
  | "Media"
  | "Products"
  | "Education"
  | "Healthcare"
  | "Personal Branding"
  | "Hotels & Restaurants"
  | "Events"
  | "Fashion"
  | "Automotive"
  | "Real Estate"
  | "Interior Design"
  | "Spiritual & Wellness"
  | "Import & Export Business"
  | "Travel & Tourism"
  | "Fitness"
  | "Beauty";

interface Client {
  id: string;
  name: string;
  handle: string;
  category: Category;
  logo?: string | null; // e.g. "/logos/bushare.png" - shown on the card
  cover?: string | null; // e.g. "/covers/bushare.jpg" - bigger image shown in modal, falls back to logo
  services: string[];
  result?: string; // e.g. "+150% Reach"
  testimonial?: string;
  description?: string; // short paragraph shown inside the modal
  caseStudy?: boolean;
  caseStudyRoute?: string;
  featured?: boolean;
  // route: string;
}

const CLIENTS: Client[] = [
  {
  id: "hotelwada",
  name: "Hotel Wada Pashan",
  handle: "@hotelwada",
  category: "Hotels & Restaurants",
  services: ["Booking Website", "Local SEO"],
  result: "81.3K Followers",
  logo: img11,
  cover: img11,
  testimonial:
    "Purnova transformed our online presence. Our bookings increased significantly, and guests now find us much more easily online.",
  description:
    "Hotel Wada wanted a modern digital presence that reflected its warm hospitality and authentic experience. Purnova designed a high-performance booking website with a seamless reservation process, optimized it for local SEO, and improved its visibility on Google. The result was a faster booking experience, stronger local reach, and a noticeable increase in direct customer inquiries and reservations.",
  caseStudy: true,
  featured: true,
},
{
  id: "drauto",
  name: "DR Auto",
  handle: "@_the_dr_auto_",
  category: "Automotive",
  services: ["Reels", "Content Calendar"],
  result: "+4.4M Views",
  logo: img20,
  cover: img20,
  testimonial:
    "Purnova helped us create engaging automotive content that boosted our online visibility and brought more customers to our workshop.",
  description:
    "DR Auto wanted to grow its presence on social media and showcase its expertise in the automotive industry. Purnova developed a strategic content calendar and produced high-quality, engaging reels that highlighted services, customer transformations, and expert tips. The consistent content strategy increased brand awareness, generated over 4.4M views, and helped attract more inquiries from potential customers.",
  caseStudy: true,
  featured: true,
},

{
  id: "punevoices",
  name: "Pune Voices",
  handle: "@punevoices",
  category: "Media",
  services: ["Podcast Branding", "Reels", "Editing"],
  result: "+220% Reach",
  logo: img2,
  cover: img2,
  testimonial:
    "Every episode now looks and feels premium. Purnova gave our podcast a professional identity that truly stands out.",
  description:
    "Pune Voices wanted to build a strong and recognizable podcast brand across digital platforms. Purnova crafted a complete visual identity, designed engaging episode creatives, produced high-quality short-form reels, and delivered professional video editing for every release. This consistent branding and content strategy increased audience engagement, expanded reach by over 220%, and helped establish Pune Voices as a premium podcast brand.",
  caseStudy: true,
  featured: true,
},

{
    id: "bushare",
    name: "Bushare",
    handle: "@buybushare",
    category: "Fashion",
    logo: img19,
    cover: img19,
    services: ["Web Design", "E-commerce", "Reels"],
    result: "+180% Sales",
    testimonial: "Purnova rebuilt and sales doubled in 8 weeks.",
    description:
      "Bushare, a Korean fashion label entering the Indian market, needed a storefront that felt as premium as the product. We rebuilt their site from scratch with a fast checkout flow and a matching reel strategy that carried the same visual language across Instagram.",
    caseStudy: true,
    featured: true,
    caseStudyRoute: "/bushare",
},

{
  id: "importexport",
  name: "Import Export",
  handle: "@import.export.federation",
  category: "Import & Export Business",
  services: ["Full Website"],
  result: "Modern Business Presence",
  logo: img9,
  cover: img9,
  testimonial:
    "Purnova delivered a professional website that perfectly represents our organization and makes it easier for businesses to connect with us.",
  description:
    "The Import Export Federation needed a modern, responsive website to showcase its services, industry initiatives, and business network. Purnova designed and developed a fast, user-friendly website with a clean interface, intuitive navigation, and mobile-first performance. The new platform strengthened the federation's digital presence, improved credibility, and provided businesses with an easier way to explore services and connect with the organization.",
  caseStudy: true,
  featured: true,
},

  {
  id: "savaniee",
  name: "Savaniee",
  handle: "@savanieeravindrra",
  category: "Personal Branding",
  services: ["Personal Branding", "Reels"],
  result: "+3.1x Engagement",
  logo: img27,
  cover: img27,
  testimonial:
    "Purnova helped me build a personal brand that feels authentic, professional, and engaging. My audience interaction has grown significantly.",
  description:
    "Savaniee wanted to establish a memorable personal brand and create content that genuinely connected with her audience. Purnova developed a cohesive branding strategy, produced engaging short-form reels, and maintained a consistent visual identity across social platforms. The result was stronger audience engagement, improved brand recognition, and a 3.1x increase in overall engagement.",
  caseStudy: true,
  featured: true,
},

 {
  id: "sonaleek",
  name: "Sonalee Kulkarni",
  handle: "@sonalee16988",
  category: "Personal Branding",
  services: ["Personal Branding"],
  result: "Stronger Personal Presence",
  logo: img28,
  cover: img28,
  testimonial:
    "Purnova helped me create a professional personal brand that truly reflects who I am and connects with my audience.",
  description:
    "Sonalee Kulkarni wanted to build a strong and authentic personal brand that would stand out across digital platforms. Purnova crafted a unique brand identity, refined the visual style, and developed a consistent content strategy to showcase her personality and expertise. The result was a polished online presence, increased audience trust, and a brand that leaves a lasting impression.",
  caseStudy: true,
  featured: true,
},

{
  id: "SalmanShaikhUpscale",
  name: "Salman Shaikh Upscale",
  handle: "@salmanshaikh_upscale",
  category: "Personal Branding",
  logo: img1,
  cover: img1,
  services: ["Branding", "Social Media"],
  result: "+2.4x Followers",
  testimonial:
    "Purnova understood our brand vision from day one. Every piece of content now feels premium, consistent, and true to our identity.",
  description:
    "Upscale, a personal styling and fashion brand, wanted to establish a distinctive and memorable presence on social media. Purnova developed a cohesive brand identity, defined a consistent visual language, and implemented a strategic content system that reflected the brand's personality across every platform. The result was a stronger online presence, a 2.4x increase in followers, and a recognizable brand that continues to engage and grow its audience.",
  caseStudy: true,
  featured: true,
},

  {
  id: "shrisamarth",
  name: "Shri Samarth",
  handle: "@shrisamarthakrupa",
  category: "Products",
  services: ["Brochure Website"],
  result: "Professional Online Presence",
  logo: img32,
  cover: img32,
  testimonial:
    "Purnova created a modern website that showcases our projects beautifully and makes it easier for customers to connect with us.",
  description:
    "Shri Samarth wanted a professional brochure website to present its real estate projects with clarity and credibility. Purnova designed a responsive, visually appealing website featuring project highlights, amenities, location details, and easy inquiry options. The result was a strong digital presence that builds trust, enhances the customer experience, and helps generate quality leads for the business.",
  caseStudy: true,
  featured: true,
},

{
  id: "hotelwada Katraj",
  name: "Hotel Wada Katraj",
  handle: "@hotelwada",
  category: "Hotels & Restaurants",
  services: ["Booking Website", "Local SEO"],
  result: "81.3K Followers",
  logo: img11,
  cover: img11,
  testimonial:
    "Purnova transformed our online presence. Our bookings increased significantly, and guests now find us much more easily online.",
  description:
    "Hotel Wada wanted a modern digital presence that reflected its warm hospitality and authentic experience. Purnova designed a high-performance booking website with a seamless reservation process, optimized it for local SEO, and improved its visibility on Google. The result was a faster booking experience, stronger local reach, and a noticeable increase in direct customer inquiries and reservations.",
  caseStudy: true,
  featured: true,
},

 {
  id: "eatrightup",
  name: "Eat Right Up",
  handle: "@eatrightup",
  category: "Products",
  services: ["Menu Design", "Reels"],
  result: "+65% Orders",
  logo: img22,
  cover: img22,
  testimonial:
    "Purnova transformed our brand with creative menus and engaging content that brought in more customers.",
  description:
    "Eat Right Up wanted to increase online orders and build a stronger food brand. Purnova designed premium menu creatives, produced engaging reels, and created a consistent social media strategy that highlighted the brand's offerings. The campaign resulted in a 65% increase in orders and improved customer engagement.",
  caseStudy: true,
  featured: true,
},

{
  id: "delightevents",
  name: "Delight Events",
  handle: "@delight_event_decor",
  category: "Events",
  services: ["Portfolio Website", "Photography"],
  result: "Premium Brand Presence",
  logo: img23,
  cover: img23,
  testimonial:
    "Our website now perfectly showcases our work and helps clients trust our brand before they even contact us.",
  description:
    "Delight Events needed a modern portfolio website to showcase event decorations and photography. Purnova designed a visually rich website with stunning galleries and smooth navigation, helping the brand present its work professionally and attract more event inquiries.",
  caseStudy: true,
  featured: true,
},

{
  id: "sadgeemasale",
  name: "Sadgee Masale",
  handle: "@sadgee_masale",
  category: "Products",
  services: ["Packaging", "D2C Website"],
  result: "+120% Repeat Buyers",
  logo: img26,
  cover: img26,
  testimonial:
    "The new packaging and website completely elevated our brand and customer experience.",
  description:
    "Sadgee Masale wanted to modernize its spice brand for direct-to-consumer sales. Purnova designed attractive packaging and developed a fast, user-friendly D2C website that strengthened customer trust and increased repeat purchases by 120%.",
  caseStudy: true,
  featured: true,
},

{
  id: "vaichalgroup",
  name: "Vaichal Group",
  handle: "@vaichalgroup",
  category: "Real Estate",
  services: ["Landing Page", "Lead Funnel"],
  result: "+40 Qualified Leads/mo",
  logo: img3,
  cover: img3,
  testimonial:
    "Purnova built a lead generation system that consistently brings us high-quality inquiries every month.",
  description:
    "Vaichal Group required a high-converting landing page to generate real estate leads. Purnova designed an optimized landing page with persuasive content and an effective lead funnel, resulting in more than 40 qualified leads every month.",
  caseStudy: true,
  featured: true,
},

{
  id: "varadvinayak",
  name: "Varad Vinayak",
  handle: "@varadvinayak",
  category: "Real Estate",
  services: ["Landing Page"],
  result: "Higher Lead Conversion",
  logo: img29,
  cover: img29,
  testimonial:
    "The landing page looks professional and has significantly improved our customer inquiries.",
  description:
    "Varad Vinayak wanted a focused landing page to promote its real estate projects. Purnova designed a modern, conversion-focused page with clear project information and inquiry forms, helping the brand generate more qualified leads.",
  caseStudy: true,
  featured: true,
},

{
  id: "siraa",
  name: "Siraa",
  handle: "@houseofsiraa",
  category: "Fashion",
  services: ["Lookbook Website", "Reels"],
  result: "+2.8x Brand Engagement",
  logo: img25,
  cover: img25,
  testimonial:
    "Purnova helped us create a premium fashion experience both on our website and social media.",
  description:
    "House of Siraa wanted a stylish digital identity that reflected its fashion collections. Purnova created a modern lookbook website and engaging reels that showcased the brand's aesthetic, resulting in stronger engagement and better customer interaction.",
  caseStudy: true,
  featured: true,
},

{
  id: "urbaned",
  name: "Urban Ed",
  handle: "@urban_education_official",
  category: "Education",
  services: ["Course Platform", "SEO"],
  result: "+310 Enrollments",
  logo: img30,
  cover: img30,
  testimonial:
    "Our online learning platform is now faster, easier to use, and brings in more students every month.",
  description:
    "Urban Ed partnered with Purnova to build a scalable course platform and improve search visibility. Through a user-friendly learning experience and SEO optimization, the platform achieved over 310 student enrollments and stronger organic growth.",
  caseStudy: true,
  featured: true,
},

{
  id: "aashiskool",
  name: "Aashi Skool",
  handle: "@aashiforestskool",
  category: "Education",
  services: ["Website", "Admissions Funnel"],
  result: "Higher Admission Inquiries",
  logo: img24,
  cover: img24,
  testimonial:
    "The admissions process became much smoother after launching our new website.",
  description:
    "Aashi Skool wanted a modern website that simplified admissions and showcased its educational philosophy. Purnova developed a responsive website with a streamlined admissions funnel, making it easier for parents to explore programs and submit inquiries.",
  caseStudy: true,
  featured: true,
},

{
  id: "glamowell",
  name: "Glamowell",
  handle: "@glamowellofficial",
  category: "Spiritual & Wellness",
  services: ["Social Media", "Reels"],
  result: "+2.5x Engagement",
  logo: img12,
  cover: img12,
  testimonial:
    "Our content now feels premium, consistent, and connects much better with our audience.",
  description:
    "Glamowell wanted to strengthen its digital presence through creative social media content. Purnova developed a content strategy and produced engaging reels that increased audience interaction, improved brand recognition, and delivered consistent growth.",
  caseStudy: true,
  featured: true,
},

{
  id: "jiivastro",
  name: "Jiivastro Academy",
  handle: "@jiivaastro_academy",
  category: "Spiritual & Wellness",
  services: ["Social Media", "Reels"],
  result: "+2.5x Engagement",
  logo: img16,
  cover: img16,
  testimonial:
    "Purnova helped us create a meaningful digital presence that connects deeply with our community and strengthens our online identity.",
  description:
    "Jiivastro Academy wanted to expand its digital reach and share spiritual knowledge through engaging social media content. Purnova developed a strategic content plan, created visually appealing reels, and maintained a consistent brand identity across platforms. By combining educational storytelling with high-quality visuals, the brand experienced stronger audience engagement, improved visibility, and a growing community interested in astrology and spiritual learning.",
  caseStudy: true,
  featured: true,
},

{
  id: "IROKO ",
  name: "IROKO ",
  handle: "@irokobydesignchords",
  category: "Interior Design",
  services: ["Clinic Website", "Local SEO"],
  result: "+55% Bookings",
  logo: img7,
  cover: img7,
  testimonial:
    "Patients can now find us more easily online, and our appointment bookings have grown significantly.",
  description:
    "IROKO  needed a professional clinic website and stronger local visibility. Purnova developed a responsive website and implemented a comprehensive local SEO strategy, resulting in a 55% increase in appointment bookings and improved online trust.",
  caseStudy: true,
  featured: true,
},

{
  id: "zistral",
  name: "Zistral",
  handle: "@zistral_oral_care",
  category: "Healthcare",
  services: ["D2C Website", "Packaging"],
  result: "+2x Repeat Orders",
  logo: img31,
  cover: img31,
  testimonial:
    "The new packaging and online store gave our products a premium feel and improved customer loyalty.",
  description:
    "Zistral Oral Care partnered with Purnova to refresh its packaging and launch a high-performing D2C website. The cohesive branding and seamless shopping experience increased customer confidence and doubled repeat orders.",
  caseStudy: true,
 featured: true,
},

{
  id: "punerivillage",
  name: "Puneri Village",
  handle: "@punerivillage",
  category: "Hotels & Restaurants",
  services: ["Restaurant Website", "Local SEO"],
  result: "+72% Online Inquiries",
  logo: img13,
  cover: img13,
  testimonial:
    "Purnova helped us create a strong online presence that attracts more diners and makes it easier for customers to discover our restaurant.",
  description:
    "Puneri Village wanted a modern digital identity that reflected its authentic Maharashtrian hospitality and dining experience. Purnova designed a fast, mobile-friendly restaurant website featuring the menu, gallery, location, and contact details, while implementing a Local SEO strategy to improve Google visibility. The result was increased online inquiries, stronger local reach, and more customers visiting the restaurant.",
  caseStudy: true,
  featured: true,
},

{
  id: "cosmicganges",
  name: "Cosmic Ganges",
  handle: "@cosmicganges",
  category: "Spiritual & Wellness",
  services: ["Social Media", "Reels"],
  result: "+2.5x Engagement",
  logo: img21,
  cover: img21,
  testimonial:
    "Purnova helped us build a calm, consistent, and meaningful digital presence that truly resonates with our audience.",
  description:
    "Cosmic Ganges wanted to inspire and connect with a wider audience through engaging spiritual content. Purnova developed a content strategy focused on storytelling, mindfulness, and visual consistency while creating high-quality reels and social media creatives. The result was stronger audience engagement, increased brand awareness, and a distinctive digital presence that reflects the brand's spiritual values.",
  caseStudy: true,
  featured: true,
},

{
  id: "abhijitshinde",
  name: "Abhijit Shinde Export Mentor",
  handle: "@abhijitshinde.export",
  category: "Personal Branding",
  logo: img36,
  cover: img36,
  services: ["Personal Branding", "Social Media"],
  result: "+2.4x Followers",
  testimonial:
    "Purnova helped me establish a professional digital presence that builds trust and positions me as an export industry mentor.",
  description:
    "Abhijit Shinde Export Mentor wanted to build a credible personal brand that inspires aspiring exporters and business professionals. Purnova developed a complete personal branding strategy, created a consistent visual identity, and managed high-quality social media content that showcased expertise, success stories, and educational insights. The result was stronger audience engagement, increased brand authority, and steady growth across digital platforms.",
  caseStudy: true,
  featured: true,
},

{
  id: "drparachittypk",
  name: "Dr Parachitty PK",
  handle: "@dr.prachitipunde_official",
  category: "Personal Branding",
  logo: img1,
  cover: img1,
  services: ["Personal Branding", "Social Media"],
  result: "+2.4x Followers",
  testimonial:
    "Purnova helped me build a trustworthy and professional digital identity that reflects my expertise and connects with the right audience.",
  description:
    "Dr. Parachitty PK wanted to establish a strong personal brand that showcased professional expertise while building trust with patients and followers. Purnova created a consistent personal branding strategy, developed high-quality social media content, and designed a cohesive visual identity across platforms. The result was improved audience engagement, stronger online credibility, and a growing digital presence that reflects the doctor's expertise and values.",
  caseStudy: true,
  featured: true,
},

{
  id: "upscale",
  name: "Upscale",
  handle: "@salmanshaikh_upscale",
  category: "Real Estate",
  logo: img1,
  cover: img1,
  services: ["Branding", "Social Media"],
  result: "+2.4x Followers",
  testimonial:
    "Purnova understood our brand vision from day one. Every piece of content now feels premium, consistent, and true to our identity.",
  description:
    "Upscale, a personal styling and fashion brand, wanted to establish a distinctive and memorable presence on social media. Purnova developed a cohesive brand identity, defined a consistent visual language, and implemented a strategic content system that reflected the brand's personality across every platform. The result was a stronger online presence, a 2.4x increase in followers, and a recognizable brand that continues to engage and grow its audience.",
  caseStudy: true,
  featured: true,
},

{
  id: "transcendental",
  name: "Transcendental",
  handle: "@transcendental",
  category: "Education",
  services: ["Website", "Admissions Funnel"],
  result: "Higher Admission Inquiries",
  logo: img33,
  cover: img33,
  testimonial:
    "Purnova delivered a modern website that streamlined our admissions journey and created a professional first impression for prospective students.",
  description:
    "Transcendental wanted a powerful digital platform to showcase its educational programs and simplify the student admission process. Purnova designed and developed a responsive, user-friendly website with a seamless admissions funnel, making it easier for prospective students to explore courses, submit inquiries, and begin their enrollment journey. The result was a stronger online presence, improved user experience, and a noticeable increase in admission inquiries.",
  caseStudy: true,
  featured: true,
},

{
  id: "audiora",
  name: "Audiora",
  handle: "@audiora",
  category: "Education",
  services: ["Website", "Admissions Funnel"],
  result: "Higher Admission Inquiries",
  logo: img26,
  cover: img26,
  testimonial:
    "Purnova created a professional digital experience that made it easier for students to discover our programs and begin their learning journey.",
  description:
    "Audiora wanted a modern educational platform that effectively showcased its courses while simplifying the admissions process. Purnova designed and developed a responsive, user-friendly website with an intuitive admissions funnel, clear course information, and optimized inquiry forms. The result was a stronger online presence, an improved user experience, and a significant increase in student inquiries and admissions.",
  caseStudy: true,
  featured: true,
},

{
  id: "smilesworld",
  name: "Smiles World",
  handle: "@smilesworld10",
  category: "Travel & Tourism",
  services: ["Website", "Brand Identity", "Social Media"],
  result: "Stronger Brand Presence & More Travel Inquiries",
  logo: img6,
  cover: img6,
  testimonial:
    "Purnova helped us create a modern digital presence that reflects our passion for travel and connects us with more adventure seekers.",
  description:
    "Smiles World wanted to build a memorable travel brand that inspires people to explore with confidence. Purnova designed a modern website, developed a distinctive brand identity, and created engaging social media content that showcased curated tours, women-only trips, community travel experiences, and personalized holiday packages. The result was a stronger digital presence, increased customer trust, and a steady rise in travel inquiries.",
  caseStudy: true,
  featured: true,
},

{
  id: "traventureindia",
  name: "Traventure India",
  handle: "@traventureindia",
  category: "Travel & Tourism",
  services: ["Website", "Brand Identity", "Social Media"],
  result: "Stronger Brand Presence & More Travel Inquiries",
  logo: img34,
  cover: img34,
  testimonial:
    "Purnova helped us establish a vibrant digital identity that inspires travelers and generates quality travel inquiries.",
  description:
    "Traventure India wanted to create a powerful online presence that showcased its unique travel experiences and adventure packages. Purnova designed a modern, responsive website, crafted a distinctive brand identity, and developed engaging social media content that highlighted destinations, curated itineraries, and unforgettable travel experiences. The result was increased brand visibility, stronger customer trust, and a consistent flow of travel inquiries.",
  caseStudy: true,
  featured: true,
},

{
  id: "saffron",
  name: "Saffron",
  handle: "@saffron",
  category: "Beauty",
  logo: img10,
  cover: img10,
  services: ["Web Design", "E-commerce", "Reels"],
  result: "+180% Sales",
  testimonial:
    "Purnova transformed our online store with a premium shopping experience and a content strategy that significantly boosted our sales.",
  description:
    "Saffron wanted to build a premium fashion brand with a seamless online shopping experience. Purnova designed and developed a modern e-commerce website with intuitive navigation, a fast checkout process, and a mobile-first user experience. Alongside the website, we created engaging Instagram reels and a consistent visual identity that strengthened the brand across digital platforms. The result was a 180% increase in sales, higher customer engagement, and a stronger online presence.",
  caseStudy: true,
  featured: true,
},

{
  id: "akshaycaterings",
  name: "Akshay Caterings",
  handle: "@akshaycaterings",
  category: "Events",
  services: ["Portfolio Website", "Photography"],
  result: "Premium Brand Presence",
  logo: img35,
  cover: img35,
  testimonial:
    "Purnova helped us showcase our catering services with a professional online presence that builds trust and attracts more event inquiries.",
  description:
    "Akshay Caterings wanted a modern digital portfolio that highlighted its catering expertise and event experiences. Purnova designed a visually appealing portfolio website with high-quality food and event photography, service showcases, and an easy inquiry system. The result was a stronger brand identity, increased customer confidence, and more inquiries for weddings, corporate events, and special occasions.",
  caseStudy: true,
  featured: true,
},

{
  id: "punetrading",
  name: "Pune Trading",
  handle: "@punetrading",
  category: "Education",
  services: ["Course Platform", "SEO"],
  result: "+310 Enrollments",
  logo: img14,
  cover: img14,
  testimonial:
    "Purnova built a professional learning platform that made it easier for students to enroll and access our trading courses.",
  description:
    "Pune Trading wanted to create a modern online platform for aspiring traders to learn through structured courses and educational content. Purnova designed and developed a responsive course platform with seamless navigation, optimized the website for search engines, and created a user-friendly learning experience. The result was increased online visibility, stronger student engagement, and over 310 successful course enrollments.",
  caseStudy: true,
  featured: true,
},

{
  id: "tyb",
  name: "TYB",
  handle: "@tyb",
  category: "Fitness",
  services: ["Website", "SEO"],
  result: "+3.2x Membership Inquiries",
  logo: img8,
  cover: img8,
  testimonial:
    "Purnova created a powerful online presence that helped us attract more fitness enthusiasts and grow our community.",
  description:
    "TYB wanted a modern fitness website that reflected its commitment to health, strength, and transformation. Purnova designed and developed a responsive, high-performance website with a seamless user experience, optimized it for search engines, and created a strong digital presence. The result was increased online visibility, higher membership inquiries, and stronger engagement with potential clients looking for fitness coaching and training programs.",
  caseStudy: true,
  featured: true,
},

{
  id: "gentalhair",
  name: "Gental Hair",
  handle: "@gentalhair",
  category: "Beauty",
  logo: img18,
  cover: img18,
  services: ["Website", "E-commerce", "Social Media"],
  result: "+180% Sales",
  testimonial:
    "Purnova helped us build a premium beauty brand with a modern online store and a strong social media presence that increased customer trust and sales.",
  description:
    "Gental Hair wanted to establish a premium digital presence for its hair care and beauty products. Purnova designed and developed a fast, mobile-friendly e-commerce website with a seamless shopping experience, while creating engaging social media content that highlighted product benefits and customer transformations. The result was stronger brand recognition, higher customer engagement, and a 180% increase in online sales.",
  caseStudy: true,
  featured: true,
},

{
  id: "zistral",
  name: "Zistral",
  handle: "@zistral_oral_care",
  category: "Products",
  services: ["D2C Website", "Packaging"],
  result: "+2x Repeat Orders",
  logo: img31,
  cover: img31,
  testimonial:
    "The new packaging and online store gave our products a premium feel and improved customer loyalty.",
  description:
    "Zistral Oral Care partnered with Purnova to refresh its packaging and launch a high-performing D2C website. The cohesive branding and seamless shopping experience increased customer confidence and doubled repeat orders.",
  caseStudy: true,
 featured: true,
},

];

const CATEGORIES: (Category | "All")[] = [
  "All",
  "Media",
  "Products",
  "Education",
  "Healthcare",
  "Personal Branding",
  "Hotels & Restaurants",
  "Events",
  "Fashion",
  "Automotive",
  "Real Estate",
  "Interior Design",
  "Spiritual & Wellness",
  "Import & Export Business",
  "Travel & Tourism",
  "Fitness",
  "Beauty",
];

const STATS = [
  { label: "Brands Grown", value: 50, suffix: "+" },
  { label: "Industries", value: 12, suffix: "" },
  { label: "Avg. Growth", value: 3, suffix: "x" },
  { label: "Reels Produced", value: 400, suffix: "+" },
];

/* ------------------------------------------------------------------ */
/*  UTIL: category -> accent glow color (subtle, on-brand)             */
/* ------------------------------------------------------------------ */

const CATEGORY_GLOW: Record<string, string> = {
  Media: "rgba(212,175,55,0.18)",
  "Food & Beverage": "rgba(212,175,55,0.14)",
  Education: "rgba(212,175,55,0.16)",
  Technology: "rgba(212,175,55,0.20)",
  "Personal Brands": "rgba(212,175,55,0.14)",
  "Hotels & Restaurants": "rgba(212,175,55,0.14)",
  Events: "rgba(212,175,55,0.14)",
  Fashion: "rgba(212,175,55,0.18)",
  Automotive: "rgba(212,175,55,0.16)",
  "Real Estate": "rgba(212,175,55,0.14)",
  "Interior Design": "rgba(212,175,55,0.16)",
  "Spiritual & Wellness": "rgba(212,175,55,0.16)",
  "Import & Export Business": "rgba(212,175,55,0.16)",
  "Travel & Tourism": "rgba(212,175,55,0.16)",
  "Fitness": "rgba(212,175,55,0.16)",
  "Beauty": "rgba(212,175,55,0.16)"
};

/* ------------------------------------------------------------------ */
/*  STAT COUNTER                                                       */
/* ------------------------------------------------------------------ */

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6">
      <span className="font-serif text-4xl md:text-5xl text-[#f2c94c] tabular-nums">
        {display}
        {suffix}
      </span>
      <span className="mt-2 text-[11px] tracking-[0.2em] uppercase text-white/50">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CLIENT CARD                                                        */
/* ------------------------------------------------------------------ */

function ClientCard({
  client,
  index,
  onOpen,
}: {
  client: Client;
  index: number;
  onOpen: (client: Client) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const initials = client.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.div
      layoutId={`card-${client.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(client)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(client)}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] cursor-pointer group"
      style={{
        boxShadow: hovered ? `0 0 40px -8px ${CATEGORY_GLOW[client.category] || "rgba(212,175,55,0.15)"}` : "none",
        transition: "box-shadow 0.4s ease, border-color 0.3s ease",
        borderColor: hovered ? "rgba(242,201,76,0.3)" : "rgba(255,255,255,0.1)"
      }}
    >
      {/* top media area */}
      <div className={`relative w-full ${client.featured ? "h-64" : "h-44"} bg-[#181818] flex items-center justify-center overflow-hidden`}>
        
        {/* Cover image background context */}
        {client.cover ? (
          <img
            src={client.cover}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20 transition-all duration-500 group-hover:scale-105 group-hover:opacity-30"
          />
        ) : client.logo ? (
          <img
            src={client.logo}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-[2px] transition-all duration-500 group-hover:scale-105"
          />
        ) : null}

        {/* Dark overlay to ensure logo visibility */}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />

        {/* The logo/avatar container that moves on hover */}
        <div className={`relative z-10 w-full h-full flex items-center justify-center p-6 transition-all duration-300 ${hovered ? "scale-75 -translate-y-4 opacity-50" : "scale-100 translate-y-0"}`}>
          {client.logo && !imgError ? (
            <motion.img
              layoutId={`logo-${client.id}`}
              src={client.logo}
              alt={`${client.name} logo`}
              onError={() => setImgError(true)}
              className={`${client.featured ? "max-h-28" : "max-h-20"} max-w-full object-contain opacity-95 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}
            />
          ) : (
            <div className={`${client.featured ? "w-20 h-20 text-3xl" : "w-16 h-16 text-2xl"} rounded-full border border-[#f2c94c]/40 flex items-center justify-center text-[#f2c94c] font-serif`}>
              {initials}
            </div>
          )}
        </div>

        {/* result badge, top right     */}
        {client.result && !hovered && (
          <span className="absolute top-3 right-3 text-[10px] tracking-wide uppercase bg-black/60 border border-[#f2c94c]/30 text-[#f2c94c] rounded-full px-2.5 py-1">
            {client.result}
          </span>
        )}

        {/* hover overlay: services + CTA */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end pb-4 gap-2.5 px-4 text-center pointer-events-none"
            >
              <div className="flex flex-wrap justify-center gap-1.5">
                {client.services.slice(0, 2).map((s) => (
                  <span
                    key={s}
                    className="text-[9px] uppercase tracking-wider border border-[#f2c94c]/40 bg-black/80 text-[#f2c94c] rounded-full px-2.5 py-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {client.testimonial && (
                <p className="text-[10px] italic text-white/70 max-w-[90%] line-clamp-1">"{client.testimonial}"</p>
              )}

              <span className="text-[10px] uppercase tracking-wider text-[#f2c94c] border-b border-[#f2c94c]/60 pb-0.5">
                {client.caseStudy ? "View Case Study →" : "Click to View →"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* footer info */}
      <div className="p-4 border-t border-white/5">
        <h3 className="font-serif text-lg text-white group-hover:text-[#f2c94c] transition-colors duration-300">{client.name}</h3>
        <p className="text-xs text-white/40 mt-0.5">{client.handle}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CLIENT STATS HELPERS & DATA                                       */
/* ------------------------------------------------------------------ */

interface StatCard {
  label: string;
  value: string;
}

function getClientStats(client: Client): StatCard[] {
  const statsMap: Record<Category, StatCard[]> = {
    "Media": [
      { label: "Reach Growth", value: "+220%" },
      { label: "Video Views", value: "+1.2M" },
      { label: "Engagement", value: "+4.5%" }
    ],
    "Products": [
      { label: "Sales Growth", value: "+180%" },
      { label: "D2C Orders", value: "+65%" },
      { label: "Repeat Buyers", value: "+120%" }
    ],
    "Education": [
      { label: "Enrollments", value: "+310" },
      { label: "Course Reach", value: "+150%" },
      { label: "Completion Rate", value: "92%" }
    ],
    
    "Healthcare": [
      { label: "Bookings", value: "+55%" },
      { label: "Patient Reach", value: "+2.4x" },
      { label: "Inquiries", value: "+80%" }
    ],
    "Personal Branding": [
      { label: "Followers", value: "+2.4x" },
      { label: "Engagement", value: "+3.1x" },
      { label: "Monthly Views", value: "+500K" }
    ],
    "Hotels & Restaurants": [
      { label: "Direct Bookings", value: "+45%" },
      { label: "Local SEO Click", value: "+150%" },
      { label: "Avg Reviews", value: "4.8★" }
    ],
    "Events": [
      { label: "Inquiries", value: "+75%" },
      { label: "Attendance", value: "+40%" },
      { label: "Social Buzz", value: "+3x" }
    ],
    "Fashion": [
      { label: "Store Sales", value: "+180%" },
      { label: "Conversion Rate", value: "+2.4x" },
      { label: "Return Customer", value: "35%" }
    ],
    "Automotive": [
      { label: "Video Views", value: "+90K" },
      { label: "Sales Leads", value: "+80%" },
      { label: "Ad Click Rate", value: "4.2%" }
    ],
    "Real Estate": [
      { label: "Qualified Leads", value: "+40/mo" },
      { label: "Conversion", value: "+2.8x" },
      { label: "Site Visits", value: "+110%" }
    ],
    
    "Interior Design": [
  { label: "Projects", value: "+50" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Lead Growth", value: "+2.5x" }
],
     "Spiritual & Wellness": [
  { label: "Projects", value: "+50" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Lead Growth", value: "+2.5x" }
],

   "Import & Export Business": [
  { label: "Projects", value: "+50" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Lead Growth", value: "+2.5x" }
],

"Travel & Tourism": [
  { label: "Journeys Curated", value: "500+" },
  { label: "Traveler Community", value: "6K+" },
  { label: "Repeat Travelers", value: "85%" }
],

"Fitness": [
  { label: "Fitness Brands", value: "+45" },
  { label: "Client Satisfaction", value: "99%" },
  { label: "Membership Growth", value: "+2.8x" }
],

"Beauty": [
  { label: "Beauty Brands", value: "+40" },
  { label: "Client Satisfaction", value: "99%" },
  { label: "Appointment Growth", value: "+3.1x" }
],
  };

  const defaultStats = statsMap[client.category] || [
    { label: "Growth", value: "+45%" },
    { label: "Engagement", value: "+2.5x" },
    { label: "Brand Value", value: "Premium" }
  ];

  if (client.result) {
    const parts = client.result.split(" ");
    if (parts.length >= 2) {
      const val = parts[0];
      const lbl = parts.slice(1).join(" ");
      return [
        { label: lbl, value: val },
        defaultStats[1],
        defaultStats[2]
      ];
    } else {
      return [
        { label: "Total Growth", value: client.result },
        defaultStats[1],
        defaultStats[2]
      ];
    }
  }
  
  return defaultStats;
}

/* ------------------------------------------------------------------ */
/*  CLIENT MODAL — opens on card click, shows image + full content     */
/* ------------------------------------------------------------------ */

function ClientModal({ client, onClose }: { client: Client; onClose: () => void }) {
  const [coverError, setCoverError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const coverSrc = client.cover || client.logo;
  const initials = client.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  // Framer Motion 3D Parallax Tilt variables
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const springRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!logoBoxRef.current) return;
    const rect = logoBoxRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Framer Motion Staggered Children Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 220,
      },
    },
  };

  const stats = getClientStats(client);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${client.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#111111]"
      >
        {/* Corner Accent Marks ("L" shaped borders for premium certificate/badge feel) */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#f2c94c]/60 pointer-events-none rounded-tl-md z-20" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#f2c94c]/60 pointer-events-none rounded-tr-md z-20" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#f2c94c]/60 pointer-events-none rounded-bl-md z-20" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#f2c94c]/60 pointer-events-none rounded-br-md z-20" />

        {/* close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 border border-white/15 text-white/70 hover:text-[#f2c94c] hover:border-[#f2c94c]/50 transition-colors flex items-center justify-center"
        >
          ✕
        </button>

        {/* Ambient Glowing Header & Interactive Logo Box */}
        <div className="relative w-full h-64 bg-[#111111] bg-[radial-gradient(circle_at_center,rgba(242,201,76,0.18)_0%,rgba(17,17,17,0)_70%)] flex items-center justify-center overflow-hidden border-b border-white/5">
          
          {/* Blurred cover photo background context */}
          {coverSrc && !coverError && (
            <div className="absolute inset-0 opacity-[0.08] filter blur-md overflow-hidden pointer-events-none">
              <img
                src={coverSrc}
                alt=""
                onError={() => setCoverError(true)}
                className="w-full h-full object-cover scale-110"
              />
            </div>
          )}

          {/* Glowing particle background behind logo box */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#f2c94c]/40 rounded-full"
                style={{
                  left: `${15 + (i * 12 + Math.random() * 8)}%`,
                  top: `${20 + (i * 8 + Math.random() * 12)}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, Math.random() * 16 - 8, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          {/* Interactive Logo Box with 3D Parallax Tilt and Rotating Border */}
          <div className="relative z-10 flex items-center justify-center">
            <motion.div
              ref={logoBoxRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              className="relative w-36 h-36 rounded-3xl bg-black/70 border border-white/10 backdrop-blur-md flex items-center justify-center p-5 shadow-2xl cursor-grab active:cursor-grabbing"
            >
              {/* Rotating Gold Border Ring */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div 
                  className="absolute -inset-[50%] bg-[conic-gradient(from_0deg,#f2c94c_0%,transparent_30%,#f2c94c_50%,transparent_80%,#f2c94c_100%)] opacity-70 animate-spin"
                  style={{ animationDuration: '8s' }}
                />
                {/* Inner mask to keep border thin and clean */}
                <div className="absolute inset-[2.5px] bg-[#111111] rounded-[21.5px]" />
              </div>

              {/* Logo inside */}
              <div 
                className="relative z-10 flex items-center justify-center w-full h-full"
                style={{ transform: "translateZ(20px)" }}
              >
                {client.logo && !logoError ? (
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    onError={() => setLogoError(true)}
                    className="max-h-20 max-w-full object-contain filter drop-shadow-[0_2px_8px_rgba(242,201,76,0.25)]"
                  />
                ) : (
                  <div className="font-serif text-4xl text-[#f2c94c] tracking-wider select-none font-bold">
                    {initials}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 md:p-8"
        >
          {/* category badge */}
          <motion.div variants={itemVariants}>
            <span className="text-[11px] uppercase tracking-widest text-[#f2c94c] font-semibold bg-[#f2c94c]/10 rounded-full px-3 py-1">
              {client.category}
            </span>
          </motion.div>

          {/* title and handle */}
          <motion.div variants={itemVariants} className="mt-4">
            <h2 className="font-serif text-3xl text-white font-bold">{client.name}</h2>
            <p className="text-sm text-white/40 mt-1">{client.handle}</p>
          </motion.div>

          {/* services chips */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-5">
            {client.services.map((s) => (
              <span
                key={s}
                className="text-[10px] uppercase tracking-wide border border-[#f2c94c]/30 bg-[#f2c94c]/5 text-[#f2c94c] rounded-full px-3 py-1 hover:border-[#f2c94c]/60 transition-colors duration-300"
              >
                {s}
              </span>
            ))}
          </motion.div>

          {/* Multiple Result Stat Cards Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 my-6">
            {stats.map((stat, sIdx) => (
              <div 
                key={sIdx} 
                className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center relative overflow-hidden group/stat hover:border-[#f2c94c]/30 hover:bg-[#f2c94c]/[0.01] transition-all duration-300"
              >
                <div className="text-xl md:text-2xl font-serif text-[#f2c94c] font-bold">
                  {stat.value}
                </div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-wider text-white/50 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Gold Gradient Divider Line */}
          <motion.div variants={itemVariants} className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#f2c94c]/25 to-transparent my-6" />

          {/* description / content */}
          {client.description && (
            <motion.p variants={itemVariants} className="text-sm leading-relaxed text-white/70">
              {client.description}
            </motion.p>
          )}

          {/* testimonial */}
          {client.testimonial && (
            <motion.blockquote variants={itemVariants} className="mt-6 border-l-2 border-[#f2c94c]/50 pl-4 text-sm italic text-white/60 bg-white/[0.01] py-2 pr-2 rounded-r-md">
              "{client.testimonial}"
            </motion.blockquote>
          )}

          {/* actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8">
            <a
              href={`https://instagram.com/${client.handle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest border border-[#f2c94c] text-[#f2c94c] rounded-full px-6 py-2.5 hover:bg-[#f2c94c] hover:text-black transition-all duration-300 font-semibold"
            >
              Visit Instagram
            </a>
            {client.caseStudy && (
              <button
                onClick={() => console.log(`navigate to /case-studies/${client.id}`)}
                className="text-xs uppercase tracking-widest border border-white/20 text-white/70 rounded-full px-6 py-2.5 hover:border-white hover:text-white transition-all duration-300 font-semibold"
              >
                Full Case Study
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: CLIENTS.length };
    CLIENTS.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    return CLIENTS.filter((c) => {
      const matchesCategory = activeCategory === "All" || c.category === activeCategory;
      const matchesSearch =
        search.trim() === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.handle.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase()) ||
        c.services.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  // Hero entrance animation
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Marquee infinite scroll via GSAP
  useEffect(() => {
    if (!marqueeRef.current) return;
    const el = marqueeRef.current;
    const tween = gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: 30,
      ease: "linear",
    });
    return () => {
      tween.kill();
    };
  }, []);

  const scrollToCard = (id: string) => {
    const target = document.getElementById(`client-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      gsap.fromTo(
        target,
        { boxShadow: "0 0 0px rgba(242,201,76,0)" },
        { boxShadow: "0 0 50px rgba(242,201,76,0.5)", duration: 0.6, yoyo: true, repeat: 1 }
      );
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ---------------- HERO ---------------- */}
      <section ref={heroRef} className="pt-28 pb-16 px-6 text-center relative overflow-hidden">
        <h1 className="font-serif text-5xl md:text-7xl leading-tight">
          <span className="hero-line block">The Brands Behind</span>
          <span className="hero-line block">The Growth.</span>
        </h1>
        <p className="hero-sub mt-6 text-white/50 italic text-sm md:text-base">
          Every logo represents a story. Every story represents trust.
        </p>
      </section>

      {/* ---------------- STATS BAR ---------------- */}
      <section className="border-y border-white/10 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-y-8">
          {STATS.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </section>

      {/* ---------------- FILTER + SEARCH ---------------- */}
      <section className="px-6 pt-10 pb-6 flex flex-col items-center gap-5">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (activeCategory !== "All") {
              setActiveCategory("All");
            }
          }}
          placeholder="Search brands or industries..."
          className="w-full max-w-sm bg-[#111111] border border-white/15 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#f2c94c]/60 transition-colors"
        />

        <div className="flex flex-wrap justify-center gap-2 max-w-7xl">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSearch("");
              }}
              className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? "bg-[#f2c94c] text-black border-[#f2c94c]"
                  : "border-white/15 text-white/60 hover:border-[#f2c94c]/50 hover:text-[#f2c94c]"
              }`}
            >
              {cat}
              <span className="ml-1 opacity-60">({categoryCounts[cat] || 0})</span>
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- GRID ---------------- */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-min"
        >
          <AnimatePresence>
            {filtered.map((client, i) => (
              <div key={client.id} id={`client-${client.id}`}>
                <ClientCard client={client} index={i} onOpen={setSelectedClient} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-white/40 mt-16 text-sm">
            No brands match "{search}". Try a different search or category.
          </p>
        )}
      </section>

      {/* ---------------- CLIENT MODAL ---------------- */}
      <AnimatePresence>
        {selectedClient && (
          <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
        )}
      </AnimatePresence>

      {/* ---------------- MARQUEE (clickable) ---------------- */}
      <section className="bg-[#f2c94c] py-4 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap w-max">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <button
              key={`${c.id}-${i}`}
              onClick={() => scrollToCard(c.id)}
              className="mx-6 text-black font-serif text-lg tracking-wide hover:text-white transition-colors"
            >
              {c.name.toUpperCase()} •
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="py-24 px-6 text-center">
        <h2 className="font-serif text-4xl md:text-5xl">
          Your Brand Could
          <br />
          Be Next.
        </h2>
        <p className="mt-4 text-white/50 text-sm">The strongest brands grow together.</p>
        <button className="mt-8 border border-[#f2c94c] text-[#f2c94c] rounded-full px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#f2c94c] hover:text-black transition-colors">
          Start The Conversation
        </button>
      </section>
    </div>
  );
}