import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";

function Home() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">My Blog</h1>
      {blogPosts.map((post) => (
        <div key={post.id} className="mb-6 p-4 border rounded-lg shadow-sm">
          <Link to={`/post/${post.id}`} className="text-2xl font-semibold text-blue-600 hover:underline">
            {post.title}
          </Link>
          <p className="text-gray-500 text-sm">{post.date} • {post.author}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
