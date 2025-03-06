/**
 * Post number conversion utilities
 * For 4chan-style post numbers with "dubs", "trips", etc.
 */

/**
 * Convert a UUID to a post number
 * This converts the first part of the UUID to a decimal number for display
 * 
 * @param {string} uuid - The UUID to convert
 * @returns {string} - A numeric post number (10 digits)
 */
export const uuidToPostNumber = (uuid) => {
    if (!uuid) return '0000000000';
    
    try {
      // Remove dashes and convert the first portion to a decimal
      const hexString = uuid.toString().replace(/-/g, '');
      
      // Take the first 12 characters of the hex (48 bits)
      // This gives us numbers up to 2^48-1, plenty for post numbers
      const truncatedHex = hexString.substring(0, 12);
      
      // Convert to a decimal number
      const decimalValue = parseInt(truncatedHex, 16);
      
      // Format the number to have at least 10 digits
      return String(decimalValue).padStart(10, '0');
    } catch (error) {
      console.error('Error converting UUID to post number:', error);
      return '0000000000';
    }
  };
  
  /**
   * Check if a post number has consecutive repeating digits ("dubs", "trips", etc.)
   * 
   * @param {string} postNumber - The post number to check
   * @param {number} count - Number of digits that should repeat (2 for dubs, 3 for trips)
   * @returns {boolean} - Whether the post number has the repeating pattern
   */
  export const hasRepeatingDigits = (postNumber, count = 2) => {
    if (!postNumber) return false;
    
    const str = String(postNumber);
    if (str.length < count) return false;
    
    const targetDigits = str.slice(-count);
    const first = targetDigits[0];
    for (let i = 1; i < count; i++) {
        if (targetDigits[i] !== first) {
            return false;
        }
    }
    return true;
};

/**
 * Get the type of repeating digits in a post number
 * 
 * @param {string} postNumber - The post number to check
 * @returns {string} - Description of the repeating pattern (dubs, trips, quads, etc.)
 */
export const getRepeatingType = (postNumber) => {
    if (hasRepeatingDigits(postNumber, 5)) return 'quints';
    if (hasRepeatingDigits(postNumber, 4)) return 'quads';
    if (hasRepeatingDigits(postNumber, 3)) return 'trips';
    if (hasRepeatingDigits(postNumber, 2)) return 'dubs';
    return '';
};
  
  export default {
    uuidToPostNumber,
    hasRepeatingDigits,
    getRepeatingType
  };