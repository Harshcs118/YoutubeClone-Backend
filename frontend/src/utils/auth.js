// utils/auth.js

// Function to log in a user
export const login = (user) => {
    // Store user information in localStorage or sessionStorage (or use context)
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  };
  
  // Function to log out a user
  export const logout = () => {
    // Remove user information from localStorage or sessionStorage (or reset context)
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };
  
  // Function to check if the user is authenticated
  export const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };
  
  // Function to get the current authenticated user
  export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  // Function to authenticate a user (used for login flow)
  export const authenticate = async (email, password) => {
    // Example authentication logic: Make an API call to your backend to validate the user's credentials
    // Here, it's just a mock authentication for demonstration purposes
    if (email === 'user@example.com' && password === 'password123') {
      const user = { username: 'user', email: 'user@example.com' };
      login(user);
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  };
  
  // Function to get the authentication token (if you are using JWT or similar)
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Function to set an authentication token (if you're using JWT or similar)
  export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  