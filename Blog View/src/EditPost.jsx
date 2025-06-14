import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPostForm from './BlogPostForm';
import styles from './EditPost.module.css';

const EditPost = ({ onSubmit, getPost }) => {
  const { id } = useParams();
  const existingPost = getPost(id);
  const handleSubmit = async (formData) => {
    await onSubmit(id, formData);
  };

  return (
    <div className={styles.editPost}>
      <h1>Edit Blog Post</h1>
      <BlogPostForm post={existingPost} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPost;
