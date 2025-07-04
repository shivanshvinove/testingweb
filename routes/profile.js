const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const { getProfile, updateProfile, changePassword, uploadPicture } = require('../controllers/profileController');

const upload = multer({ dest: 'uploads/profile_pics/' });

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);
router.put('/password', auth, changePassword);
router.post('/upload', auth, upload.single('profile_picture'), uploadPicture);

module.exports = router;
