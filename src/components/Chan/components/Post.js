import React from 'react';
import '../styles/Post.css';
import { uuidToPostNumber, getRepeatingType } from '../utils/postNumber';

const Post = ({ post, isOp = false, isPreview = false, onDelete = null, onReply = null, replyRef = null }) => {
  const { id, subject, text, formattedTime, authorId, authorIp, image, tripcode, reply_to } = post;
  
  // Convert UUID to post number
  const postNumber = uuidToPostNumber(id);
  const repeatingType = getRepeatingType(postNumber);
  
  // Function to handle quoting posts
  const handleQuote = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Find the closest reply form
    const replyForm = document.querySelector('.post-form textarea');
    if (replyForm) {
      // Add the quote to the form
      const currentText = replyForm.value;
      const quote = `>>${postNumber}\n`;
      replyForm.value = currentText + quote;
      replyForm.focus();
      
      // Scroll to the form
      replyForm.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Format file information
  const renderFileInfo = () => {
    if (!image) return null;
    
    // Extract filename from path or use default
    const fileName = image.split('/').pop() || 'image.jpg';
    const fileSize = '20 KB'; // This would be dynamic in a real app
    const dimensions = '400x544'; // This would be dynamic in a real app
    
    return (
      <div className="file-section">
        <span className="file-tag">File: </span>
        <a 
          href={image} 
          target="_blank" 
          rel="noreferrer" 
          className="file-original"
          onClick={(e) => e.stopPropagation()}
        >
          {fileName}
        </a>
        <span className="file-dimensions"> ({fileSize}, {dimensions})</span>
      </div>
    );
  };
  
  // Render reference to replied post
  const renderReplyReference = () => {
    if (!replyRef) return null;
    
    // Convert the reference UUID to a post number too
    const refPostNumber = uuidToPostNumber(replyRef.id);
    
    return (
      <div className="reply-reference">
        <a 
          href={`#p${replyRef.id}`} 
          className="quoted-post"
          onClick={(e) => e.stopPropagation()}
        >
          &gt;&gt;{refPostNumber}
          {replyRef.isOp ? ' (OP)' : ''}
        </a>
      </div>
    );
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
              onClick={(e) => {
                e.stopPropagation();
                handleQuote(e);
              }}
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

  // Determine if the user is a mod - in a real app this would be a check against mod IDs
  const isMod = authorId.includes('## Mod');
  const modParts = isMod ? authorId.split('## Mod') : [authorId];
  const displayName = modParts[0].trim();

  // Handle reply button click
  const handleReplyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onReply) {
      onReply();
    }
  };

  // Handle delete button click
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(e);
    }
  };

  return (
    <div className={`post ${isOp ? 'post-op' : ''} ${isPreview ? 'post-preview' : ''}`} id={`p${id}`}>
      {/* Only show file info for non-preview posts */}
      {!isPreview && renderFileInfo()}
      
      {/* Show reference to replied post if applicable */}
      {renderReplyReference()}
      
      <div className="post-header">
        {subject && (
          <span className="post-subject">
            {subject}
          </span>
        )}
        
        <span className="name-block">
          {isMod ? (
            <>
              {displayName} <span className="mod-tag">## Mod</span>
            </>
          ) : (
            displayName
          )}
          {tripcode && (
            <span className="post-tripcode">!{tripcode}</span>
          )}
        </span>
        
        <span className="post-date">
          {formattedTime}
        </span>
        
        <a 
          href={`#p${id}`} 
          className="post-number"
          onClick={(e) => e.stopPropagation()}
        >
          No.{postNumber}
          {repeatingType && (
            <span className={`post-repeating ${repeatingType}`} title={`This post has ${repeatingType}!`}>
              {repeatingType === 'dubs' && '(dubs)'}
              {repeatingType === 'trips' && '(trips!!)'}
              {repeatingType === 'quads' && '(quads!!!)'}
              {repeatingType === 'quints' && '(quints!!!!)'}
            </span>
          )}
        </a>
        
        {/* Reply link shown only for non-preview posts */}
        {!isPreview && onReply && (
          <a 
            href="#" 
            onClick={handleReplyClick} 
            className="post-reply-link"
          >
            [Reply]
          </a>
        )}
        
        {/* Delete button for threads/posts that have an onDelete handler */}
        {onDelete && (
          <a 
            href="#" 
            onClick={handleDeleteClick} 
            className="post-delete-btn"
          >
            [Delete]
          </a>
        )}
      </div>
      
      <div className="post-content">
        {image && (
          <div className="post-image">
            <a 
              href={image} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
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