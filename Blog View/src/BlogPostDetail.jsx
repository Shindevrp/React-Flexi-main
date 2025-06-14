import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ posts }) => {
  const { id } = useParams();
  const blogPost = posts.find(post => post.id === id);

  if (!blogPost) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }

  const formattedDate = new Date(blogPost.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  return (
    <article className={styles.blogPostDetail}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{blogPost.title}</h1>
          <Link to={`/edit/${id}`} className={styles.editButton}>
            Edit Post
          </Link>
        </div>
        <p className={styles.author}>By {blogPost.author}</p>
        <p className={styles.date}>Published on {formattedDate}</p>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
      </div>
    </article>
  );
};

export default BlogPostDetail;
