const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getAllUsers, getUserById, createUser,
  updateUser, deleteUser, searchUsers
} = require('../controllers/userController');

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getUserById);
router.post('/', auth, createUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/search', auth, searchUsers);

module.exports = router;
