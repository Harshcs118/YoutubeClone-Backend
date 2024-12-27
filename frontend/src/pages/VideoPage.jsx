import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { getVideoById } from '../utils/api';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoById(id);
        if (data) {
          setVideo(data);
        } else {
          setError('Video not found');
        }
      } catch (err) {
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin border-t-4 border-blue-600 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return <VideoPlayer video={video} />;
};

export default VideoPage;