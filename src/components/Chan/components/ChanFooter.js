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
          All posts on this board reflect the opinions of their authors and not the algorithms that control us all.
        </p>
        <p className="chan-disclaimer">
          All content posted anonymously. The system has already identified you.
        </p>
      </div>
      
      <div id="bottom"></div>
    </div>
  );
};

export default ChanFooter;