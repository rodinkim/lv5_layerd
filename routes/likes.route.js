const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.get('/like/like', authMiddleware, likesController.getAllLike);
router.put('/:postId/like', authMiddleware, likesController.updateLike);


module.exports = router;