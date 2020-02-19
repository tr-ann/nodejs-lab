import Router from 'koa-router'
import LoginController from '../controllers/LoginController'
import LogoutController from '../controllers/LogoutController'
import UserController from '../controllers/UserController'
import isAuthenticated from '../middleware/authentication'
import validate from 'koa2-validation'
import vSchemes from '../middleware/validation/user'

const router = new Router()

router.post('/registration', validate(vSchemes.Registration), UserController.create, UserController.addRole)

router.post('/login', LoginController.authenticateWithJWT);

router.post('/token', LoginController.refreshJWT);

router.post('/logout', isAuthenticated, LogoutController.logout);

export default router;