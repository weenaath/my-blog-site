import React, { useState } from "react";

function Admin() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Blog:", { title, summary, content, image });

    alert("Blog successfully added! (Database connection coming next!)");

    setTitle("");
    setSummary("");
    setContent("");
    setImage("");
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Admin Panel
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Create and publish new blog posts easily.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
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
            <label className="block text-gray-700 font-medium mb-1">
              Summary
            </label>
            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="2"
              placeholder="Short summary that appears on home page..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Blog Content
            </label>
            <textarea
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              rows="6"
              placeholder="Write your full blog content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image URL (Optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Paste image link..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold
                       hover:bg-blue-700 transition transform hover:scale-105 shadow"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
