// logos
import img1 from "../../img/logo/Copy of Upscale logo.png";
import img2 from "../../img/logo/Copy of Logo Pune voice 5.png";
import img3 from "../../img/logo/Vaichal vastu.png";
import img6 from "../../img/logo/Copy of TheWordSmiths_Logo_final_v1-01.png";
import img7 from "../../img/logo/freepik__background__73525 (1).png";
import img8 from "../../img/logo/tyb logo Updated (1).png";
import img9 from "../../img/logo/IMPORT EXPORT FEDERATION LOGO - PNG WITH BG (1).png";
import img10 from "../../img/logo/Saffron.png";
import img11 from "../../img/logo/vada.png";
import img12 from "../../img/logo/Green.png";
import img13 from "../../img/logo/Asset 2.png";
import img14 from "../../img/logo/3.png";
import img15 from "../../img/logo/Copy of Untitled-1.png";
import img16 from "../../img/logo/Jivastro 22-01 copy LOGO.png";
import img18 from "../../img/logo/Gentle hair wig logo 4.png";
import img19 from "../../img/logo/FINAL final.png"
import img20 from "../../img/logo/Dr Auto Logo.png"
import img21 from "../../img/logo/COSMICGANGES Logo.png"
import img22 from "../../img/logo/Eat Right Up Logo (1).png"
import img23 from "../../img/logo/delight.png"
import img24 from "../../img/logo/Ashi.png"
import img25 from "../../img/logo/siraa.jpeg"
import img26 from "../../img/logo/LOGO (1).png"
import img27 from "../../img/logo/sanvee.png"
import img28 from "../../img/logo/Sonalee Kulkarni.png"
import img29 from "../../img/logo/Vard Vinayak.png"
import img30 from "../../img/logo/urban logo-01.png"
import img31 from "../../img/logo/zistral.png"
import img32 from "../../img/logo/ssk.png"
import img33 from "../../img/logo/logo.png"
import img34 from "../../img/logo/travchal.png"
import img35 from "../../img/logo/ketring.png"
import img36 from "../../img/logo/abhijeet.png"
import img37 from "../../img/logo/Prachiti.png"

export type Category =
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

export interface Client {
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

export const CLIENTS: Client[] = [
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
  id: "zistral1",
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
  logo: img37,
  cover: img37,
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