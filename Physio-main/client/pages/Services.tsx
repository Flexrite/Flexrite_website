import Header from "@/components/Header";
import ShaderBackground from "@/components/ui/ShaderBackground";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  layout: "left" | "right";
  image: string;
}

const services: Service[] = [
  {
    id: "1",
    title: "Injury Recovery",
    description:
      "Achieve recovery and growth with personalized care that offers vital support for lasting health. We are dedicated to empowering you on your journey to reach goals.",
    duration: "45 min",
    layout: "left",
    image: "/images/placeholder1.jpg",
  },
  {
    id: "2",
    title: "Therapeutic Massage",
    description:
      "Experience therapeutic massage to ease tension and enhance relaxation. Schedule your session today for a healthier and more balanced you.",
    duration: "45 min",
    layout: "right",
    image: "/images/placeholder2.jpg",
  },
  {
    id: "3",
    title: "Fitness Training",
    description:
      "Unlock your fitness potential with training designed for you. Our expert trainers will help you achieve your goals and transform your wellness journey. Start your path to a stronger you today!",
    duration: "1 hour",
    layout: "left",
    image: "/images/placeholder3.jpg",
  },
  {
    id: "4",
    title: "Deep Tissue Massage",
    description:
      "Deep tissue massage relieves pain and enhances flexibility. It targets deeper muscles, reducing stress and improving well-being. Experience its benefits.",
    duration: "45 min",
    layout: "right",
    image: "/images/placeholder4.jpg",
  },
  {
    id: "5",
    title: "Pain Relief Acupuncture",
    description:
      "Explore Pain Relief Acupuncture to ease discomfort and restore balance in your body. Discover its benefits and take a step toward a pain-free life.",
    duration: "45 min",
    layout: "left",
    image: "/images/placeholder5.jpg",
  },
  {
    id: "6",
    title: "Prenatal Care",
    description:
      "Prenatal care is crucial for a healthy pregnancy, supporting both mother and baby. Regular check-ups and guidance help monitor progress and address any concerns",
    duration: "1 hour",
    layout: "right",
    image: "/images/placeholder6.jpg",
  },
];

export default function Services() {
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = React.useState<boolean[]>(
    Array(services.length).fill(false)
  );

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("4th July, Monday");
  const [selectedTime, setSelectedTime] = useState("6:30 PM");
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showKnowledgeOverlay, setShowKnowledgeOverlay] = useState(false);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      image: "/das.jpg",
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
    {
      name: "Dr. Michael Chen",
      image: "/doe.jpg",
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
    {
      name: "Dr. Emily Rodriguez",
      image: "/reddy.jpg",
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
  ];

  const nextDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev + 1) % doctors.length);
  };

  useEffect(() => {
    if (showBookingModal) {
      const interval = setInterval(nextDoctor, 1500);
      return () => clearInterval(interval);
    }
  }, [showBookingModal, currentDoctorIndex]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    blockRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prev) => {
                if (prev[idx]) return prev;
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    blockRefs.current.forEach((ref) => {
      if (!ref) return;
      const bg = ref.querySelector(".service-bg");
      const img = ref.querySelector(".service-img");
      if (bg) {
        gsap.to(bg, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: ref,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (img) {
        gsap.to(img, {
          y: -20,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ref,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setShowServiceDropdown(false);
    setShowDatePicker(false);
    setShowTimePicker(false);
    setShowKnowledgeOverlay(false);
  };

  return (
    <div className="relative overflow-x-hidden" style={{ maxWidth: '100vw', width: '100%' }}>
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>

      <style jsx global>{`
        .service-animate {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.6s ease-in-out,
            transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .service-animate.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-from-up {
          transform: translateY(60px);
        }
        button.pressed {
          transform: scale(0.93);
        }
        * {
          transition: all 0.5s ease-out;
        }
        
        /* Iridescent Button Styles */
        .iridescent-button {
          font-family: "Amaranth", sans-serif;
          font-size: 16px;
          color: #818e9e;
          width: 140px;
          height: 50px;
          line-height: 1;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 0.5em 1.5em;
          outline: none !important;
          border-radius: 99vw;
          box-sizing: border-box;
          --brdr: 0.15em;
          border: max(2px, var(--brdr)) solid transparent;
          background: 
            linear-gradient(to bottom, 
              oklch(0.95 0.01 257), 
              oklch(0.92 0.0175 257 / 80%) 33%, 
              oklch(0.99 0.01 257 / 80%)) padding-box,
            linear-gradient(165deg, 
              oklch(0.94 0.025 257 / 80%) 25%, 
              oklch(0.99 0.01 257 / 80%)) border-box;
          --ibxs:
            inset -0.35em -0.35em 0.25em -0.25em oklch(0.99 0.02 257),
            inset -0.33em -1em 0.75em -0.75em oklch(0.99 0.01 257);
          --bxs: 
            oklch(0.35 0.1 257 / 0.12) 0px max(4px, 0.3em) 0.3em 0px, 
            oklch(0.35 0.1 257 / 0.12) 0px max(2px, 0.18em) 0.18em 0px, 
            oklch(0.35 0.1 257 / 0.1) 0px max(1px, 0.05em) max(2px, 0.05em) 0px;
          box-shadow: var(--ibxs);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .iridescent-button .drop-shadow {
          position: absolute;
          inset: min(-2px, calc(var(--brdr) * -1));
          border-radius: inherit;
          pointer-events: none;
          transition: all 0.6s cubic-bezier(0.32, 0, 0.67, 0);
          box-shadow: var(--bxs);
          z-index: -2;
        }
        
        .iridescent-button:before,
        .iridescent-button:after,
        .iridescent-button .drop-shadow:after,
        .iridescent-button .drop-shadow:before {
          content: "";
          position: absolute;
          inset: min(-2px, calc(var(--brdr) * -1));
          border-radius: inherit;
          pointer-events: none;
          transition: all 0.6s cubic-bezier(0.32, 0, 0.67, 0);
        }
        
        .iridescent-button:hover,
        .iridescent-button.shine {
          color: #3c5a80;
        }
        
        .iridescent-button:after {
          opacity: 0.3;
          background: transparent;
          box-shadow: 
            inset 0 -0.3em 2px 1px oklch(0.99 0.01 257),
            inset 0 -0.3em 0.25em oklch(0.99 0.01 257),
            inset 0 -0.3em 0.5em oklch(0.99 0.01 257),
            inset 0 -0.3em 0.75em oklch(0.99 0.01 257),
            inset 0 -0.3em 1em oklch(0.99 0.01 257);
          mix-blend-mode: lighten;
          z-index: 2;
        }
        
        .iridescent-button:before,
        .iridescent-button .drop-shadow:after {
          opacity: 0;
          translate: 1.1em -0.05em;
          scale: 0.8;
          background: linear-gradient(
            98deg in oklab,
            oklch(97% 0.26 10 / 0%) -5%,
            oklch(97% 0.26 10) 55%, 
            oklch(100% 0.18 55) 62%, 
            oklch(93% 0.15 138) 66%, 
            oklch(96% 0.18 245) 76%, 
            oklch(100% 0.25 275) 120%
          );
          mask: linear-gradient(166deg, transparent 60%, black);
          filter: blur(3px) brightness(1) contrast(1.3);
          box-shadow: 
            inset 0 max(-2px, calc(var(--brdr) * -1)) 0 min(2px, var(--brdr)) oklch(0.99 0.01 257 / 20%),
            inset 0 -0.25em 0.25em 0.125em oklch(0.99 0.01 257 / 40%);
          z-index: 3;
        }
        
        .iridescent-button .drop-shadow:after {
          opacity: 0;
          translate: -0.25em 1.2em;
          scale: -1 0.8;
          filter: blur(8px) brightness(1.2) contrast(1.05);
          mix-blend-mode: lighten;
          mask: radial-gradient(
            closest-side, 
            hsl(0, 0%, 100%) 0%,
            hsla(0, 0%, 100%, 0.987) 8.1%,
            hsla(0, 0%, 100%, 0.951) 15.5%,
            hsla(0, 0%, 100%, 0.896) 22.5%,
            hsla(0, 0%, 100%, 0.825) 29%,
            hsla(0, 0%, 100%, 0.741) 35.3%,
            hsla(0, 0%, 100%, 0.648) 41.2%,
            hsla(0, 0%, 100%, 0.55) 47.1%,
            hsla(0, 0%, 100%, 0.45) 52.9%,
            hsla(0, 0%, 100%, 0.352) 58.8%,
            hsla(0, 0%, 100%, 0.259) 64.7%,
            hsla(0, 0%, 100%, 0.175) 71%,
            hsla(0, 0%, 100%, 0.104) 77.5%,
            hsla(0, 0%, 100%, 0.049) 84.5%,
            hsla(0, 0%, 100%, 0.013) 91.9%,
            hsla(0, 0%, 100%, 0) 100%
          );
          z-index: -2;
        }
        
        .iridescent-button .drop-shadow:before {
          opacity: 1;
          translate: 1.2em 1.1em;
          scale: 1.5 0.8;
          background: oklch(0.98 0.03 257);
          mask: radial-gradient(
            closest-side, 
            hsl(0, 0%, 100%) 0%,
            hsla(0, 0%, 100%, 0.987) 8.1%,
            hsla(0, 0%, 100%, 0.951) 15.5%,
            hsla(0, 0%, 100%, 0.896) 22.5%,
            hsla(0, 0%, 100%, 0.825) 29%,
            hsla(0, 0%, 100%, 0.741) 35.3%,
            hsla(0, 0%, 100%, 0.648) 41.2%,
            hsla(0, 0%, 100%, 0.55) 47.1%,
            hsla(0, 0%, 100%, 0.45) 52.9%,
            hsla(0, 0%, 100%, 0.352) 58.8%,
            hsla(0, 0%, 100%, 0.259) 64.7%,
            hsla(0, 0%, 100%, 0.175) 71%,
            hsla(0, 0%, 100%, 0.104) 77.5%,
            hsla(0, 0%, 100%, 0.049) 84.5%,
            hsla(0, 0%, 100%, 0.013) 91.9%,
            hsla(0, 0%, 100%, 0) 100%
          );
          z-index: -1;
        }
        
        .iridescent-button:hover:before,
        .iridescent-button.shine:before,
        .iridescent-button:hover .drop-shadow:after,
        .iridescent-button.shine .drop-shadow:after {
          opacity: 0.8;
        }
        
        .iridescent-button:hover:before,
        .iridescent-button.shine:before {
          opacity: 0.6;
          translate: 0em;
          scale: 1;
        }
        
        .iridescent-button:hover .drop-shadow:after,
        .iridescent-button.shine .drop-shadow:after {
          opacity: 0.4;
          translate: 1.8em 1.2em;
          scale: -1 1;
        }
        
        .iridescent-button:focus {
          border-color: oklch(0.99 0.01 257 / 70%);
        }

        /* Glass Button Styles */
        .glass-button {
          font-family: "Amaranth", sans-serif;
          font-size: 16px;
          color: #ffffff;
          width: 100%;
          height: 50px;
          line-height: 1;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          position: relative;
          padding: 0.5em 1.5em;
          outline: none !important;
          border-radius: 12px;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        
        .glass-dropdown {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        .glass-dropdown-item {
          padding: 12px 16px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glass-dropdown-item:last-child {
          border-bottom: none;
        }
        
        .glass-dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className="relative z-10">
        <Header />
        <div className="min-h-screen py-16 pt-24">
          <motion.div
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="container mx-auto px-4 text-center mb-16"
          >
            <h1 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              Our Services
            </h1>
            <p className="font-source text-lg md:text-xl lg:text-2xl text-white max-w-3xl mx-auto">
              Comprehensive care tailored to restore your strength, mobility,
              and wellness.
            </p>
          </motion.div>

          <div className="container mx-auto px-4 space-y-10 md:space-y-14">
            {services.map((service, idx) => {
              const direction = "slide-from-up";
              return (
                <div
                  key={service.id}
                  ref={(el) => (blockRefs.current[idx] = el)}
                  className={`relative service-animate ${direction} ${
                    visible[idx] ? "in-view" : ""
                  }`}
                  style={{ willChange: "opacity, transform" }}
                >
                  {service.layout === "left" ? (
                    <div className="relative overflow-hidden">
                      <div className="service-bg w-full h-auto min-h-[24rem] md:min-h-[18rem] lg:min-h-[20rem] rounded-[40px] md:rounded-[60px] lg:rounded-[80px]
                        bg-gradient-to-r from-purple-200/20 to-transparent
                        backdrop-blur-lg border border-white/20 shadow-lg"></div>
                      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between py-6 px-4 md:py-8 md:px-6 gap-4">
                        <div className="service-img w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-black flex-shrink-0 overflow-hidden flex items-center justify-center md:ml-4 lg:ml-8">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 px-4 md:px-6 lg:px-8 text-center md:text-left w-full flex flex-col justify-center">
                          <h2 className="font-playfair font-bold text-xl md:text-2xl lg:text-3xl text-white mb-2">
                            {service.title}
                          </h2>
                          <p className="font-source text-sm md:text-base lg:text-lg text-white mb-4 leading-relaxed line-clamp-3">
                            {service.description}
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
                            <button
                              className="iridescent-button flex-shrink-0"
                              onClick={(e) => {
                                const btn = e.currentTarget;
                                btn.classList.add("shine");
                                setTimeout(() => {
                                  btn.classList.remove("shine");
                                }, 1000);
                                setShowBookingModal(true);
                                setSelectedService(service.title);
                              }}
                            >
                              Book Session
                              <span className="drop-shadow"></span>
                            </button>
                            <div className="text-center sm:text-right flex-shrink-0 min-w-0">
                              <p className="font-source text-xs md:text-base text-white whitespace-nowrap">
                                {service.duration}
                              </p>
                              <p className="font-source text-xs md:text-base text-white whitespace-nowrap">
                                Based on Experts
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden">
                      <div className="service-bg w-full h-auto min-h-[24rem] md:min-h-[18rem] lg:min-h-[20rem] rounded-[40px] md:rounded-[60px] lg:rounded-[80px]
                        bg-gradient-to-l from-purple-200/20 to-transparent
                        backdrop-blur-lg border border-white/20 shadow-lg"></div>
                      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between py-6 px-4 md:py-8 md:px-6 gap-4">
                        <div className="flex-1 px-4 md:px-6 lg:px-8 text-center md:text-left order-2 md:order-1 w-full flex flex-col justify-center">
                          <h2 className="font-playfair font-bold text-xl md:text-2xl lg:text-3xl text-white mb-2">
                            {service.title}
                          </h2>
                          <p className="font-source text-sm md:text-base lg:text-lg text-white mb-4 leading-relaxed line-clamp-3">
                            {service.description}
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
                            <button
                              className="iridescent-button flex-shrink-0"
                              onClick={(e) => {
                                const btn = e.currentTarget;
                                btn.classList.add("shine");
                                setTimeout(() => {
                                  btn.classList.remove("shine");
                                }, 1000);
                                setShowBookingModal(true);
                                setSelectedService(service.title);
                              }}
                            >
                              Book Session
                              <span className="drop-shadow"></span>
                            </button>
                            <div className="text-center sm:text-right flex-shrink-0 min-w-0">
                              <p className="font-source text-xs md:text-base text-white whitespace-nowrap">
                                {service.duration}
                              </p>
                              <p className="font-source text-xs md:text-base text-white whitespace-nowrap">
                                Based on Experts
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="service-img w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-black flex-shrink-0 md:mr-4 lg:mr-8 order-1 md:order-2 overflow-hidden flex items-center justify-center">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/4 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="booking-form-glass" style={{
              background: "rgba(148, 188, 117, 0.08)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(3.2px)",
              WebkitBackdropFilter: "blur(3.2px)",
              border: "1px solid rgba(148, 188, 117, 0.53)",
              padding: "2rem",
              maxWidth: "28rem",
              width: "100%",
              position: "relative"
            }}>
              <button
                onClick={closeBookingModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-1 rounded-full backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Book Your Session</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <button
                    onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                    className="glass-button w-full text-left flex justify-between items-center"
                  >
                    <span>{selectedService || "Select Service"}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showServiceDropdown && (
                    <div className="glass-dropdown absolute top-full left-0 right-0 mt-1 z-10">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className="glass-dropdown-item"
                          onClick={() => {
                            setSelectedService(service.title);
                            setShowServiceDropdown(false);
                          }}
                        >
                          {service.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="glass-button w-full text-left flex justify-between items-center"
                  >
                    <span>{selectedDate}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowTimePicker(!showTimePicker)}
                    className="glass-button w-full text-left flex justify-between items-center"
                  >
                    <span>{selectedTime}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={() => setShowKnowledgeOverlay(true)}
                    className="glass-button w-full bg-white/20 hover:bg-white/25 text-center justify-center"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20 flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                  <img
                    src={doctors[currentDoctorIndex].image}
                    alt={doctors[currentDoctorIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">{doctors[currentDoctorIndex].name}</p>
                  <p className="text-gray-300 text-sm">Available for consultation</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Knowledge Overlay */}
        {showKnowledgeOverlay && (
          <div className="fixed inset-0 bg-black/4 backdrop-blur-xl flex items-center justify-center z-50 p-4">
            <div className="booking-form-glass" style={{
              background: "rgba(148, 188, 117, 0.08)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(3.2px)",
              WebkitBackdropFilter: "blur(3.2px)",
              border: "1px solid rgba(148, 188, 117, 0.53)",
              padding: "2rem",
              maxWidth: "32rem",
              width: "100%",
              position: "relative"
            }}>
              <button
                onClick={closeBookingModal}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-1 rounded-full backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
                <p className="text-gray-300 mt-2">Your session has been successfully booked</p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Service:</span>
                  <span className="text-white font-medium">{selectedService}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Date:</span>
                  <span className="text-white font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Time:</span>
                  <span className="text-white font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Practitioner:</span>
                  <span className="text-white font-medium">{doctors[currentDoctorIndex].name}</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={closeBookingModal}
                  className="glass-button w-32 justify-center"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
