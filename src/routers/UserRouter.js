import Router from 'koa-router'
import UserController from '../controllers/UserController'
import validate from 'koa2-validation'
import vSchemes from '../middleware/validation/user'
import Filter from '../middleware/filter'
import DeleteRequestController from '../controllers/DeleteRequestController'

const router = new Router()

router.put('/users/:id/give',
            validate(vSchemes.CheckId),
            Filter.isAdmin,
            UserController.addRole);

router.put('/users/:id/pickup',
            validate(vSchemes.CheckId),
            Filter.isAdmin,
            UserController.deleteRole);

router.get('/users/:id',
          validate(vSchemes.CheckId),
          UserController.readById);

router.put('/users/:id',
          validate(vSchemes.CheckId),
          validate(vSchemes.UpdateUser),
          UserController.update);

router.delete('/users/:id',
              validate(vSchemes.CheckId),
              DeleteRequestController.create);

router.use(Filter.isAdmin)

router.get('/users', UserController.list);

router.get('/requests', DeleteRequestController.list);

router.delete('/requests/:id', UserController.destroy)

export default router;