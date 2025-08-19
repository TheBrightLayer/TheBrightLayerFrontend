import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Blogs.css";

interface Blog {
  title: string;
  excerpt: string;
  slug: string;
}

const posts: Blog[] = [
  {
    title: "Why Good Design Matters",
    excerpt:
      "A quick dive into why design isn’t just about making things look pretty, but about creating meaningful experiences.",
    slug: "why-good-design-matters",
  },
  {
    title: "The Future of Web Development",
    excerpt:
      "React, AI-driven development, and edge computing — what do they mean for the next generation of developers?",
    slug: "future-of-web-development",
  },
  {
    title: "Building a Startup Team",
    excerpt:
      "Hiring your first 5 employees can make or break your company. Here’s what I learned building my own team.",
    slug: "building-a-startup-team",
  },
];

const BlogList: React.FC = () => {
  return (
    <div className="blog-list">
      <h1 className="blog-title">Our Blog</h1>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            className="blog-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
          >
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <Link to={`/blogs/${post.slug}`} className="read-more">
              Read More →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
