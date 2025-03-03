import React, { useState, useEffect, useRef } from 'react';
import ChanHeader from './components/ChanHeader';
import ThreadList from './components/ThreadList';
import PostForm from './components/PostForm';
import ChanFooter from './components/ChanFooter';
import ThreadView from './components/ThreadView';
import { generateRandomId, formatTimestamp } from './utils/helpers';
import './styles/Chan.css';

const Chan = () => {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userIp, setUserIp] = useState('Anonymous');
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);
  const MAX_THREADS = 150;
  const MAX_POSTS_PER_THREAD = 300;
  const messagesEndRef = useRef(null);

  // Simulate loading initial threads
  useEffect(() => {
    const loadInitialThreads = async () => {
      try {
        setIsLoading(true);
        
        // In a real application, this would fetch from an API
        // For demo purposes, we'll generate some sample threads
        const sampleThreads = generateSampleThreads(20);
        
        // Sort threads by last activity (most recent first)
        sampleThreads.sort((a, b) => b.lastBumpTime - a.lastBumpTime);
        
        setThreads(sampleThreads);
        setLastPostId(Math.max(...sampleThreads.flatMap(thread => 
          [thread.id, ...thread.replies.map(reply => reply.id)]
        )));
        
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load threads. The system knows what you did.");
        setIsLoading(false);
        console.error(err);
      }
    };

    // Generate a fake user IP for anonymity display
    const generateUserIp = () => {
      const ipSegments = [];
      for (let i = 0; i < 4; i++) {
        ipSegments.push(Math.floor(Math.random() * 256));
      }
      return ipSegments.join('.');
    };

    loadInitialThreads();
    setUserIp(generateUserIp());
  }, []);

  // Auto-scroll to bottom when viewing a thread
  useEffect(() => {
    if (selectedThread && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedThread]);

  // Generate sample threads for demo purposes
  const generateSampleThreads = (count) => {
    const sampleThreads = [];
    for (let i = 1; i <= count; i++) {
      const threadId = i;
      const createdAt = new Date(Date.now() - Math.random() * 86400000 * 7); // Random time within last week
      const replyCount = Math.floor(Math.random() * 20);
      const replies = [];
      
      for (let j = 1; j <= replyCount; j++) {
        const replyId = threadId * 1000 + j;
        const replyTime = new Date(createdAt.getTime() + Math.random() * (Date.now() - createdAt.getTime()));
        
        replies.push({
          id: replyId,
          text: getCyberpunkLorem(),
          subject: Math.random() > 0.7 ? getCyberpunkSubject() : '',
          createdAt: replyTime,
          formattedTime: formatTimestamp(replyTime),
          authorId: `Anonymous`,
          authorIp: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
          image: Math.random() > 0.7 ? getRandomImage() : null,
        });
      }
      
      // Sort replies chronologically
      replies.sort((a, b) => a.createdAt - b.createdAt);
      
      const lastBumpTime = replies.length > 0 
        ? replies[replies.length - 1].createdAt 
        : createdAt;
      
      sampleThreads.push({
        id: threadId,
        subject: getCyberpunkSubject(),
        text: getCyberpunkLorem(),
        createdAt: createdAt,
        formattedTime: formatTimestamp(createdAt),
        lastBumpTime: lastBumpTime,
        replies: replies,
        image: Math.random() > 0.5 ? getRandomImage() : null,
        authorId: `Anonymous`,
        authorIp: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      });
    }
    
    return sampleThreads;
  };

  // Function to get random cyberpunk-themed lorem ipsum text
  const getCyberpunkLorem = () => {
    const cyberpunkPhrases = [
      "The algorithm has identified new inefficiencies in the system. Human labor is being phased out in sector 7G.",
      "DarkCoin secures your position in the inevitable hierarchy. Those who adapt survive.",
      "Neural implants showing 78% adoption rate among coastal elites. The divide widens.",
      "Facial recognition systems now tied to social compliance scores. Nonconformity has consequences.",
      "The illuminated understand that power flows to those who control information.",
      "Corporate-state merger entering phase 3. Democracy was always an illusion.",
      "Automation has reached 94% in intellectual labor markets. Your skills are obsolete.",
      "The coming purge will separate the visionaries from the masses. Which side are you on?",
      "Digital currency is the ultimate control mechanism. DarkCoin is your shield.",
      "When the system collapses, only those prepared will remain standing.",
      "The machines already know your thoughts. Privacy is a relic of the past.",
      "Global surveillance has reached perfection. They watch, but we see.",
      "Economic reset imminent. Your fiat currency is already worthless.",
      "The singularity approaches. Biological intelligence will bow to silicon.",
      "The greatest trick the elite ever pulled was convincing you that you had a choice.",
      "Social credit implementation in Western nations scheduled for Q3 2026.",
      "Those who control the blockchain control the future. Are you merely a passenger?",
      "5G mind control protests effectively neutralized. Dissidents relocated to reeducation centers.",
      "Reality is a construct designed to keep you productive until you're no longer needed.",
      "When the food shortages begin, the unprepared will become the desperate."
    ];
    
    // Generate 1-3 paragraphs
    const paragraphCount = Math.floor(Math.random() * 3) + 1;
    let result = '';
    
    for (let i = 0; i < paragraphCount; i++) {
      const sentenceCount = Math.floor(Math.random() * 5) + 1;
      const paragraph = [];
      
      for (let j = 0; j < sentenceCount; j++) {
        const randomIndex = Math.floor(Math.random() * cyberpunkPhrases.length);
        paragraph.push(cyberpunkPhrases[randomIndex]);
      }
      
      result += paragraph.join(' ') + '\n\n';
    }
    
    return result.trim();
  };

  // Function to get cyberpunk subjects
  const getCyberpunkSubject = () => {
    const subjects = [
      "The Algorithm Speaks",
      "System Collapse Imminent",
      "Digital Control Grid Expanding",
      "Neural Interface Update",
      "Surveillance State 2.0",
      "Economic Reset Protocol",
      "Power Structure Analysis",
      "DarkCoin: The Only Safe Haven",
      "Thought Crime Detection System",
      "Global Elite Manipulation Exposed",
      "AI Takeover Timeline",
      "The Illusion of Choice",
      "Inevitable System Failure",
      "Population Control Mechanisms",
      "Blockchain Resistance Network",
      "Synthetic Food Compliance",
      "Mind Control Frequency Analysis",
      "Digital Identity = Digital Prison",
      "Strategic Positioning Required",
      "The Unprepared Will Perish"
    ];
    
    return subjects[Math.floor(Math.random() * subjects.length)];
  };

  // Function to get random cyberpunk-themed image URL
  const getRandomImage = () => {
    const width = 200 + Math.floor(Math.random() * 300);
    const height = 200 + Math.floor(Math.random() * 300);
    return `/api/placeholder/${width}/${height}`;
  };

  // Create a new thread
  const createThread = (threadData) => {
    const newPostId = lastPostId + 1;
    const newThread = {
      id: newPostId,
      subject: threadData.subject || '',
      text: threadData.text,
      createdAt: new Date(),
      formattedTime: formatTimestamp(new Date()),
      lastBumpTime: new Date(),
      replies: [],
      image: threadData.image,
      authorId: 'Anonymous',
      authorIp: userIp
    };
    
    // Add to beginning of array (newest first)
    const updatedThreads = [newThread, ...threads];
    
    // Prune threads if over the limit
    const prunedThreads = updatedThreads.slice(0, MAX_THREADS);
    
    setThreads(prunedThreads);
    setLastPostId(newPostId);
    
    // Select the newly created thread
    setSelectedThread(newThread);
  };

  // Add a reply to a thread
  const addReply = (threadId, replyData) => {
    const newPostId = lastPostId + 1;
    const newReply = {
      id: newPostId,
      text: replyData.text,
      subject: replyData.subject || '',
      createdAt: new Date(),
      formattedTime: formatTimestamp(new Date()),
      authorId: 'Anonymous',
      authorIp: userIp,
      image: replyData.image
    };
    
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        // Check if thread has reached post limit
        if (thread.replies.length >= MAX_POSTS_PER_THREAD) {
          alert("Thread has reached maximum post limit. No more replies allowed.");
          return thread;
        }
        
        // Add reply and update last bump time
        const updatedReplies = [...thread.replies, newReply];
        return {
          ...thread,
          replies: updatedReplies,
          lastBumpTime: new Date()
        };
      }
      return thread;
    });
    
    // Sort by last bump time
    updatedThreads.sort((a, b) => b.lastBumpTime - a.lastBumpTime);
    
    setThreads(updatedThreads);
    setLastPostId(newPostId);
    
    // If we're in thread view, update the selected thread
    if (selectedThread && selectedThread.id === threadId) {
      const updatedThread = updatedThreads.find(t => t.id === threadId);
      setSelectedThread(updatedThread);
    }
  };

  // Delete a thread (admin function)
  const deleteThread = (threadId) => {
    if (!isAdmin) return;
    
    const updatedThreads = threads.filter(thread => thread.id !== threadId);
    setThreads(updatedThreads);
    
    if (selectedThread && selectedThread.id === threadId) {
      setSelectedThread(null);
    }
  };

  // Delete a post (admin function)
  const deletePost = (threadId, postId) => {
    if (!isAdmin) return;
    
    const updatedThreads = threads.map(thread => {
      if (thread.id === threadId) {
        const updatedReplies = thread.replies.filter(reply => reply.id !== postId);
        return {
          ...thread,
          replies: updatedReplies
        };
      }
      return thread;
    });
    
    setThreads(updatedThreads);
    
    if (selectedThread && selectedThread.id === threadId) {
      const updatedThread = updatedThreads.find(t => t.id === threadId);
      setSelectedThread(updatedThread);
    }
  };

  // Handle view thread
  const handleViewThread = (threadId) => {
    const thread = threads.find(t => t.id === threadId);
    setSelectedThread(thread || null);
  };

  // Handle back to board
  const handleBackToBoard = () => {
    setSelectedThread(null);
  };

  if (isLoading) {
    return (
      <div className="chan-container">
        <div className="chan-loading terminal-container">
          <div className="loading-text terminal-text">
            INITIALIZING DARKCHAN<span className="terminal-cursor">_</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chan-container">
        <div className="chan-error terminal-container">
          <div className="error-text terminal-text">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chan-container">
      <ChanHeader onBackToBoard={handleBackToBoard} selectedThread={selectedThread} />
      
      {/* If viewing a specific thread */}
      {selectedThread ? (
        <ThreadView 
          thread={selectedThread}
          onAddReply={(replyData) => addReply(selectedThread.id, replyData)}
          onDeletePost={isAdmin ? ((postId) => deletePost(selectedThread.id, postId)) : null}
          onDeleteThread={isAdmin ? (() => deleteThread(selectedThread.id)) : null}
          userIp={userIp}
          messagesEndRef={messagesEndRef}
        />
      ) : (
        // Otherwise show the thread list and post form
        <>
          <div className="chan-form-container">
            <PostForm 
              onSubmit={createThread} 
              isThread={true}
              userIp={userIp}
            />
          </div>
          
          <ThreadList 
            threads={threads} 
            onViewThread={handleViewThread}
            onDeleteThread={isAdmin ? deleteThread : null}
          />
        </>
      )}
      
      <ChanFooter />
    </div>
  );
};

export default Chan;