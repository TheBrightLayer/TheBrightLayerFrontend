import axios from "axios";

export interface Blog {
  _id: string;
  title: string;
  mainImage: string;
  category: string;
  createdAt: string;
}

const API_BASE = "http://localhost:5000/api";

// Fetch blogs by category
export async function getBlogsByCategory(category: string): Promise<Blog[]> {
  const res = await fetch(`${API_BASE}/categories/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

// Get a single blog by ID
export async function getBlogById(id: string): Promise<Blog | null> {
  const res = await fetch(`${API_BASE}/blogs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}
