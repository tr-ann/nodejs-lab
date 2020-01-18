import Router from 'koa-router'
import UserController from '../controller/UserController'

const router = new Router()

router.get('/users/:id',  UserController.readById)
router.put('/users/:id', UserController.update)
router.delete('/users/:id', UserController.destroy)
router.get('/users', UserController.list)
router.post('/users', UserController.create)

export default router;