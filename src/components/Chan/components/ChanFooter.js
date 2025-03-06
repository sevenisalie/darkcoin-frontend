import React from 'react';
import '../styles/ChanFooter.css';

const ChanFooter = () => {
  return (
    <div className="chan-footer">
      <div className="chan-footer-links">
        <a href="#" className="chan-footer-link">[Home]</a>
        <a href="#top" className="chan-footer-link">[Top]</a>
        <a href="#bottom" className="chan-footer-link">[Bottom]</a>
        <a href="#" className="chan-footer-link">[Catalog]</a>
      </div>
      
      <div className="chan-footer-info">
        <p className="chan-copyright">
          <span className="chan-logo-text">DARK</span>
          <span className="chan-logo-text-highlight">CHAN</span> © 2025
        </p>
        <p className="chan-disclaimer">
          All posts on this board are the responsibility of the individual poster and not the administrators.
        </p>
        <p className="chan-disclaimer">
          All content posted anonymously. Board administrators may or may not be held liable for content.
        </p>
      </div>
      
      <div id="bottom"></div>
    </div>
  );
};

export default ChanFooter;