import UserService from '../services/UserService'
import RoleService from '../services/RoleService'

import ResponseFormat from '../classes/ResponseFormat'

class RoleController {

  async create(ctx, next) {
    let newRole = await RoleService.create({
      name: ctx.request.body.name
    });

    ctx.body = ResponseFormat.build(
      {newRole}, 
      "Role created succesfully", 
      200, 
      "success"
    );

    return ctx;
  }

  async list(ctx, next) {
    let roles = await RoleService.list();
    
    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      roles, 
      "Roles read successfully", 
      200, 
      "success"
    );

    return ctx;
  }

  async readById(ctx, next) {
    let role = await RoleService.readById(ctx.params.id);

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      role,
      "Post read successfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async update(ctx, next) {
    await RoleService.update(ctx.params.id, {
      name: ctx.request.body.name
    });

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      1,
      "Role updated succesfully",
      200,
      "success"
    );

    return ctx;
  }
  
  async destroy(ctx, next) {
    await RoleService.destroy(ctx.params.id)

    ctx.status = 200;
    ctx.body = ResponseFormat.build(
      {},
      "Role deleted successfully",
      200,
      "success"
    )

    return ctx;
  }
}

export default new RoleController();