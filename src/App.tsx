import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import ServicesPage from "./pages/ServicesPage";
import { Hero } from "./components/Hero";
import { VideoShowcase } from "./components/VideoShowCase";
import { Services } from "./components/Services";
import CreateBlog from "./pages/CreateBlog";
import Footer from "./components/Footer";
import ServiceStack from "./components/ServiceStack";
import LoginForm from "./components/LoginForm";
import "./components/App.css";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import CategoryPage from "./pages/CategoryPage";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Updated condition to hide header/footer on blogs and category pages
  const hideLayout =
    location.pathname.startsWith("/blogs") ||
    location.pathname.startsWith("/category");

  return (
    <>
      {!hideLayout && <Header />}

      {isHome && !hideLayout && (
        <>
          <Hero />
          <VideoShowcase />
          <Services />
          <ServiceStack />
        </>
      )}

      <Routes>
        {/* Blog and category routes without header/footer */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />

        {/* All other pages inside layout */}
        {!hideLayout && (
          <>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<ServicesPage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/create-blog" element={<CreateBlog />} />
          </>
        )}
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
