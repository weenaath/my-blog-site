import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Welcome to My Blog 📝
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Discover tips, tutorials, and stories about web development, React, Tailwind CSS, and more!
      </p>
      <a
        href="/blog"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Explore Blog Posts
      </a>
    </div>
  );
}

function Blog() {
  const posts = [
    { id: 1, title: "My First Blog Post", content: "This is an intro to my blog journey!" },
    { id: 2, title: "Learning React", content: "React is awesome and powerful!" },
    { id: 3, title: "Why I Love Tailwind CSS", content: "It makes styling so much faster." },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded-lg shadow bg-white">
            <Link to={`/blog/${post.id}`} className="text-xl font-bold text-blue-600 hover:underline">
            {post.title}
            </Link>

            <p className="text-gray-600">{post.content}</p>
          </li>
        ))}
      </ul>
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
