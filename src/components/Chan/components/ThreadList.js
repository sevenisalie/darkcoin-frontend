import React from 'react';
import ThreadPreview from './ThreadPreview';
import '../styles/ThreadList.css';

const ThreadList = ({ threads, onViewThread, onDeleteThread }) => {
  if (!threads || threads.length === 0) {
    return (
      <div className="thread-list-empty terminal-container">
        <span className="terminal-text">No threads available. Be the first to post.</span>
      </div>
    );
  }

  return (
    <div className="thread-list">
      {threads.map(thread => (
        <ThreadPreview 
          key={thread.id}
          thread={thread}
          onViewThread={onViewThread}
          onDeleteThread={onDeleteThread}
        />
      ))}
    </div>
  );
};

export default ThreadList;