import { useState } from "react";
import ContactFormModal from "@/components/ContactFormModal";
import { Text3D } from "@/components/Text3D";

export default function ContactFooter() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <footer
      className="w-full text-white py-4 px-0 relative z-50 overflow-hidden"
      style={{
        background: "rgba(90, 206, 128, 0.05)",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(1.7px)",
        WebkitBackdropFilter: "blur(1.7px)",
        border: "1px solid rgba(90, 206, 128, 0.6)",
      }}
    >
      <div className="w-full relative z-10">
        <div className="flex flex-col lg:flex-row mb-12 items-stretch w-full gap-8 px-4 md:px-8">
          <div className="w-full lg:w-1/2 flex">
            <div className="flex flex-col gap-4 rounded-xl p-6 w-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Your Feedback Matters</h3>
              <p className="text-white/80 mb-4">
                At FlexRite World, we're committed to excellence. Your insights help us refine our services and create better experiences for everyone.
              </p>
              <p className="text-white/80 mb-4">
                Whether you have suggestions, concerns, or compliments, we're all ears. Together, we can build something extraordinary.
              </p>

              <div className="mt-auto pt-4">
                <button
                  className="w-full px-6 py-3 text-white font-semibold bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-md hover:bg-white/20 transition-all duration-300 text-lg"
                  onClick={() => setShowFeedback(true)}
                >
                  Give Feedback
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex">
            <div className="w-full h-full rounded-xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm min-h-[280px]">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609826074!2d72.7410992!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63c1b6e7b2b%3A0x1b1b1b1b1b1b1b1b!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ minHeight: "100%", border: 0, borderRadius: "0.75rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Text3D Component Added Here */}
        <div className="w-full px-4 md:px-8 mb-12">
          <div className="footer-3d-wrap">
            <Text3D />
          </div>
        </div>

        {showFeedback && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative mx-4">
              <button
                className="absolute top-4 right-4 text-white text-2xl font-bold hover:opacity-70"
                onClick={() => setShowFeedback(false)}
                aria-label="Close feedback form"
              >
                ×
              </button>
              <div className="text-white">
                <ContactFormModal />
              </div>
            </div>
          </div>
        )}

        <div className="w-full px-4 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a
                href="https://www.instagram.com/flexriteworld"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M7.75 2C4.4 2 2 4.4 2 7.75v8.5C2 19.6 4.4 22 7.75 22h8.5C19.6 22 22 19.6 22 16.25v-8.5C22 4.4 19.6 2 16.25 2h-8.5zm0 1.5h8.5c2.2 0 3.75 1.55 3.75 3.75v8.5c0 2.2-1.55 3.75-3.75 3.75h-8.5c-2.2 0-3.75-1.55-3.75-3.75v-8.5c0-2.2 1.55-3.75 3.75-3.75zm4.25 3.25a4.5 4.5 0 1 0 0 9 4.5 4.5 0 1 0 0-9zm0 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.25 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.370-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.920-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center p-3 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255, 255, 255, 0.24)",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(4.6px)",
                  WebkitBackdropFilter: "blur(4.6px)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M20.487 17.14l-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-3.211 2.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l2.860-3.210a.997.997 0 0 0-.085-1.391z" />
                </svg>
              </div>
              <span className="text-lg font-semibold">+91 2658347951</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
