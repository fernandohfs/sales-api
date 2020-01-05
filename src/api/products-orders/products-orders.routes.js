import ProductsOrdersController from './products-orders.controllers';
import * as Schemas from './products-orders.schemas';

const basePath = '/orders/{orderId}/products';

export default [
  {
    method: 'POST',
    path: basePath,
    handler: ProductsOrdersController.create,
    config: {
      description: 'Post Products Order',
      notes: 'Integrate products to an order',
      tags: ['api', 'orders'],
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
    method: 'PUT',
    path: `${basePath}/{productId}`,
    handler: ProductsOrdersController.update,
    config: {
      description: 'Put Products Order',
      notes: 'Update a products order',
      tags: ['api', 'orders'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: {
        params: Schemas.params2,
        payload: Schemas.update,
      },
    },
  },
  {
    method: 'DELETE',
    path: `${basePath}/{productId}`,
    handler: ProductsOrdersController.delete,
    config: {
      description: 'Delete Products Order',
      notes: 'Delete a products order',
      tags: ['api', 'orders'],
      validate: {
       params: Schemas.params2
      },
    },
  },
];
