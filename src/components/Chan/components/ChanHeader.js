import React from 'react';
import '../styles/ChanHeader.css';

const ChanHeader = ({ onBackToBoard, selectedThread, stats = {} }) => {
  // Format the last post time to a human-readable format
  const formatLastPostTime = (dateString) => {
    if (!dateString) return '';
    
    try {
      const lastPostDate = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - lastPostDate) / 1000);
      
      if (diffInSeconds < 60) {
        return 'just now';
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
      }
    } catch (e) {
      console.error('Error formatting date:', e);
      return '';
    }
  };

  return (
    <div className="chan-header">
      <div className="chan-header-top">
        <div className="chan-logo">
          <span className="chan-logo-text">DARK</span>
          <span className="chan-logo-text-highlight">CHAN</span>
        </div>
        <div className="chan-board-title">
          <span>/b/ - Random</span>
        </div>
      </div>
      
      <div className="chan-header-links">
        {selectedThread ? (
          <div className="chan-thread-nav">
            <a 
              href="#"
              className="chan-back-button"
              onClick={(e) => {
                e.preventDefault();
                onBackToBoard();
              }}
            >
              [ Return ]
            </a>
            <span className="chan-thread-info">
              Thread No.{selectedThread.id} - 
              {selectedThread.replies_count || 0} {selectedThread.replies_count === 1 ? 'Reply' : 'Replies'} - 
              {selectedThread.file_path ? '1 Image' : 'No Image'}
            </span>
          </div>
        ) : (
          <div className="chan-board-links">
            <a href="#" className="chan-header-link">Catalog</a>
            <a href="#" className="chan-header-link">Archive</a>
            <a href="#bottom" className="chan-header-link">Bottom</a>
            <a href="#" className="chan-header-link">Rules</a>
            <span className="chan-board-stat">
              {stats.total_threads || 0} threads | {stats.total_posts || 0} posts | {stats.total_images || 0} images | 
              Last post: {formatLastPostTime(stats.last_post_time)}
            </span>
          </div>
        )}
      </div>
      
      <div className="chan-header-message">
        <span>Anonymous posting is enabled. Remember to follow the rules.</span>
      </div>
    </div>
  );
};

export default ChanHeader;