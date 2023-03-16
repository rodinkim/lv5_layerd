const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getAllPosts);
router.get('/:postId', postsController.getPosts);
router.post('/', authMiddleware, postsController.createPost);
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);

module.exports = router;