import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 bg-terminal-dark border-b border-terminal-green z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="font-pixel text-terminal-green text-xl mr-2">DARK</div>
            <div className="font-pixel text-terminal-bright-green text-xl">COIN</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 font-terminal text-lg">
              <li><a href="#about" className="hover:text-terminal-bright-green transition-colors duration-300">ABOUT</a></li>
              <li><a href="#tokenomics" className="hover:text-terminal-bright-green transition-colors duration-300">TOKENOMICS</a></li>
              <li><a href="#roadmap" className="hover:text-terminal-bright-green transition-colors duration-300">ROADMAP</a></li>
              <li><a href="#buy" className="hover:text-terminal-bright-green transition-colors duration-300">BUY</a></li>
              <li><a href="#faq" className="hover:text-terminal-bright-green transition-colors duration-300">FAQ</a></li>
              <li><Link to="/chan" className="hover:text-terminal-bright-green transition-colors duration-300">DARKCHAN</Link></li>

            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-terminal-green focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-terminal-dark border-t border-terminal-green">
          <ul className="font-terminal text-lg">
            <li className="border-b border-terminal-dim-green">
              <a 
                href="#about" 
                className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                ABOUT
              </a>
            </li>
            <li className="border-b border-terminal-dim-green">
              <a 
                href="#tokenomics" 
                className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                TOKENOMICS
              </a>
            </li>
            <li className="border-b border-terminal-dim-green">
              <a 
                href="#roadmap" 
                className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                ROADMAP
              </a>
            </li>
            <li className="border-b border-terminal-dim-green">
              <a 
                href="#buy" 
                className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                BUY
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
