import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import posts from "./data/posts";

function Home() {
  const [text, setText] = useState("");
  const fullText = "Welcome to My Blog!";

  const featuredPosts = posts.filter((post) => post.featured);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100); // adjust typing speed here
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 p-10 rounded-lg
                    bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 
                    bg-[length:200%_200%] animate-gradient-x">
      
      {/* Typing Effect Heading */}
      <h1 className="text-5xl font-bold text-blue-600 mb-4">{text}</h1>
      
      {/* Subtext */}
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Discover tips, tutorials, and stories about web development, React, Tailwind CSS, and more!
      </p>
      
      {/* Animated Button */}
      <a
        href="/blog"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition 
                   transform hover:scale-105 hover:shadow-lg duration-300"
      >
        Explore Blog Posts
      </a>

      {/* Featured Posts Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-left">Featured Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold mb-2">
                <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600">{post.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Blog() {
  const posts = [
    { id: 1, title: "My First Blog Post", summary: "Intro to my blog journey..." },
    { id: 2, title: "Learning React", summary: "React is awesome and powerful..." },
    { id: 3, title: "Why I Love Tailwind CSS", summary: "Styling made easy..." },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Blog Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold mb-2">
              <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.summary}</p>
            <Link
              to={`/blog/${post.id}`}
              className="text-sm text-blue-500 hover:underline font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


function About() {
  return <h1 className="text-2xl font-semibold">About Me</h1>;
}

function BlogPost() {
  const { id } = useParams();
  const posts = [
    { id: 1, title: "My First Blog Post", content: "This is an intro to my blog journey!" },
    { id: 2, title: "Learning React", content: "React is awesome and powerful!" },
    { id: 3, title: "Why I Love Tailwind CSS", content: "It makes styling so much faster." },
  ];

  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <h1 className="text-red-500">Post not found ❌</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <Link
        to="/blog"
        className="text-blue-500 hover:underline font-medium"
      >
        ← Back to Blog
      </Link>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
        <Navbar /> 

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>

        <Footer /> {/* 🔹 Footer */}
      </div>
    </Router>
  );
}


export default App;
