import Router from 'koa-router'
import Authorization from '../middleware/authentication'

const router = new Router()

router.post('/login', Authorization.authorizeUser);

router.post('/token', Authorization.refreshAccessToken);

router.post('/logout', Authorization.authenticateToken, Authorization.logout)

export default router;