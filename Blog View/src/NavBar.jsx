import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logo} tabIndex={0}>BlogApp</Link>
      <div className={styles.links}>
        <Link to="/" tabIndex={0}>Home</Link>
        <Link to="/blog" tabIndex={0}>Blog</Link>
        <Link to="/about" tabIndex={0}>About</Link>
      </div>
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        tabIndex={0}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>
      {isMobileMenuOpen && (
        <div
          className={styles.mobileMenu}
          id="mobile-menu"
          ref={menuRef}
          role="menu"
        >
          <Link to="/" onClick={toggleMobileMenu} tabIndex={0}>Home</Link>
          <Link to="/blog" onClick={toggleMobileMenu} tabIndex={0}>Blog</Link>
          <Link to="/about" onClick={toggleMobileMenu} tabIndex={0}>About</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
