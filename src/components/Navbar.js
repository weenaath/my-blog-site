// src/components/Navbar.js
import { logDOM } from "@testing-library/dom";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">Sakindu's Blog</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8 text-lg font-medium text-gray-700">
          <Link 
            to="/" 
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            to="/blog" 
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Blog
          </Link>
          <Link 
            to="/about" 
            className="hover:text-blue-600 transition-colors duration-300"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
