const express = require('express');
const { registerUser, loginUser, logoutUser, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
const router = express.Router();

router.post('/inscription', registerUser);
router.post('/login', loginUser);
router.post('/logout/:id', logoutUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;