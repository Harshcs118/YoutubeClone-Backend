const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional field
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
