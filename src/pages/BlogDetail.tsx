import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/BlogDetail.css";
import {
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaLink,
  FaInstagram,
} from "react-icons/fa6";
import AnimatedNews from "../components/AnimatedNews";
import logo from "../assets/BrightLayerLogo.png";

interface Blog {
  _id: string;
  title: string;
  category: string;
  content: string;
  mainImage?: string;
  createdAt: string;
  slug: string;
}

// 👇 Use environment variable for API
const API_BASE =
  import.meta.env.VITE_API_URL || "https://thebrightlayerbackend.onrender.com";

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${slug}`);
        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON.");
        }

        const data = await res.json();
        setBlog(data);
      } catch (err: any) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs?limit=6`);
        const data = await res.json();
        setRecentBlogs(data);
      } catch (err) {
        console.error("Failed to fetch recent blogs:", err);
      }
    };

    fetchBlog();
    fetchRecentBlogs();
  }, [slug]);

  // if (loading) return <p className="loading">Loading blog...</p>;
  if (loading)
    return (
      <div className="loading">
        <div className="hourglass"></div>
        <p>Loading</p>
      </div>
    );

  if (error) return <p className="error">{error}</p>;
  if (!blog) return <p className="not-found">Blog not found.</p>;

  let parsedContent: any[] = [];
  try {
    parsedContent = blog.content ? JSON.parse(blog.content) : [];
  } catch (e) {
    parsedContent = [{ children: [{ text: blog.content }] }];
  }

  return (
    <div className="blog-detail">
      <div className="blog-detail-logo">
        <Link to="/blogs">
          <img src={logo} alt="BrightLayer Logo" className="logo" />
        </Link>
      </div>

      <AnimatedNews />

      {/* Social share sidebar */}
      <div className="social-sidebar">
        <a
          href="https://www.facebook.com/profile.php?id=61579758901588"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/thebrightlayerzz?igsh=MTdnY2Iza3V6Z2g2NA%3D%3D"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>

        <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
        {/* <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          <FaLink />
        </button> */}
      </div>

      {/* Main + Sidebar wrapper */}
      <div className="blog-main-wrapper">
        {/* Main Content */}
        <div className="blog-content">
          <Link to="/blogs" className="back-link">
            ← Back
          </Link>

          <span className="category-badge">{blog.category}</span>
          <h1 className="blog-title">{blog.title}</h1>
          <p className="subtitle">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>

          {blog.mainImage &&
            (() => {
              let imgSrc: string;

              if (blog.mainImage.startsWith("data:image")) {
                // Already a data URI
                imgSrc = blog.mainImage;
              } else if (/^[A-Za-z0-9+/=]+$/.test(blog.mainImage)) {
                // Raw base64 string from DB
                imgSrc = `data:image/jpeg;base64,${blog.mainImage}`;
              } else {
                // Old uploads file path
                imgSrc = `https://thebrightlayerbackend.onrender.com/${String(
                  blog.mainImage
                ).replace(/\\/g, "/")}`;
              }

              return (
                <div className="blog-image-wrapper">
                  <img src={imgSrc} alt="cover" className="blog-image" />
                </div>
              );
            })()}

          <div className="author-box">
            <span>
              <strong>BrightLayer</strong> •{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="blog-body">
            {parsedContent.map((block, i) => (
              <p key={i} className="blog-paragraph">
                {block.children?.map((c: any, j: number) => (
                  <span key={j}>{c.text}</span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* Recent Blogs Sidebar */}
        <div className="recent-blogs-sidebar">
          <h3>Recent Blogs</h3>
          <div className="recent-blog-cards">
            {recentBlogs
              .filter((item) => item.slug !== blog.slug)
              .slice(0, 6)
              .map((item) => (
                <Link
                  key={item.slug}
                  to={`/blogs/${item.slug}`}
                  className="recent-blog-card"
                >
                  {item.mainImage &&
                    (() => {
                      let imgSrc: string;

                      if (item.mainImage.startsWith("data:image")) {
                        // Already a data URI
                        imgSrc = item.mainImage;
                      } else if (/^[A-Za-z0-9+/=]+$/.test(item.mainImage)) {
                        // Raw base64 string
                        imgSrc = `data:image/jpeg;base64,${item.mainImage}`;
                      } else {
                        // Old uploads file path
                        imgSrc = `https://thebrightlayerbackend.onrender.com/${String(
                          item.mainImage
                        ).replace(/\\/g, "/")}`;
                      }

                      return (
                        <img
                          src={imgSrc}
                          alt={item.title}
                          className="recent-blog-image"
                        />
                      );
                    })()}

                  <div className="recent-blog-info">
                    <h4>{item.title}</h4>
                    <p className="recent-blog-date">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
