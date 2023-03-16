const LikesRepository = require('../repositories/likes.repository');


class LikesService {
  constructor() {
    this.likesRepository = new LikesRepository();
  }
  findLike = async (UserId, PostId) => {
    const checklike = 
      await this.likesRepository.findLike(UserId, PostId);
    
    return checklike
  };

  likeUpdate = async (UserId, PostId) => {
    const checkUpdate = 
      await this.likesRepository.likeUpdate(UserId, PostId);
    
    return checkUpdate
  };

  likeUndo = async (UserId, PostId) => {
    const checkUndo = 
      await this.likesRepository.likeUndo(UserId, PostId);
    
    return checkUndo
  };
  getAllLike = async (UserId) => {
    const getLike = 
      await this.likesRepository.getAllLike(UserId);
    
    return getLike
  };
}
  module.exports = LikesService;