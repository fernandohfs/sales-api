import UsersController from './users.controllers';
import OrdersController from '../orders/orders.controllers';
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
        authUserType: [2],
      },
      validate: {
        query: Schemas.queryList,
      },
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
        query: Schemas.queryDetail,
      },
    },
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
          payloadType: 'form',
          security: [],
        },
      },
      validate: {
        payload: Schemas.login,
      },
    },
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
          payloadType: 'form',
          security: [],
        },
      },
      validate: {
        payload: Schemas.payload,
        failAction(request, h, err) {
          return err;
        },
      },
    },
  },
  {
    method: 'PUT',
    path: `${basePath}/{id}`,
    handler: UsersController.update,
    config: {
      description: 'Put User',
      notes:
        'Update a user with data in request body by the id passed in the path',
      tags: ['api', 'users'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: {
        params: Schemas.params,
        payload: Schemas.payload,
      },
    },
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
        params: Schemas.params,
      },
    },
  },
  // ORDER's routes
  {
    method: 'POST',
    path: `${basePath}/{userId}/orders`,
    handler: OrdersController.create,
    config: {
      description: 'Post Order',
      notes: 'Create a order with user id in request params',
      tags: ['api', 'orders'],
    },
  },
  {
    method: 'GET',
    path: `${basePath}/{userId}/orders`,
    handler: OrdersController.list,
    config: {
      description: 'Get Orders',
      notes: 'Returns a list orders',
      tags: ['api', 'orders'],
    },
  },
  {
    method: 'GET',
    path: `${basePath}/{userId}/orders/{orderId}`,
    handler: OrdersController.detail,
    config: {
      description: 'Get Order',
      notes: 'Returns an order by the id passed in the path',
      tags: ['api', 'orders'],
    },
  },
];
