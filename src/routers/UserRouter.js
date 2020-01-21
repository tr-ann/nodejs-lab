import Router from 'koa-router'
import UserController from '../controller/UserController'


const router = new Router()

router.use(/* filter */);

router.get('/users/:id',  UserController.readById)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.sendDeleteRequest)


export default router;