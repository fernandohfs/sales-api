import ProductsOrdersController from './products-orders.controllers';

const basePath = '/orders/{orderId}/products';

export default [
  {
    method: 'POST',
    path: basePath,
    handler: ProductsOrdersController.create,
  },
];
