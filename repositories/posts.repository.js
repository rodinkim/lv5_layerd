const { Posts, Comments, Likes, sequelize, Users } = require('../models');
const { parseModelToFlatObject } = require('../helpers/sequelize.helper');

class PostRepository extends Posts {
  constructor() {
    super();
  }
  findAllPost = async () => {
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
            required: false,
          },
        ],
        group: ['Posts.postId'],
        order: [['createdAt', 'DESC']],
        raw: true, // raw: true를 하면 데이터를 JSON 형태로 반환해준다.
    });
    
    const postsData = posts.map(parseModelToFlatObject);
    return postsData
  }

  createPost = async ( UserId, title, content) => {
    const createPostData =  await Posts.create({ UserId, title, content });

    return createPostData;
  }

  findPost = async (postId) => {
    const posts = await Posts.findOne({
      attributes: [
        'postId',
        'title',
        'content',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('Likes.PostId')), 'likes'],
      ],
      where: { postId },
      include: [
        {
          model: Users,
          attributes: ['userId', 'nickname'],
        },
        {
          model: Likes,
          attributes: [],
          required: false,
        },
      ],
      group: ['Posts.postId'],
      order: [['postId', 'DESC']],
      raw: true,
    }).then(parseModelToFlatObject);
    
    return posts;
    }

  updatePost = async ( UserId, title, content, postId) => {
    const updateCount = await Posts.update(
      { title, content },
      { where: { postId, UserId } }
    );

    return updateCount;
  }

  deletePost = async ( UserId, postId) => {
    const deleteCount = await Posts.destroy({
      where: { postId, UserId },
    });

    return deleteCount;
  }

  findByPi = async (postId) => {
    
    const post = await Posts.findByPk(postId)

    return post;
  }

}
module.exports = PostRepository;