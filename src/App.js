import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import posts from "./data/posts";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // adjust path if needed

function Home() {
  const [text, setText] = useState("");
  const fullText = "Welcome to My Blog!";

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "subscribers"), { email });
      setMessage("🎉 Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Error adding subscriber: ", error);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  const featuredPosts = posts.filter((post) => post.featured);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100); // adjust typing speed here
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 p-10 rounded-lg
                    bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-200 
                    bg-[length:200%_200%] animate-gradient-x">
      
      {/* Typing Effect Heading */}
      <h1 className="text-5xl font-bold text-blue-600 mb-4">{text}</h1>
      
      {/* Subtext */}
      <p className="text-lg text-gray-700 mb-6 max-w-xl">
        Discover tips, tutorials, and stories about latest technologies!
      </p>
      
      {/* Animated Button */}
      <a
        href="/blog"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition 
                   transform hover:scale-105 hover:shadow-lg duration-300"
      >
        Explore Blog Posts
      </a>

      {/* Featured Posts Section */}
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 mt-10 text-center">Featured Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold mb-2">
                <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600">{post.summary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="w-full max-w-3xl mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Get the latest blog posts and tutorials delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full flex-1 px-4 py-3 border rounded-lg focus:outline-none 
                       focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 
                       transition transform hover:scale-105 hover:shadow-lg duration-300"
          >
            Subscribe
          </button>
        </form>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>

    </div>
  );
}

function Blog() {
  const posts = [
    { 
      id: 1, 
      title: "The Clockwork Orchard: How AI and Machine Learning Turn Data into Decisions", 
      summary: "A creative orchard metaphor guides a plain-English tour of how AI and machine learning turn data into decisions, covering core concepts, learning paradigms, classical and deep learning (including LLMs), and real-world applications.", 
      image: "https://risktec.tuv.com/wp-content/uploads/2020/04/shutterstock_1154457493-cropped-1024x681.jpg" 
    },
    { 
      id: 2, 
      title: "The Future in Your Hands: iPhone 17 Series", 
      summary: "Apple’s iPhone 17 series is here with groundbreaking features and stunning design upgrades.", 
      image: "https://www.apple.com/newsroom/images/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/article/Apple-iPhone-17-Pro-cosmic-orange-250909_inline.jpg.large_2x.jpg" 
    },
    { 
      id: 3, 
      title: "Why I Love Tailwind CSS", 
      summary: "Styling made easy...", 
      image: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fi5vke8fu8g8659hjvv22.jpeg" 
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* 🔹 Image with hover zoom */}
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover transform transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* 🔹 Text content */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.summary}</p>
              <Link
                to={`/blog/${post.id}`}
                className="text-blue-500 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export { Blog };


function About() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 text-center">
      {/* Profile Image */}
      <img
        src="https://media.licdn.com/dms/image/v2/D5603AQGq-cjG83eYWQ/profile-displayphoto-crop_800_800/B56ZhPKSbqHQAM-/0/1753674756944?e=1761782400&v=beta&t=CHI4YQEHJi-rvkSx9zQ3IEsMI8v2fk6pIpq_uhpfwFs"
        alt="Profile"
        className="w-40 h-40 mx-auto rounded-full shadow-lg mb-6 hover:scale-105 transition duration-300"
      />

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Me</h1>

      {/* Subtext */}
      <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-10">
        Hello! I’m Sakindu, an Information Systems undergraduate at University of Sri Jayewardenepura, who is passionate about cybersecurity and ethical hacking. 
        My mission is to share knowledge and connect with people who have common interests.
      </p>

      {/* Call to Action */}
      <div className="mt-12">
        <a
          href="mailto:weenaath@gmail.com"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 
                     transform-gpu transition-transform duration-300 ease-out hover:scale-110 
                     hover:shadow-2xl"
        >
          Get in Touch
        </a>

      </div>
    </div>
  );
}


function BlogPost() {
  const { id } = useParams();

  const posts = [
    {
      id: 1,
      title: "The Clockwork Orchard: How AI and Machine Learning Turn Data into Decisions",
      content: [
        "Imagine AI and machine learning as an orchard where data is the soil, algorithms are the tools, and predictions are the fruits we harvest. At its core, artificial intelligence is the broad pursuit of making machines act in ways we’d call “intelligent,” from recognizing a face to decoding natural language. Machine learning narrows that down to systems that learn patterns from examples instead of rigid instructions, while deep learning builds layered neural networks that handle especially complex tasks like image recognition or conversation.",
        "The recent bloom in this field comes from an abundance of data, powerful computing hardware, and breakthroughs like transformers, which power today’s large language models. These systems are showing up everywhere: in hospitals that use AI to flag anomalies in scans, in banking systems that sniff out fraud, in e-commerce platforms that recommend products, and in everyday digital assistants that help us write, code, or organize.",
        "But clever fruit isn’t enough—you also need irrigation and care, which is where concepts like MLOps enter the picture. This means building pipelines for clean data, testing models thoroughly, deploying them responsibly, and monitoring their long-term health. Alongside engineering rigor sits an ethical duty: ensuring models are fair, private, secure, sustainable, and transparent. Without this, the orchard risks bearing bad fruit.",
        "Looking ahead, the field is stretching toward models that can work with multiple modalities at once, smaller and more efficient systems that run locally, and smarter agents that can plan and act with autonomy. For those curious to begin, the journey can start simply—with Python, a few accessible libraries, and curiosity as fuel. Like tending a garden, it’s equal parts patience, experimentation, and imagination. Done thoughtfully, machine learning doesn’t just automate decisions—it helps us cultivate insights that grow into meaningful change.",
      ],
    },

    {
      id: 2,
      title: "The Future in Your Hands: iPhone 17 Series",
      content: [
        "Apple has officially unveiled the iPhone 17 series, and it’s nothing short of revolutionary. Packed with cutting-edge technology, breathtaking design, and unmatched performance, this year’s lineup has set a new benchmark for smartphones.",
        "The first thing that stands out is the all-new edge-to-edge **Infinity Display**, offering even slimmer bezels and brighter colors. Apple claims it’s their most advanced OLED panel yet, making photos, videos, and games look more immersive than ever.",
        "Under the hood, the iPhone 17 series is powered by the **A19 Bionic chip**, delivering lightning-fast performance and improved efficiency. Combined with iOS 19, multitasking and AI-driven features feel smoother and smarter.",
        "Photography lovers are in for a treat — the **quad-lens camera system** introduces an all-new ‘Cinematic Zoom’ and improved low-light photography. Night mode is now crystal clear, making the iPhone 17 Pro Max one of the best smartphone cameras in the world.",
        "Apple also focused on sustainability, introducing the first iPhone crafted with 100% recycled titanium. The new models are lighter, more durable, and eco-friendly.",
        "Battery life has been significantly boosted, with up to **2 extra hours** on the Pro models. And yes — the rumors were true — Apple has finally introduced **MagSafe 2.0**, offering faster wireless charging and new accessories.",
        "The iPhone 17 series is available in stunning colors like Midnight Black, Aurora Blue, and a brand-new Rose Titanium finish. Prices start at $999 for the base model, with the iPhone 17 Pro Max reaching $1,399.",
        "With powerful performance, incredible cameras, and an eco-conscious design, the iPhone 17 series proves once again why Apple remains the leader in smartphone innovation.",
      ],
    },

    {
      id: 3,
      title: "Why I Love Tailwind CSS",
      content: [
        "It makes styling so much faster."
      ],
    },
  ];

  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <h1 className="text-red-500">Post not found ❌</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.content.map((para, index) => (
        <p key={index} className="text-gray-700 mb-4">{para}</p>
    ))}

      <Link
        to="/blog"
        className="text-blue-500 hover:underline font-medium"
      >
        ← Back to Blog
      </Link>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">

        {/* 🔹 Navbar */}
        <Navbar />

        {/* Page content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}



export default App;
