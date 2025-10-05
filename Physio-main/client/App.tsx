import LoadingPage from "@/components/LoadingPage";
import AnimatedRoutes from "@/components/AnimatedRoutes";
import React, { useState, useCallback } from "react";
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleComplete = useCallback(() => {
    setIsLoadingComplete(true);
    // Wait for the animation to complete before removing from DOM
    setTimeout(() => setShowLoader(false), 0.02);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {showLoader && (
        <LoadingPage 
          onComplete={handleComplete} 
          fadeOut={isLoadingComplete} 
        />
      )}
      
      {!showLoader && (
        <div className="animate-in fade-in duration-700">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnimatedRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);