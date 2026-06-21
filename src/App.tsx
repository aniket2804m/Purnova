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
import About from "@/components/About";

import NeuralShowcase from "@/components/NeuralShowcase";

import Timeline from "@/components/Timeline";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";

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
          <CursorGlow />
          <ScrollProgress />

          <Suspense fallback={null}>
            <Navbar />
          </Suspense>

          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/neural-showcase" element={<NeuralShowcase />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/team" element={<Team />} />
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