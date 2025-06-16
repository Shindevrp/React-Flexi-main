import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import styles from './App.module.css';

const initialPosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    summary: 'Learn the basics of React and build your first application.',
    content: 'Learn the basics of React and build your first application.',
    date: '2023-01-01',
    url: '/posts/1',
    author: 'John Doe',
  },
  {
    id: '2',
    title: 'CSS Grid vs. Flexbox',
    summary: 'A comparison of two powerful layout systems in CSS.',
    content: 'A comparison of two powerful layout systems in CSS.',
    date: '2023-02-15',
    url: '/posts/2',
    author: 'Jane Smith',
  },
  {
    id: '3',
    title: 'Accessibility in Web Development',
    summary: 'Tips for making your web applications more accessible.',
    content: 'Tips for making your web applications more accessible.',
    date: '2023-03-10',
    url: '/posts/3',
    author: 'Alex Johnson',
  }
];

const App = () => {
  const [posts, setPosts] = useState(initialPosts);
  const navigate = useNavigate();

  const handleCreatePost = (formData) => {
    const newPost = {
      id: String(posts.length + 1),
      ...formData,
      summary: formData.content.substring(0, 150) + '...',
      url: `/posts/${posts.length + 1}`
    };
    setPosts([...posts, newPost]);
    navigate('/');
  };

  const handleUpdatePost = (id, formData) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          ...formData,
          summary: formData.content.substring(0, 150) + '...'
        };
      }
      return post;
    }));
    navigate('/');
  };

  const handleDeletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    navigate('/');
  };

  const getPost = (id) => posts.find(post => post.id === id);

  return (
    <div className={styles.app}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.homeLink}>Blog Posts</Link>
        <Link to="/create" className={styles.createButton}>Create New Post</Link>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className={styles.container}>
              <BlogPostList posts={posts} />
            </div>
          } 
        />
        <Route 
          path="/posts/:id" 
          element={<BlogPostDetail posts={posts} onDelete={handleDeletePost} />} 
        />
        <Route 
          path="/create" 
          element={<CreatePost onSubmit={handleCreatePost} />} 
        />
        <Route 
          path="/edit/:id" 
          element={<EditPost onSubmit={handleUpdatePost} getPost={getPost} />} 
        />
      </Routes>
    </div>
  );
};

export default App;