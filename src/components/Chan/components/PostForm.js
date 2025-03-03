import React, { useState } from 'react';
import '../styles/PostForm.css';

const PostForm = ({ onSubmit, isThread = false, userIp, threadId = null }) => {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!text.trim() && !image) {
      setError('A message or image is required.');
      return;
    }
    
    if (text.length > 2000) {
      setError('Message too long (maximum is 2000 characters).');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // For demo purposes, simulate image upload with a placeholder
    // In a real app, you would upload the image to your server
    let imageUrl = null;
    if (image) {
      // Generate a random placeholder for demo purposes
      const width = 300 + Math.floor(Math.random() * 300);
      const height = 300 + Math.floor(Math.random() * 300);
      imageUrl = `/api/placeholder/${width}/${height}`;
    }
    
    // Submit the post
    onSubmit({
      subject: subject.trim(),
      text: text.trim(),
      image: imageUrl
    });
    
    // Reset form
    setSubject('');
    setText('');
    setImage(null);
    setIsSubmitting(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="post-form terminal-container">
      <div className="post-form-header">
        <span className="form-title font-terminal text-terminal-bright-green">
          {isThread ? 'Create New Thread' : 'Reply to Thread'}
        </span>
      </div>
      
      {error && (
        <div className="post-form-error">
          <span className="text-red-500">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {isThread && (
            <div className="form-group">
              <label htmlFor="subject" className="terminal-text">Subject</label>
              <input
                type="text"
                id="subject"
                className="terminal-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={100}
              />
            </div>
          )}
          
          <div className="form-group file-input-group">
            <label htmlFor="image" className="terminal-text">Image</label>
            <input
              type="file"
              id="image"
              className="terminal-file-input"
              onChange={handleImageChange}
              accept="image/*"
            />
            {image && (
              <button 
                type="button" 
                className="remove-image-btn"
                onClick={removeImage}
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="comment" className="terminal-text">Comment</label>
            <textarea
              id="comment"
              className="terminal-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              maxLength={2000}
            ></textarea>
          </div>
          
          <div className="form-footer">
            <div className="user-info terminal-text">
              <span className="user-id">ID: Anonymous</span>
              <span className="user-ip">{userIp}</span>
            </div>
            
            <button 
              type="submit" 
              className="btn-terminal-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : isThread ? 'Post Thread' : 'Post Reply'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;