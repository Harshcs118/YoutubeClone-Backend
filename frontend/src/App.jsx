import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage'; // Updated to RegisterPage
import LoginPage from './pages/LoginPage'; // Updated to LoginPage
import VideoPage from './pages/VideoPage';
import ChannelPage from './pages/ChannelPage';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex">
            {sidebarOpen && <Sidebar />}
            <main className="flex-1 p-4 overflow-x-hidden">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} /> {/* Updated to RegisterPage */}
                <Route path="/signin" element={<LoginPage />} /> {/* Updated to LoginPage */}
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/channel" element={<ChannelPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;