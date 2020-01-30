import Router from 'koa-router'
import PostController from '../controllers/PostController'
import TagController from '../controllers/TagController'
import { isPostOwner } from '../middleware/filter'
import validate from 'koa2-validation'
import vPostSchemes from '../middleware/validation/post'
import vUserSchemes from '../middleware/validation/user'

const router = new Router()

router.put('/posts/:id/like',
            validate(vUserSchemes.CheckId),
            PostController.putLike);

router.put('/posts/:id',
            validate(vUserSchemes.CheckId),
            validate(vPostSchemes.CreatePost),
            isPostOwner,
            PostController.update,
            TagController.addToPost);

router.delete('/posts/:id',
              validate(vUserSchemes.CheckId),
              isPostOwner,
              PostController.destroy);

router.get('/posts/:login?',
            validate(vUserSchemes.GetUserPosts),
            PostController.list);

router.post('/posts',
            validate(vPostSchemes.CreatePost),
            PostController.create,
            TagController.addToPost);

export default router;