import React from 'react';
import BlogPostForm from './BlogPostForm';
import styles from './CreatePost.module.css';

const CreatePost = ({ onSubmit }) => {
  const handleSubmit = async (formData) => {
    await onSubmit(formData);
  };

  return (
    <div className={styles.createPost}>
      <h1>Create New Blog Post</h1>
      <BlogPostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;
