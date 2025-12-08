import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { collection, addDoc, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // adjust path if needed
import Admin from "./pages/Admin";

function Home() {
  const [text, setText] = useState("");
  const fullText = "Welcome to My Blog!";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ⭐ Featured Posts
  const [featuredPosts, setFeaturedPosts] = useState([]);

  // ⭐ Load Featured Posts (latest 2)
  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const snap = await getDocs(collection(db, "posts"));
        const posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const sorted = posts
          .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
          .slice(0, 2);

        setFeaturedPosts(sorted);
      } catch (err) {
        console.error("Error loading featured posts:", err);
      }
    };

    loadFeatured();
  }, []);

  // ⭐ Subscribe Handler (MUST be inside Home!)
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "subscribers"), { email });
      setMessage("🎉 Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Error adding subscriber:", error);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  // ⭐ Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center mt-8 md:mt-8 lg:mt-8 p-10 rounded-lg
                bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 
                bg-[length:200%_200%] animate-gradient-x">

      {/* Typing Effect Heading */}
      <h1 className="text-5xl font-bold text-blue-600 mb-4">{text}</h1>

      {/* Subtext */}
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Discover tips, tutorials, and stories about latest trends in technology!
      </p>

      {/* Button */}
      <a
        href="/blog"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition 
                   transform hover:scale-105 hover:shadow-lg duration-300"
      >
        Explore Blog Posts
      </a>

      {/* Featured Posts Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-10 text-center">
          Featured Posts
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredPosts.length === 0 ? (
            <p className="text-gray-600 text-center w-full">No featured posts yet.</p>
          ) : (
            featuredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="mb-4 border-b pb-2">
                  <h3 className="text-2xl font-bold">
                    <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                </div>

                <p className="text-gray-600">{post.summary}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="w-full max-w-3xl mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6">
          Get the latest blog posts and tutorials delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full flex-1 px-4 py-3 border rounded-lg focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 
                       transition transform hover:scale-105 hover:shadow-lg duration-300"
          >
            Subscribe
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const snap = await getDocs(collection(db, "posts"));
        const postsList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setPosts(postsList);
      } catch (err) {
        console.error("Error loading blog posts:", err);
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover transform transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>

              <Link
                to={`/blog/${post.id}`}
                className="text-blue-500 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Blog };


function About() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 text-center">
      {/* Profile Image */}
      <img src="/myphoto.jpg" 
      alt="Profile" 
      className="w-40 h-40 mx-auto rounded-full shadow-lg mb-6 hover:scale-105 transition duration-300" />

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Me</h1>

      {/* Subtext */}
      <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
        Hello! I’m Sakindu, an Information Systems undergraduate at University of Sri Jayewardenepura, who is passionate about cybersecurity and ethical hacking. 
        My mission is to share knowledge and connect with people who have common interests.
      </p>

      {/* Call to Action */}
      <div className="mt-12">
        <a
          href="mailto:weenaath@gmail.com"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 
                     transform-gpu transition-transform duration-300 ease-out hover:scale-110 
                     hover:shadow-2xl"
        >
          Get in Touch
        </a>

      </div>
    </div>
  );
}


function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        setPost(false); // not found
      }
    };

    fetchPost();
  }, [id]);

  if (post === false) {
    return <h1 className="text-red-500 text-center mt-10">Post not found ❌</h1>;
  }

  if (!post) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          {post.title}
        </h1>

        <img
          src={post.image}
          alt={post.title}
          className="rounded-lg shadow-md mx-auto mb-6"
        />

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* 🔹 Navbar */}
        <Navbar />

        {/* Page content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}



export default App;
