import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Terminal from './components/Terminal';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import BuySection from './components/BuySection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chan from './components/Chan/Chan';
import ThreadPage from './components/Chan/components/ThreadPage';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-terminal-black">
        <div className="text-center">
          <div className="text-terminal-green font-terminal text-2xl mb-4 terminal-prompt">
            INITIALIZING SYSTEM...
          </div>
          <div className="w-64 h-2 bg-terminal-dark rounded relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-terminal-green animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <div className="mt-2 text-terminal-dim-green font-terminal text-sm">
            ACCESSING SECURE NETWORK
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-black text-terminal-green relative overflow-hidden">
      {/* Noise effect overlay */}
      <div className="noise"></div>
      
      {/* Scanline effect */}
      <div className="scanline"></div>
      
      <Header />
      <Routes>
        <Route path="/" element={
          <main className="container mx-auto px-4 pb-16 relative z-10">
            <Hero />
            <Terminal />
            <Tokenomics />
            <Roadmap />
            <BuySection />
            <FAQ />
          </main>
        } />
        <Route path="/chan" element={<Chan />} />
        <Route path="/chan/thread/:threadId" element={<ThreadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;