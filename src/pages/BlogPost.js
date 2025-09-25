import { useParams } from "react-router-dom";
import blogPosts from "../data/blogPosts";

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) return <h2 className="text-center mt-10">Post not found!</h2>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-4">{post.date} • {post.author}</p>
      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  );
}

export default BlogPost;
