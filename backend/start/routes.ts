/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';

const ListUsersController = () => import('#user/controllers/list_users_controller');
const ShowUserController = () => import('#user/controllers/show_user_controller');
const CreateUserController = () => import('#user/controllers/create_user_controller');
const UpdateUserController = () => import('#user/controllers/update_user_controller');
const DeleteUserController = () => import('#user/controllers/delete_user_controller');

router.get('/', () => {
  return { hello: 'world' };
});

router.get('/users', [ListUsersController, 'index']).as('users.index');
router.post('/users', [CreateUserController, 'store']).as('users.store');

router
  .group(() => {
    router.get('/users/:id', [ShowUserController, 'show']).as('users.show');
    router.put('/users/:id', [UpdateUserController, 'update']).as('users.update');
    router.delete('/users/:id', [DeleteUserController, 'destroy']).as('users.destroy');
  })
  .where('id', router.matchers.uuid());
