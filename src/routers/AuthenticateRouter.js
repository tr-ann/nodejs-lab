import Router from 'koa-router'
import AuthenticateController from '../controller/AuthenticateController'

const router = new Router()

router.post('/login',  AuthenticateController.login);

export default router;