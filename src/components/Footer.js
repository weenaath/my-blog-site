// src/components/Footer.js
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left - Copyright */}
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Sakindu's Blog. All rights reserved.
        </p>
        
        {/* Right - Social Links */}
        <div className="flex space-x-6 text-xl">
          <a 
            href="https://github.com/weenaath" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-transform transform hover:scale-125"
          >
            <FaGithub />
          </a>
          <a 
            href="https://linkedin.com/in/sakindu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-transform transform hover:scale-125"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com/weenaath" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-transform transform hover:scale-125"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
