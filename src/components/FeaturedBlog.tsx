import React from "react";
import "../styles/FeaturedBlog.css";

interface FeaturedBlogProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

const FeaturedBlog: React.FC<FeaturedBlogProps> = ({
  title,
  excerpt,
  image,
  category,
  author,
  date,
}) => {
  return (
    <div className="featured-blog">
      <img src={image} alt={title} className="featured-image" />
      <div className="featured-overlay">
        <span className="featured-category">{category}</span>
        <h2 className="featured-title">{title}</h2>
        <p className="featured-excerpt">{excerpt}</p>
        <span className="featured-meta">
          By {author} • {date}
        </span>
      </div>
    </div>
  );
};

export default FeaturedBlog;
