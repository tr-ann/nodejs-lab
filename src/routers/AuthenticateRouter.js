import Router from 'koa-router'
import Authorization from '../middleware/authorization'
import UserController from '../controllers/UserController'
import AdminController from '../controllers/AdminController'

const router = new Router()

router.post('/registration', UserController.register, AdminController.create, AdminController.addRole)

router.post('/login', Authorization.authorizeUser);

router.post('/token', Authorization.refreshAccessToken);

router.post('/logout', Authorization.authenticateToken, Authorization.logout)

export default router;