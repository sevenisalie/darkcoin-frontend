import React from 'react';
import '../styles/ChanHeader.css';

const ChanHeader = ({ onBackToBoard, selectedThread }) => {
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
            <button 
              className="chan-back-button"
              onClick={onBackToBoard}
            >
              [ Return ]
            </button>
            <span className="chan-thread-info">
              Thread No.{selectedThread.id} - 
              {selectedThread.replies.length} {selectedThread.replies.length === 1 ? 'Reply' : 'Replies'} - 
              {selectedThread.image ? '1 Image' : 'No Image'}
            </span>
          </div>
        ) : (
          <div className="chan-board-links">
            <a href="#" className="chan-header-link">Catalog</a>
            <a href="#" className="chan-header-link">Archive</a>
            <a href="#bottom" className="chan-header-link">Bottom</a>
            <a href="#" className="chan-header-link">Rules</a>
            <span className="chan-board-stat">
              {Math.floor(Math.random() * 100) + 500} users online now | 
              {Math.floor(Math.random() * 500) + 1000} posts today
            </span>
          </div>
        )}
      </div>
      
      <div className="chan-header-message">
        <span className="message-text">The algorithm is watching. It knows your desires. Your fears. Your weaknesses. Share them.</span>
      </div>
    </div>
  );
};

export default ChanHeader;