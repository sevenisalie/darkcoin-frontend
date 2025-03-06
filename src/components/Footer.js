import React from 'react';
import { FiTwitter, FiGithub, FiMessageCircle, FiGlobe } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Function to create links that work correctly on both pages
  const FooterLink = ({ to, children }) => {
    if (to.startsWith('#')) {
      // If it's an anchor link
      if (isHomePage) {
        // On home page, just use the anchor
        return <a href={to} className="text-terminal-green hover:text-terminal-bright-green transition-colors text-sm font-terminal">{children}</a>;
      } else {
        // On other pages, go back to home with the anchor
        return <Link to={`/${to}`} className="text-terminal-green hover:text-terminal-bright-green transition-colors text-sm font-terminal">{children}</Link>;
      }
    } else {
      // For non-anchor links (like /chan)
      return <Link to={to} className="text-terminal-green hover:text-terminal-bright-green transition-colors text-sm font-terminal">{children}</Link>;
    }
  };

  return (
    <footer className="bg-terminal-dark border-t border-terminal-green py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center justify-center md:justify-start">
              <div className="font-pixel text-terminal-green text-xl mr-2">DARK</div>
              <div className="font-pixel text-terminal-bright-green text-xl">COIN</div>
            </Link>
            <div className="mt-2 text-xs text-terminal-dim-green font-terminal text-center md:text-left">
              THE KEY TO THE INEVITABLE FUTURE
            </div>
          </div>
          
          <div className="mb-6 md:mb-0">
            <div className="flex space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-terminal-green hover:text-terminal-bright-green transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer" className="text-terminal-green hover:text-terminal-bright-green transition-colors">
                <FiMessageCircle size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-terminal-green hover:text-terminal-bright-green transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="#" className="text-terminal-green hover:text-terminal-bright-green transition-colors">
                <FiGlobe size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 mb-4">
              <FooterLink to="#about">ABOUT</FooterLink>
              <FooterLink to="#tokenomics">TOKENOMICS</FooterLink>
              <FooterLink to="#roadmap">ROADMAP</FooterLink>
              <FooterLink to="#buy">BUY</FooterLink>
              <FooterLink to="#faq">FAQ</FooterLink>
              <FooterLink to="/chan">DARKCHAN</FooterLink>
            </div>
            <div className="text-xs text-terminal-dim-green font-terminal">
              &copy; 2025 DarkCoin. The algorithm is always watching.
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-terminal-dim-green text-xs text-terminal-dim-green font-terminal text-center">
          <p className="mb-2">
            The future is predetermined. Your position in it is not.
          </p>
          <p>
            This website and its content are for entertainment purposes only. 
            DARKCOIN is an experimental token. Cryptocurrency investments involve risk.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;