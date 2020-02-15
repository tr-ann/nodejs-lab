import logger from '../logger/logger'
import deletePosts from '../cron/deletionPosts'

export default (app) => {
	app
		.use(logger)
}