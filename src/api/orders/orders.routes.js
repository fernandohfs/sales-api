import OrdersController from './orders.controllers';
import * as Schemas from './orders.schemas';

const basePath = '/users/{userId}/orders';

export default [
  {
    method: 'POST',
    path: `${basePath}`,
    handler: OrdersController.create,
    config: {
      description: 'Post Order',
      notes: 'Create a order with user id in request params',
      tags: ['api', 'orders'],
      validate: {
        params: Schemas.userId,
      },
    },
  },
  {
    method: 'GET',
    path: `${basePath}`,
    handler: OrdersController.list,
    config: {
      description: 'Get Orders',
      notes: 'Returns a list orders',
      tags: ['api', 'orders'],
      validate: {
        params: Schemas.userId,
      },
    },
  },
  {
    method: 'GET',
    path: `${basePath}/{orderId}`,
    handler: OrdersController.detail,
    config: {
      description: 'Get Order',
      notes: 'Returns an order by the id passed in the path',
      tags: ['api', 'orders'],
      validate: {
        params: Schemas.params,
      },
    },
  },
];
