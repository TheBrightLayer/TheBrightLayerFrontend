import React from "react";
import { Link } from "react-router-dom";
import "../styles/CategorySection.css";

interface Blog {
  id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
  content?: string;
}

interface Props {
  title: string;
  blogs: Blog[];
}

const CategorySection: React.FC<Props> = ({ title, blogs }) => {
  if (!blogs || blogs.length === 0) return null;

  // Limit to 4 blogs: 1 featured, 3 small cards
  const [featured, ...rest] = blogs.slice(0, 4);

  return (
    <div className="category-section">
      <h2 className="section-title">{title}</h2>

      {/* Featured Blog */}
      {featured && (
        <Link
          to={`/blogs/${featured.id}`}
          state={{ blog: featured }}
          className="blog-link"
        >
          <div className="featured-card">
            <img
              src={featured.image}
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

      {/* 3 Small Blog Cards */}
      <div className="small-blogs-row">
        {rest.slice(0, 3).map((blog) => (
          <div key={blog.id} className="small-blog-card">
            <Link to={`/blogs/${blog.id}`} state={{ blog }}>
              <img src={blog.image} alt={blog.title} />
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
                  to={`/blogs/${blog.id}`}
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
