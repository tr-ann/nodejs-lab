import { getTokenPayload } from '../classes/tokens'
import DeleteRequestsService from '../services/DeleteRequestService'
import ResponseFormat from '../classes/ResponseFormat'
import BadRequest from '../classes/errors/bad-request'

class DeleteRequestController {

  async create(ctx, next) {
    let payload = getTokenPayload(ctx.headers['authorization']);

    if (payload.userId !== +ctx.params.id) throw new BadRequest();

    await DeleteRequestsService.create({ userId: payload.userId });

    return ctx.body = ResponseFormat.build(
      {},
      'Delete request created successfully',
      201,
      'success'
    )
  }

  async list(ctx, next) {
    let list = await DeleteRequestsService.list();

    return ctx.body = ResponseFormat.build(
      list,
      'Delete requests read successfully',
      200,
      'success'
    );
  }

};

export default new DeleteRequestController();