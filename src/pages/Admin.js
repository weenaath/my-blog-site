import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Admin() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const addPost = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        title,
        summary,
        content,
        createdAt: serverTimestamp(),
      });

      alert("Post added successfully!");
      setTitle("");
      setSummary("");
      setContent("");

    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post");
    }
  };

  return (
    <div className="admin-container" style={{ padding: "40px" }}>
      <h1>Add New Blog Post</h1>

      <form onSubmit={addPost} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "600px" }}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Short Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />

        <textarea
          placeholder="Full Blog Content"
          value={content}
          rows="10"
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default Admin;