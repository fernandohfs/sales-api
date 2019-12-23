import ProductsControllers from './products.controllers';
import * as Schemas from './products.schemas';

export default [
  {
    method: 'POST',
    path: '/categories/{categoryId}/products',
    handler: ProductsControllers.create,
    config: {
      validate: {
        params: Schemas.params,
        payload: Schemas.payload,
      },
    },
  },
  {
    method: 'GET',
    path: '/categories/{categoryId}/products',
    handler: ProductsControllers.list,
    config: {
      validate: {
        params: Schemas.params,
      },
    },
  },
];
