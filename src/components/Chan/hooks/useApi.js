import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Make sure to run: npm install axios

const API_BASE_URL = 'https://darkchan-api.onrender.com';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Custom hook for fetching threads list
export const useThreads = (page = 1, pageSize = 20) => {
  const [threads, setThreads] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 20,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchThreads = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/threads?page=${page}&pageSize=${pageSize}`);
      setThreads(response.data.threads);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch threads');
      console.error('Error fetching threads:', err);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  return { threads, pagination, loading, error, refetch: fetchThreads };
};

// Custom hook for fetching a single thread with its replies
export const useThread = (threadId) => {
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchThread = useCallback(async () => {
    if (!threadId) return;

    try {
      setLoading(true);
      const response = await api.get(`/thread/${threadId}`);
      setThread(response.data.thread);
      setPosts(response.data.posts);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch thread');
      console.error('Error fetching thread:', err);
    } finally {
      setLoading(false);
    }
  }, [threadId]);

  useEffect(() => {
    fetchThread();
  }, [fetchThread]);

  return { thread, posts, loading, error, refetch: fetchThread };
};

// Custom hook for creating a new thread
export const useCreateThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [newThread, setNewThread] = useState(null);

  const createThread = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await api.post('/thread', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setNewThread(response.data.thread);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create thread');
      console.error('Error creating thread:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createThread, loading, error, success, newThread };
};

// Custom hook for adding a reply to a thread
export const useAddReply = (threadId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [newPost, setNewPost] = useState(null);

  const addReply = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await api.post(`/thread/${threadId}/reply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setNewPost(response.data.post);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add reply');
      console.error('Error adding reply:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addReply, loading, error, success, newPost };
};

// Custom hook for deleting a thread
export const useDeleteThread = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteThread = async (threadId, password) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await api.delete(`/thread/${threadId}`, {
        data: { password }
      });
      
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete thread');
      console.error('Error deleting thread:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteThread, loading, error, success };
};

// Custom hook for deleting a post
export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deletePost = async (postId, password) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await api.delete(`/post/${postId}`, {
        data: { password }
      });
      
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
      console.error('Error deleting post:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error, success };
};

// Custom hook for fetching board statistics
export const useBoardStats = () => {
  const [stats, setStats] = useState({
    total_threads: 0,
    total_posts: 0,
    total_images: 0,
    last_post_time: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/stats');
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch board stats');
      console.error('Error fetching board stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
};

// Utility function to format form data for file uploads
export const createFormData = (data) => {
  const formData = new FormData();
  
  Object.keys(data).forEach(key => {
    if (key === 'file' && data[key]) {
      formData.append('file', data[key]);
    } else if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });
  
  return formData;
};