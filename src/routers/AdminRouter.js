import Router from 'koa-router'
import AdminController from '../controller/AdminController'

import { isAdmin } from '../middleware/filter'

const router = new Router();

router.use(isAdmin);

router.put('/admin/users/:id/give', AdminController.addRole); // give
router.put('/admin/users/:id/pickup', AdminController.deleteRole); // pick up role

router.delete('/admin/delete-requests/:id', AdminController.destroy); // delete user ( id -- delete request id)
router.get('/admin/delete-requests', AdminController.deleteRequestsList); // show all delete requests from users

router.get('/admin/users', AdminController.usersList);
router.post('/admin/users', AdminController.create, AdminController.addRole);

export default router;