const PostRepository = require('../repositories/posts.repository');

class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }
  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();
    
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    })

    return allPost.map(post => {
      return {
        postId: post.postId,
        userId: post.userId,
        nickname: post.nickname,
        title: post.title,
        likes: post.likes,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      }
    });
  }

  createPost = async ( UserId, title, content) => {
    await this.postRepository.createPost( UserId, title, content);
  }

  findPost = async ( postId ) => {
    const post = await this.postRepository.findPost( postId );

    return {
      postId: post.postId,
      userId: post.userId,
      nickname: post.nickname,
      title: post.title,
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
  }

  updatePost = async ( UserId, title, content, postId) => {
    await this.postRepository.updatePost( UserId, title, content, postId);
  }

  deletePost = async ( UserId, postId) => {
    await this.postRepository.deletePost( UserId, postId);
  }

  findByPi = async (postId) => {
    await this.postRepository.findByPi(postId);
  }

}

module.exports = PostService;