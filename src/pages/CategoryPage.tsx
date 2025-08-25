// pages/CategoryPage.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogServices } from "../services/blogCategoryService";
import CategorySection from "../components/CategorySection";
import LoginForm from "../components/LoginForm";
import AnimatedNews from "../components/AnimatedNews";
import logo from "../assets/BrightLayerLogo.png"; // ✅ Update path if needed

import { Mail, Search, Settings, User } from "react-feather";
import "../styles/blogs.css";

interface Blog {
  id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (categoryName) {
      blogServices
        .getBlogsByCategory(categoryName)
        .then((data) => {
          const mappedBlogs = data.map((b: any) => ({
            id: b._id,
            title: b.title,
            image: `http://localhost:5000/${b.mainImage.replace(/\\/g, "/")}`,
            category: b.category,
            author: b?.author ?? "Unknown",
            date: new Date(b.createdAt).toLocaleDateString(),
          }));
          setBlogs(mappedBlogs);
        })
        .catch(console.error);
    }
  }, [categoryName]);

  return (
    <div className="blogs-page">
      {/* ===== Hero Header with Logo and Navbar ===== */}
      <div className="blog-logo">
        <Link to="/">
          <img src={logo} alt="BrightLayer Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-right">
        <button className="icon-btn" title="Messages">
          <Mail size={22} />
        </button>
        <button className="icon-btn" title="Search">
          <Search size={22} />
        </button>
        <button className="icon-btn" title="Settings">
          <Settings size={22} />
        </button>
        <button className="subscribe-btn">Subscribe</button>
        <button
          className="icon-btn"
          title="Profile"
          onClick={() => setShowLoginModal(true)}
        >
          <User size={22} />
        </button>
        {showLoginModal && (
          <LoginForm onClose={() => setShowLoginModal(false)} />
        )}
      </div>

      <AnimatedNews />

      {/* ===== Blog Category Content ===== */}
      {/* ===== Blog Category Content ===== */}
      <div className="blogs-container">
        {/* ===== Breadcrumb ===== */}
        <div className="breadcrumb">
          <Link to="/blogs" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            {categoryName?.toUpperCase()}
          </span>
        </div>

        <CategorySection
          title={categoryName?.toUpperCase() || ""}
          blogs={blogs}
          bigCards
        />
      </div>
    </div>
  );
};

export default CategoryPage;
