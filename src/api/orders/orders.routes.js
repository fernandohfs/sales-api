import OrdersController from './orders.controllers';
import * as Schemas from './orders.schemas';

const basePath = '/orders/{orderId}/orders';

export default [
  {
    method: 'GET',
    path: basePath,
    handler: OrdersController.list,
    config: {
      description: 'Get Orders',
      notes: 'Retruns a list orders',
      tags: ['api', 'orders']
    },
  },
  {
    method: 'GET',
    path: `${basePath}/{id}`,
    handler: OrdersController.detail,
    config: {
      description: 'Get Order',
      notes: 'Returns a order by the id passed in the path',
      tags: ['api', 'orders'],
      validate: {
        params: Schemas.params,
      },
    },
  },
  {
    method: 'POST',
    path: basePath,
    handler: OrdersController.create,
    config: {
      description: 'Post Order',
      notes: 'Create a order with data in request body',
      tags: ['api', 'orders'],
      validate: {
        payload: Schemas.payload,
      },
    },
  },
  {
    method: 'PUT',
    path: `${basePath}/{id}`,
    handler: OrdersController.update,
    config: {
      description: 'Put Order',
      notes: 'Update a order with data in request body by the id passed in the path',
      tags: ['api', 'orders'],
      validate: {
        params: Schemas.params,
        payload: Schemas.payload,
      },
    },
  },
  {
    method: 'DELETE',
    path: `${basePath}/{id}`,
    handler: OrdersController.destroy,
    config: {
      description: 'delete Order',
      notes: 'Delete a order by the id passed in the path',
      tags: ['api', 'orders'],
      validate: {
        params: Schemas.params,
      },
    },
  },
];