import UsersController from './users.controllers';
import * as Schemas from './users.schemas';

const basePath = '/users';

export default [
    {
        method: 'GET',
        path: basePath,
        handler: UsersController.list,
        config: {
            description: 'Get Users',
            notes: 'Returns a list users',
            tags: ['api', 'users'],
            app: {
                authUserType: [2]
            }
        },
    },
    {
        method: 'GET',
        path: `${basePath}/{id}`,
        handler: UsersController.detail,
        config: {
            description: 'Get User',
            notes: 'Returns a user item by the id passed in the path',
            tags: ['api', 'users'],
            validate: {
                params: Schemas.params,
            }
        }
    },
    {
        method: 'POST',
        path: `${basePath}/login`,
        handler: UsersController.login,
        config: {
            auth: false,
            description: 'Post Login',
            notes: 'Loin in API',
            tags: ['api', 'users'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Schemas.login
            }
        }
    },
    {
        method: 'POST',
        path: basePath,
        handler: UsersController.create,
        config: {
            auth: false,
            description: 'Post User',
            notes: 'Create a user with data in request body',
            tags: ['api', 'users'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
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
            description: 'Put User',
            notes: 'Update a user with data in request body by the id passed in the path',
            tags: ['api', 'users'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
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
            description: 'Put User',
            notes: 'Delete a user by the id passed in the path',
            tags: ['api', 'users'],
            validate: {
                params: Schemas.params
            }
        }
    }
];