// src/components/Footer.js
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="flex flex-col items-center space-y-4">

        {/* Social Icons */}
        <div className="flex space-x-6 text-2xl">
          <a 
            href="https://github.com/your-username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transform hover:scale-125 transition duration-300"
          >
            <FaGithub />
          </a>
          <a 
            href="https://linkedin.com/in/your-username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transform hover:scale-125 transition duration-300"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com/your-username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transform hover:scale-125 transition duration-300"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Sakindu's Blog. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
