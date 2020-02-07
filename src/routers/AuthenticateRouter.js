import Router from 'koa-router'
import LoginController from '../controllers/LoginController'
import LogoutController from '../controllers/LogoutController'
import UserController from '../controllers/UserController'
import isAuthenticated from '../middleware/authentication'

const router = new Router()

router.post('/registration', UserController.create)

router.post('/login', LoginController.authenticateWithJWT);

router.post('/token', LoginController.refreshJWT);

router.post('/logout', isAuthenticated, LogoutController.logout)

export default router;