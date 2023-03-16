const express = require('express');
const router = express.Router();

const signupRouter = require('./signup.routes');
const loginRouter = require('./login.routes');
const postRouter = require('./posts.routes');
const CommentsRouter = require('./comments.route.js');
const likesRouter = require('./likes.route.js');

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/posts', postRouter);
router.use('/comments', CommentsRouter);
router.use('/posts', likesRouter);

module.exports = router;