import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Post } from "../data/posts";

type Props = { post: Post; index: number };

const PostCard: React.FC<Props> = ({ post, index }) => {
  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.05 * index, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
    >
      <Link to={`/blog/${post.slug}`} aria-label={post.title}>
        <img className="cover" src={post.cover} alt={post.title} loading="lazy" />
        <div className="body">
          <div className="meta">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
            <span>•</span>
            <span>{post.tags[0]}</span>
          </div>
          <h3 className="title">{post.title}</h3>
          <div className="tags">
            {post.tags.map((t) => (
              <span key={t} className="tag">#{t}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default PostCard;
