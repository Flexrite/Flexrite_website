"use client"

import Header from "@/components/Header";
import ShaderBackground from "@/components/ui/ShaderBackground";
import LiquidHoverOverlay from "@/components/ui/LiquidHoverOverlay";
import { motion } from "framer-motion";

export default function WaveGym() {
  return (
    <div className="relative overflow-x-hidden" style={{ maxWidth: '100vw', width: '100%' }}>
      {/* Shader Background Animation */}
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>

      {/* Global CSS */}
      <style jsx global>{`
        /* Transition for viewport size changes */
        * {
          transition: all 0.5s ease-out;
        }

        /* Responsive font sizes */
        @media (max-width: 640px) {
          html {
            font-size: 14px;
          }
        }

        /* Ensure no white backgrounds */
        body {
          background: transparent;
        }
      `}</style>

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 pt-20 md:pt-28 pb-12 md:pb-16">
          {/* Hero Section with Image */}
          <motion.section
            initial={{ opacity: 0, y: -32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="mb-16 md:mb-24"
          >
            <div className="relative h-[60vh] md:h-[70vh] rounded-[40px] md:rounded-[60px] overflow-hidden mb-12">
              <LiquidHoverOverlay intensity={0.2} className="w-full h-full">
                <div className="absolute inset-0">
                  <img
                    src="/images/placeholder1.jpg"
                    alt="Wave Gym"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                  <h1 className="font-playfair font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 md:mb-6">
                    Wave Gym
                  </h1>
                  <p className="font-source text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl">
                    Corporate Wellness & Fitness Solutions
                  </p>
                </div>
              </LiquidHoverOverlay>
            </div>
          </motion.section>

          {/* About Section */}
          <section className="mb-16 md:mb-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white mb-8 text-center">
                About Wave Gym
              </h2>
              <p className="font-montserrat text-sm md:text-base lg:text-lg text-white/80 leading-relaxed mb-6">
                Wave Gym is dedicated to providing comprehensive corporate wellness and fitness solutions.
                We partner with organizations to create healthier, more productive workplaces through customized
                fitness programs, wellness initiatives, and state-of-the-art facilities.
              </p>
              <p className="font-montserrat text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">
                Our expert trainers and wellness professionals work closely with your team to develop programs
                that align with your corporate culture and employee needs, promoting overall health, reducing
                stress, and improving work-life balance.
              </p>
            </div>
          </section>

          {/* Services Section - Stacked Layout */}
          <section className="mb-16 md:mb-24">
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white mb-12 text-center">
              Our Services
            </h2>
            <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Corporate Fitness Programs",
                  description: "Customized fitness programs designed for corporate teams and individuals. Our expert trainers develop comprehensive workout plans that fit seamlessly into your work schedule.",
                  image: "/images/placeholder1.jpg"
                },
                {
                  title: "Wellness Workshops",
                  description: "Educational sessions on nutrition, stress management, and healthy living. Interactive workshops that empower your team with knowledge and practical tools for better health.",
                  image: "/images/placeholder2.jpg"
                },
                {
                  title: "On-Site Facilities",
                  description: "Modern gym facilities equipped with the latest fitness equipment. State-of-the-art workout spaces designed to maximize efficiency and comfort for all fitness levels.",
                  image: "/images/placeholder3.jpg"
                },
                {
                  title: "Personal Training",
                  description: "One-on-one training sessions with certified fitness professionals. Personalized attention and customized programs to help you achieve your specific fitness goals.",
                  image: "/images/placeholder4.jpg"
                },
                {
                  title: "Group Classes",
                  description: "Dynamic group fitness classes including yoga, HIIT, and cardio. Build team spirit while getting fit together in energizing, motivating group sessions.",
                  image: "/images/placeholder5.jpg"
                },
                {
                  title: "Health Assessments",
                  description: "Comprehensive health screenings and fitness evaluations. Professional assessments to track progress, identify areas for improvement, and celebrate achievements.",
                  image: "/images/placeholder6.jpg"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40">
                    <LiquidHoverOverlay
                      intensity={0.2}
                      className="relative"
                    >
                      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-black/20">
                        {/* Background Image - properly contained */}
                        <img
                          src={service.image}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10 lg:p-12">
                          <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-3 md:mb-4 transition-all duration-300 group-hover:translate-x-2">
                            {service.title}
                          </h3>
                          <p className="font-source text-sm md:text-base lg:text-lg text-white/90 leading-relaxed max-w-2xl transition-all duration-300 group-hover:text-white">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </LiquidHoverOverlay>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 md:mb-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white mb-8 text-center">
                Benefits for Your Organization
              </h2>
              <div className="space-y-6">
                {[
                  "Improved employee health and productivity",
                  "Reduced absenteeism and healthcare costs",
                  "Enhanced team morale and workplace culture",
                  "Stress reduction and better mental health",
                  "Increased employee engagement and retention",
                  "Customizable programs to fit your schedule and budget"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-source text-base md:text-lg text-white/90 leading-relaxed pt-1">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-purple-200/20 to-transparent backdrop-blur-lg border border-white/20 shadow-lg p-8 md:p-12">
              <h2 className="font-playfair text-3xl md:text-4xl text-white mb-6">
                Ready to Transform Your Workplace?
              </h2>
              <p className="font-source text-base md:text-lg text-white/80 mb-8">
                Contact us today to learn more about our corporate wellness programs and schedule a consultation.
              </p>
              <a
                href="/book-session"
                className="inline-block px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-source text-lg rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Get Started
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
