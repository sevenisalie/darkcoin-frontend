import React from 'react';
import Post from './Post';
import '../styles/ThreadPreview.css';

const ThreadPreview = ({ thread, onViewThread, onDeleteThread }) => {
  if (!thread) return null;
  
  // Format the thread data to match our component's expected format
  const formattedThread = {
    id: thread.id,
    subject: thread.subject || '',
    text: thread.comment,
    createdAt: new Date(thread.created_at),
    formattedTime: formatDateForDisplay(thread.created_at),
    image: thread.file_path,
    authorId: thread.name || 'Anonymous',
    authorIp: 'Anonymous',  // We don't show real IPs in preview
    tripcode: thread.tripcode
  };
  
  // Preview posts if available (from the API)
  const previewPosts = thread.preview_posts || [];
  
  // Format preview posts
  const formattedPreviewPosts = previewPosts.map(post => ({
    id: post.id,
    text: post.comment,
    subject: '',
    createdAt: new Date(post.created_at),
    formattedTime: formatDateForDisplay(post.created_at),
    authorId: post.name || 'Anonymous',
    authorIp: 'Anonymous', // We don't show real IPs in preview
    image: post.file_path,
    tripcode: post.tripcode,
    reply_to: post.reply_to
  }));
  
  // Calculate stats
  const replyCount = thread.replies_count || 0;
  const imageCount = thread.images_count || 0;
  
  const handleViewThread = () => {
    onViewThread(thread.id);
  };

  const handleDeleteThread = (e) => {
    e.stopPropagation();
    if (onDeleteThread && window.confirm('Are you sure you want to delete this thread?')) {
      onDeleteThread(thread.id);
    }
  };

  // Format file information
  const renderFileInfo = () => {
    if (!thread.file_path) return null;
    
    const fileName = thread.file_name || 'image.jpg';
    const fileSize = formatFileSize(thread.file_size || 0);
    const dimensions = '400x544'; // You would get this from the actual image
    
    return (
      <div className="file-info">
        <span className="file-tag">File: </span>
        <a href={thread.file_path} target="_blank" rel="noreferrer" className="file-link">{fileName}</a>
        <span className="file-dimensions"> ({fileSize}, {dimensions})</span>
      </div>
    );
  };

  // For "X replies and Y images omitted" message
  const renderOmittedMessage = () => {
    if (replyCount <= formattedPreviewPosts.length) return null;
    
    const omittedReplies = replyCount - formattedPreviewPosts.length;
    const omittedText = `${omittedReplies} ${omittedReplies === 1 ? 'reply' : 'replies'} and ${imageCount} ${imageCount === 1 ? 'image' : 'images'} omitted.`;
    
    return (
      <div className="omitted-message">
        <span className="plus-icon">+</span>
        <span className="omitted-message-text">{omittedText}</span>
        <span className="expand-button" onClick={handleViewThread}>Click here</span> to view.
      </div>
    );
  };

  return (
    <div className="thread-preview">
      {/* File information */}
      {renderFileInfo()}
      
      {/* Original Post */}
      <div className="thread-op" onClick={handleViewThread}>
        <Post 
          post={formattedThread}
          isOp={true}
          onDelete={onDeleteThread ? handleDeleteThread : null}
          onViewThread={handleViewThread}
        />
      </div>
      
      {/* Omitted message */}
      {renderOmittedMessage()}
      
      {/* Preview of replies if available */}
      {formattedPreviewPosts.length > 0 && (
        <div className="thread-replies" onClick={handleViewThread}>
          {formattedPreviewPosts.map(reply => (
            <Post 
              key={reply.id}
              post={reply}
              isPreview={true}
            />
          ))}
        </div>
      )}
      
      {/* Reply link (instead of View Thread button) */}
      <div className="reply-link-container">
        <a 
          href="#"
          className="reply-link"
          onClick={(e) => {
            e.preventDefault();
            handleViewThread();
          }}
        >
          Reply
        </a>
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

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 KB';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default ThreadPreview;