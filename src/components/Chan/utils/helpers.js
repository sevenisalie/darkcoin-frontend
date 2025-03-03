// Helper functions for the Chan component

/**
 * Generate a random ID for posts and threads
 * @returns {string} A random ID
 */
export const generateRandomId = () => {
    return Math.floor(Math.random() * 100000000).toString();
  };
  
  /**
   * Format a timestamp into a readable format similar to 4chan's
   * @param {Date} date The date to format
   * @returns {string} The formatted date string
   */
  export const formatTimestamp = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                   date.getMonth() === now.getMonth() && 
                   date.getFullYear() === now.getFullYear();
    
    // Format: MM/DD/YY(Day)HH:MM:SS
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const dayName = dayNames[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${month}/${day}/${year}(${dayName})${hours}:${minutes}:${seconds}`;
  };
  
  /**
   * Truncate text to a specified length with ellipsis
   * @param {string} text The text to truncate
   * @param {number} maxLength The maximum length
   * @returns {string} The truncated text
   */
  export const truncateText = (text, maxLength = 200) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return text.substring(0, maxLength) + '...';
  };
  
  /**
   * Format file size in a human-readable format
   * @param {number} bytes The file size in bytes
   * @returns {string} The formatted file size
   */
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  /**
   * Get file dimensions for an image
   * @param {File} file The image file
   * @returns {Promise<{width: number, height: number}>} The dimensions
   */
  export const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };
  
  /**
   * Get a random color from the DarkCoin palette
   * @returns {string} A color hex code
   */
  export const getRandomDarkCoinColor = () => {
    const colors = [
      '#00ff00', // terminal-green
      '#39ff14', // terminal-bright-green
      '#25a244', // terminal-dim-green
      '#4eff4e', // terminal-glow
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  };