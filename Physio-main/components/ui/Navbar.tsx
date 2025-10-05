import { useLocation } from "react-router-dom";

// ...existing code...

// Added state for mobile menu toggle
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// Added toggle function for mobile menu
<button
  className="lg:hidden flex flex-col space-y-1"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  aria-label="Toggle mobile menu"
>
  <div className="w-6 h-0.5 bg-black"></div>
  <div className="w-6 h-0.5 bg-black"></div>
  <div className="w-6 h-0.5 bg-black"></div>
</button>;

// Conditionally render mobile menu
{isMobileMenuOpen && (
  <div className="lg:hidden bg-white shadow-lg absolute top-full left-0 w-full">
    <nav className="flex flex-col items-center space-y-4 py-4">
      {/* ...existing links... */}
    </nav>
  </div>
)}

// Added active state for navigation links
const location = useLocation();
const isActive = (path) => location.pathname === path;

<Link
  to="/services"
  className={`font-playfair font-bold text-base transition-opacity ${
    isActive("/services") ? "text-blue-500" : "text-black hover:opacity-70"
  }`}
>
  Services
</Link>;

// Apply Playfair Display font to all navbar text
{/* ...other links... */}
<Link
  to="/about"
  className={`font-playfair font-bold text-base transition-opacity ${
    isActive("/about") ? "text-blue-500" : "text-black hover:opacity-70"
  }`}
>
  About
</Link>
<Link
  to="/contact"
  className={`font-playfair font-bold text-base transition-opacity ${
    isActive("/contact") ? "text-blue-500" : "text-black hover:opacity-70"
  }`}
>
  Contact
</Link>;