import React, { useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/Blogs.css";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";
import NotFound from "./NotFound";

const Blogs: React.FC = () => {
  const location = useLocation();

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="blog-app">
      {/* animated route outlet */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Blog list page */}
          <Route
            path="/"
            element={
              <motion.main
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="blog-list-page"
              >
                <BlogList />
              </motion.main>
            }
          />

          {/* Single blog post */}
          <Route
            path=":slug"
            element={
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <BlogPost />
              </motion.div>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <footer className="blog-footer">
        <p>
          © {new Date().getFullYear()} BrightLayer • Crafted with React, Framer
          Motion & love.
        </p>
        <Link to="/blogs">← Back to Blogs</Link>
      </footer>
    </div>
  );
};

export default Blogs;
