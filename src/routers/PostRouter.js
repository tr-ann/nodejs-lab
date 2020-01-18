import Router from 'koa-router'
import PostController from '../controller/PostController'
import TagController from '../controller/TagController'

const router = new Router()

router.get('/posts/:id',  PostController.readById);
router.put('/posts/:id', PostController.update, TagController.addToPost);
router.delete('/posts/:id', PostController.destroy);
router.get('/posts', PostController.list);
router.post('/posts', PostController.create, TagController.addToPost);

export default router;