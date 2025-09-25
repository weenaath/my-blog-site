import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>My Blog</h1>
      {blogPosts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <Link to={`/post/${post.id}`} style={{ fontSize: "20px", color: "blue" }}>
            {post.title}
          </Link>
          <p>{post.date} • {post.author}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
