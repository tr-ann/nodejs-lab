import Router from 'koa-router'
import PostController from '../controller/PostController'
import TagController from '../controller/TagController'
import { isPostOwner } from '../middleware/filter'

const router = new Router()

router.put('/posts/:id/like', PostController.putLike);

router.put('/posts/:id', isPostOwner, PostController.update, TagController.addToPost);
router.delete('/posts/:id', isPostOwner, PostController.destroy);

router.get('/posts/:login?', PostController.list);
router.post('/posts', PostController.create, TagController.addToPost);

export default router;