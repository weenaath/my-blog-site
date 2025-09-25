import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h1 className="text-3xl font-bold text-blue-600">Welcome to My Blog 📝</h1>;
}

function Blog() {
  return <h1 className="text-2xl font-semibold">Blog Posts</h1>;
}

function About() {
  return <h1 className="text-2xl font-semibold">About Me</h1>;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Navigation */}
        <nav className="mb-6 flex gap-6 text-lg font-medium text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
