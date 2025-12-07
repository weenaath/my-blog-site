import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import Admin from "./pages/Admin";;

// Home Page
function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  // Load all posts for the "Latest Posts" section
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const postsData = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setAllPosts(postsData);
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };
    loadPosts();
  }, []);

  // Load featured posts (latest 2)
  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const postsData = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        const sorted = postsData
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
          .slice(0, 2);

        setFeaturedPosts(sorted);
      } catch (err) {
        console.error("Error loading featured posts:", err);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-4 mt-10">

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
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-blue-600 hover:underline"
                    >
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

      {/* Latest Posts Section */}
      <div className="w-full max-w-5xl mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Latest Posts
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {allPosts.length === 0 ? (
            <p className="text-gray-600 text-center w-full">No posts yet.</p>
          ) : (
            allPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold mb-2">
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600">{post.summary}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Blog Post Page
function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const ref = doc(db, "posts", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setPost(snap.data());
        } else {
          setPost("not-found");
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
      }
    };

    loadPost();
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading…</p>;
  if (post === "not-found") return <p className="text-center mt-10">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.date && <p className="text-gray-500 mb-6">{post.date}</p>}

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}

// Main App
function App() {
  return (
    <div>
      <nav className="p-4 shadow bg-white flex justify-between">
        <Link className="font-bold text-xl" to="/">My Blog</Link>
        <div>
          <Link className="mr-5" to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
