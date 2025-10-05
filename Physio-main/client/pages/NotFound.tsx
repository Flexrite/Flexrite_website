import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import ShaderBackground from "@/components/ui/ShaderBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Shader Background Animation */}
      <div className="fixed inset-0 w-full h-full z-0">
        <ShaderBackground>
          <div></div>
        </ShaderBackground>
      </div>
      
      <div className="relative z-10">
        <Header />
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-playfair font-bold text-6xl lg:text-8xl text-white mb-4">404</h1>
            <h2 className="font-playfair font-bold text-2xl lg:text-4xl text-white mb-6">
              Page Not Found
            </h2>
            <p className="font-source text-lg text-white/80 mb-8 max-w-md">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 font-lato font-medium text-lg px-8 py-4 rounded-full hover:bg-white/30 transition-all inline-block"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
