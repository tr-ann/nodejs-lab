import UserService from '../services/UserService'
import ResponseFormat from '../classes/ResponseFormat'

class UserController {

  async create(ctx, next) {
    const user = await UserService.create({
      login: ctx.request.body.login,
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      password: ctx.request.body.password
    });

    //user.addRole(2);
    
    ctx.status = 201;
    ctx.body = ResponseFormat.build(
      user, 
      "User creates successfully", 
      201, 
      "success"
    );

    return ctx;
  }

  async list(ctx, next) {
    let users = await UserService.list();
    
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      users, 
      "Users read successfully", 
      200, 
      "success"
    );

    return ctx;
  }

  async readById(ctx, next) {
    let user = await UserService.readById(ctx.params.id);

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      user,
      "User read successfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async update(ctx, next) {

    let user = await UserService.update(ctx.params.id, {
      lastName: ctx.request.body.lastName,
      firstName: ctx.request.body.firstName,
    });

    console.log(user);

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      user,
      "user Update successfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async destroy (ctx, next) {
    await UserService.destroy(ctx.params.id)
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      "User deleted successfully",
      200,
      "success"
    )

    return ctx;
  }

  async sendDeleteRequest(ctx, next) {
    
  }
}

export default new UserController();