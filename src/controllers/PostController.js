import PostService from '../services/PostService'
import ResponseFormat from '../classes/ResponseFormat'
import { getTokenPayload } from '../classes/tokens'
import getPagination from '../classes/pagination'

class PostController {

  async create(ctx, next) {
    let tokenPayload = getTokenPayload(ctx.headers['authorization']);

    let postId = await PostService.create(tokenPayload, ctx.request.body);

    ctx.state.postId = postId;

    await next();

    ctx.body = ResponseFormat.build(
      `post id: ${postId}`, 
      "Post created successfully", 
      200, 
      "success"
    );
    
    return ctx;
  }

  async list(ctx, next) {
    let pagination = getPagination(ctx.request.query);
    
    let options = {};
    if (ctx.params.login) {
      options.user = { login: ctx.params.login };
    }

    let posts = await PostService.list(pagination, options);
    
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
    await PostService.update(ctx.params.id, ctx.request.body);

    ctx.state.postId = ctx.params.id;

    await next();

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      (await PostService.readById(ctx.state.postId)),
      "post updated successfully",
      200,
      "success"
    );

    return ctx;
  }

  async putLike(ctx, next) {

    let userId = getTokenPayload(ctx.headers['authorization']).userId;
    
    await PostService.putLike(userId, ctx.params.id);
    
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      'Like put successfully',
      200,
      'success'
    );

    return ctx;
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