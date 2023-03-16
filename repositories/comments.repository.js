const {Comments, Users, Posts } = require('../models');
const { parseModelToFlatObject } = require('../helpers/sequelize.helper');
const { Op } = require('sequelize');

  class CommentsRepository extends Comments {
    constructor() {
      super();
    }
  
    findAllComment = async (PostId) => {
      
      const allComments = await Comments.findAll({
        attributes: ['commentId', 'comment', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Users,
          attributes: ['userId', 'nickname'],
        },
      ],
      where: { PostId } ,
      order: [['createdAt', 'DESC']],
      raw: true,
    }).then((models) => models.map(parseModelToFlatObject));
      
      return allComments
    };
    
    createComment = async ({ PostId, UserId, comment }) => {
      
      const CommentData = await Comments.create({
        PostId,
        UserId,
        comment,
      });
  
      return CommentData;
    };

    updateComment = async ( UserId, comment, commentId) => {
      const updateComment = await Comments.update(
        { comment },
        { where: { commentId, UserId } }
      );
  
      return updateComment;
    }
  
    deleteComment = async ( UserId, commentId) => {
      const Comment = await Comments.destroy({
         where: { commentId, UserId } 
      });
  
      return Comment;
    }

  }
  
  module.exports = CommentsRepository;
  