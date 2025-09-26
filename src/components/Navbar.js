import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="mb-6 flex gap-6 text-lg font-medium text-gray-700">
      <Link to="/" className="hover:text-blue-600">Home</Link>
      <Link to="/blog" className="hover:text-blue-600">Blog</Link>
      <Link to="/about" className="hover:text-blue-600">About</Link>
    </nav>
  );
}
