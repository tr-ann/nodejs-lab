import TagService from '../services/TagService'
import PostService from '../services/PostService'
import ResponseFormat from '../classes/ResponseFormat'

class TagController {

  async addToPost(ctx, next) {
    console.log(Object.getPrototypeOf(ctx.state.post))
    
    await ctx.state.post.setTags([]);

		for (let tagName of ctx.request.body.tags) {
      let tag = await TagService.findOrCreate({
        where: { name: tagName }, 
        default: { name: tagName }
      });
			await ctx.state.post.addTag(tag[0]);
		}

    ctx.body.data = await PostService.readById(ctx.state.post.id);

		return ctx;
  }

  async create(ctx, next) {
    let newTag = await TagService.create({
      name: ctx.request.body.name
    });
    
    ctx.status = 201;
    ctx.body = ResponseFormat.build(
      newTag, 
      "Tag created successfully", 
      201, 
      "success"
    );

    return ctx;
  }

  async list(ctx, next) {
    let tags = await TagService.list();
    
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      tags, 
      "Tags read successfully", 
      200, 
      "success"
    );

    return ctx;
  }

  async readById(ctx, next) {
      let tag = await TagService.readById(ctx.params.id);

      ctx.status = 200;
      ctx.body = ResponseFormat.build(
        tag,
        "Tag read successfully",
        200,
        "success"
      );

      return ctx;
  }
  
  async update(ctx, next) {
    let tag = await TagService.update(ctx.params.id, {
      name: ctx.request.body.name
    });

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      tag,
      "Tag update successfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async destroy (ctx, next) {
    await TagService.destroy(ctx.params.id)

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      "Tag deleted successfully",
      200,
      "success"
    )

    return ctx;
  }
}

export default new TagController();