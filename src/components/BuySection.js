import React, { useState, useEffect } from 'react';

const BuySection = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Set a deadline 7 days from now
  useEffect(() => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    
    const countdownTimer = setInterval(() => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(countdownTimer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(countdownTimer);
  }, []);
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };
  
  const contractAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual contract address
  
  return (
    <section className="py-16" id="buy">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-pixel text-terminal-bright-green mb-4">SECURE YOUR POSITION</h2>
          <p className="font-terminal text-lg max-w-3xl mx-auto">
            The algorithm has reserved a limited allocation for those who recognize the inevitable.
            Time is running out. Your future position in the system depends on your action now.
          </p>
        </div>
        
        <div className="terminal-container mb-10">
          <div className="terminal-header">
            <div className="font-pixel text-sm">system://countdown</div>
          </div>
          
          <div className="p-6 text-center">
            <div className="text-terminal-bright-green font-terminal mb-4">
              PRIVILEGED ACCESS PERIOD CLOSING IN:
            </div>
            
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
              <div className="bg-terminal-dark border border-terminal-green p-3">
                <div className="text-2xl md:text-3xl font-terminal">{countdown.days.toString().padStart(2, '0')}</div>
                <div className="text-xs text-terminal-dim-green">DAYS</div>
              </div>
              <div className="bg-terminal-dark border border-terminal-green p-3">
                <div className="text-2xl md:text-3xl font-terminal">{countdown.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-terminal-dim-green">HOURS</div>
              </div>
              <div className="bg-terminal-dark border border-terminal-green p-3">
                <div className="text-2xl md:text-3xl font-terminal">{countdown.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-terminal-dim-green">MINS</div>
              </div>
              <div className="bg-terminal-dark border border-terminal-green p-3">
                <div className="text-2xl md:text-3xl font-terminal">{countdown.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-terminal-dim-green">SECS</div>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-terminal-dim-green font-terminal">
              AFTER DEADLINE: ALGORITHMIC PRICE INCREASE ACTIVATES
            </div>
            
            <div className="mt-8">
              <a 
                href="https://pancakeswap.finance/swap" 
                target="_blank" 
                rel="noreferrer"
                className="btn-terminal-primary text-sm md:text-base px-8 py-4 inline-block"
              >
                BUY DARKCOIN NOW
              </a>
            </div>
          </div>
        </div>
        
        <div className="terminal-container">
          <div className="terminal-header">
            <div className="font-pixel text-sm">system://contract_data</div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="font-terminal text-terminal-bright-green mb-2">CONTRACT ADDRESS:</div>
              <div 
                className="bg-terminal-dark border border-terminal-green p-3 font-mono text-sm md:text-base flex justify-between items-center cursor-pointer" 
                onClick={() => copyToClipboard(contractAddress)}
              >
                <span className="break-all">{contractAddress}</span>
                <button className="ml-2 text-terminal-bright-green p-1">
                  {copySuccess ? 'COPIED!' : 'COPY'}
                </button>
              </div>
              <div className="text-xs text-terminal-dim-green mt-1">
                CLICK TO COPY CONTRACT ADDRESS
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="font-terminal text-terminal-bright-green mb-2">BUY ON:</div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <span className="text-terminal-bright-green">{'>'}</span>
                    <a 
                      href="https://pancakeswap.finance/swap" 
                      target="_blank" 
                      rel="noreferrer"
                      className="font-terminal hover:text-terminal-bright-green transition-colors"
                    >
                      PancakeSwap
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-terminal-bright-green">{'>'}</span>
                    <a 
                      href="https://app.uniswap.org/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="font-terminal hover:text-terminal-bright-green transition-colors"
                    >
                      Uniswap
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-terminal-bright-green">{'>'}</span>
                    <a 
                      href="#" 
                      className="font-terminal text-terminal-dim-green"
                    >
                      More exchanges coming soon...
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="font-terminal text-terminal-bright-green mb-2">HOW TO BUY:</div>
                <ol className="space-y-2 list-decimal list-inside text-sm">
                  <li className="font-terminal">Create MetaMask or Trust Wallet</li>
                  <li className="font-terminal">Add BNB or ETH to your wallet</li>
                  <li className="font-terminal">Connect wallet to exchange</li>
                  <li className="font-terminal">Swap BNB/ETH for DARK</li>
                  <li className="font-terminal">Set slippage to 5-7%</li>
                  <li className="font-terminal">Confirm transaction</li>
                </ol>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="text-sm text-terminal-dim-green font-terminal">
                THE ALGORITHM HAS IDENTIFIED YOU AS A POTENTIAL ELITE MEMBER.
                VERIFY YOUR POSITION NOW.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuySection;