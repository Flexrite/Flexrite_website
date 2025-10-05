import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ContactFormModal from "./ContactFormModal"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)

      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleLinkClick = () => setIsMobileMenuOpen(false)

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Services", to: "/services" },
    { name: "Careers", to: "/careers" },
    { name: "Perks", to: "/perks" },
    { name: "Wave Gym", to: "/corporate" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "Feedback", to: "#", isButton: true },
  ]

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed left-0 w-full transition-all duration-500 z-[9999]
          lg:top-5 top-0
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between lg:justify-center px-4 lg:px-4 py-4 lg:py-0">
          {/* Mobile menu button */}
          <button
            className="lg:hidden flex flex-col space-y-1.5 z-[10000]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center">
            <div className="flex items-center space-x-8 xl:space-x-12">
              {navItems.map((item) =>
                item.isButton ? (
                  <button
                    key={item.name}
                    onClick={() => setIsModalOpen(true)}
                    className="group relative font-light text-white text-sm hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group relative font-light text-white text-sm hover:text-white transition-colors duration-300"
                    onClick={handleLinkClick}
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )
              )}
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-lg transition-all duration-500 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) =>
              item.isButton ? (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="text-white text-2xl font-light hover:text-white/80 transition-colors duration-300"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-white text-2xl font-light hover:text-white/80 transition-colors duration-300"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>
        </div>
      </header>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-[10000]">
          <div
            className="relative p-10 rounded-3xl w-full max-w-3xl mx-4"
            style={{
              background: "rgba(90, 206, 128, 0.05)", // deep green glass
              border: "1px solid rgba(180, 255, 180, 0.25)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-white text-xl hover:text-white/80 transition-all duration-300"
            >
              ✕
            </button>

            <ContactFormModal />
          </div>
        </div>
      )}
    </>
  )
}
