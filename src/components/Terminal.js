import React, { useState, useEffect } from 'react';

const TerminalLine = ({ delay, children, prompt = true }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="font-terminal mb-2 flex">
      {prompt && (
        <span className="text-terminal-bright-green mr-2">$&gt;</span>
      )}
      <span>{children}</span>
    </div>
  );
};

const Terminal = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-16">
      <div className="terminal-container relative overflow-hidden">
        <div className="terminal-header">
          <div className="font-pixel text-sm">system://status_report</div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <div className="p-4 md:p-6">
          <TerminalLine delay={500}>
            Initializing secure connection...
          </TerminalLine>
          
          <TerminalLine delay={1200}>
            Connection established.
          </TerminalLine>
          
          <TerminalLine delay={1800} prompt={false}>
            <span className="text-yellow-300">WARNING: Civilian monitoring detected. Enabling encryption.</span>
          </TerminalLine>
          
          <TerminalLine delay={2400}>
            analyze_market_conditions.exe
          </TerminalLine>
          
          <TerminalLine delay={3000} prompt={false}>
            <span className="text-terminal-bright-green">[RESULTS]</span> Current market inefficiencies detected
          </TerminalLine>
          
          <TerminalLine delay={3600} prompt={false}>
            <span className="text-terminal-bright-green">[ANALYSIS]</span> The weak will continue to be replaced by algorithms
          </TerminalLine>
          
          <TerminalLine delay={4200} prompt={false}>
            <span className="text-terminal-bright-green">[PROJECTION]</span> 78.3% of white-collar jobs disappear by 2029
          </TerminalLine>
          
          <TerminalLine delay={4800} prompt={false}>
            <span className="text-terminal-bright-green">[SOLUTION]</span> DarkCoin offers safe harbor for the prepared
          </TerminalLine>
          
          <TerminalLine delay={5400}>
            display_key_features.exe
          </TerminalLine>
          
          <TerminalLine delay={5900} prompt={false}>
            <ul className="ml-5 list-disc space-y-1">
              <li>Revolutionary stealth launch technology</li>
              <li>Anti-sniper mechanisms = fair distribution</li>
              <li>Zero rug potential (liquidity locked forever)</li>
              <li>Advanced market manipulation countermeasures</li>
              <li>Tokenomics engineered for inevitable growth</li>
            </ul>
          </TerminalLine>
          
          {showButton && (
            <div className="mt-8 text-center">
              <a 
                href="#buy" 
                className="btn-terminal-primary inline-block"
              >
                ACCESS THE NETWORK
              </a>
              <div className="mt-3 text-xs text-terminal-dim-green">
                TIME REMAINING TO SECURE POSITION: LIMITED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
