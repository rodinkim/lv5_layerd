const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
  constructor() {
    this.commentsRepository = new CommentsRepository();
  }

  findAllComment = async ({PostId}) => {
    const Comments = 
      await this.commentsRepository.findAllComment(PostId);
    
    
    return Comments
  };

  

  createComment = async ({ UserId, PostId, comment }) => {
      const commentData = await this.commentsRepository.createComment({UserId, PostId, comment})    
      return commentData;  
  };

  updateComment = async ( UserId, comment, commentId) => {
    await this.commentsRepository.updateComment( UserId, comment, commentId);
  }
  deleteComment = async ( UserId, commentId) => {
    await this.commentsRepository.deleteComment( UserId, commentId);
  }

}

module.exports = CommentsService;
