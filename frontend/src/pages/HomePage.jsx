import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { getVideos } from '../utils/api';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch videos from API
  const fetchVideos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getVideos();
      setVideos(data);
      console.log('Fetched videos:', data); // Log the API response for debugging
    } catch (err) {
      setError('Failed to load videos. Please try again.');
      console.error('Error fetching videos:', err); // Log error to console
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch videos when component mounts
  useEffect(() => {
    fetchVideos();
  }, []);

  const categories = ['all', 'programming', 'music', 'gaming', 'education'];

  // Retry fetching videos on error
  const handleRetry = () => {
    fetchVideos();
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Categories */}
      <div className="flex gap-2 mb-4 overflow-x-auto py-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm md:text-base ${
              filterCategory === category ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-selected={filterCategory === category}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">Loading videos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos
            .filter((video) => filterCategory === 'all' || video.category === filterCategory)
            .map((video, index) => (
              <VideoCard
                key={video.id ? `${video.id}-${video.title}` : `${index}-${video.title}`} // Use video.id or fallback to index
                video={video}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
