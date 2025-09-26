import { useParams } from "react-router-dom";
import blogPosts from "../data/blogPosts";

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) return <h2 className="text-center mt-10">Post not found!</h2>;

  return (
  <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
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

export default BlogPost;
