import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import styles from './App.module.css';
import Layout from './Layout';
import SearchBar from './SearchBar';

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
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Search logic
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
    );
    setSearchResults(filtered);
  };

  // Expose search handler for NavBar
  useEffect(() => {
    window.handleSearchFromNavBar = handleSearch;
    return () => {
      window.handleSearchFromNavBar = null;
    };
  }, [posts]);

  return (
    <Layout>
      <div className={styles.createPostBar}>
        <Link to="/create" className={styles.createButton}>+ Create New Post</Link>
      </div>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className={styles.container}>
              {/* Show search results if searching, else all posts */}
              {searchQuery ? (
                <BlogPostList posts={searchResults || []} searchQuery={searchQuery} />
              ) : (
                <BlogPostList posts={posts} />
              )}
              {/* Show "No posts found" if searching and no results */}
              {searchQuery && searchResults && searchResults.length === 0 && (
                <p className={styles.noResults} aria-live="polite">No posts found.</p>
              )}
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
    </Layout>
  );
};

export default App;