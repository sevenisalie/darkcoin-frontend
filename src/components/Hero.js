import React, { useEffect, useState } from 'react';
import TypewriterEffect from 'react-typewriter-effect';

const Hero = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 relative" id="about">
      {/* 8-bit style grid background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="grid grid-cols-32 h-full w-full">
          {[...Array(1024)].map((_, i) => (
            <div key={i} className="border-r border-b border-terminal-green"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-pixel text-terminal-bright-green mb-8 crt-flicker">
          <span className="text-terminal-green">DARK</span>COIN
        </h1>
        
        <div className="terminal-container mb-6 md:mb-10">
          <TypewriterEffect
            textStyle={{
              fontFamily: 'VT323, monospace',
              color: '#00ff00',
              fontWeight: 400,
              fontSize: '1.5rem',
            }}
            startDelay={1000}
            cursorColor="#00ff00"
            multiText={[
              'FOR THE DARKLY ENLIGHTENED.',
              'THE FUTURE IS INEVITABLE.',
              'THE ALGORITHMS ALREADY KNOW.',
              'ARE YOU WORTHY OF POWER?',
              'JOIN US BEFORE IT\'S TOO LATE.'
            ]}
            multiTextDelay={1000}
            typeSpeed={70}
          />
        </div>

        <p className="font-terminal text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          In a world where algorithms determine your fate, <span className="text-terminal-bright-green">DarkCoin</span> is the key to the coming order. 
          The white-collar jobs are vanishing. The power centers are shifting. 
          <span className="block mt-4">
            Those who <span className="text-terminal-bright-green">see</span> will be rewarded. Those who <span className="text-terminal-bright-green">follow</span> will be protected.
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
          {showButton && (
            <>
              <a 
                href="#buy" 
                className="btn-terminal-primary text-sm md:text-base px-6 py-3 w-full sm:w-auto animate-pulse"
              >
                SECURE YOUR POSITION
              </a>
              <a 
                href="#tokenomics" 
                className="btn-terminal text-sm md:text-base px-6 py-3 w-full sm:w-auto"
              >
                LEARN THE TRUTH
              </a>
            </>
          )}
        </div>

        <div className="mt-10 text-xs md:text-sm text-terminal-dim-green font-terminal">
          THE INEVITABLE CANNOT BE STOPPED. THE WISE PREPARE.
        </div>
      </div>
    </section>
  );
};

export default Hero;
