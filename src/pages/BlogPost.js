import { useParams } from "react-router-dom";
import blogPosts from "../data/blogPosts";

function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) return <h2>Post not found!</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{post.title}</h1>
      <p>{post.date} • {post.author}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default BlogPost;
