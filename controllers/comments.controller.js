const CommentsService = require('../services/comments.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class CommentsController {
  constructor() {
    this.commentsService = new CommentsService();
  }

  /**
   * @param {import("express").Request} req - express Request
   * @param {import("express").Response} res - express Response
   * @param {import("express").NextFunction} next - express Response
   * **/
  getAllComment = async (req, res, next) => {
    try {
      const PostId = req.params.postId;
      const AllComment =
        await this.commentsService.findAllComment({PostId});

      res.json({ result: AllComment });
    } catch (error) {
      next(error);
    }
  };


  createComment = async (req, res, next) => {
    try {
      const { comment } = req.body;
      const  PostId  = req.params.postId;
      const UserId = res.locals.user.userId;
      
      if (!PostId || !UserId || !comment) {
        throw new InvalidParamsError();
      }
      const commentData = 
        await this.commentsService.createComment({UserId, PostId, comment})
        
        res.json({ result: commentData });
    } catch (error) {
      next(error);
    }
  };

  updateComment = async (req, res, next) => {
    try {
        
      const { commentId } = req.params;
      const { comment } = req.body;
      const UserId = res.locals.user.userId;
    
        if (!commentId || !comment) {
          throw new InvalidParamsError();
        }

        await this.commentsService.updateComment(UserId, comment, commentId)


        return res.status(200).json({ message: '댓글을 수정하였습니다.' });
      } catch (error) {
        next(error);
      }
  }

  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;
      
      const UserId = res.locals.user.userId;
    
        if (!commentId || !comment) {
          throw new InvalidParamsError();
        }

        await this.commentsService.deleteComment(UserId, commentId)


        return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
      } catch (error) {
        next(error);
      }
  }

}


module.exports = CommentsController;
