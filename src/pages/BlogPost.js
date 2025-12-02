// src/pages/BlogPost.js

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <h2 className="text-center text-gray-600">Loading…</h2>;
  if (!post) return <h1 className="text-red-500 text-center">Post not found ❌</h1>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Content */}
      <p className="text-gray-700 whitespace-pre-line mb-6">
        {post.content}
      </p>

      <Link
        to="/blog"
        className="text-blue-600 hover:underline font-medium"
      >
        ← Back to Blog
      </Link>
    </div>
  );
}

export default BlogPost;