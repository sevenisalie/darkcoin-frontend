import React, { useState, useEffect } from 'react';
import '../styles/PostForm.css';
import { uuidToPostNumber } from '../utils/postNumber';
const PostForm = ({ 
  onSubmit, 
  isThread = false, 
  userIp, 
  threadId = null, 
  loading = false, 
  error = null,
  replyToPost = null,
  compact = false
}) => {
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isNsfw, setIsNsfw] = useState(false);
  const [replyTo, setReplyTo] = useState('');
  const [localError, setLocalError] = useState('');
  const [filePreview, setFilePreview] = useState(null);

  // Initialize reply text if replying to a specific post
  useEffect(() => {
    if (replyToPost) {
      setReplyTo(replyToPost.id);
      const postNum = uuidToPostNumber(replyToPost.id);
      setText(`>>${postNum}\n`);
    }
  }, [replyToPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!text.trim() && !file) {
      setLocalError('A message or image is required.');
      return;
    }
    
    if (text.length > 2000) {
      setLocalError('Message too long (maximum is 2000 characters).');
      return;
    }
    
    setLocalError('');
    
    // Submit the post
    const result = await onSubmit({
      subject: subject.trim(),
      text: text.trim(),
      file: file,
      name: name.trim() || 'Anonymous',
      password: password.trim(),
      is_nsfw: isNsfw,
      reply_to: replyTo || null
    });
    
    // Only reset form if submission was successful
    if (result) {
      // Reset form
      setSubject('');
      setText('');
      setFile(null);
      setName('');
      setPassword('');
      setIsNsfw(false);
      setReplyTo('');
      setFilePreview(null);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (limit to 4MB)
      if (selectedFile.size > 4 * 1024 * 1024) {
        setLocalError('File size exceeds the 4MB limit.');
        return;
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setLocalError('Only JPEG, PNG, GIF, and WEBP files are allowed.');
        return;
      }
      
      setFile(selectedFile);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      
      setLocalError('');
    }
  };

  const removeImage = () => {
    setFile(null);
    setFilePreview(null);
  };

  // Extract post number from quote text in the textarea
  const handleTextChange = (e) => {
    const text = e.target.value;
    setText(text);
    
    // Check if text contains a reply reference (>>123456)
    const matches = text.match(/&gt;&gt;(\d+)/g) || text.match(/>>(\d+)/g);
    if (matches && matches.length > 0) {
      // Extract the last post ID referenced
      const lastMatch = matches[matches.length - 1];
      const postId = lastMatch.replace(/&gt;&gt;|>>/g, '');
      setReplyTo(postId);
    } else if (replyToPost) {
      // Keep original reply target if manually set
      setReplyTo(replyToPost.id);
    } else {
      setReplyTo('');
    }
  };

  // Additional class for compact mode (floating reply form)
  const formClass = compact ? 'post-form compact-form' : 'post-form';

  return (
    <div className={formClass}>
      {!compact && (
        <div className="post-form-header">
          <span className="form-title">
            {isThread ? 'Create New Thread' : `Reply to Thread${replyToPost ? ` No.${replyToPost.id}` : ''}`}
          </span>
        </div>
      )}
      
      {(localError || error) && (
        <div className="post-form-error">
          <span className="error-text">{localError || error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {isThread && (
            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                className="form-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                maxLength={100}
                disabled={loading}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name (optional)</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
              disabled={loading}
              placeholder="Anonymous"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password (for post deletion)</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div className="form-group file-input-group">
            <label htmlFor="image" className="form-label">Image</label>
            <input
              type="file"
              id="image"
              className="form-file-input"
              onChange={handleImageChange}
              accept="image/*"
              disabled={loading}
            />
            {filePreview && (
              <div className="file-preview">
                <img 
                  src={filePreview} 
                  alt="Preview" 
                  className="preview-image"
                />
                <button 
                  type="button" 
                  className="remove-image-btn"
                  onClick={removeImage}
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          
          <div className="form-group checkbox-group">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="nsfw"
                checked={isNsfw}
                onChange={(e) => setIsNsfw(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="nsfw" className="checkbox-label">NSFW</label>
            </div>
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="comment" className="form-label">Comment</label>
            <textarea
              id="comment"
              className="form-textarea"
              value={text}
              onChange={handleTextChange}
              rows={compact ? 4 : 5}
              maxLength={2000}
              disabled={loading}
            ></textarea>
          </div>
          
          <div className="form-footer">
            <div className="user-info">
              <span className="user-id">ID: Anonymous</span>
         
            </div>
            
            <button 
              type="submit" 
              className="form-button"
              disabled={loading}
            >
              {loading ? 'Submitting...' : isThread ? 'Post Thread' : 'Post Reply'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;