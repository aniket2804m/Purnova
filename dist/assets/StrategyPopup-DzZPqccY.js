import{c as x,r as a,j as e,X as h}from"./index-D-G1JvWE.js";import{i as g,b as p,a as u}from"./manager-CRlblr4e.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=x("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);function y(){const[l,r]=a.useState(!1),[n,o]=a.useState({start:!1,middle:!1,end:!1});return a.useEffect(()=>{const t=setTimeout(()=>{r(!0),o(s=>({...s,start:!0}))},2e3);return()=>clearTimeout(t)},[]),a.useEffect(()=>{const t=()=>{const s=window.scrollY,i=window.innerHeight,d=document.documentElement.scrollHeight,c=s/(d-i)*100;c>=50&&!n.middle&&!l&&(r(!0),o(m=>({...m,middle:!0}))),c>=95&&!n.end&&!l&&(r(!0),o(m=>({...m,end:!0})))};return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[n,l]),l?e.jsx("div",{className:"fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-6",children:e.jsxs("div",{className:"relative w-full max-w-[95%] sm:max-w-xl lg:max-w-2xl rounded-2xl lg:rounded-3xl bg-black border-4 border-black shadow-2xl px-5 py-8 sm:px-8 sm:py-10",children:[e.jsx("button",{onClick:()=>r(!1),className:"absolute top-4 right-4 sm:top-5 sm:right-5 text-white hover:text-yellow-300 transition",children:e.jsx(h,{className:"w-6 h-6 sm:w-8 sm:h-8"})}),e.jsxs("h2",{className:"text-center font-bold leading-tight text-2xl sm:text-3xl lg:text-4xl",children:["Talk to a Growth Expert at",e.jsx("br",{}),e.jsx("span",{className:"text-yellow-300",children:"Purnova"})]}),e.jsx("div",{className:"flex justify-center mt-4 md:mt-6 -space-x-2 sm:-space-x-3 md:-space-x-4",children:[g,p,u].map((t,s)=>e.jsx("img",{src:t,alt:`User ${s+1}`,loading:"lazy",decoding:"async",className:`\r
        w-10 h-10\r
        sm:w-12 sm:h-12\r
        md:w-14 md:h-14\r
        lg:w-16 lg:h-16\r
        xl:w-20 xl:h-20\r
        rounded-full\r
        border-2 border-yellow-300\r
        bg-white\r
        object-contain\r
      `},s))}),e.jsx("p",{className:"text-center text-yellow-200 mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed",children:"Book strategy call and get clarity on your marketing, branding & growth roadmap."}),e.jsxs("div",{className:"flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 sm:gap-5 lg:gap-6 mt-6 sm:mt-8 text-sm sm:text-base lg:text-lg font-medium text-center",children:[e.jsx("div",{children:"✅ No spam"}),e.jsx("div",{children:"✅ No sales pressure"}),e.jsx("div",{children:"✅ Just actionable insights"})]}),e.jsx("div",{className:"flex justify-center mt-7 sm:mt-8",children:e.jsxs("a",{href:"https://calendly.com/your-link",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-2 rounded-full border-2 border-black bg-yellow-300 text-black hover:bg-yellow-400 transition px-5 py-3 sm:px-7 lg:px-8 text-sm sm:text-base lg:text-xl font-semibold",children:[e.jsx(w,{className:"w-5 h-5 sm:w-6 sm:h-6"}),"Book Strategy Call ↗"]})})]})}):null}export{y as default};
