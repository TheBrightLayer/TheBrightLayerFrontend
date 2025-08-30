import React from "react";
import { Link } from "react-router-dom";
import "../styles/CategorySection.css";
import Loader from "../components/Loader";

interface Blog {
  slug: string; // 👈 replaced id with slug
  title: string;
  mainImage: string; // 👈 updated to match DB field
  category: string;
  author: string;
  date: string;
  content?: string;
}

interface Props {
  title: string;
  blogs: Blog[];
}

// Helper to resolve image src
const resolveImageSrc = (img?: string): string => {
  if (!img) return "";

  if (img.startsWith("data:image")) {
    return img; // already data URI
  } else if (/^[A-Za-z0-9+/=]+$/.test(img)) {
    return `data:image/jpeg;base64,${img}`; // base64 from Mongo
  } else {
    return `https://thebrightlayerbackend.onrender.com/${String(img).replace(/\\/g, "/")}`; // old uploads path
  }
};

const CategorySection: React.FC<Props> = ({ title, blogs }) => {
  if (!blogs) return <Loader />;
  if (!blogs || blogs.length === 0) return null;

  // Sort blogs by date descending and limit to 30
  const limitedBlogs = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 30);

  // Take first as featured, rest as small
  const [featured, ...rest] = limitedBlogs;

  return (
    <div className="category-section">
      <h2 className="section-title">{title}</h2>

      {/* Featured Blog */}
      {featured && (
        <Link
          to={`/blogs/${featured.slug}`}
          state={{ blog: featured }}
          className="blog-link"
        >
          <div className="featured-card">
            <img
              src={resolveImageSrc(featured.mainImage)}
              alt={featured.title}
              className="featured-image"
            />
            <div className="featured-overlay">
              <span className="featured-category">{featured.category}</span>
              <h3 className="featured-title">{featured.title}</h3>
              <p className="featured-meta">
                {featured.author} • {featured.date}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Small Blog Cards */}
      <div className="small-blogs-row">
        {rest.map((blog) => (
          <div key={blog.slug} className="small-blog-card">
            <Link to={`/blogs/${blog.slug}`} state={{ blog }}>
              <img src={resolveImageSrc(blog.mainImage)} alt={blog.title} />
            </Link>

            <div className="info">
              <span className="category">
                <Link
                  to={`/category/${blog.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {blog.category}
                </Link>
              </span>
              <h4>
                <Link
                  to={`/blogs/${blog.slug}`}
                  state={{ blog }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {blog.title}
                </Link>
              </h4>
              <p className="meta">
                {blog.author} • {blog.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
