import React from 'react';
import Post from './Post';
import PostForm from './PostForm';
import '../styles/ThreadView.css';

const ThreadView = ({ 
  thread, 
  onAddReply, 
  onDeletePost, 
  onDeleteThread, 
  userIp,
  messagesEndRef
}) => {
  const { id, subject, text, createdAt, formattedTime, replies, image, authorId, authorIp } = thread;
  
  const handleDeleteOriginalPost = () => {
    if (onDeleteThread && window.confirm('Are you sure you want to delete this entire thread?')) {
      onDeleteThread();
    }
  };
  
  const handleDeleteReply = (postId) => {
    if (onDeletePost && window.confirm('Are you sure you want to delete this post?')) {
      onDeletePost(postId);
    }
  };

  return (
    <div className="thread-view">
      {/* Original Post */}
      <div className="thread-view-op terminal-container">
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
          onDelete={onDeleteThread ? handleDeleteOriginalPost : null}
        />
      </div>
      
      {/* Thread stats */}
      <div className="thread-stats terminal-text">
        <span className="stats-replies">
          {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
        </span>
        <span className="stats-images">
          {replies.filter(reply => reply.image).length + (image ? 1 : 0)} Images
        </span>
      </div>
      
      {/* Replies */}
      <div className="thread-view-replies">
        {replies.map(reply => (
          <div key={reply.id} className="thread-view-reply terminal-container">
            <Post 
              post={reply}
              onDelete={onDeletePost ? () => handleDeleteReply(reply.id) : null}
            />
          </div>
        ))}
      </div>
      
      {/* Reply Form */}
      <div className="thread-view-form">
        <PostForm 
          onSubmit={onAddReply} 
          isThread={false}
          userIp={userIp}
          threadId={id}
        />
      </div>
      
      {/* Ref for auto-scrolling to bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ThreadView;