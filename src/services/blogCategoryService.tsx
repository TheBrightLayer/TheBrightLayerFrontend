// services/blogServices.ts
export interface Blog {
  _id: string;
  title: string;
  mainImage: string;
  category: string;
  createdAt: string;
}

const API_BASE = "http://localhost:5000/api";

export const blogServices = {
  async getBlogsByCategory(category: string): Promise<Blog[]> {
    try {
      const res = await fetch(`${API_BASE}/categories/category/${category}`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    } catch (err) {
      console.error("❌ blogServices.getBlogsByCategory error:", err);
      return [];
    }
  },

  async getBlogById(id: string): Promise<Blog | null> {
    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`);
      if (!res.ok) throw new Error("Failed to fetch blog");
      return res.json();
    } catch (err) {
      console.error("❌ blogServices.getBlogById error:", err);
      return null;
    }
  },
};
