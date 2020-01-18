import authenticateRouter from '../routers/AuthenticateRouter'
import usersRouter from '../routers/UserRouter'
import postsRouter from '../routers/PostRouter'
//import AuthenticateController from '../controller/AuthenticateController'

export default (app) => {
	app
		//.use(authenticateRouter.routes())
		//.use(AuthenticateController.isAuthenticated)
		.use(usersRouter.routes())
		.use(postsRouter.routes())
}

