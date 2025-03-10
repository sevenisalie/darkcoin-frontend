import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChanHeader from './ChanHeader';
import ThreadView from './ThreadView';
import ChanFooter from './ChanFooter';
import { 
  useThread, 
  useAddReply, 
  useDeleteThread, 
  useDeletePost,
  useBoardStats,
  createFormData
} from '../hooks/useApi';

const ThreadPage = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [userIp, setUserIp] = useState('Anonymous');
  const [password, setPassword] = useState('');
  const messagesEndRef = useRef(null);

  // Add body class when the component mounts
  useEffect(() => {
    document.body.classList.add('chan-page');
    
    // Remove class when component unmounts
    return () => {
      document.body.classList.remove('chan-page');
    };
  }, []);

  // Generate a fake user IP for anonymity display (just for UI, not actual user tracking)
  useEffect(() => {
    const generateUserIp = () => {
      const ipSegments = [];
      for (let i = 0; i < 4; i++) {
        ipSegments.push(Math.floor(Math.random() * 256));
      }
      return ipSegments.join('.');
    };

    setUserIp(generateUserIp());
  }, []);

  // Fetch selected thread with all replies
  const { 
    thread, 
    posts, 
    loading: threadLoading, 
    error: threadError, 
    refetch: refetchThread 
  } = useThread(threadId);

  // Add reply hook
  const { 
    addReply, 
    loading: addReplyLoading, 
    error: addReplyError 
  } = useAddReply(threadId);

  // Delete thread hook
  const { 
    deleteThread, 
    loading: deleteThreadLoading, 
    error: deleteThreadError 
  } = useDeleteThread();

  // Delete post hook
  const { 
    deletePost, 
    loading: deletePostLoading, 
    error: deletePostError 
  } = useDeletePost();

  // Board stats hook
  const { 
    stats, 
    loading: statsLoading 
  } = useBoardStats();

  // Auto-scroll to bottom when viewing a thread
  useEffect(() => {
    if (thread && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [thread, posts]);

  // Add a reply to a thread
// Add a reply to a thread
const handleAddReply = async (replyData) => {
  try {
    // Store password for potential deletion later
    if (replyData.password) {
      setPassword(replyData.password);
    }

    // Debugging
    console.log("Reply data received:", replyData);
    
    // If replying to the thread OP, set reply_to to null
    // The OP is in the threads table, not the posts table
    if (replyData.reply_to === thread.id) {
      console.log("Replying to OP - setting reply_to to null");
      replyData.reply_to = null;
    }

    // Create form data ensuring all fields are properly formatted
    const formData = createFormData({
      comment: replyData.text,
      name: replyData.name || 'Anonymous',
      password: replyData.password || '',
      is_nsfw: replyData.is_nsfw || false,
      // Only include reply_to if it's a valid value and not the thread ID
      ...(replyData.reply_to ? { reply_to: replyData.reply_to } : {}),
      file: replyData.file
    });

    // Debug form data
    console.log("Form data fields:", 
      Array.from(formData.entries()).map(([key, value]) => 
        key === 'file' ? `${key}: [File]` : `${key}: ${value}`)
    );

    // Call the API to add the reply
    const result = await addReply(formData);
    
    // After successful reply, refetch the current thread to show the new reply
    if (result) {
      await refetchThread();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error adding reply:', error);
    return false;
  }
};

  // Delete a thread
  const handleDeleteThread = async (userPassword) => {
    try {
      const passwordToUse = userPassword || password;
      
      if (!passwordToUse) {
        alert('Password is required to delete a thread.');
        return false;
      }
      
      await deleteThread(threadId, passwordToUse);
      
      // After successful deletion, go back to thread list
      navigate('/chan');
      
      return true;
    } catch (error) {
      console.error('Error deleting thread:', error);
      return false;
    }
  };

  // Delete a post
  const handleDeletePost = async (postId, userPassword) => {
    try {
      const passwordToUse = userPassword || password;
      
      if (!passwordToUse) {
        alert('Password is required to delete a post.');
        return false;
      }
      
      await deletePost(postId, passwordToUse);
      
      // After successful deletion, refetch the current thread
      await refetchThread();
      
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  };

  // Handle back to board
  const handleBackToBoard = () => {
    navigate('/chan');
  };

  // Loading state
  if (threadLoading && !thread) {
    return (
      <div className="chan-container">
        <ChanHeader 
          onBackToBoard={handleBackToBoard} 
          selectedThread={null} 
          stats={stats}
        />
        <div className="chan-loading">
          <div className="loading-text">
            Loading thread...
          </div>
        </div>
        <ChanFooter />
      </div>
    );
  }

  // Error state
  if (threadError) {
    return (
      <div className="chan-container">
        <ChanHeader 
          onBackToBoard={handleBackToBoard} 
          selectedThread={null} 
          stats={stats}
        />
        <div className="chan-error">
          <div className="error-text">
            {threadError || "Failed to load thread. It may have been deleted."}
          </div>
          <button 
            className="btn-terminal mt-4"
            onClick={handleBackToBoard}
          >
            Return to Board
          </button>
        </div>
        <ChanFooter />
      </div>
    );
  }

  return (
    <div className="chan-container">
      <ChanHeader 
        onBackToBoard={handleBackToBoard} 
        selectedThread={thread} 
        stats={stats}
      />
      
      {thread && (
        <ThreadView 
          thread={thread}
          posts={posts}
          onAddReply={handleAddReply}
          onDeletePost={handleDeletePost}
          onDeleteThread={handleDeleteThread}
          userIp={userIp}
          messagesEndRef={messagesEndRef}
          loading={addReplyLoading}
          error={addReplyError || deletePostError || deleteThreadError}
        />
      )}
      
      <ChanFooter />
    </div>
  );
};

export default ThreadPage;