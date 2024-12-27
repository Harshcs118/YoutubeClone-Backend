const express = require('express'); // Ensure express is imported here
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth.Middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;