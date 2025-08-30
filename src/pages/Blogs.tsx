import React, { useState, useEffect, useRef } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";
import FeaturedBlog from "../components/FeaturedBlog";
import blogImage from "../assets/newslaundary.png";
import logo from "../assets/BrightLayerLogo.png";
import CategorySection from "../components/CategorySection";
import LoginForm from "../components/LoginForm";
import SettingsPage from "./SettingsPage";
import Footer from "../components/BlogsFooter";
import ProfileModal from "../components/ProfileModal";
import "../styles/Profile.css";
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
  Edit,
} from "lucide-react";
import "../styles/Blogs.css";

// ---------------- Small Blog Card ----------------
const SmallBlogCard: React.FC<{
  slug: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
  userRole?: string;
  onDelete?: (slug: string) => void;
}> = ({ slug, title, image, category, author, date, userRole, onDelete }) => {
  return (
    <div className="small-blog-card" style={{ position: "relative" }}>
      <Link to={`/blogs/${slug}`}>
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
            to={`/blogs/${slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {title}
          </Link>
        </h4>
        <p className="meta">
          {author} • {date}
        </p>
      </div>
      {userRole === "superAdmin" && (
        <button
          onClick={() => onDelete && onDelete(slug)}
          className="delete-btn"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Delete
        </button>
      )}

      {/* {userRole && (userRole === "admin" || userRole === "superAdmin") && (
        <Link to={`/edit-blog/${slug}`} className="edit-btn">
          <Edit size={22} />
        </Link>
      )} */}
    </div>
  );
};

// ---------------- Category Page ----------------
// Add this only: CategoryPage component
const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      fetch(
        `https://thebrightlayerbackend.onrender.com/api/blogs?category=${encodeURIComponent(
          categoryName
        )}`
      )
        .then((res) => res.json())
        .then((data) =>
          setBlogs(Array.isArray(data) ? data : data?.blogs || [])
        )
        .catch((err) => console.error("Error fetching category blogs:", err))
        .finally(() => setLoading(false));
    }
  }, [categoryName]);

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "";

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
    let img = blogImage; // fallback image

    if (b?.mainImage) {
      if (b.mainImage.startsWith("data:image")) {
        img = b.mainImage;
      } else if (/^[A-Za-z0-9+/=]+$/.test(b.mainImage)) {
        img = `data:image/jpeg;base64,${b.mainImage}`;
      } else {
        img = `https://thebrightlayerbackend.onrender.com/${String(
          b.mainImage
        ).replace(/\\/g, "/")}`;
      }
    } else if (b?.content) {
      // Optionally generate an image placeholder or thumbnail from content
      img = blogImage;
    }

    return {
      slug: b?.slug || b?._id || String(Math.random()),
      title: b?.title || "Untitled",
      mainImage: img, // ✅ must match CategorySection
      category: b?.category || "General",
      author: b?.author || "Team BrightLayer",
      date: formatDate(b?.createdAt || b?.updatedAt),
      excerpt: contentToExcerpt(b?.content),
    };
  };

  const cards = blogs.map(toCard);

  return (
    <div className="category-page">
      <h2 style={{ margin: "20px 0" }}>
        Category: {categoryName?.replace("-", " ")}
      </h2>
      {loading && <p>Loading...</p>}
      {!loading && cards.length === 0 && <p>No blogs found.</p>}
      <div className="all-category-blogs">
        {cards.map((blog) => (
          <SmallBlogCard
            key={blog.slug}
            slug={blog.slug}
            title={blog.title}
            image={blog.image}
            category={blog.category}
            author={blog.author}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  );
};

// ---------------- CategoryBlock (optimized) ----------------
const CategoryBlock: React.FC<{
  category: string;
  cards: any[];
  userRole?: string;
}> = ({ category, cards, userRole }) => {
  if (!cards || cards.length === 0) return null;

  const [featured, ...rest] = cards;
  const small = rest.slice(0, 3);

  return (
    <div className="category-block">
      <Link
        to={`/blogs/${featured.slug}`}
        style={{ textDecoration: "none" }}
        className="featured-blog"
      >
        <FeaturedBlog {...featured} />
      </Link>

      <div className="small-blogs-row">
        {small.map((b) => (
          <SmallBlogCard
            key={b.slug}
            slug={b.slug}
            title={b.title}
            image={b.image}
            category={b.category}
            author={b.author}
            date={b.date}
            userRole={userRole}
          />
        ))}
      </div>
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
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredBlogs(apiBlogs);
    } else {
      const filtered = apiBlogs.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, apiBlogs]);

  const mainCategories = [
    "Technology",
    "Sports",
    "Entertainment",
    "Politics",
    "Finance",
    "Lifestyle",
    "हिंदी",
  ];
  const moreCategories = ["Community", "Events"];

  const categoryIcons: Record<string, JSX.Element> = {
    Technology: <Monitor size={20} />,
    Sports: <Trophy size={20} />,
    Entertainment: <Clapperboard size={20} />,
    Politics: <Landmark size={20} />,
    Finance: <DollarSign size={20} />,
    Lifestyle: <Heart size={20} />,
    हिंदी: <Languages size={20} />,
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(
        `https://thebrightlayerbackend.onrender.com/api/blogs/${slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`, // if your API requires auth
          },
        }
      );

      if (res.ok) {
        setApiBlogs((prev) =>
          prev.filter((b) => b.slug !== slug && b._id !== slug)
        );
        alert("Blog deleted successfully!");
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Something went wrong!");
    }
  };

  // ---------------- Fetch all blogs once ----------------
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://thebrightlayerbackend.onrender.com/api/blogs"
        );
        const data = await res.json();
        setApiBlogs(Array.isArray(data) ? data : data?.blogs || []);
      } catch (e) {
        console.error("Error fetching blogs:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------------- Get user role ----------------
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserRole(parsed.role);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // ---------------- Helper functions ----------------
  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "";

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
    let img = blogImage;

    if (b?.mainImage) {
      if (b.mainImage.startsWith("data:image")) {
        img = b.mainImage;
      } else if (/^[A-Za-z0-9+/=]+$/.test(b.mainImage)) {
        img = `data:image/jpeg;base64,${b.mainImage}`;
      } else {
        img = `https://thebrightlayerbackend.onrender.com/${String(
          b.mainImage
        ).replace(/\\/g, "/")}`;
      }
    }

    return {
      slug: b?.slug || b?._id || String(Math.random()),
      title: b?.title || "Untitled",
      image: img,
      category: b?.category || "General",
      author: b?.author || "Team BrightLayer",
      date: formatDate(b?.createdAt || b?.updatedAt),
      excerpt: contentToExcerpt(b?.content),
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profilePhoto");
    setUser(null);
    setUserRole(null);
    setShowProfile(false);
  };

  // ---------------- Scroll effect ----------------
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

  // ---------------- Group blogs per category ----------------
  const blogsByCategory = mainCategories.reduce((acc, cat) => {
    acc[cat] = apiBlogs
      .filter((b) => b.category === cat)
      .slice(0, 4)
      .map(toCard);
    return acc;
  }, {} as Record<string, any[]>);

  // ---------------- Featured & latest ----------------
  const apiCards = apiBlogs.map(toCard);
  const featuredFromApi = apiCards[0];
  const latestFromApi = apiCards.slice(1, 4);

  const featuredToUse = featuredFromApi
    ? { slug: featuredFromApi.slug, ...featuredFromApi }
    : {
        slug: "1",
        title: "Proof of tech revolution shaping 2025",
        excerpt: "How AI and startups are transforming industries worldwide.",
        image: blogImage,
        category: "Technology",
        author: "Ritik Sinha",
        date: "Aug 23, 2025",
      };

  const latestToUse =
    latestFromApi.length > 0
      ? latestFromApi.map(({ slug, title, image, category, author, date }) => ({
          slug,
          title,
          image,
          category,
          author,
          date,
        }))
      : [
          {
            slug: "1",
            title: "5 Trends in Modern Web Development",
            image: blogImage,
            category: "Web Dev",
            author: "Team BrightLayer",
            date: "Aug 22, 2025",
          },
          {
            slug: "2",
            title: "Why Businesses Need Digital Presence in 2025",
            image: blogImage,
            category: "Business",
            author: "Team BrightLayer",
            date: "Aug 21, 2025",
          },
          {
            slug: "3",
            title: "Is AI replacing jobs or creating new ones?",
            image: blogImage,
            category: "AI",
            author: "Team BrightLayer",
            date: "Aug 20, 2025",
          },
        ];

  // ---------------- Language detection ----------------
  const currentLang: "hi" | "en" | undefined = apiBlogs.some(
    (b) => b?.language === "hi" || b?.category === "हिंदी"
  )
    ? "hi"
    : undefined;

  // ---------------- JSX ----------------
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="blogs-page">
            {/* Navbar & logo */}
            <div className="blog-logo">
              <Link to="/blogs">
                <img src={logo} alt="BrightLayer Logo" className="logo" />
              </Link>
            </div>
            {searchOpen && (
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            )}
            <div className="navbar-right">
              <button
                className="icon-btn"
                onClick={() => {
                  window.location.href = "mailto:contact@thebrightlayer.com";
                }}
              >
                <Mail size={22} />
              </button>
              <button
                className="icon-btn"
                title="Search"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={22} />
              </button>

              <button
                className="icon-btn"
                title="Settings"
                onClick={() => setShowSettings(true)}
              >
                <Settings size={22} />
              </button>
              <button className="subscribe-btn">Subscribe</button>

              {!user ? (
                <button
                  className="icon-btn"
                  title="Login"
                  onClick={() => setShowLoginModal(true)}
                >
                  <User size={22} />
                </button>
              ) : (
                <img
                  src={
                    localStorage.getItem("profilePhoto") ||
                    "https://www.w3schools.com/w3images/avatar2.png"
                  }
                  alt="Profile"
                  className="nav-profile"
                  onClick={() => setShowProfileModal(true)}
                />
              )}
            </div>

            {showProfileModal && (
              <ProfileModal
                user={user}
                onClose={() => setShowProfileModal(false)}
                onLogout={handleLogout}
                onUpdateUser={setUser}
              />
            )}
            {showLoginModal && (
              <LoginForm
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => {
                  const stored = localStorage.getItem("user");
                  if (stored) {
                    const parsed = JSON.parse(stored);
                    setUser(parsed);
                    setUserRole(parsed.role);
                  }
                  setShowLoginModal(false);
                }}
              />
            )}
            {showSettings && (
              <SettingsPage onClose={() => setShowSettings(false)} />
            )}
            {showProfile && user && (
              <ProfileModal
                user={user}
                onClose={() => setShowProfile(false)}
                onLogout={handleLogout}
                onUpdateUser={setUser}
              />
            )}

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
                  <button key={index} className="category-btn">
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

              {userRole === "admin" && (
                <Link
                  to="/create-blog"
                  className="create-blog-btn"
                  title="Create New Blog"
                >
                  <Pencil size={32} />
                </Link>
              )}
            </div>

            {/* Blogs Section */}
            <div className={`blogs-section ${hideBlogs ? "hidden" : ""}`}>
              {/* Featured blog */}
              <Link
                to={`/blogs/${featuredToUse.slug}`}
                style={{ textDecoration: "none" }}
                className="featured-blog"
              >
                <FeaturedBlog {...featuredToUse} />
              </Link>

              {/* Latest small blogs */}
              <div className="small-blogs-row">
                {(searchTerm ? filteredBlogs : latestToUse).map((blog) => (
                  <SmallBlogCard
                    key={blog.slug}
                    slug={blog.slug}
                    title={blog.title}
                    image={blog.image}
                    category={blog.category}
                    author={blog.author}
                    date={blog.date}
                    userRole={userRole || undefined}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {/* Categories - optimized */}
              <div className="categories-four-pack">
                {mainCategories.map((cat) => (
                  <CategoryBlock
                    key={cat}
                    category={cat}
                    cards={blogsByCategory[cat]}
                    userRole={userRole || undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        }
      />

      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>
  );
};

export default Blogs;
