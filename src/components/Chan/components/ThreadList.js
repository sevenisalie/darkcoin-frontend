import React from 'react';
import ThreadPreview from './ThreadPreview';
import '../styles/ThreadList.css';

const ThreadList = ({ 
  threads, 
  onViewThread, 
  onDeleteThread, 
  pagination = {}, 
  onPageChange,
  currentPage = 1
}) => {
  if (!threads || threads.length === 0) {
    return (
      <div className="thread-list-empty">
        <span>No threads available. Be the first to post.</span>
      </div>
    );
  }

  // Calculate page range to show
  const renderPagination = () => {
    const { totalPages = 1 } = pagination;
    
    if (totalPages <= 1) return null;
    
    // Show up to 5 page numbers centered around current page
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Adjust start if we're near the end
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <button 
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt; Prev
          </button>
        )}
        
        {startPage > 1 && (
          <>
            <button 
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        
        {pages.map(page => (
          <button 
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <button 
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        
        {currentPage < totalPages && (
          <button 
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next &gt;
          </button>
        )}
      </div>
    );
  };

  // Render board navigation
  const renderBoardNav = () => {
    return (
      <div className="board-nav">
        <a href="/" className="board-nav-link">Home</a>
        <a href="#" className="board-nav-link">Catalog</a>
        <a href="#" className="board-nav-link">Archive</a>
        <a href="#bottom" className="board-nav-link">Bottom</a>
      </div>
    );
  };

  return (
    <div className="thread-list">
      {renderBoardNav()}
      
      {threads.map(thread => (
        <div key={thread.id} className="thread-entry">
          <ThreadPreview 
            thread={thread}
            onViewThread={onViewThread}
            onDeleteThread={onDeleteThread}
          />
        </div>
      ))}
      
      {renderPagination()}
      
      <a href="#top" className="back-to-top">Return to top</a>
      
      <div id="bottom"></div>
    </div>
  );
};

export default ThreadList;