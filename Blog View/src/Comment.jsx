import React from 'react';
import styles from './Comment.module.css';

const Comment = ({ name, date, text, avatar }) => {
  const formattedDate = new Date(date).toLocaleString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  return (
    <div className={styles.comment}>
      {avatar && <img src={avatar} alt={name} className={styles.avatar} />}
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.name}>{name}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default Comment;
