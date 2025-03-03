import React from 'react';
import '../styles/Post.css';

const Post = ({ post, isOp = false, isPreview = false, onDelete = null }) => {
  const { id, subject, text, formattedTime, authorId, authorIp, image } = post;
  
  // Function to handle quoting posts
  const handleQuote = (event) => {
    event.preventDefault();
    
    // Find the closest reply form
    const replyForm = document.querySelector('.post-form textarea');
    if (replyForm) {
      // Add the quote to the form
      const currentText = replyForm.value;
      const quote = `>>${id}\n`;
      replyForm.value = currentText + quote;
      replyForm.focus();
      
      // Scroll to the form
      replyForm.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Function to convert text with quotes and post references to JSX with proper styling
  const formatText = (text) => {
    if (!text) return null;
    
    // Split by newlines to handle paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, paragraphIndex) => {
      // Handle lines within a paragraph
      const lines = paragraph.split('\n');
      
      const formattedLines = lines.map((line, lineIndex) => {
        // Greentext (lines starting with >)
        if (line.startsWith('>')) {
          return (
            <span key={lineIndex} className="greentext">
              {line}
              {lineIndex < lines.length - 1 && <br />}
            </span>
          );
        }
        
        // Post references (>>12345)
        const postRefRegex = /(&gt;&gt;|>>)(\d+)/g;
        const parts = [];
        let lastIndex = 0;
        let match;
        
        const lineWithEscapedChars = line.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        while ((match = postRefRegex.exec(lineWithEscapedChars)) !== null) {
          // Add the text before the match
          if (match.index > lastIndex) {
            parts.push(lineWithEscapedChars.substring(lastIndex, match.index));
          }
          
          // Add the post reference
          const postId = match[2];
          parts.push(
            <a 
              key={`${lineIndex}-${match.index}`}
              href={`#p${postId}`}
              className="post-reference"
              onClick={handleQuote}
            >
              {`>>${postId}`}
            </a>
          );
          
          lastIndex = match.index + match[0].length;
        }
        
        // Add the rest of the line
        if (lastIndex < lineWithEscapedChars.length) {
          parts.push(lineWithEscapedChars.substring(lastIndex));
        }
        
        // Fix: Using only dangerouslySetInnerHTML without children
        return (
          <div key={lineIndex}>
            {parts.length > 0 ? (
              parts.map((part, i) => 
                typeof part === 'string' ? 
                  <span key={i} dangerouslySetInnerHTML={{ __html: part }} /> : 
                  part
              )
            ) : (
              <span dangerouslySetInnerHTML={{ __html: lineWithEscapedChars }} />
            )}
            {lineIndex < lines.length - 1 && <br />}
          </div>
        );
      });
      
      return (
        <p key={paragraphIndex} className="post-paragraph">
          {formattedLines}
        </p>
      );
    });
  };

  return (
    <div className={`post ${isOp ? 'post-op' : ''} ${isPreview ? 'post-preview' : ''}`} id={`p${id}`}>
      <div className="post-header">
        {subject && (
          <span className="post-subject">
            {subject}
          </span>
        )}
        
        <span className="post-author">
          {authorId}
        </span>
        
        <span className="post-time">
          {formattedTime}
        </span>
        
        <span className="post-id">
          No.{id}
        </span>
        
        {!isPreview && (
          <span className="post-ip">
            ({authorIp})
          </span>
        )}
        
        {onDelete && (
          <button 
            className="post-delete-btn"
            onClick={onDelete}
            title="Delete post"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="post-content">
        {image && (
          <div className="post-image">
            <a href={image} target="_blank" rel="noopener noreferrer">
              <img src={image} alt="Post attachment" />
            </a>
          </div>
        )}
        
        <div className="post-text">
          {formatText(text)}
        </div>
      </div>
    </div>
  );
};

export default Post;