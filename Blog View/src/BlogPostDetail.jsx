import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './BlogPostDetail.module.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const getLocalComments = (postId) => {
  const data = localStorage.getItem(`comments_${postId}`);
  return data ? JSON.parse(data) : [];
};

const BlogPostDetail = ({ posts, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blogPost = posts.find(post => post.id === id);
  const [comments, setComments] = useState(() => getLocalComments(id));

  useEffect(() => {
    setComments(getLocalComments(id));
  }, [id]);

  const handleAddComment = (comment) => {
    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem(`comments_${id}` , JSON.stringify(updated));
  };

  if (!blogPost) {
    return <p className={styles.notFound}>Blog post not found.</p>;
  }

  const formattedDate = new Date(blogPost.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleBack = () => navigate(-1);
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(id);
    }
  };

  return (
    <article className={styles.blogPostDetail}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{blogPost.title}</h1>
          <div className={styles.buttonGroup}>
            <Link to={`/edit/${id}`} className={styles.editButton}>
              Edit Post
            </Link>
            <button onClick={handleDelete} style={{background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer'}}>
              Delete Post
            </button>
            <button onClick={handleBack} style={{background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 20px', cursor: 'pointer'}}>
              Back
            </button>
          </div>
        </div>
        <p className={styles.author}>By {blogPost.author}</p>
        <p className={styles.date}>Published on {formattedDate}</p>
        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>Comments</h2>
          <CommentList comments={comments} />
          <CommentForm onSubmit={handleAddComment} isLoggedIn={false} />
        </section>
      </div>
    </article>
  );
};

export default BlogPostDetail;
