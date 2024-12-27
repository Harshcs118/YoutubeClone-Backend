import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/video/${video.id}`)}
    >
      <img 
        src={video.thumbnail} 
        alt={video.title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600">{video.channelName}</p>
        <p className="text-sm text-gray-500">{video.views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;