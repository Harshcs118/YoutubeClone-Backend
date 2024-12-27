import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, Film, Menu } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions' },
    { icon: Film, label: 'Library', path: '/library' },
    { icon: Clock, label: 'History', path: '/history' },
    { icon: ThumbsUp, label: 'Liked Videos', path: '/liked' },
  ];

  return (
    <>
      {/* Toggle Button for Mobile View */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white shadow-md rounded-full hover:bg-gray-100"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white p-4 space-y-4 overflow-y-auto transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:w-64`}
      >
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              navigate(item.path);
              setIsOpen(false); // Close sidebar on mobile after navigation
            }}
            className="w-full flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <item.icon className="w-6 h-6" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Overlay for Mobile View */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
