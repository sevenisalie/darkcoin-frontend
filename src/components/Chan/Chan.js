import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChanHeader from './components/ChanHeader';
import ThreadList from './components/ThreadList';
import PostForm from './components/PostForm';
import ChanFooter from './components/ChanFooter';
import { 
  useThreads, 
  useCreateThread, 
  useDeleteThread,
  useBoardStats,
  createFormData
} from './hooks/useApi';
import './styles/Chan.css';

const Chan = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [userIp, setUserIp] = useState('Anonymous');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  // Create thread hook
  const { 
    createThread, 
    loading: createThreadLoading, 
    error: createThreadError 
  } = useCreateThread();

  // Delete thread hook
  const { 
    deleteThread, 
    loading: deleteThreadLoading, 
    error: deleteThreadError 
  } = useDeleteThread();

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
      
      // After successful creation, navigate to the new thread page
      if (result && result.thread && result.thread.id) {
        navigate(`/chan/thread/${result.thread.id}`);
      } else {
        await refetchThreads();
      }
      
      return result;
    } catch (error) {
      console.error('Error creating thread:', error);
      return null;
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
      
      // After successful deletion, refetch threads
      await refetchThreads();
      
      return true;
    } catch (error) {
      console.error('Error deleting thread:', error);
      return false;
    }
  };

  // Handle view thread - navigates to thread page
  const handleViewThread = (threadId) => {
    navigate(`/chan/thread/${threadId}`);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  // Loading state
  if (threadsLoading && !threads.length) {
    return (
      <div className="chan-container">
        <ChanHeader 
          selectedThread={null} 
          stats={stats}
        />
        <div className="chan-loading">
          <div className="loading-text">
            Loading...
          </div>
        </div>
        <ChanFooter />
      </div>
    );
  }

  // Error state
  if (threadsError && !threads.length) {
    return (
      <div className="chan-container">
        <ChanHeader 
          selectedThread={null} 
          stats={stats}
        />
        <div className="chan-error">
          <div className="error-text">
            {threadsError || "Failed to load board."}
          </div>
        </div>
        <ChanFooter />
      </div>
    );
  }

  return (
    <div className="chan-container">
      <ChanHeader 
        selectedThread={null} 
        stats={stats}
      />
      
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
      
      <ChanFooter />
    </div>
  );
};

export default Chan;