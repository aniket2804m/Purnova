import{c as a,r as t,j as o}from"./index-D-G1JvWE.js";import{A as i}from"./index-CQDuFRqA.js";import{m as n}from"./proxy-CoSoxuqU.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=a("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]),d=()=>{const[r,s]=t.useState(!1);return t.useEffect(()=>{const e=()=>s(window.scrollY>500);return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),o.jsx(i,{children:r&&o.jsx(n.button,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.8},onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"fixed bottom-6 right-6 z-50 p-3 rounded-full glass glow-border hover:bg-primary/20 transition-colors",children:o.jsx(c,{className:"w-5 h-5 text-primary"})})})};export{d as default};
