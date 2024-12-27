const Comment = require('../models/Comment');
const Video = require('../models/Video');

// Create a comment
const createComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;

    // Ensure video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Create comment
    const comment = await Comment.create({
      text,
      video: videoId,
      user: req.user._id,
    });

    // Add comment to video
    video.comments.push(comment._id);
    await video.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a video
const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ video: videoId }).populate('user', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Ensure the user owns the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await comment.remove();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createComment, getComments, deleteComment };
