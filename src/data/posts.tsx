// src/pages/BlogList.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Blogs.css";

const posts = [
  {
    slug: "react-performance-tips",
    title: "10 React Performance Tips",
    excerpt: "Learn how to optimize your React apps with these performance tips...",
    date: "Aug 15, 2025",
  },
  {
    slug: "design-systems",
    title: "Building Scalable Design Systems",
    excerpt: "A guide to building flexible and scalable design systems for modern apps.",
    date: "Aug 10, 2025",
  },
  {
    slug: "motion-ui",
    title: "Motion UI with Framer Motion",
    excerpt: "Enhance your user experience with smooth animations and transitions.",
    date: "Aug 5, 2025",
  },
];

const BlogList: React.FC = () => {
  return (
    <section className="blog-list">
      <h2>Latest Articles</h2>
      <div className="posts">
        {posts.map((post) => (
          <div className="post-card" key={post.slug}>
            <h3>{post.title}</h3>
            <p className="date">{post.date}</p>
            <p>{post.excerpt}</p>
            {/* 👇 This links to Blogs/:slug */}
            <Link to={`/blogs/${post.slug}`} className="read-more">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
