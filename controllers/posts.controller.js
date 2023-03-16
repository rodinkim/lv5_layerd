const PostService = require('../services/posts.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class PostsController {
  constructor() {
    this.postService = new PostService(); 
  }
  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  getAllPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();
      
      res.status(200).json({ data: posts })
    } catch (error) {
      next(error);
    }
  }

  createPost = async (req, res, next) => {
    try {
        const { title, content } = req.body
        const UserId = res.locals.user.userId;
        
       
        if (!title || !content) {
          throw new InvalidParamsError();
        }
    
        await this.postService.createPost( UserId, title, content );
        return res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });

      } catch (error) {
        next(error);
      }
  }

  getPosts = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const posts = await this.postService.findPost( postId );

      res.status(200).json({ data: posts })
    } catch (error) {
      next(error);
    }
  }

  updatePost = async (req, res, next) => {
    try {
        
        const { postId } = req.params;
        const { title, content } = req.body;
        const UserId = res.locals.user.userId;
    
        if (!title || !content) {
          throw new InvalidParamsError();
        }

        await this.postService.updatePost( UserId, title, content, postId );

        return res.status(200).json({ message: '게시글을 수정하였습니다.' });
      } catch (error) {
        next(error);
      }
  }

  deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const UserId = res.locals.user.userId;
    
        await this.postService.findByPi(postId);

        await this.postService.deletePost( UserId, postId );
    
        return res.status(201).json({ message: '게시글을 삭제하였습니다.' });
      } catch (error) {
        next(error);
      }
  }
}

module.exports = PostsController;