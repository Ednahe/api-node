const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { setPosts, getPosts, editPost, deletePost, likePost, dislikePost } = require('../controllers/post.controller');
const router = express.Router();

router.get("/", getPosts);
router.post("/",authMiddleware, upload.single('audio'), setPosts);
router.put('/:id',authMiddleware, editPost);
router.delete("/:id",authMiddleware, deletePost);
router.patch("/like-post/:id", likePost );
router.patch("/dislike-post/:id", dislikePost);

module.exports = router;