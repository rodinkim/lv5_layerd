const { Likes, Users, sequelize, Posts } = require('../models');
const { parseModelToFlatObject } = require('../helpers/sequelize.helper');
const { Op } = require('sequelize');

class LikesRepository extends Likes {
  constructor() {
    super();
  }
  findLike = async (UserId, PostId) => {
    const checklike = 
      await Likes.findOne({
        where: {
          PostId,
          UserId,
        },
      });

    return checklike
  };

  likeUpdate = async (UserId, PostId) => {
    const checklike = 
      await Likes.create({
          PostId,
          UserId,
      });

    return checklike
  };

  likeUndo = async (UserId, PostId) => {
    const checklike = 
      await Likes.destroy({
        where: { PostId, UserId},
      });

    return checklike
  };

  getAllLike = async (UserId) => {
    const posts = await Posts.findAll({
        attributes: [
          'postId',
          'title',
          'createdAt',
          'updatedAt',
          [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
        ],
        include: [
          {
            model: Users,
            attributes: ['userId', 'nickname'],
          },
          {
            model: Likes,
            attributes: [],
            required: true,
            where: { 
              [Op.and]: [{ UserId: UserId }],
               
            },
          },
        ],
        group: ['Posts.postId'],
        order: [['createdAt', 'DESC']],
        raw: true,
       }).then((likes) => likes.map(parseModelToFlatObject));

    return posts
  };

}
module.exports = LikesRepository;