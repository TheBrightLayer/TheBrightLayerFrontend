import React, { useState, useEffect, useRef } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";
import FeaturedBlog from "../components/FeaturedBlog";
import blogImage from "../assets/newslaundry.webp";
import logo from "../assets/BrightLayerLogo.png";
import CategorySection from "../components/CategorySection";
import LoginForm from "../components/LoginForm";
import AnimatedNews from "../components/AnimatedNews";
import {
  Mail,
  Search,
  Settings,
  User,
  Monitor,
  Trophy,
  Clapperboard,
  Landmark,
  DollarSign,
  Pencil,
  Heart,
  Languages,
} from "lucide-react";
import "../styles/Blogs.css";
import { getBlogsByCategory } from "../services/blogServices";

// Icon map for mobile view
const categoryIcons: Record<string, JSX.Element> = {
  Technology: <Monitor size={20} />,
  Sports: <Trophy size={20} />,
  Entertainment: <Clapperboard size={20} />,
  Politics: <Landmark size={20} />,
  Finance: <DollarSign size={20} />,
  Lifestyle: <Heart size={20} />,
  हिंदी: <Languages size={20} />,
};

// ---------------- Small Blog Card ----------------
const SmallBlogCard: React.FC<{
  id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
  userRole?: string;
}> = ({ id, title, image, category, author, date, userRole }) => {
  return (
    <div className="small-blog-card" style={{ position: "relative" }}>
      <Link to={`/blogs/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div className="info">
        <span className="category">
          <Link to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
            {category}
          </Link>
        </span>
        <h4>
          <Link
            to={`/blogs/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {title}
          </Link>
        </h4>
        <p className="meta">
          {author} • {date}
        </p>
      </div>

      {/* ✅ Edit button only for admin & superAdmin */}
      {userRole && (userRole === "admin" || userRole === "superAdmin") && (
        <Link to={`/edit-blog/${id}`} className="edit-btn">
          <Edit size={22} />
        </Link>
      )}
    </div>
  );
};

// ---------------- Category Page ----------------
const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      getBlogsByCategory(categoryName)
        .then(setBlogs)
        .catch((err) => console.error("Error fetching category blogs:", err))
        .finally(() => setLoading(false));
    }
  }, [categoryName]);

  return (
    <div className="category-page">
      <h2 style={{ margin: "20px 0" }}>
        Category: {categoryName?.replace("-", " ")}
      </h2>
      <CategorySection title={categoryName || ""} blogs={blogs} />
      {loading && <p>Loading...</p>}
      {!loading && blogs.length === 0 && <p>No blogs found.</p>}
    </div>
  );
};

// ---------------- Blogs Page ----------------
const Blogs: React.FC = () => {
  const [apiBlogs, setApiBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [hideBlogs, setHideBlogs] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 600 && navRef.current) {
      navRef.current.scrollLeft = 0;
    }
  }, []);

  const featured = {
    title: "Proof of tech revolution shaping 2025",
    excerpt: "How AI and startups are transforming industries worldwide.",
    image: blogImage,
    category: "Technology",
    author: "Ritik Sinha",
    date: "Aug 23, 2025",
  };

  const latestBlogs = [
    {
      id: "1",
      title: "5 Trends in Modern Web Development",
      image: blogImage,
      category: "Web Dev",
      author: "Team BrightLayer",
      date: "Aug 22, 2025",
    },
    {
      id: "2",
      title: "Why Businesses Need Digital Presence in 2025",
      image: blogImage,
      category: "Business",
      author: "Team BrightLayer",
      date: "Aug 21, 2025",
    },
    {
      id: "3",
      title: "Is AI replacing jobs or creating new ones?",
      image: blogImage,
      category: "AI",
      author: "Team BrightLayer",
      date: "Aug 20, 2025",
    },
  ];

  const mainCategories = [
    "Technology",
    "Sports",
    "Entertainment",
    "Politics",
    "Finance",
    "Lifestyle",
    "हिंदी",
  ];
  const moreCategories = ["Login", "NL Sena", "Community", "Events"];

  // ✅ Fetch role from localStorage instead of decoding JWT
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserRole(parsed.role);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();
        setApiBlogs(Array.isArray(data) ? data : data?.blogs || []);
      } catch (e) {
        console.error("Error fetching blogs:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navBottom =
          navRef.current.offsetTop + navRef.current.offsetHeight;
        setHideBlogs(window.scrollY > navBottom);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (iso?: string) => {
    try {
      return iso
        ? new Date(iso).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
        : "";
    } catch {
      return "";
    }
  };

  const contentToExcerpt = (contentStr?: string) => {
    try {
      if (!contentStr) return "";
      const nodes = JSON.parse(contentStr);
      const firstText =
        Array.isArray(nodes) && nodes.length > 0 && nodes[0].children
          ? nodes[0].children.map((c: any) => c.text || "").join(" ")
          : "";
      return firstText.slice(0, 160);
    } catch {
      return "";
    }
  };

  const toCard = (b: any) => {
    const img = b?.mainImage
      ? `http://localhost:5000/${String(b.mainImage).replace(/\\/g, "/")}`
      : blogImage;
    return {
      id: b?._id || String(Math.random()),
      title: b?.title || "Untitled",
      image: img,
      category: b?.category || "General",
      author: b?.author || "Team BrightLayer",
      date: formatDate(b?.createdAt || b?.updatedAt),
      excerpt: contentToExcerpt(b?.content),
    };
  };

  const apiCards = apiBlogs.map(toCard);
  const featuredFromApi = apiCards[0];
  const latestFromApi = apiCards.slice(1, 4);
  const sectionAFromApi = apiCards.slice(4, 7);
  const sectionBFromApi = apiCards.slice(7, 10);

  const featuredToUse = featuredFromApi
    ? {
        id: featuredFromApi.id,
        title: featuredFromApi.title,
        excerpt: featuredFromApi.excerpt || featured.excerpt,
        image: featuredFromApi.image,
        category: featuredFromApi.category,
        author: featuredFromApi.author,
        date: featuredFromApi.date,
      }
    : featured;

  const latestToUse =
    latestFromApi.length > 0
      ? latestFromApi.map(({ id, title, image, category, author, date }) => ({
          id,
          title,
          image,
          category,
          author,
          date,
        }))
      : latestBlogs;

  const techReviewsToUse =
    sectionAFromApi.length > 0
      ? sectionAFromApi.map(({ id, title, image, category, author, date }) => ({
          id,
          title,
          image,
          category,
          author,
          date,
        }))
      : latestBlogs;
  const navigate = useNavigate();
  const caseStudiesToUse =
    sectionBFromApi.length > 0
      ? sectionBFromApi.map(({ id, title, image, category, author, date }) => ({
          id,
          title,
          image,
          category,
          author,
          date,
        }))
      : latestBlogs;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="blogs-page">
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
                onClick={() => navigate("/login")}
              >
                <User size={22} />
              </button>
            </div>

            <AnimatedNews />

            {/* Categories */}
            <div className="category-nav" ref={navRef}>
              {mainCategories.map((cat, index) => {
                const isHindi = cat === "हिंदी";
                const icon = categoryIcons[cat];
                const buttonContent = (
                  <>
                    <span className="icon-only">{icon}</span>
                    <span className="text-only">{cat}</span>
                  </>
                );

                return isHindi ? (
                  <button
                    key={index}
                    className="category-btn"
                    onClick={async () => {
                      try {
                        setLoading(true);
                        const isCurrentlyHindi = apiBlogs.some(
                          (b) => b?.language === "hi" || b?.category === "हिंदी"
                        );

                        const lang = isCurrentlyHindi ? "en" : "hi";
                        const res = await fetch(
                          `http://localhost:5000/api/blogs?lang=${lang}`
                        );
                        const data = await res.json();
                        setApiBlogs(
                          Array.isArray(data) ? data : data?.blogs || []
                        );
                      } catch (e) {
                        console.error("Error toggling language blogs:", e);
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    {buttonContent}
                  </button>
                ) : (
                  <Link
                    key={index}
                    to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className="category-btn"
                  >
                    {buttonContent}
                  </Link>
                );
              })}

              <div
                className="dropdown"
                onMouseEnter={() => setShowMore(true)}
                onMouseLeave={() => setShowMore(false)}
              >
                <button className="dropdown-btn">More +</button>
                {showMore && (
                  <div className="dropdown-content">
                    {moreCategories.map((cat, index) =>
                      cat === "Login" ? (
                        <button
                          key={index}
                          className="category-btn"
                          onClick={() => setShowLoginModal(true)}
                        >
                          {cat}
                        </button>
                      ) : (
                        <Link
                          key={index}
                          to={`/category/${cat
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="category-btn"
                        >
                          {cat}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>

              <Link
                to="/create-blog"
                className="create-blog-btn"
                title="Create New Blog"
              >
                <Pencil size={32} />
              </Link>
            </div>

            {/* Blogs Section */}
            <div className={`blogs-section ${hideBlogs ? "hidden" : ""}`}>
              <Link
                to={`/blogs/${featuredToUse.id || "1"}`}
                style={{ textDecoration: "none" }}
              >
                <FeaturedBlog {...featuredToUse} />
              </Link>

              <div className="small-blogs-row">
                {(loading ? latestBlogs : latestToUse).map((blog: any) => (
                  <SmallBlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    image={blog.image}
                    category={blog.category}
                    author={blog.author}
                    date={blog.date}
                    userRole={userRole || undefined}
                  />
                ))}
              </div>

              <CategorySection
                title="Tech Reviews"
                blogs={loading ? latestBlogs : techReviewsToUse}
              />
              <CategorySection
                title="Case Studies"
                blogs={loading ? latestBlogs : caseStudiesToUse}
              />
            </div>
          </div>
        }
      />

      {/* Category Page */}
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
  );
};

export default Blogs;
