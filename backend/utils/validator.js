// validator.js utility for validation functions
// Example: isIn function to check if a value is in an array

export const isIn = (value, array) => {
  return array.includes(value);
};

// Additional validators can be added here

// Usage example:
// isIn('admin', ['user', 'admin']) => true
// isIn('guest', ['user', 'admin']) => false
