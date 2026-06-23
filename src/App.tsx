import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound";

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

const Team = lazy(() => import("@/components/Team/Team"));

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <LoadingScreen isLoading={isLoading} />
          <ScrollToTop />
          <CursorGlow />
          <ScrollProgress />

          <Suspense fallback={null}>
            <Navbar />
          </Suspense>

          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/work" element={<Work />} />
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