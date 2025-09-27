import { useParams } from "react-router-dom";
import blogPosts from "../data/blogPosts";
import posts from "../data/posts";

function BlogPost() {
  const { id } = useParams();
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) return <h1 className="text-red-500">Post not found ❌</h1>;

  return (
    <div>
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-md mb-4" />
      )}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6 whitespace-pre-line">{post.content}</p>
      <Link to="/blog" className="text-blue-500 hover:underline font-medium">
        ← Back to Blog
      </Link>
    </div>
  );
}

export default BlogPost;
