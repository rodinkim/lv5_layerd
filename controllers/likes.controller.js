const LikesService = require('../services/likes.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class LikesController {
  constructor() {
    this.likesService = new LikesService();
  }

  updateLike = async (req, res, next) => {
    try {
        const PostId = req.params.postId
        const UserId = res.locals.user.userId;
    
        if (!PostId || !UserId) {
          throw new InvalidParamsError();
        }

        let isLike = await this.likesService.findLike( UserId, PostId );

        if (!isLike) {
            await this.likesService.likeUpdate( UserId, PostId );
      
            return res.status(200).json({ message: '게시글의 좋아요를 등록하였습니다' });
          } else {
            await this.likesService.likeUndo( UserId, PostId );
    
            return res.status(200).json({ message: '게시글의 좋아요를 취소하였습니다.' });
          }
      } catch (error) {
        next(error);
      }
  }

  getAllLike = async (req, res, next) => {
    try {
      const UserId = res.locals.user.userId;
    //   const PostId = req.params.postId
      if (!UserId) {
        throw new InvalidParamsError();
      }

      const posts = await this.likesService.getAllLike( UserId);

      return res.status(200).json({ data: posts });
    } catch (error) {
     next(error);
    }
  
}

  
}

module.exports = LikesController;
