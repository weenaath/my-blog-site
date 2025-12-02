import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Admin() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        image: image || null,
        createdAt: serverTimestamp(),
      });

      alert("🎉 Blog successfully published!");

      // Clear form
      setTitle("");
      setSummary("");
      setContent("");
      setImage("");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("❌ Failed to add blog. Check the console.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 border border-gray-200">

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
          Admin Panel
        </h1>
        <p className="text-gray-500 text-center mb-10">
          Create and publish new blog posts.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Summary
            </label>
            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="3"
              placeholder="Short summary (appears in the list view)..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Blog Content
            </label>
            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="8"
              placeholder="Write the full article here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL (optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Paste image link..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition transform shadow 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"}
            `}
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Admin;
