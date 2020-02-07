import authenticationRouter from '../routers/AuthenticateRouter'
import usersRouter from '../routers/UserRouter'
import postsRouter from '../routers/PostRouter'
import isAuthenticated from '../middleware/authentication'

export default (app) => {
	app
		.use(authenticationRouter.routes())

		.use(isAuthenticated)

		.use(usersRouter.routes())
		.use(postsRouter.routes())
}

