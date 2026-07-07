import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import NotFound from "./pages/NotFound";
import Website from "@/components/Services/Website";

const Navbar = lazy(() => import("@/components/Navbar"));
const Hero = lazy(() => import("@/components/Hero"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const LoadingScreen = lazy(() => import("@/components/LoadingScreen"));
const ScrollProgress = lazy(() => import("@/components/ScrollProgress"));
const BackToTop = lazy(() => import("@/components/BackToTop"));
const CursorGlow = lazy(() => import("@/components/CursorGlow"));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));
const Work = lazy(() => import("@/components/Work/Work"));
const Card = lazy(() => import("@/components/Card/Card"));
const Brand = lazy(() => import("@/components/Services/Brand"));
const Team = lazy(() => import("@/components/Team/Team"));
const StrategyPopup = lazy(() => import("@/components/Popup/StrategyPopup"));
const Seo = lazy(() => import("@/components/Services/Seo"));
const Social = lazy(() => import("@/components/Services/Social"));
const Google = lazy(() => import("@/components/Services/Google"));
const Facebook = lazy(() => import("@/components/Services/Facebook"));
const Linkdin = lazy(() => import("@/components/Services/Linkdin"));
const Web = lazy(() => import("@/components/Services/Website"));
const Performance = lazy(() => import("@/components/Services/Performance"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const AdsCard = lazy(() => import("@/components/Card/AdsCard"));
const BushareCase = lazy(() => import("@/components/CaseStudy/BushareCase"));
const CaseStudy = lazy(() => import("@/components/Home/CaseStudy"));
const Punevoice = lazy(() => import("@/components/CaseStudy/PuneVoicesCase"));
const Abouts = lazy(() => import("@/components/Abouts"));
const Client = lazy(() => import("@/components/Clients"));

const queryClient = new QueryClient();

const RouteChangeLoader = ({ setIsLoading }: { setIsLoading: (loading: boolean) => void }) => {
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);

  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState<string | null>(null);

  // const triggerWarning = (msg: string) => {
  //   setWarning(null);
  //   setTimeout(() => {
  //     setWarning(msg);
  //   }, 10);
  // };

  // useEffect(() => {
  //   if (warning) {
  //     const timer = setTimeout(() => setWarning(null), 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [warning]);

  // useEffect(() => {
  //   const handleCopy = (e: ClipboardEvent) => {
  //     e.preventDefault();
  //     triggerWarning("Please don't copy content.");
  //   };

  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
  //       e.preventDefault();
  //       triggerWarning("Please don't copy content.");
  //     }
  //   };

  //   document.addEventListener("copy", handleCopy);
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("copy", handleCopy);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <RouteChangeLoader setIsLoading={setIsLoading} />
          <LoadingScreen isLoading={isLoading} />
          <ScrollToTop />
          <CursorGlow />
          <ScrollProgress />

          <AnimatePresence>
            {warning && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: -50, scale: 0.9, x: "-50%" }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="fixed top-6 left-1/2 z-[99999] bg-[#0A0A0A] border border-[#C9A84C] px-6 py-4 shadow-[0_15px_40px_rgba(201,168,76,0.25)] rounded-none flex items-center gap-3 font-montserrat select-none"
              >
                <span className="text-[#C9A84C] font-semibold text-base">⚠️</span>
                <span className="text-[#F5F0E8] font-cinzel text-xs tracking-wider uppercase font-semibold">{warning}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <Suspense fallback={null}>
            <Navbar />
          </Suspense>

           <Suspense fallback={null}>
    <StrategyPopup />
  </Suspense>

          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/abouts" element={<Abouts />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/work" element={<Work />} />
              <Route path="/card" element={<Card />} />
              <Route path="/clients" element={<Client />} />

              <Route path="/brand" element={<Brand />} />
              <Route path="/perform" element={<Performance />} />
              <Route path="/web" element={<Web />} />
              <Route path="/google" element={<Google />} />
              <Route path="/facebook" element={<Facebook />} />
              <Route path="/linkdin" element={<Linkdin />} />
              <Route path="/seo" element={<Seo />} />
              <Route path="/social" element={<Social />} />

              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie" element={<CookiePolicy />} />

              <Route path="/bushare" element={<BushareCase />} />
              <Route path="/pune" element={<Punevoice />} />
              <Route path="/case" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />
          <BackToTop />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;