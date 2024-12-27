import axios from 'axios';

// Define the base API URL
const API_URL = 'http://localhost:5000/api';

// Helper function to create a full URL from the base API URL and endpoint
const getFullUrl = (endpoint) => `${API_URL}/${endpoint}`;

// Video-specific API calls
export const getVideos = async () => {
  try {
    const response = await axios.get(getFullUrl('videos'));
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Get a single video by ID
export const getVideoById = async (id) => {
  try {
    console.log(`Fetching video with ID: ${id}`); // Log the request
    const response = await axios.get(getFullUrl(`videos/${id}`));
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

export const createVideo = async (videoData, token) => {
  try {
    const response = await axios.post(getFullUrl('videos'), videoData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

export const updateVideo = async (id, videoData, token) => {
  try {
    const response = await axios.put(getFullUrl(`videos/${id}`), videoData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating video with id ${id}:`, error);
    throw error;
  }
};

export const deleteVideo = async (id, token) => {
  try {
    const response = await axios.delete(getFullUrl(`videos/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting video with id ${id}:`, error);
    throw error;
  }
};

// User-specific API calls
export const login = async (credentials) => {
  try {
    const response = await axios.post(getFullUrl('auth/login'), credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await axios.post(getFullUrl('auth/register'), userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Channel-specific API calls

// Get all channels
export const getChannels = async () => {
  try {
    const response = await axios.get(getFullUrl('channels'));
    return response.data;
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw error;
  }
};

// Get a single channel by ID
export const getChannelById = async (id) => {
  try {
    const response = await axios.get(getFullUrl(`channels/${id}`));
    return response.data;
  } catch (error) {
    console.error(`Error fetching channel with id ${id}:`, error);
    throw error;
  }
};

export const createChannel = async (channelData, token) => {
  console.log('Channel Data:', channelData);
  console.log('Token:', token); // Debug log
  try {
    const response = await axios.post(getFullUrl('channels'), channelData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating channel:', error.response?.data || error.message);
    throw error;
  }
};


// Update a channel
export const updateChannel = async (id, channelData, token) => {
  try {
    const response = await axios.put(getFullUrl(`channels/${id}`), channelData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating channel with id ${id}:`, error);
    throw error;
  }
};

// Delete a channel
export const deleteChannel = async (id, token) => {
  try {
    const response = await axios.delete(getFullUrl(`channels/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting channel with id ${id}:`, error);
    throw error;
  }
};
