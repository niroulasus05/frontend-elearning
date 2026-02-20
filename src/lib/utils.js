// Utility functions
// Reusable helper functions for the application

// Format large numbers with commas
export function formatNumber(num) {
    return num.toLocaleString();
  }
  
  // Truncate text to specified length
  export function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }
  
  // Format date to readable string
  export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  // Calculate percentage
  export function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }
  
  // Validate email format
  export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Debounce function for search
  export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Generate random ID
  export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
  
  // Sort array by property
  export function sortBy(array, property, order = 'asc') {
    return [...array].sort((a, b) => {
      if (order === 'asc') {
        return a[property] > b[property] ? 1 : -1;
      }
      return a[property] < b[property] ? 1 : -1;
    });
  }
  
  // Filter array by search term
  export function filterBySearch(array, searchTerm, properties) {
    const term = searchTerm.toLowerCase();
    return array.filter(item => {
      return properties.some(prop => {
        const value = item[prop];
        return value && value.toString().toLowerCase().includes(term);
      });
    });
  }