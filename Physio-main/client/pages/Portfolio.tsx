"use client"

import Header from "@/components/Header"
import ShaderBackground from "@/components/ui/ShaderBackground"
import ThankYouCard from "@/components/ThankYouCard1"
import Carousel3D from "@/components/Carousel3D"

export default function Portfolio() {
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
          {/* Profile Section */}
          <section className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 mb-16 md:mb-20">
            {/* Profile Image - Responsive sizing */}
            <div className="w-full max-w-md sm:w-4/5 md:w-3/5 lg:w-[40%] xl:w-[550px] h-auto aspect-video md:aspect-[4/3] lg:aspect-[11/8] rounded-2xl md:rounded-3xl lg:rounded-[52px] flex-shrink-0 overflow-hidden mx-auto lg:mx-0 lg:ml-4 xl:ml-20 border border-gray-700/50">
              <img 
                src="/Port1.avif" 
                alt="Mrs. Kavita Nim" 
                className="w-full h-full object-cover" 
              />
            </div>


            {/* Profile Content - Responsive alignment */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left px-4 sm:px-0 lg:ml-6 xl:ml-10 mt-6 lg:mt-0">
              <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] 2xl:text-[70px] text-white leading-tight md:leading-none mb-3 md:mb-4">
                Mrs. Kavita Nim
              </h2>
              <p className="font-itim text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-[22px] text-white/90 mb-4 md:mb-6 lg:mb-8">
                Sports Massage Therapist at Flexrite World (Through Oxid Wellness)
              </p>
              <p className="font-montserrat text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed max-w-full lg:max-w-[90%] xl:max-w-[635px]">
                With over 20 years of hands-on experience, Mrs. Kavita Nim is a seasoned sports massage therapist known
                for her specialized expertise in enhancing athletic recovery and performance. She has provided therapy
                support at numerous high-profile tournaments and sporting events, working closely with professional
                athletes to aid muscle recovery, prevent injuries, and improve overall physical resilience. Her practice
                is grounded in deep anatomical knowledge and a personalized approach to therapy, making her a trusted
                name in the physiotherapy and wellness community.
              </p>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="mb-24 md:mb-36 flex flex-col items-center mt-10 md:mt-14">
            <h3 className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white mb-8 md:mb-12 text-center">
              Gallery
            </h3>
            <div className="w-full max-w-full overflow-hidden px-2">
              <Carousel3D />
            </div>
          </section>

          {/* Professional Journey Text */}
          <section className="mb-12 md:mb-16 px-4 sm:px-0">
            <p className="font-montserrat text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/80 leading-relaxed">
              Mrs. Kavita's professional journey gained momentum in 2015 at the HEAL Institute, Khar West, where she
              trained under Dr. Priyanka Das and served as Center Head. During her tenure, she honed her techniques
              while treating elite athletes and fitness enthusiasts. Now a senior therapist at Flexrite World, she
              continues to expand her reach across Mumbai, supported by an expert team dedicated to delivering top-tier
              sports massage therapy. Her contribution to the field has solidified her reputation as one of the most
              respected and experienced therapists in the golden hands domain of physiotherapy.
            </p>
          </section>

          {/* Thank You Card */}
          <section className="mb-20 flex justify-center">
            <ThankYouCard
              doctor={{
                name: "Mrs. Kavita Nim",
                title: "Sports Massage Therapist",
                description: "Expert in athletic recovery and performance enhancement",
                image: "/Port1.avif",
              }}
            />
          </section>
        </main>
      </div>
    </div>
  )
}
