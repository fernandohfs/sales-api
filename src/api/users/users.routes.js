import UsersController from './users.controllers';
import * as Schemas from './users.schemas';

const basePath = '/users';

export default [
    {
        method: 'GET',
        path: basePath,
        handler: UsersController.list
    },
    {
        method: 'GET',
        path: `${basePath}/{id}`,
        handler: UsersController.detail
    },
    {
        method: 'POST',
        path: basePath,
        handler: UsersController.create
    },
    {
        method: 'PUT',
        path: `${basePath}/{id}`,
        handler: UsersController.update
    },
    {
        method: 'DELETE',
        path: `${basePath}/{id}`,
        handler: UsersController.delete
    },
    {
        method: 'POST',
        path: `${basePath}/login`,
        handler: UsersController.login
    }
];