import Router from 'koa-router'
import AdminController from '../controllers/AdminController'
import validate from 'koa2-validation'

import { isAdmin } from '../middleware/filter'
import vSchemes from '../middleware/validation/user'

const router = new Router();

router.use(isAdmin);

router.put('/admin/users/:id/give',               // give role
            validate(vSchemes.CheckId),
            AdminController.addRole);

router.put('/admin/users/:id/pickup',             // pick up role
            validate(vSchemes.CheckId),
            AdminController.deleteRole);

router.delete('/admin/delete-requests/:id',       // delete user ( id -- delete request id)
              validate(vSchemes.CheckId),
              AdminController.destroy);
              
router.get('/admin/delete-requests',              // show all delete requests from users
            AdminController.deleteRequestsList); 

router.get('/admin/users',                        // show all users
            validate(vSchemes.GetUsersList),
            AdminController.usersList);

//router.post('/admin/users', AdminController.create, AdminController.addRole);

export default router;