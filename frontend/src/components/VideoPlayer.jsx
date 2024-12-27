import React from 'react';
import { Heart } from 'lucide-react';
import CommentSection from './CommentSection';

const VideoPlayer = ({ video }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Video Player Section */}
      <div className="aspect-video bg-black mb-6 rounded-lg overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Video Information Section */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{video.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-4">
          <p className="text-gray-600 text-sm sm:text-base">{video.channelName}</p>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
              <Heart className="w-5 h-5" />
              <span>{video.likes}</span>
            </button>
          </div>
        </div>
        <p className="mt-4 text-gray-800 text-sm sm:text-base leading-relaxed">{video.description}</p>
      </div>

      {/* Comment Section */}
      <CommentSection videoId={video.id} />
    </div>
  );
};

export default VideoPlayer;
