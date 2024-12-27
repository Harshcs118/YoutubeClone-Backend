const express = require('express');
const { createVideo, getVideos, getVideo, updateVideo, deleteVideo } = require('../controllers/videoController');
const { protect } = require('../middleware/auth.Middleware');
const router = express.Router();

router.post('/', protect, createVideo);
router.get('/', getVideos);
router.get('/:id', getVideo);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

module.exports = router;
