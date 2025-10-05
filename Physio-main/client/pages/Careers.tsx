"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/Header"
import ShaderBackground from "@/components/ui/ShaderBackground"
import { motion, AnimatePresence } from "framer-motion"

// ContactButton component for mailto links
function ContactButton({
  recipient,
  subject,
  body,
  children,
  className,
}: { recipient: string; subject: string; body: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={() => {
        window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }}
      className={className}
    >
      {children}
    </button>
  )
}

type JobCategory = "all" | "receptionist" | "professionals" | "creative" | "sound" | "physiotherapy" | "massage"

interface Job {
  id: string
  title: string
  description: string
  category: JobCategory
}

const jobs: Job[] = [
  {
    id: "1",
    title: "Receptionist",
    description:
      "Proficiency in basic computer skills and Microsoft Excel.\nStrong communication and organizational abilities.",
    category: "receptionist",
  },
  {
    id: "2",
    title: "Corporate Professionals",
    description:
      "Corporate lawyers skilled in legal matters and compliance.\nChartered accountants for financial planning, auditing, and tax management.",
    category: "professionals",
  },
  {
    id: "3",
    title: "Creative Specialists",
    description:
      "Photo and video editors with expertise in tools like Photoshop and Adobe Premiere Pro.\nContent creators for engaging health and wellness content.",
    category: "creative",
  },
  {
    id: "4",
    title: "Sound & Music Experts",
    description:
      "Sound engineers skilled in recording, mixing, and mastering.\nVocalists, instrumentalists, and music trainers for wellness-focused programs.",
    category: "sound",
  },
  {
    id: "5",
    title: "Physiotherapy Specialists",
    description: "Licensed physiotherapists experienced in pain management and rehabilitation.",
    category: "physiotherapy",
  },
  {
    id: "6",
    title: "Massage Therapists",
    description: "Skilled male and female professionals for therapeutic and wellness massages.",
    category: "massage",
  },
  {
    id: "7",
    title: "Doctors (Physiotherapy-related Fields)",
    description: "Specialists in sports medicine, orthopedic rehabilitation, and diagnostics.",
    category: "physiotherapy",
  },
  {
    id: "8",
    title: "Yoga & Wellness Experts",
    description: "Professionals in yoga, meditation, and holistic therapies to complement physiotherapy services.",
    category: "physiotherapy",
  },
  {
    id: "9",
    title: "Administrative Professionals",
    description: "Experts in operations, scheduling, and client management to ensure smooth workflows.",
    category: "professionals",
  },
  {
    id: "10",
    title: "Healthcare Technicians",
    description: "Specialists in managing physiotherapy and rehabilitation equipment.",
    category: "physiotherapy",
  },
]

const categories = [
  { id: "all", label: "View all" },
  { id: "receptionist", label: "Receptionist" },
  { id: "professionals", label: "Professionals" },
  { id: "creative", label: "Creative" },
  { id: "sound", label: "Sound & Music" },
  { id: "physiotherapy", label: "Physiotherapy" },
  { id: "massage", label: "Massage Therapists" },
]

export default function Careers() {
  const [activeCategory, setActiveCategory] = useState<JobCategory>("all")
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    // Animate header on mount
    const timeout = setTimeout(() => setHeaderVisible(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  const filteredJobs = activeCategory === "all" ? jobs : jobs.filter((job) => job.category === activeCategory)

  const ArrowIcon = () => (
    <svg
      width="47"
      height="43"
      viewBox="0 0 68 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 transform rotate-45"
    >
      <path
        d="M38.4795 24.0824L22.8352 24.7043L23.0685 21.1205L45.4174 20.2321L44.2942 40.5219L40.3464 40.7105L41.1327 26.5076L23.2718 42.6228L20.6186 40.1976L38.4795 24.0824Z"
        fill="#1D1B20"
      />
    </svg>
  )

  // Animation variants for container and items
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        mass: 0.75,
      },
    },
  }

  return (
    <div className="relative min-h-screen">
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

        /* Added dark background fallback for body to ensure proper contrast */
        body {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          min-height: 100vh;
        }

        /* Career page styles */
        .careers-header-animate {
          opacity: 0;
          transform: translateY(-32px);
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .careers-header-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Updated iridescent button styles - increased size */
        .iridescent {
          position: relative;
          padding: 10px 18px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.8) 25%,
            rgba(240, 248, 255, 0.9) 50%,
            rgba(230, 230, 250, 0.8) 75%,
            rgba(255, 255, 255, 0.9) 100%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          color: #1a1a2e;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          overflow: hidden;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 2px 8px rgba(31, 38, 135, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          flex-shrink: 0;
          min-width: fit-content;
        }

        .iridescent:hover {
          transform: translateY(-1px);
          box-shadow: 
            0 6px 20px rgba(31, 38, 135, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
        }

        .iridescent.active {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 1) 0%,
            rgba(248, 250, 252, 1) 25%,
            rgba(241, 245, 249, 1) 50%,
            rgba(248, 250, 252, 1) 75%,
            rgba(255, 255, 255, 1) 100%);
          box-shadow: 
            0 2px 10px rgba(31, 38, 135, 0.25),
            inset 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .iridescent.shine::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(255, 255, 255, 0.8) 50%, 
            transparent 70%);
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
          transition: transform 0.6s ease-out;
          z-index: 1;
        }

        .iridescent.shine::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(255, 255, 255, 0.8) 50%, 
            transparent 70%);
          transform: translateX(100%) translateY(100%) rotate(45deg);
          transition: transform 0.6s ease-out;
          z-index: 1;
        }

        .drop-shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
          transform: translateX(-100%);
          transition: transform 2s ease-in-out;
          z-index: 1;
        }
      `}</style>

      <div className="relative z-10">
        <Header />
        <div className="min-h-screen pt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Hero Section - Centered Content */}
            <div className="container mx-auto px-4 pt-16 pb-8 flex flex-col items-center text-center">
              {/* Main heading - centered */}
              

              {/* Services text from image - added as centered content */}
              <motion.div
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.4, 0, 0.2, 1] }}
                className="w-full max-w-4xl mb-12"
              >
                <h1 className="font-playfair font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                Be part of our mission </h1>
                <p className="font-source text-xl md:text-2xl text-white/90 leading-relaxed">
                We're looking for passionate people to join us on our mission. We value flat hierarchies, clear
                communication, and full ownership and responsibility.
                </p>
              </motion.div>

              {/* Filter buttons - centered */}
              <motion.div
                initial={{ opacity: 0, y: -32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-wrap gap-3 mb-16 overflow-x-auto pb-2 justify-center"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id as JobCategory)}
                    className={`iridescent ${
                      activeCategory === category.id ? "active" : ""
                    }`}
                  >
                    <span>{category.label}</span>
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Job listings - centered with max width */}
            <div className="container mx-auto px-4 max-w-6xl">
              <motion.div className="space-y-0" variants={container} initial="hidden" animate="visible">
                <AnimatePresence>
                  {filteredJobs.map((job, index) => (
                    <motion.div key={job.id} variants={item} custom={index} layout>
                      <motion.div
                        className="group relative overflow-hidden rounded-2xl p-6 md:p-8 mb-6 cursor-pointer job-card-glass"
                        whileHover={{
                          scale: 1.02,
                          y: -8,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }}
                        initial={{ opacity: 0.8 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Glassmorphism background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20 rounded-2xl"></div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/5 group-hover:to-pink-400/10 rounded-2xl transition-all duration-500"></div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between">
                          <div className="flex-1 pr-8">
                            <motion.h2
                              className="font-source font-semibold text-3xl md:text-4xl text-white mb-6 transition-all duration-300 group-hover:text-blue-100"
                              whileHover={{ x: 8 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              {job.title}
                            </motion.h2>

                            <div className="ml-8 md:ml-12 space-y-2">
                              {job.description.split("\n").map((line, lineIndex) => (
                                <motion.p
                                  key={lineIndex}
                                  className="font-source text-xl md:text-2xl text-white/90 group-hover:text-white transition-all duration-300"
                                  initial={{ opacity: 0.8, x: 0 }}
                                  whileHover={{ opacity: 1, x: 4 }}
                                  transition={{
                                    delay: lineIndex * 0.05,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                  }}
                                >
                                  • {line}
                                </motion.p>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-6 md:mt-0 md:ml-8">
                            <ContactButton
                              recipient="careers@flexrite.com"
                              subject={`Job Application: ${job.title}`}
                              body={`Dear Hiring Manager,\n\nI am writing to apply for the ${job.title} position at Flexrite. I believe my skills and experience make me a strong candidate for this role.\n\nPlease find attached my resume and cover letter.\n\nThank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.\n\nSincerely,\n[Your Name]`}
                              className="font-source font-semibold text-3xl md:text-4xl text-white hover:text-blue-200 transition-all duration-300 relative group/btn focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg px-6 py-3"
                            >
                              <motion.span
                                className="group-hover/btn:underline group-hover/btn:decoration-2 group-hover/btn:underline-offset-4 transition-all duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Apply
                              </motion.span>
                            </ContactButton>
                            <motion.div
                              whileHover={{ rotate: 45, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                              <ArrowIcon />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Divider - don't show after last item */}
                      {index < filteredJobs.length - 1 && (
                        <motion.div
                          className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                        ></motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Walk-Ins Interview Section - horizontal layout with wider, shorter cards */}
<div className="container mx-auto px-4 py-16 max-w-6xl">
  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16 mx-auto"></div>
  
  <motion.div 
    className="relative overflow-hidden rounded-2xl p-6 md:p-8 job-card-glass"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    viewport={{ once: true }}
  >
    {/* Glassmorphism background */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20 rounded-2xl"></div>

    {/* Hover glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:via-purple-400/5 group-hover:to-pink-400/10 rounded-2xl transition-all duration-500"></div>

    <div className="relative z-10">
      <motion.h2 
        className="font-source font-bold text-4xl md:text-5xl text-white mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Walk-Ins Interview
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Location Card */}
        <motion.div 
          className="bg-white/5 rounded-xl p-5 border border-white/10 h-full"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-3">
              <div className="bg-white/10 p-2 rounded-lg mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="font-source font-semibold text-xl text-white">Location</h3>
            </div>
            <p className="font-source text-lg text-white/90 mt-auto">Andheri West Office, Mumbai</p>
          </div>
        </motion.div>

        {/* How to Apply Card */}
        <motion.div 
          className="bg-white/5 rounded-xl p-5 border border-white/10 h-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-3">
              <div className="bg-white/10 p-2 rounded-lg mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="font-source font-semibold text-xl text-white">How to Apply</h3>
            </div>
            <div className="mt-auto">
              <p className="font-source text-lg text-white/90 mb-2">
                Send CV to <span className="text-white underline">team@flexriteworld.org</span>
              </p>
              <ul className="ml-3 space-y-1">
                <li className="font-source text-sm text-white/90">• Qualifications</li>
                <li className="font-source text-sm text-white/90">• Experience</li>
                <li className="font-source text-sm text-white/90">• Relevant links</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Methods Card */}
        <motion.div 
          className="bg-white/5 rounded-xl p-5 border border-white/10 h-full"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center mb-3">
              <div className="bg-white/10 p-2 rounded-lg mr-3 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-source font-semibold text-xl text-white">Contact Methods</h3>
            </div>
            <div className="mt-auto">
              <p className="font-source text-lg text-white/90 mb-3">
                We'll contact you via:
              </p>
              <div className="grid grid-cols-1 gap-2">
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                  <div className="flex items-center justify-center">
                    <div className="bg-white/10 rounded-full p-1 mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <p className="font-source text-white/90 text-sm">Official Email</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                  <div className="flex items-center justify-center">
                    <div className="bg-white/10 rounded-full p-1 mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <p className="font-source text-white/90 text-sm">Landline</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                  <div className="flex items-center justify-center">
                    <div className="bg-white/10 rounded-full p-1 mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                    </div>
                    <p className="font-source text-white/90 text-sm">WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="pt-6 border-t border-white/10 mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="font-source text-lg text-white/80 italic">
          We're excited to meet talented individuals who are passionate about joining our team!
        </p>
      </motion.div>
    </div>
  </motion.div>
</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}