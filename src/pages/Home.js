import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";
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
        Discover tips, tutorials, and stories about latest technologies!
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

export default Home;
