import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';

const ChannelPage = () => {
  const { isLoggedIn } = useAuth();
  const [hasChannel, setHasChannel] = useState(false);
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState(null);

  const handleCreateChannel = () => {
    setIsFormVisible(true);
  };

  const handleCreateChannelSubmit = (e) => {
    e.preventDefault();

    if (!channelName || !channelDescription || !profilePicture || !bannerImage) {
      setError('Please provide a channel name, description, profile picture, and banner image');
      return;
    }

    // Backend call for channel creation (example: fetch API)
    const formData = new FormData();
    formData.append('channelName', channelName);
    formData.append('channelDescription', channelDescription);
    formData.append('profilePicture', profilePicture);
    formData.append('bannerImage', bannerImage);

    // Example API call to create a channel (replace with your actual API call)
    fetch('/api/channels', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setHasChannel(true);
        setChannelName('');
        setChannelDescription('');
        setProfilePicture(null);
        setBannerImage(null);
        setIsFormVisible(false);
      })
      .catch((err) => setError('Failed to create channel. Please try again.'));
  };

  const handleDeleteVideo = (videoId) => {
    setChannelVideos(channelVideos.filter((v) => v.id !== videoId));
  };

  const handleEditVideo = (videoId) => {
    console.log('Editing video with ID:', videoId);
  };

  const handleUploadVideo = (e) => {
    e.preventDefault();

    if (!videoFile || !videoTitle || !videoDescription || !videoThumbnail) {
      setError('Please provide a video title, description, select a video file, and a thumbnail image');
      return;
    }

    // Backend call to upload video (example: fetch API)
    const videoFormData = new FormData();
    videoFormData.append('videoTitle', videoTitle);
    videoFormData.append('videoDescription', videoDescription);
    videoFormData.append('videoFile', videoFile);
    videoFormData.append('videoThumbnail', videoThumbnail);

    // Example API call to upload a video (replace with your actual API call)
    fetch('/api/upload-video', {
      method: 'POST',
      body: videoFormData,
    })
      .then((response) => response.json())
      .then((data) => {
        const newVideo = {
          id: Date.now(),
          title: videoTitle,
          description: videoDescription,
          file: videoFile,
          thumbnail: videoThumbnail,
        };

        setChannelVideos((prevVideos) => [...prevVideos, newVideo]);

        setVideoFile(null);
        setVideoTitle('');
        setVideoDescription('');
        setVideoThumbnail(null);
      })
      .catch((err) => setError('Failed to upload video. Please try again.'));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleVideoThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoThumbnail(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Please sign in to access your channel
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      {!hasChannel ? (
        <div className="text-center py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Create Your Channel</h2>
          {!isFormVisible ? (
            <button
              onClick={handleCreateChannel}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 mx-auto text-sm md:text-base"
            >
              <Plus className="w-5 h-5" />
              Create Channel
            </button>
          ) : (
            <form
              onSubmit={handleCreateChannelSubmit}
              className="mt-8 p-6 bg-white rounded-lg shadow -md"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Channel Name</label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter channel name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Channel Description</label>
                <textarea
                  value={channelDescription}
                  onChange={(e) => setChannelDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter channel description"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                {profilePicture && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(profilePicture)}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-2 border-gray-300"
                    />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Channel Banner</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                {bannerImage && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(bannerImage)}
                      alt="Banner"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Create Channel
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="mb-8 flex flex-col items-center">
          <div className="relative w-full">
            {bannerImage && (
              <img
                src={URL.createObjectURL(bannerImage)}
                alt="Banner"
                className="w-full h-48 object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-center items-center -mt-16">
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-white bg-white shadow-lg"
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-3xl font-bold">{channelName}</h2>
            <p className="text-lg text-gray-500">{channelDescription}</p>
            <div className="mt-2 flex justify-center gap-8">
              <div>
                <p className="font-semibold">Subscribers</p>
                <p>1.2k</p>
              </div>
              <div>
                <p className="font-semibold">Videos</p>
                <p>{channelVideos.length}</p>
              </div>
            </div>
            <button
              onClick={() => setChannelVideos([])}
              className="mt-4 text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Videos
            </button>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Upload a Video</h3>
            <form onSubmit={handleUploadVideo} className="mt-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Video Title</label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter video title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Video Description</label>
                <textarea
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter video description"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Video Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleVideoThumbnailChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                {videoThumbnail && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(videoThumbnail)}
                      alt="Thumbnail"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Upload Video
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Videos</h3>
        {channelVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {channelVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDelete={handleDeleteVideo}
                onEdit={handleEditVideo}
              />
            ))}
          </div>
        ) : (
          <p>No videos yet. Upload your first video.</p>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
