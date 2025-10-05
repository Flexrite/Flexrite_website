import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ParallaxSection from "@/components/ParallaxSection";
import MeetOurDoctors from "@/components/MeetOurDoctors";
import BlogsAndNews from "@/components/BlogsAndNews";
import CelebrityTestimonials from "@/components/CelebrityTestimonials";
import ClientReviews from "@/components/ClientReviews";
import ContactFooter from "@/components/ContactFooter";
import ShaderBackground from "@/components/ui/ShaderBackground";

export default function Index() {
  return (
    <div className="relative">
      {/* Shader Background Animation */}
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>


      {/* Content Overlay */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <ParallaxSection />
        <MeetOurDoctors />
        <BlogsAndNews />
        <CelebrityTestimonials />
        <ClientReviews />
        <ContactFooter />
      </div>
    </div>
  );
}
