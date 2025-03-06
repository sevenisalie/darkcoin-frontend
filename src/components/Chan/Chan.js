import React, { useState, useEffect, useRef } from 'react';
import ChanHeader from './components/ChanHeader';
import ThreadList from './components/ThreadList';
import PostForm from './components/PostForm';
import ChanFooter from './components/ChanFooter';
import ThreadView from './components/ThreadView';
import { formatTimestamp } from './utils/helpers';
import { 
  useThreads, 
  useThread, 
  useCreateThread, 
  useAddReply, 
  useDeleteThread, 
  useDeletePost,
  useBoardStats,
  createFormData
} from './hooks/useApi';
import './styles/Chan.css';

const Chan = () => {
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
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

  // Fetch threads list with pagination
  const { 
    threads, 
    pagination, 
    loading: threadsLoading, 
    error: threadsError, 
    refetch: refetchThreads 
  } = useThreads(page, pageSize);

  // Fetch selected thread with all replies
  const { 
    thread: selectedThread, 
    posts: threadPosts, 
    loading: threadLoading, 
    error: threadError, 
    refetch: refetchThread 
  } = useThread(selectedThreadId);

  // Create thread hook
  const { 
    createThread, 
    loading: createThreadLoading, 
    error: createThreadError 
  } = useCreateThread();

  // Add reply hook
  const { 
    addReply, 
    loading: addReplyLoading, 
    error: addReplyError 
  } = useAddReply(selectedThreadId);

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

  // Auto-scroll to bottom when viewing a thread
  useEffect(() => {
    if (selectedThread && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedThread, threadPosts]);

  // Create a new thread
  const handleCreateThread = async (threadData) => {
    try {
      // Store password for potential deletion later
      if (threadData.password) {
        setPassword(threadData.password);
      }

      const formData = createFormData({
        subject: threadData.subject || '',
        comment: threadData.text,
        name: threadData.name || 'Anonymous',
        password: threadData.password || '',
        is_nsfw: threadData.is_nsfw || false,
        file: threadData.file
      });

      const result = await createThread(formData);
      
      // After successful creation, refetch threads and select the new thread
      await refetchThreads();
      setSelectedThreadId(result.thread.id);
      
      return result;
    } catch (error) {
      console.error('Error creating thread:', error);
      return null;
    }
  };

  // Add a reply to a thread
  const handleAddReply = async (threadId, replyData) => {
    try {
      // Store password for potential deletion later
      if (replyData.password) {
        setPassword(replyData.password);
      }

      const formData = createFormData({
        comment: replyData.text,
        name: replyData.name || 'Anonymous',
        password: replyData.password || '',
        is_nsfw: replyData.is_nsfw || false,
        reply_to: replyData.reply_to || null,
        file: replyData.file
      });

      await addReply(formData);
      
      // After successful reply, refetch the current thread to show the new reply
      if (selectedThreadId) {
        await refetchThread();
      }
      
      return true;
    } catch (error) {
      console.error('Error adding reply:', error);
      return false;
    }
  };

  // Delete a thread
  const handleDeleteThread = async (threadId, userPassword) => {
    try {
      const passwordToUse = userPassword || password;
      
      if (!passwordToUse) {
        alert('Password is required to delete a thread.');
        return false;
      }
      
      await deleteThread(threadId, passwordToUse);
      
      // After successful deletion, go back to thread list and refetch
      setSelectedThreadId(null);
      await refetchThreads();
      
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
      if (selectedThreadId) {
        await refetchThread();
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  };

  // Handle view thread
  const handleViewThread = (threadId) => {
    setSelectedThreadId(threadId);
  };

  // Handle back to board
  const handleBackToBoard = () => {
    setSelectedThreadId(null);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Loading state
  if (threadsLoading && !threads.length) {
    return (
      <div className="chan-container">
        <div className="chan-loading">
          <div className="loading-text">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (threadsError && !threads.length) {
    return (
      <div className="chan-container">
        <div className="chan-error">
          <div className="error-text">
            {threadsError || "Failed to load board."}
          </div>
        </div>
      </div>
    );
  }

  // Thread error state but only when trying to view a specific thread
  if (threadError && selectedThreadId) {
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
        selectedThread={selectedThread} 
        stats={stats}
      />
      
      {/* If viewing a specific thread */}
      {selectedThreadId ? (
        threadLoading ? (
          <div className="chan-loading">
            <div className="loading-text">
              Loading thread...
            </div>
          </div>
        ) : (
          <ThreadView 
            thread={selectedThread}
            posts={threadPosts}
            onAddReply={(replyData) => handleAddReply(selectedThreadId, replyData)}
            onDeletePost={handleDeletePost}
            onDeleteThread={() => handleDeleteThread(selectedThreadId)}
            userIp={userIp}
            messagesEndRef={messagesEndRef}
            loading={addReplyLoading}
            error={addReplyError || deletePostError || deleteThreadError}
          />
        )
      ) : (
        // Otherwise show the thread list and post form
        <>
          <div className="chan-form-container">
            <PostForm 
              onSubmit={handleCreateThread} 
              isThread={true}
              userIp={userIp}
              loading={createThreadLoading}
              error={createThreadError}
            />
          </div>
          
          <ThreadList 
            threads={threads} 
            onViewThread={handleViewThread}
            onDeleteThread={handleDeleteThread}
            pagination={pagination}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        </>
      )}
      
      <ChanFooter />
    </div>
  );
};

export default Chan;