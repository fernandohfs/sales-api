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
        handler: UsersController.detail,
        config: {
            validate: {
                params: Schemas.params,
            }
        }
    },
    {
        method: 'POST',
        path: basePath,
        handler: UsersController.create,
        config: {
            validate: {
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'PUT',
        path: `${basePath}/{id}`,
        handler: UsersController.update,
        config: {
            validate: {
                params: Schemas.params,
                payload: Schemas.payload
            }
        }
    },
    {
        method: 'DELETE',
        path: `${basePath}/{id}`,
        handler: UsersController.delete,
        config: {
            validate: {
                params: Schemas.params
            }
        }
    },
    {
        method: 'POST',
        path: `${basePath}/login`,
        handler: UsersController.login,
        config: {
            validate: {
                payload: Schemas.login
            }
        }
    }
];