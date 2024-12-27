const express = require('express');
const {
  createComment,
  getComments,
  deleteComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth.Middleware');
const router = express.Router({ mergeParams: true });

// Route to add a comment to a specific video
router.post('/', protect, createComment);

// Route to get comments for a specific video
router.get('/', getComments);

// Route to delete a specific comment
router.delete('/:id', protect, deleteComment);

module.exports = router;
