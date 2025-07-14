import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogPostItem.module.css';

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part)
      ? <span key={i} style={{ background: '#fff9c4' }}>{part}</span>
      : part
  );
}

const BlogPostItem = ({ title, summary, date, url, searchQuery }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.blogPostItem}>
      <Link to={url} className={styles.title}>
        <h2>{highlightText(title, searchQuery)}</h2>
      </Link>
      <p className={styles.summary}>{highlightText(summary, searchQuery)}</p>
      <p className={styles.date}>Published on {formattedDate}</p>
    </div>
  );
};

export default BlogPostItem;