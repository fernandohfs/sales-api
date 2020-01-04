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
];
