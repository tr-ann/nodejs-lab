import Router from 'koa-router'
import Authorization from '../middleware/authorization'
import UserController from '../controller/UserController'

const router = new Router()

router.post('/registration', UserController.register, UserController.create, UserController.addRole)

router.post('/login', Authorization.authorizeUser);

router.post('/token', Authorization.refreshAccessToken);

router.post('/logout', Authorization.authenticateToken, Authorization.logout)

export default router;