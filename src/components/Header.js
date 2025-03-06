import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to create links that work correctly on both pages
  const NavLink = ({ to, children }) => {
    if (to.startsWith('#')) {
      // If it's an anchor link
      if (isHomePage) {
        // On home page, just use the anchor
        return <a href={to} className="hover:text-terminal-bright-green transition-colors duration-300">{children}</a>;
      } else {
        // On other pages, go back to home with the anchor
        return <Link to={`/${to}`} className="hover:text-terminal-bright-green transition-colors duration-300">{children}</Link>;
      }
    } else {
      // For non-anchor links (like /chan)
      return <Link to={to} className="hover:text-terminal-bright-green transition-colors duration-300">{children}</Link>;
    }
  };

  return (
    <header className="sticky top-0 bg-terminal-dark border-b border-terminal-green z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="font-pixel text-terminal-green text-xl mr-2">DARK</div>
              <div className="font-pixel text-terminal-bright-green text-xl">COIN</div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 font-terminal text-lg">
              <li><NavLink to="#about">ABOUT</NavLink></li>
              <li><NavLink to="#tokenomics">TOKENOMICS</NavLink></li>
              <li><NavLink to="#roadmap">ROADMAP</NavLink></li>
              <li><NavLink to="#buy">BUY</NavLink></li>
              <li><NavLink to="#faq">FAQ</NavLink></li>
              <li><NavLink to="/chan">DARKCHAN</NavLink></li>
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
              <NavLink to="#about">
                <span className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  ABOUT
                </span>
              </NavLink>
            </li>
            <li className="border-b border-terminal-dim-green">
              <NavLink to="#tokenomics">
                <span className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  TOKENOMICS
                </span>
              </NavLink>
            </li>
            <li className="border-b border-terminal-dim-green">
              <NavLink to="#roadmap">
                <span className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  ROADMAP
                </span>
              </NavLink>
            </li>
            <li className="border-b border-terminal-dim-green">
              <NavLink to="#buy">
                <span className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  BUY
                </span>
              </NavLink>
            </li>
            <li className="border-b border-terminal-dim-green">
              <NavLink to="#faq">
                <span className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  FAQ
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/chan">
                <span className="block py-3 px-4 hover:bg-terminal-black transition-colors duration-300" onClick={() => setIsOpen(false)}>
                  DARKCHAN
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;