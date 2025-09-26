// src/components/Navbar.js
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md rounded-lg mb-8 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            My Blog
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-500 transition">Home</Link>
            <Link to="/blog" className="hover:text-blue-500 transition">Blog</Link>
            <Link to="/about" className="hover:text-blue-500 transition">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
