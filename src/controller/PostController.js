import UserService from '../services/UserService'
import PostService from '../services/PostService'

import ResponseFormat from '../classes/ResponseFormat'

class PostController {

  async create(ctx, next) {
    try {
      let user = await UserService.readById(1);/*ctx.user.id*/
      
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
    catch (error) {
      return ctx.body = error;
    }
  }

  async list(ctx, next) {
    let posts = await PostService.list();
    
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
      try {

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
      catch (error) {
        return ctx.body = error;
      }
  }
  
  async update(ctx, next) {
    try {
      await PostService.update(ctx.params.id, {
        description: ctx.request.body.description,
        image: ctx.request.body.image,
      });

      ctx.state.post = await PostService.readById(ctx.params.id)
      console.log(ctx.state.post)

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
    catch(error) {
        return ctx.body = error;
    }
  }
  
  async destroy (ctx, next) {
    try {

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
    catch (error) {
      return ctx.body = error;
    }
  }
}

export default new PostController();