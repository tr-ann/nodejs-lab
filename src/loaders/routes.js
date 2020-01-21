import authenticationRouter from '../routers/AuthenticateRouter'
import usersRouter from '../routers/UserRouter'
import postsRouter from '../routers/PostRouter'
import Authorization from '../middleware/authorization'
import UserController from '../controller/UserController'

export default (app) => {
	app
		.use(authenticationRouter.routes())

		.use(Authorization.authenticateToken)

		.use(usersRouter.routes())
		.use(postsRouter.routes());
}

