import React, { useState, useEffect } from 'react';
import Post from './Post';
import PostForm from './PostForm';
import '../styles/ThreadView.css';
import { uuidToPostNumber } from "../utils/postNumber.js";

const ThreadView = ({ 
  thread, 
  posts = [],
  onAddReply, 
  onDeletePost, 
  onDeleteThread, 
  userIp,
  messagesEndRef,
  loading = false,
  error = null
}) => {
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyFormVisible, setReplyFormVisible] = useState(false);

  // Hide reply form when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const replyForm = document.querySelector('.reply-form-container');
      if (replyForm && !replyForm.contains(event.target) && 
          !event.target.classList.contains('post-reply-link') &&
          !event.target.closest('.post-reply-link')) {
        setReplyFormVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!thread) {
    return (
      <div className="chan-error">
        <div className="error-text">
          Thread not found or has been deleted.
        </div>
      </div>
    );
  }

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

  // Handle reply to a specific post
  const handleReplyToPost = (post) => {
    setReplyTarget(post);
    setReplyFormVisible(true);
  };

  // Close reply form
  const closeReplyForm = () => {
    setReplyFormVisible(false);
    setReplyTarget(null);
  };

// Submit reply
const handleSubmitReply = async (replyData) => {
  try {
    // When replying to OP, don't set reply_to as OP is in the threads table not posts
    if (replyTarget && replyTarget.id === thread.id) {
      // When replying to the OP, set reply_to to null
      replyData.reply_to = null;
    } else if (replyTarget) {
      // When replying to another post, set reply_to to that post's ID
      replyData.reply_to = replyTarget.id;
    } else {
      // Default case - not replying to anything specific
      replyData.reply_to = null;
    }
    
    const success = await onAddReply(replyData);
    
    if (success) {
      setReplyFormVisible(false);
      setReplyTarget(null);
    }
    
    return success;
  } catch (error) {
    console.error('Error submitting reply:', error);
    return false;
  }
};

  // Format the thread data to match our component's expected format
  const formattedThread = {
    id: thread.id,
    subject: thread.subject || '',
    text: thread.comment,
    createdAt: new Date(thread.created_at),
    formattedTime: formatDateForDisplay(thread.created_at),
    image: thread.file_path,
    authorId: thread.name || 'Anonymous',
    authorIp: userIp,
    tripcode: thread.tripcode
  };

  // Format the posts data
  const formattedPosts = posts.map(post => ({
    id: post.id,
    text: post.comment,
    subject: '',
    createdAt: new Date(post.created_at),
    formattedTime: formatDateForDisplay(post.created_at),
    authorId: post.name || 'Anonymous',
    authorIp: userIp,
    image: post.file_path,
    tripcode: post.tripcode,
    reply_to: post.reply_to
  }));

  // Group posts by who they're replying to for rendering references
  const postById = formattedPosts.reduce((acc, post) => {
    acc[post.id] = post;
    return acc;
  }, {});
  
  // Add the OP to the lookup
  postById[formattedThread.id] = formattedThread;

  return (
    <div className="thread-view">
      {/* Original Post */}
      <div className="thread-view-op">
        <Post 
          post={formattedThread}
          isOp={true}
          onDelete={onDeleteThread ? handleDeleteOriginalPost : null}
          onReply={() => handleReplyToPost(formattedThread)}
        />
      </div>
      
      {/* Thread stats */}
      <div className="thread-stats">
        <span className="stats-replies">
          {posts.length} {posts.length === 1 ? 'Reply' : 'Replies'}
        </span>
        <span className="stats-images">
          {posts.filter(post => post.file_path).length + (thread.file_path ? 1 : 0)} Images
        </span>
      </div>
      
      {/* Replies - all at same indentation level */}
      <div className="thread-view-replies">
        {formattedPosts.map((post) => (
          <div key={post.id} className="thread-view-reply">
            <span className="quote-arrow">&gt;&gt;</span>
            <Post 
              post={post}
              onDelete={onDeletePost ? () => handleDeleteReply(post.id) : null}
              onReply={() => handleReplyToPost(post)}
              replyRef={post.reply_to ? postById[post.reply_to] : null}
            />
          </div>
        ))}
      </div>
      
      {/* Main reply form at bottom of thread */}
      <div className="main-reply-form mt-6 mb-8">
        <div className="reply-form-header">
          <div className="form-title px-4 py-2 bg-terminal-dark">Post a Reply</div>
        </div>
        <PostForm 
          onSubmit={handleSubmitReply} 
          isThread={false}
          userIp={userIp}
          threadId={thread.id}
          loading={loading}
          error={error}
        />
      </div>
      
      {/* Floating Reply Form - only shown when a Reply link is clicked */}
      {replyFormVisible && (
        <div className="reply-form-container active">
          <button 
            className="reply-form-close" 
            onClick={closeReplyForm}
          >
            ×
          </button>
          <div className="reply-form-title">
            Reply to {replyTarget.id === formattedThread.id ? 
              <span>Thread <span className="op-marker">(OP)</span></span> : 
              <span>Post No.{uuidToPostNumber(replyTarget.id)}</span>
            }
          </div>
          <PostForm 
            onSubmit={handleSubmitReply} 
            isThread={false}
            userIp={userIp}
            threadId={thread.id}
            loading={loading}
            error={error}
            replyToPost={replyTarget}
            compact={true}
          />
        </div>
      )}
      
      {/* Ref for auto-scrolling to bottom */}
      <div ref={messagesEndRef} id="bottom" />
      
      {/* Back to bottom link when scrolled up */}
      <div className="back-to-bottom">
        <a href="#bottom">Return to bottom</a>
      </div>
    </div>
  );
};

// Helper function to format dates for display
function formatDateForDisplay(dateString) {
  try {
    const date = new Date(dateString);
    
    // Format: MM/DD/YY(Day)HH:MM:SS
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const dayName = dayNames[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${month}/${day}/${year}(${dayName})${hours}:${minutes}:${seconds}`;
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateString;
  }
}

export default ThreadView;