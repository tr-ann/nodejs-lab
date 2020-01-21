import Router from 'koa-router'
import AdminController from '../controller/AdminController'

const router = new Router();


router.delete('/admin/delete-requests/:id', /* */) // delete user
router.get('/admin/delete-requests', /* */)     // show all delete requests from users
router.put('/admin/users', /* */) // give || pick up role
router.get('/admin/users', UserController.list)
router.post('/admin/users', UserController.create, UserController.addRole)