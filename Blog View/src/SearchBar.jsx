import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch, ariaLabel = 'Search posts' }) {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(window.innerWidth > 768);
  const inputRef = useRef(null);

  // Responsive: expand/collapse on mobile
  useEffect(() => {
    function handleResize() {
      setExpanded(window.innerWidth > 768);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus input when expanded on mobile
  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  // Debounce search for dynamic updates
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  function handleInput(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
  }

  function handleExpand() {
    setExpanded(true);
  }

  function handleCancel() {
    setExpanded(false);
    setQuery('');
    onSearch('');
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit} role="search" aria-label={ariaLabel}>
      {(!expanded && window.innerWidth <= 768) ? (
        <button type="button" className={styles.iconButton} aria-label="Expand search" onClick={handleExpand}>
          <span className={styles.searchIcon} />
        </button>
      ) : (
        <>
          <label htmlFor="search-input" className={styles.visuallyHidden}>{ariaLabel}</label>
          <input
            id="search-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInput}
            placeholder="Search posts..."
            className={styles.input}
            autoComplete="off"
            aria-live="polite"
          />
          <button type="submit" className={styles.iconButton} aria-label="Search">
            <span className={styles.searchIcon} />
          </button>
          {(window.innerWidth <= 768) && (
            <button type="button" className={styles.cancelButton} onClick={handleCancel} aria-label="Cancel search">Cancel</button>
          )}
        </>
      )}
    </form>
  );
}

export default SearchBar;
