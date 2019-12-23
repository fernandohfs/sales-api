import ProductsControllers from './products.controllers';
import * as Schemas from './products.schemas';

const basePath = '/categories/{categoryId}/products';

export default [
  {
    method: 'POST',
    path: basePath,
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
    path: basePath,
    handler: ProductsControllers.list,
    config: {
      validate: {
        params: Schemas.params,
      },
    },
  },
  {
    method: 'GET',
    path: `${basePath}/{id}`,
    handler: ProductsControllers.detail,
    config: {
      validate: {
        params: Schemas.detail,
      },
    },
  },
];
