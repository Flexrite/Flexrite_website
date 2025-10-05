import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "../pages/Index";
import Services from "../pages/Services";
import Careers from "../pages/Careers";
import Perks from "../pages/Perks";
import Corporate from "../pages/Corporate";
import Portfolio from "../pages/Portfolio";
import NotFound from "../pages/NotFound";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.98
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
    transition: {
      duration: 0.6,
      ease: [0.55, 0.055, 0.675, 0.19]
    }
  }
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        style={{ width: "100%", height: "100%" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/perks" element={<Perks />} />
          <Route path="/corporate" element={<Corporate />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;