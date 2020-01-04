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
      validate: {
        payload: Schemas.update,
      },
    },
  },
];
