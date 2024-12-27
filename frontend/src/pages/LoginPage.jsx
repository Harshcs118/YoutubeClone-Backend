import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../utils/api'; // Import the login API call
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Assuming the login function from context is used for setting the authentication state
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    
    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      // Use the actual login API to authenticate the user
      const credentials = { email, password }; // Assuming the login API accepts email and password
      const response = await loginAPI(credentials); // Login the user via the API
      const { token } = response; // Assuming the response includes a token
      login(token); // Store the token or user data in context/state

      // Navigate to the homepage after successful login
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Error logging in:', err); // Log error to the console for debugging
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Register Button */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <button
          onClick={() => navigate('/register')} // Navigate to the register page
          className="text-blue-600 hover:text-blue-800"
        >
          Register here
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
