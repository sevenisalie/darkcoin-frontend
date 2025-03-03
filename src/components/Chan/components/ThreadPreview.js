import React from 'react';
import Post from './Post';
import '../styles/ThreadPreview.css';

const ThreadPreview = ({ thread, onViewThread, onDeleteThread }) => {
  const { id, subject, text, createdAt, formattedTime, replies, image, authorId, authorIp } = thread;
  
  // Show the OP and up to 3 most recent replies for preview
  const latestReplies = replies.slice(-3);
  const replyCount = replies.length;
  const imageCount = replies.filter(reply => reply.image).length + (image ? 1 : 0);
  
  const handleViewThread = () => {
    onViewThread(id);
  };

  const handleDeleteThread = (e) => {
    e.stopPropagation();
    if (onDeleteThread && window.confirm('Are you sure you want to delete this thread?')) {
      onDeleteThread(id);
    }
  };

  return (
    <div className="thread-preview terminal-container">
      {/* Original Post */}
      <div className="thread-op" onClick={handleViewThread}>
        <Post 
          post={{
            id,
            subject,
            text,
            createdAt,
            formattedTime,
            authorId,
            authorIp,
            image
          }}
          isOp={true}
          onDelete={onDeleteThread ? handleDeleteThread : null}
        />
      </div>
      
      {/* Thread stats */}
      <div className="thread-stats terminal-text">
        <span className="stats-replies">
          {replyCount} {replyCount === 1 ? 'Reply' : 'Replies'}
        </span>
        <span className="stats-images">
          {imageCount} {imageCount === 1 ? 'Image' : 'Images'}
        </span>
      </div>
      
      {/* Preview of latest replies */}
      {latestReplies.length > 0 && (
        <div className="thread-replies" onClick={handleViewThread}>
          {latestReplies.map(reply => (
            <Post 
              key={reply.id}
              post={reply}
              isPreview={true}
            />
          ))}
        </div>
      )}
      
      {/* Omitted posts indicator */}
      {replyCount > 3 && (
        <div className="thread-omitted terminal-text" onClick={handleViewThread}>
          <span>{replyCount - 3} posts omitted. Click to expand.</span>
        </div>
      )}
      
      {/* View thread button */}
      <div className="thread-view-btn-container">
        <button 
          className="btn-terminal"
          onClick={handleViewThread}
        >
          View Thread
        </button>
      </div>
    </div>
  );
};

export default ThreadPreview;