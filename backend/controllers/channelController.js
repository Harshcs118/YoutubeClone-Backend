const Channel = require('../models/Channel');

// Create a channel
const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    const channel = await Channel.create({
      channelName,
      description,
      owner: req.user._id,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all channels
const getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate('owner', 'username');
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single channel
const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate('owner', 'username');
    if (channel) {
      res.json(channel);
    } else {
      res.status(404).json({ message: 'Channel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a channel
const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { channelName, description } = req.body;
    channel.channelName = channelName || channel.channelName;
    channel.description = description || channel.description;

    const updatedChannel = await channel.save();
    res.json(updatedChannel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a channel
const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    // Ensure the user is the owner of the channel
    if (channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete the channel using deleteOne
    await channel.deleteOne(); // Replaced remove() with deleteOne()
    res.json({ message: 'Channel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createChannel, getChannels, getChannel, updateChannel, deleteChannel };
