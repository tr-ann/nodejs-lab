import UserService from '../services/UserService'
import PostService from '../services/PostService'

import decodePayload from '../classes/tokenPayload'
import ResponseFormat from '../classes/ResponseFormat'
import getTokenPayload from '../classes/tokenPayload'

class PostController {

  async create(ctx, next) {
    let tokenPayload = decodePayload(ctx.headers['authorization']);

    let user = await UserService.readById(tokenPayload.userId);
    
    let newPost = await PostService.create({
      userId: user.id,
      description: ctx.request.body.description,
      image: ctx.request.body.image
    });

    user.addPost(newPost)

    ctx.state.post = newPost;
    ctx.body = ResponseFormat.build(
      {}, 
      "Post created succesfully", 
      200, 
      "success"
    );

    await next();
    return ctx;
  }

  async list(ctx, next) {
    let page = ctx.request.query.page || 1;
    let offset = (page - 1) * +process.env.PAGE_SIZE;
    
    let options = {};
    if (ctx.params.login) {
      options.user = { login: ctx.params.login };
    }

    let posts = await PostService.list(+process.env.PAGE_SIZE, offset, options);
    
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      posts, 
      "Posts read successfully", 
      200, 
      "success"
    );

    return ctx;
  }

  async readById(ctx, next) {
    let post = await PostService.readById(ctx.params.id);

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      post,
      "Post read successfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async update(ctx, next) {
    await PostService.update(ctx.params.id, {
      description: ctx.request.body.description,
      image: ctx.request.body.image,
    });

    ctx.state.post = await PostService.readById(ctx.params.id)

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      "",
      200,
      "success"
    );

    await next();

    return ctx;
  }

  async putLike(ctx, next) {

    let userId = getTokenPayload(ctx.headers['authorization']).userId;
    let post = await PostService.readById(ctx.params.id);

    if (!(await post.removeLike(userId)))
      await post.addLike(userId);
    
    return ctx.body = ResponseFormat.build(
      {},
      'Like successfully put',
      200,
      'success'
    );
  }
  
  async destroy(ctx, next) {
    await PostService.destroy(ctx.params.id)

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      "Post deleted successfully",
      200,
      "success"
    )

    return ctx;
  }
}

export default new PostController();