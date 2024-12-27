const express = require('express');
const { createChannel, getChannels, getChannel, updateChannel, deleteChannel } = require('../controllers/channelController');
const { protect } = require('../middleware/auth.Middleware');
const router = express.Router();

router.post('/', protect, createChannel);
router.get('/', getChannels);
router.get('/:id', getChannel);
router.put('/:id', protect, updateChannel);
router.delete('/:id', protect, deleteChannel);

module.exports = router;
